<template>
  <div class="experiment-page">
    <div class="container">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>加载中...
      </div>

      <div v-else-if="error" class="empty">
        <div class="icon">!</div>
        <p>加载失败：{{ error }}</p>
      </div>

      <template v-else-if="experiment">
        <section class="exp-hero">
          <div class="hero-inner">
            <h1>{{ experiment.title }}</h1>
            <div class="publisher">
              <span>课程提供商：</span>{{ experiment.publisher || legacyPublisher || '科明365' }}
            </div>
            <button class="btn-enter" @click="startExperiment" :disabled="entering">
              {{ entering ? '进入中...' : '开始学习' }}
            </button>
          </div>
        </section>

        <div class="exp-tabs-wrap">
          <div class="exp-tabs">
            <button class="tab-btn" :class="{ active: activeTab === 'analysis' }" @click="activeTab = 'analysis'">数据分析</button>
            <button class="tab-btn" :class="{ active: activeTab === 'overview' }" @click="activeTab = 'overview'">内容概述</button>
          </div>

          <div v-if="activeTab === 'analysis'" class="tab-panel">
            <div class="stats-row">
              <div class="stat-box">
                <div class="stat-label">访问总量</div>
                <div class="stat-value">{{ stats.totalVisits || 0 }}</div>
                <div class="stat-new">新增 {{ stats.newVisits || 0 }}</div>
              </div>
              <div class="stat-box">
                <div class="stat-label">练习总次数</div>
                <div class="stat-value">{{ stats.totalPractice || 0 }}</div>
                <div class="stat-new">新增 {{ stats.newPractice || 0 }}</div>
              </div>
              <div class="stat-box">
                <div class="stat-label">新增访问量</div>
                <div class="stat-value">{{ stats.newVisits || 0 }}</div>
              </div>
              <div class="stat-box">
                <div class="stat-label">新增练习次数</div>
                <div class="stat-value">{{ stats.newPractice || 0 }}</div>
              </div>
            </div>

            <div class="charts-grid">
              <div class="chart-box">
                <div class="chart-title">访问总量</div>
                <canvas ref="cumVisitsCanvas" height="260"></canvas>
              </div>
              <div class="chart-box">
                <div class="chart-title">练习总次数</div>
                <canvas ref="cumPracticeCanvas" height="260"></canvas>
              </div>
              <div class="chart-box">
                <div class="chart-title">新增访问量</div>
                <canvas ref="dailyVisitsCanvas" height="200"></canvas>
              </div>
              <div class="chart-box">
                <div class="chart-title">新增练习次数</div>
                <canvas ref="dailyPracticeCanvas" height="200"></canvas>
              </div>
            </div>
          </div>

          <div v-else class="tab-panel">
            <div class="overview">
              <h2>{{ experiment.title }}</h2>
              <p v-if="experiment.sellPoint">{{ experiment.sellPoint }}</p>
              <p v-else>暂无内容概述。</p>
              <dl class="overview-meta">
                <div v-if="experiment.publisher || legacyPublisher">
                  <dt>课程提供商</dt>
                  <dd>{{ experiment.publisher || legacyPublisher }}</dd>
                </div>
                <div v-if="experiment.parentId || legacyCurriculumId">
                  <dt>课程 ID</dt>
                  <dd>{{ experiment.parentId || legacyCurriculumId }}</dd>
                </div>
                <div v-if="experiment.appliId || legacyAppliId">
                  <dt>应用 ID</dt>
                  <dd>{{ experiment.appliId || legacyAppliId }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div v-if="maintenanceDialogVisible" class="maintenance-backdrop" role="presentation">
      <section class="maintenance-dialog" role="alertdialog" aria-modal="true" aria-labelledby="maintenance-title">
        <h2 id="maintenance-title">提示</h2>
        <p>系统维护升级中，预计恢复时间下午5点左右，带来不便，敬请谅解。</p>
        <div class="maintenance-actions">
          <button type="button" @click="maintenanceDialogVisible = false">确定</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api'
import { toast } from '@/utils'

const route = useRoute()
const router = useRouter()

const experiment = ref<any>(null)
const loading = ref(true)
const error = ref('')
const activeTab = ref<'analysis' | 'overview'>('analysis')
const entering = ref(false)
const fromName = ref('')
const legacyPublisher = ref('')
const legacyCurriculumId = ref('')
const legacyAppliId = ref('')
const maintenanceDialogVisible = ref(false)

const stats = ref({
  totalVisits: 0,
  totalPractice: 0,
  newVisits: 0,
  newPractice: 0,
  cumulativeVisits: [] as any[],
  cumulativePractice: [] as any[],
  dailyVisits: [] as any[],
  dailyPractice: [] as any[]
})
const cumVisitsCanvas = ref<HTMLCanvasElement | null>(null)
const cumPracticeCanvas = ref<HTMLCanvasElement | null>(null)
const dailyVisitsCanvas = ref<HTMLCanvasElement | null>(null)
const dailyPracticeCanvas = ref<HTMLCanvasElement | null>(null)

const getQueryString = (keys: string[]) => {
  for (const key of keys) {
    const value = route.query[key]
    if (Array.isArray(value)) return value[0] || ''
    if (value) return String(value)
  }
  return ''
}

const getExperimentId = () => {
  return String(route.params.id || getQueryString(['experimentId', 'eId', 'id']) || localStorage.getItem('experimentId') || '')
}

const getCurriculumId = () => {
  return String(getQueryString(['curriculumId', 'cId']) || localStorage.getItem('curriculumId') || experiment.value?.parentId || '')
}

const saveLegacyExperiment = (data: any) => {
  if (!data) return
  localStorage.setItem('experimentId', String(data.id || getExperimentId()))
  if (data.parentId) localStorage.setItem('curriculumId', String(data.parentId))
  if (data.title) localStorage.setItem('experimentStr', String(data.title))
  if (data.publisher) localStorage.setItem('publisher', String(data.publisher))
  if (data.appliId) localStorage.setItem('appliId', String(data.appliId))
  if (data.status != null) localStorage.setItem('status', String(data.status))
  if (data.type != null) localStorage.setItem('zyType', String(data.type))
  if (data.price != null) localStorage.setItem('price', String(data.price))
  legacyPublisher.value = localStorage.getItem('publisher') || ''
  legacyCurriculumId.value = localStorage.getItem('curriculumId') || ''
  legacyAppliId.value = localStorage.getItem('appliId') || ''
}

const isGenericSourceName = (name: string) => {
  return !name || name === '实验操作' || name.includes('实验操作')
}

const resolveCurriculumName = async (data: any) => {
  const curriculumId = data?.parentId || getCurriculumId()
  if (!curriculumId || !isGenericSourceName(fromName.value)) return
  try {
    const { data: curriculum } = await api.get(`/courses/${curriculumId}/`)
    const name = curriculum?.curriculumName || ''
    if (!name) return
    fromName.value = name
    localStorage.setItem('experimentFrom', 'curriculum')
    localStorage.setItem('experimentFromName', name)
  } catch { /* keep the current course name if lookup fails */ }
}

const loadExperiment = async () => {
  const id = getExperimentId()
  fromName.value = (route.query.fromName as string) || localStorage.getItem('experimentFromName') || ''
  legacyPublisher.value = localStorage.getItem('publisher') || ''
  legacyCurriculumId.value = localStorage.getItem('curriculumId') || ''
  legacyAppliId.value = localStorage.getItem('appliId') || ''

  if (!id) {
    error.value = '缺少实验 ID，请从课程列表重新进入实验。'
    loading.value = false
    return
  }

  loading.value = true
  error.value = ''
  try {
    const { data } = await api.get(`/courses/experiments/${id}/`, {
      params: { curriculumId: getCurriculumId() }
    })
    experiment.value = data
    saveLegacyExperiment(data)
    await resolveCurriculumName(data)
    document.title = `${experiment.value?.title || ''} - 科明365VR教学云平台`
    const resolvedId = String(experiment.value?.id || id)
    await recordVisit(resolvedId)
    loading.value = false
    await nextTick()
    await loadStats(resolvedId)
  } catch (e: any) {
    error.value = e.message || '请求失败'
  } finally {
    loading.value = false
  }
}

const recordVisit = async (id: string) => {
  try {
    await api.post(`/courses/experiments/${id}/record-visit/`, { curriculumId: getCurriculumId() })
  } catch { /* stats should still render if visit recording fails */ }
}

const loadStats = async (id: string) => {
  try {
    const { data } = await api.post('/courses/record/experimentRecordInfo', {
      cId: getCurriculumId(),
      eId: id
    })
    const rows = Array.isArray(data?.tbRecordInfo) ? data.tbRecordInfo : []
    if (data?.flag === 1 && rows.length) {
      const last = rows[rows.length - 1] || {}
      stats.value = {
        totalVisits: Number(last.browseCount) || 0,
        totalPractice: Number(last.operateCount) || 0,
        newVisits: Number(last.browseNum) || 0,
        newPractice: Number(last.operateNum) || 0,
        cumulativeVisits: rows.map((item: any) => ({ date: item.highchartsDate, count: Number(item.browseCount) || 0 })),
        cumulativePractice: rows.map((item: any) => ({ date: item.highchartsDate, count: Number(item.operateCount) || 0 })),
        dailyVisits: rows.map((item: any) => ({ date: item.highchartsDate, count: Number(item.browseNum) || 0 })),
        dailyPractice: rows.map((item: any) => ({ date: item.highchartsDate, count: Number(item.operateNum) || 0 }))
      }
      await nextTick()
      renderCharts()
      return
    }
  } catch { /* fall back to the newer endpoint */ }

  try {
    const { data: d } = await api.get(`/courses/experiments/${id}/stats/`)
    if (d) {
      stats.value = {
        totalVisits: d.totalVisits || 0,
        totalPractice: d.totalPractice || 0,
        newVisits: d.newVisits || 0,
        newPractice: d.newPractice || 0,
        cumulativeVisits: d.cumulativeVisits || [],
        cumulativePractice: d.cumulativePractice || [],
        dailyVisits: d.dailyVisits || [],
        dailyPractice: d.dailyPractice || []
      }
      await nextTick()
      renderCharts()
    }
  } catch { /* ignore stats error */ }
}

const renderCharts = () => {
  if (activeTab.value !== 'analysis') return
  drawLineChart(cumVisitsCanvas.value, stats.value.cumulativeVisits, '#e53935')
  drawLineChart(cumPracticeCanvas.value, stats.value.cumulativePractice, '#64a21f')
  drawLineChart(dailyVisitsCanvas.value, stats.value.dailyVisits, '#e53935')
  drawLineChart(dailyPracticeCanvas.value, stats.value.dailyPractice, '#64a21f')
}

const drawLineChart = (canvas: HTMLCanvasElement | null, data: any[], color: string) => {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  const parent = canvas.parentElement
  const parentStyle = parent ? window.getComputedStyle(parent) : null
  const parentPadding = parentStyle
    ? (parseFloat(parentStyle.paddingLeft) || 0) + (parseFloat(parentStyle.paddingRight) || 0)
    : 0
  const cssWidth = Math.max(260, (parent?.clientWidth || 560) - parentPadding)
  const cssHeight = 260
  canvas.width = cssWidth * dpr
  canvas.height = cssHeight * dpr
  canvas.style.width = `${cssWidth}px`
  canvas.style.height = `${cssHeight}px`
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, cssWidth, cssHeight)

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, cssWidth, cssHeight)

  if (!data || data.length === 0) {
    ctx.fillStyle = '#999'
    ctx.font = '14px Microsoft YaHei, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('暂无数据', cssWidth / 2, cssHeight / 2)
    return
  }

  const values = data.map((item: any) => Number(item.count) || 0)
  const dates = data.map((item: any) => String(item.date || '').slice(-5))
  let dataMin = Math.min(...values)
  let dataMax = Math.max(...values)
  if (dataMin === dataMax) {
    dataMin = Math.max(0, dataMin - 2)
    dataMax += 2
  }

  let range = dataMax - dataMin
  if (range < 4) {
    const center = (dataMin + dataMax) / 2
    dataMin = Math.max(0, Math.floor(center - 2))
    dataMax = Math.max(4, Math.ceil(center + 2))
    range = dataMax - dataMin
  }

  const chartMin = Math.max(0, dataMin - range * 0.1)
  const chartMax = dataMax + range * 0.15
  let tickStep = Math.ceil((chartMax - chartMin) / 4)
  if (tickStep <= 0) tickStep = 1
  const axisMin = Math.max(0, Math.floor(chartMin / tickStep) * tickStep)
  let axisMax = Math.ceil(chartMax / tickStep) * tickStep
  if (axisMax - axisMin < 4 * tickStep) axisMax = axisMin + 4 * tickStep
  const axisRange = axisMax - axisMin || 1

  const pad = { top: 36, right: 24, bottom: 38, left: 56 }
  const chartWidth = cssWidth - pad.left - pad.right
  const chartHeight = cssHeight - pad.top - pad.bottom
  const pointX = (index: number) => pad.left + chartWidth * index / Math.max(values.length - 1, 1)
  const pointY = (value: number) => pad.top + chartHeight - chartHeight * (value - axisMin) / axisRange

  ctx.strokeStyle = '#e6e9f0'
  ctx.lineWidth = 1
  ctx.fillStyle = '#777'
  ctx.font = '12px Microsoft YaHei, sans-serif'
  ctx.textAlign = 'right'
  for (let i = 0; i <= 4; i++) {
    const tick = axisMin + axisRange * i / 4
    const y = pad.top + chartHeight - chartHeight * (tick - axisMin) / axisRange
    ctx.beginPath()
    ctx.moveTo(pad.left, y)
    ctx.lineTo(cssWidth - pad.right, y)
    ctx.stroke()
    ctx.fillText(String(Math.round(tick)), pad.left - 8, y + 4)
  }

  const gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartHeight)
  gradient.addColorStop(0, `${color}30`)
  gradient.addColorStop(1, `${color}06`)
  ctx.beginPath()
  values.forEach((value, index) => {
    const x = pointX(index)
    const y = pointY(value)
    if (index === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  })
  ctx.lineTo(pointX(values.length - 1), pad.top + chartHeight)
  ctx.lineTo(pointX(0), pad.top + chartHeight)
  ctx.closePath()
  ctx.fillStyle = gradient
  ctx.fill()

  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  values.forEach((value, index) => {
    const x = pointX(index)
    const y = pointY(value)
    if (index === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  })
  ctx.stroke()

  values.forEach((value, index) => {
    const x = pointX(index)
    const y = pointY(value)
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
    ctx.fillStyle = '#333'
    ctx.font = 'bold 12px Microsoft YaHei, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(String(value), x, Math.max(14, y - 10))
  })

  ctx.fillStyle = '#777'
  ctx.font = '12px Microsoft YaHei, sans-serif'
  ctx.textAlign = 'center'
  dates.forEach((date, index) => {
    ctx.fillText(date, pointX(index), cssHeight - 12)
  })
}

const startExperiment = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    if (confirm('您尚未登录，是否前往登录？')) {
      router.push({ path: '/login', query: { redirect: route.fullPath } })
    }
    return
  }

  const id = experiment.value?.id || getExperimentId()
  entering.value = true
  try {
    await api.post(`/courses/experiments/${id}/record-practice/`, { curriculumId: getCurriculumId() })
  } catch { /* entering experiment should not be blocked by stats recording */ }

  try {
    const { data: res } = await api.post(`/courses/experiments/${id}/yqpath/`)
    if (res.code !== 0) {
      const message = String(res.message || '').trim()
      if (message.startsWith('wsId:')) {
        maintenanceDialogVisible.value = true
      } else {
        toast(message || '进入实验失败', 'error')
      }
      return
    }
    let yqUrl: string = String(res.details?.resultUrl || '').trim()
    if (!yqUrl) {
      maintenanceDialogVisible.value = true
      return
    }
    const internalHosts = [
      'http://58.56.66.170:8181', 'https://58.56.66.170:8181',
      'http://58.56.66.170', 'https://58.56.66.170'
    ]
    for (const h of internalHosts) {
      if (yqUrl.indexOf(h) === 0) { yqUrl = yqUrl.substring(h.length); break }
    }
    // The platform may return an absolute URL, /webclient/... or webclient/....
    // Resolve all three forms against the public cloud-rendering domain.
    const appKey = res.details?.appKey || ''
    const finalUrl = new URL(yqUrl, 'https://yq.keming365.com')
    if (appKey && !finalUrl.searchParams.has('appKey')) finalUrl.searchParams.set('appKey', appKey)
    if (res.details?.timestamp && !finalUrl.searchParams.has('timestamp')) finalUrl.searchParams.set('timestamp', res.details.timestamp)
    if (res.details?.token && !finalUrl.searchParams.has('signature')) finalUrl.searchParams.set('signature', res.details.token)
    window.open(finalUrl.toString(), '_blank')
    await loadStats(String(id))
  } catch (e: any) {
    toast(e.message || '进入实验失败', 'error')
  } finally {
    entering.value = false
  }
}

onMounted(loadExperiment)
watch(() => route.fullPath, loadExperiment)
watch(activeTab, async (tab) => {
  if (tab === 'analysis') {
    await nextTick()
    renderCharts()
  }
})
</script>

<style lang="scss" scoped>
.experiment-page { background: #f4f4f4; min-height: 60vh; }
.maintenance-backdrop { position: fixed; z-index: 1200; inset: 0; display: grid; place-items: center; padding: 24px; background: rgba(0, 0, 0, .42); }
.maintenance-dialog { width: min(380px, 100%); border-radius: 6px; overflow: hidden; background: #fff; box-shadow: 0 18px 56px rgba(0, 0, 0, .24); }
.maintenance-dialog h2 { margin: 0; padding: 16px 20px; border-bottom: 1px solid #ececec; color: #333; font-size: 18px; text-align: center; }
.maintenance-dialog p { margin: 0; padding: 24px 24px 18px; color: #555; font-size: 15px; line-height: 1.8; text-align: center; }
.maintenance-actions { display: flex; justify-content: center; padding: 4px 24px 22px; }
.maintenance-actions button { min-width: 88px; height: 34px; border: 0; border-radius: 4px; background: #2f7cee; color: #fff; font-size: 14px; cursor: pointer; }
.maintenance-actions button:hover { background: #2367d8; }
.container { max-width: 1200px; margin: 0 auto; padding: 20px 0 32px; }
.loading { text-align: center; padding: 80px; color: #888;
  .spinner { display: inline-block; width: 36px; height: 36px; border: 3px solid #e0e0e0; border-top-color: #2f7cee; border-radius: 50%; animation: spin .8s linear infinite; margin-bottom: 12px; }
}
@keyframes spin { to { transform: rotate(360deg); } }
.empty { text-align: center; padding: 80px 20px; color: #888; background: #fff; .icon { font-size: 32px; margin-bottom: 12px; } }

.exp-hero {
  min-height: 295px;
  margin: 0 0 26px;
  background-color: #2265d8;
  background-image: linear-gradient(90deg, #184baf 0%, #347fea 52%, #58b1ff 100%);
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  overflow: hidden;
}
.hero-inner { width: 100%; padding: 54px 24px 48px; }
.hero-inner h1 { margin: 0 0 18px; font-size: 32px; line-height: 1.35; font-weight: 700; }
.publisher { font-size: 14px; margin-bottom: 28px; }
.publisher span { opacity: .95; }
.btn-enter {
  min-width: 150px;
  height: 36px;
  padding: 0 30px;
  border: 0;
  border-radius: 18px;
  background: #fff;
  color: #2367d8;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 22px rgba(0, 43, 130, .22);
  &:hover { background: #f5f9ff; }
  &:disabled { opacity: .65; cursor: not-allowed; }
}

.exp-tabs-wrap { background: #fff; padding: 0 0 30px; overflow: hidden; }
.exp-tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
  padding: 0 24px;
  .tab-btn {
    appearance: none;
    border: 0;
    background: transparent;
    padding: 14px 22px;
    font-size: 15px;
    color: #555;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    &:hover { color: #2f7cee; }
    &.active { color: #2f7cee; border-bottom-color: #2f7cee; font-weight: 600; }
  }
}
.tab-panel { padding: 24px; box-sizing: border-box; }

.stats-row { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-bottom: 24px; }
.stat-box {
  min-height: 86px;
  padding: 16px;
  border: 1px solid #e8edf6;
  background: #f8fbff;
  text-align: center;
  .stat-label { font-size: 13px; color: #666; }
  .stat-value { font-size: 30px; font-weight: 700; color: #2f7cee; margin-top: 8px; }
}
.charts-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px; width: 100%; box-sizing: border-box; }
.chart-box { min-width: 0; border: 1px solid #e3e6ee; background: #fff; padding: 14px; box-sizing: border-box; overflow: hidden; }
.chart-title { font-size: 15px; font-weight: 600; color: #333; margin-bottom: 10px; }
.chart-box canvas { max-width: 100%; display: block; }

.overview { max-width: 1000px; color: #333; }
.overview h2 { font-size: 22px; color: #1f3f8f; margin: 0 0 14px; }
.overview p { font-size: 15px; color: #555; line-height: 1.9; white-space: pre-line; }
.overview-meta { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 22px; }
.overview-meta div { border: 1px solid #e5e9f2; padding: 12px 14px; background: #fafcff; }
.overview-meta dt { font-size: 12px; color: #888; margin-bottom: 6px; }
.overview-meta dd { margin: 0; font-size: 14px; color: #333; word-break: break-all; }

@media (max-width: 768px) {
  .container { padding: 14px 12px 24px; }
  .exp-hero { min-height: 220px; }
  .hero-inner h1 { font-size: 23px; }
  .stats-row, .charts-grid, .overview-meta { grid-template-columns: 1fr; }
  .exp-tabs { padding: 0 12px; }
  .tab-panel { padding: 16px 12px; }
}
</style>
