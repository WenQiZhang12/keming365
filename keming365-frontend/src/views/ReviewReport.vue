<template>
  <div class="review-page">
    <div class="container">
      <div class="breadcrumb">
        <router-link to="/">首页</router-link> &gt;
        <router-link :to="canReview ? '/teacher-reports' : '/student-reports'">
          {{ canReview ? '教师报告' : '我的报告' }}
        </router-link> &gt;
        <span>{{ canReview ? '评阅报告' : '查看报告' }}</span>
      </div>

      <div v-if="loading" class="loading">
        <div class="spinner"></div>加载中...
      </div>

      <div v-else-if="error" class="empty">
        <div class="icon">😵</div>
        <p>{{ error }}</p>
      </div>

      <template v-else-if="report">
        <div class="report-header">
          <h1>📋 {{ report.experimentName || '实验报告' }}</h1>
          <p>学生：{{ report.studentName || '-' }} | 时间：{{ formatDate(report.createTime || '') }}</p>
        </div>

        <div class="report-grid">
          <div class="main-content">
            <div class="section-block">
              <h3>实验报告文件</h3>
              <iframe
                v-if="reportPreviewUrl"
                class="report-frame"
                :src="reportPreviewUrl"
                title="实验报告预览"
              />
              <div v-else-if="fileLoading" class="file-empty">报告文件加载中...</div>
              <div v-else class="file-empty">报告文件不可用</div>
              <a v-if="reportPreviewUrl" class="open-file" :href="reportPreviewUrl" target="_blank" rel="noopener">
                在新窗口打开报告
              </a>
            </div>

            <div v-if="canReview" class="action-bar">
              <h3>报告评分</h3>
              <div class="action-buttons">
                <input v-model.number="newScore" type="number" min="0" max="100" class="score-input" placeholder="分数">
                <button class="btn-pass" @click="submitReview">保存评分</button>
              </div>
            </div>
          </div>

          <div class="sidebar">
            <h3>📊 报告信息</h3>
            <div class="info-card">
              <div class="info-row"><span>报告ID</span><b>{{ report.id }}</b></div>
              <div class="info-row"><span>学生</span><b>{{ report.studentName || '-' }}</b></div>
              <div class="info-row"><span>班级</span><b>{{ report.className || '-' }}</b></div>
              <div class="info-row"><span>课程</span><b>{{ report.curriculumName || '-' }}</b></div>
              <div class="info-row"><span>实验</span><b>{{ report.experimentName || '-' }}</b></div>
              <div class="info-row"><span>提交时间</span><b>{{ formatDate(report.createTime || '') }}</b></div>
              <div class="info-row"><span>上传次数</span><b>{{ report.uploadNum || 0 }}</b></div>
              <div class="info-row"><span>得分</span><b class="big">{{ report.status === 1 ? report.reportScore : '待评' }}</b></div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api'
import { formatDate, hasAdminAccess, toast } from '@/utils'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const report = ref<any>(null)
const loading = ref(true)
const error = ref('')
const newScore = ref<number | null>(null)
const fileLoading = ref(false)
const reportPreviewUrl = ref('')
const canReview = computed(() => hasAdminAccess(userStore.user))

const clearReportPreview = () => {
  if (reportPreviewUrl.value) URL.revokeObjectURL(reportPreviewUrl.value)
  reportPreviewUrl.value = ''
}

const loadReportFile = async (fileUrl: string) => {
  clearReportPreview()
  if (!fileUrl) return
  fileLoading.value = true
  try {
    const { data } = await api.get<Blob>(fileUrl, { responseType: 'blob' })
    reportPreviewUrl.value = URL.createObjectURL(data)
  } catch (e: any) {
    toast(e.message || '报告文件加载失败', 'error')
  } finally {
    fileLoading.value = false
  }
}

const loadReport = async () => {
  const id = (route.query.id || route.params.id) as string
  if (!id) { error.value = '缺少报告ID'; loading.value = false; return }

  loading.value = true
  error.value = ''
  try {
    const { data } = await api.get(`/scores/reports/${id}/`)
    report.value = data
    newScore.value = data.status === 1 ? Number(data.reportScore) : null
    await loadReportFile(data.fileUrl || '')
    document.title = `${canReview.value ? '评阅' : '查看'}报告 - 科明365VR教学云平台`
  } catch (e: any) {
    error.value = e.message || '请求失败'
  } finally {
    loading.value = false
  }
}

const submitReview = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    toast('请先登录', 'error')
    router.push('/login')
    return
  }
  if (!canReview.value) {
    toast('仅教师或管理员可批阅报告', 'error')
    return
  }
  if (newScore.value == null || newScore.value < 0 || newScore.value > 100) {
    toast('请输入0到100之间的分数', 'error')
    return
  }
  try {
    await api.post(`/scores/reports/${report.value.id}/review/`, {
      score: newScore.value
    })
    toast('评分已保存', 'success')
    router.push('/teacher-reports')
  } catch (e: any) {
    toast(e.message || '评阅失败', 'error')
  }
}

onMounted(async () => {
  if (!userStore.token && !localStorage.getItem('token')) {
    router.replace({ path: '/login', query: { redirect: route.fullPath } })
    return
  }
  if (!userStore.user) await userStore.fetchUser()
  loadReport()
})
watch(() => route.query.id || route.params.id, loadReport)
onBeforeUnmount(clearReportPreview)
</script>

<style lang="scss" scoped>
.review-page { background: #f5f6fa; min-height: 60vh; }
.container { max-width: 1200px; margin: 0 auto; padding: 20px; }
.breadcrumb { font-size: 13px; color: #999; margin-bottom: 16px; a { color: #1a237e; } }

.loading { text-align: center; padding: 80px; color: #999;
  .spinner { display: inline-block; width: 36px; height: 36px; border: 3px solid #e0e0e0; border-top-color: #1a237e; border-radius: 50%; animation: spin .8s linear infinite; margin-bottom: 12px; }
}
@keyframes spin { to { transform: rotate(360deg); } }
.empty { text-align: center; padding: 80px 20px; color: #999; .icon { font-size: 48px; margin-bottom: 12px; } }

.report-header { text-align: center; padding: 30px 20px;
  h1 { font-size: 26px; color: #1a237e; margin-bottom: 8px; }
  p { font-size: 14px; color: #999; }
}

.report-grid { display: grid; grid-template-columns: 1fr 300px; gap: 24px; align-items: start;
  @media(max-width: 900px) { grid-template-columns: 1fr; }
}

.main-content { background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,.06); }
.section-block { margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #eef0f4; &:last-child { border-bottom: none; }
  h3 { font-size: 17px; color: #1a237e; margin-bottom: 12px; }
}
.report-frame { width: 100%; min-height: 680px; border: 1px solid #dfe4ed; background: #f7f8fa; }
.file-empty { padding: 80px 20px; color: #999; text-align: center; background: #f7f8fa; }
.open-file { display: inline-block; margin-top: 12px; color: #1a237e; font-size: 13px; }

.action-bar { background: #fafbff; padding: 16px; border-radius: 8px; margin-top: 16px;
  h3 { margin: 0 0 12px; color: #1a237e; font-size: 16px; }
  .action-buttons { display: flex; gap: 8px;
    .score-input { padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; width: 80px; }
    .btn-pass { padding: 8px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; color: #fff; background: #67c23a; }
  }
}

.sidebar { background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,.06);
  h3 { font-size: 16px; color: #1a237e; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid #eef0f4; }
  .info-card { .info-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 13px; span { color: #999; } b { color: #333; } .big { font-size: 16px; color: #1a237e; } } }
}
</style>
