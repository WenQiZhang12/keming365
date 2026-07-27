<template>
  <div class="courses-page">
    <section v-if="showCategoryBanner" class="category-banner" :aria-label="categoryBannerAlt">
      <img
        :src="categoryBannerUrl"
        :alt="categoryBannerAlt"
        width="1900"
        height="320"
        @error="failedCategoryBannerUrl = categoryBannerUrl"
      />
    </section>
    <div class="page-wrap">
    <form v-if="isHomeSearchResult" class="result-search" @submit.prevent="doSearch">
      <Search :size="19" aria-hidden="true" />
      <input v-model="searchText" type="search" placeholder="请输入学习资源名称" aria-label="搜索学习资源" autocomplete="off" />
      <button type="submit" :disabled="!searchText.trim()">搜索</button>
    </form>
    <!-- 实验类型切换标签 -->
    <div class="exp-type-tabs" :class="{ 'special-vr-tabs': isSpecialVrCurriculum }" v-if="showExpTypeTabs">
      <template v-if="isSpecialVrCurriculum">
        <div class="special-course-bar">
          <div class="special-course-title">{{ displayCurriculumName }}</div>
          <div class="resource-mode-btns">
            <button :class="['resource-mode-btn', { active: state.resourceMode === 'ai' }]" @click="switchResourceMode('ai')">AI+VR课程智能体</button>
            <button :class="['resource-mode-btn', { active: state.resourceMode === 'vr' }]" @click="switchResourceMode('vr')">VR资源库</button>
            <button :class="['resource-mode-btn', { active: state.resourceMode === 'knowledge' }]" type="button" @click="switchResourceMode('knowledge')">知识图谱</button>
          </div>
        </div>
        <div class="vr-sub-tabs" v-if="state.resourceMode === 'vr'">
          <div :class="['exp-type-tab', { active: state.expType === '0' }]" @click="switchExpType('0')">实验教学</div>
          <div :class="['exp-type-tab', { active: state.expType === '1' }]" @click="switchExpType('1')">课堂教学</div>
          <div :class="['exp-type-tab', { active: state.expType === '3' }]" @click="switchExpType('3')">教学模型</div>
        </div>
      </template>
      <template v-else>
        <div :class="['exp-type-tab', { active: state.expType === '0' && state.resourceMode === 'vr', disabled: state.resourceMode === 'ai' }]" @click="state.resourceMode === 'vr' && switchExpType('0')">实验教学</div>
        <div :class="['exp-type-tab', { active: state.expType === '1' && state.resourceMode === 'vr', disabled: state.resourceMode === 'ai' }]" @click="state.resourceMode === 'vr' && switchExpType('1')">课堂教学</div>
        <div v-if="state.classifyId != '50' && state.classifyId != 50"
          :class="['exp-type-tab', { active: state.expType === '3' && state.resourceMode === 'vr', disabled: state.resourceMode === 'ai' }]" @click="state.resourceMode === 'vr' && switchExpType('3')">教学模型</div>
      </template>
    </div>
    <div class="course-grid" :class="{ 'ai-vr-layout': (state.resourceMode === 'ai' || state.resourceMode === 'knowledge') && state.viewMode === 'experiments' && state.curriculumId && isSpecialVrCurriculum }">
      <!-- 加载中 -->
      <div v-if="loading" class="loading"><div class="spinner"></div>加载中...</div>
      <!-- 空状态 -->
      <div v-else-if="isEmpty" class="empty"><div class="icon">📭</div><p>{{ emptyText }}</p></div>
      <!-- AI+VR模式 -->
      <template v-else-if="state.resourceMode === 'ai' && state.viewMode === 'experiments' && state.curriculumId && isSpecialVrCurriculum">
        <AiVrView :curriculum-name="currentCurriculumName" />
      </template>
      <template v-else-if="state.resourceMode === 'knowledge' && state.viewMode === 'experiments' && state.curriculumId">
        <section class="knowledge-panel">
          <div class="knowledge-title">知识图谱</div>
          <iframe class="knowledge-frame" :src="knowledgeGraphUrl" title="知识图谱"></iframe>
        </section>
      </template>
      <!-- 课程卡片 -->
      <template v-else-if="state.viewMode === 'curricula'">
        <div v-for="c in curriculaCards" :key="c.id" class="curriculum-section">
          <div class="curriculum-header">
            <span class="curriculum-icon">🎓</span>
            <span class="curriculum-name">{{ c.curriculumName }}</span>
            <span class="curriculum-more" @click="showExperiments(c.id, c.curriculumName)">更多 →</span>
          </div>
          <div v-if="c.expsLoading" class="loading mini"><div class="spinner small"></div>加载中...</div>
          <div v-else class="curriculum-exp-grid">
            <div v-for="exp in c.exps" :key="exp.id" class="exp-card" @click="goExperiment(exp.id, c.curriculumName, 'curriculum')">
              <div class="exp-card-thumb">
                <img v-if="getImageUrl(exp.image || '')" :src="getImageUrl(exp.image || '')" loading="lazy" />
                <span v-else style="font-size:36px">🔬</span>
              </div>
              <p class="exp-card-title" :title="exp.title">{{ exp.title }}</p>
              <p class="exp-card-pub">科明数码</p>
            </div>
          </div>
        </div>
      </template>
      <!-- 教学模型沿用旧版目录展示，不进入实验详情 -->
      <template v-else-if="state.viewMode === 'experiments' && state.resourceMode === 'vr' && state.expType === '3' && isDrawingCurriculum">
        <div class="teaching-model-list" aria-label="教学模型列表">
          <div v-for="exp in state.items" :key="exp.id" class="teaching-model-item">
            <BookOpen :size="19" stroke-width="2.2" aria-hidden="true" />
            <span>{{ exp.title }}</span>
          </div>
        </div>
      </template>
      <!-- 实验卡片 -->
      <template v-else-if="state.viewMode === 'experiments'">
        <div v-for="exp in state.items" :key="exp.id" class="course-card" @click="goExperiment(exp.id, exp.fromName || '', exp.fromParam || '')">
          <div class="thumb">
            <img v-if="exp.imageUrl" :src="exp.imageUrl" @error="hideBrokenImage" />
            <span v-else class="fallback">🔬</span>
          </div>
          <div class="body">
            <h3>{{ exp.title }}</h3>
            <div class="meta"><span>{{ exp.publisher }}</span></div>
          </div>
        </div>
      </template>
    </div>
    <!-- 分页 -->
    <Pagination
      v-if="showPagination"
      class="courses-pagination"
      :page="state.page"
      :total="state.total"
      :page-size="PAGE_SIZE"
      @update:page="goPage"
    />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { BookOpen, Search } from '@lucide/vue'
import { getCurriculumClassifies, getCurricula, getExperiments, getCurriculumDetail } from '@/api'
import { getImageUrl } from '@/utils'
import type { Classify, Curriculum, Experiment } from '@/types'
import AiVrView from '@/components/AiVrView.vue'
import Pagination from '@/components/Pagination.vue'

const route = useRoute()
const router = useRouter()
const PAGE_SIZE = 12
const CLASSIFY_ORDER: Record<string, number> = {
  '机械工程': 1, '工程训练': 2, '力学': 3, '土木工程': 4, '装配式建筑': 5,
  '大学物理': 6, '能源动力': 7, '水利工程': 8, '生物工程': 9, '文化艺术': 10, '航海类': 11, '学前教育/康养': 12
}
const CLASSIFY_BANNER_BY_NAME: Record<string, string> = {
  '机械工程': 'lx01.png',
  '工程训练': 'lx03.png',
  '力学': 'lx02.png',
  '土木工程': 'lx05.png',
  '装配式建筑': 'lx11.png',
  '大学物理': 'lx04.png',
  '能源动力': 'lx08.png',
  '水利工程': 'lx07.png',
  '生物工程': 'lx06.png',
  '文化艺术': 'lx09.png',
  '航海类': 'lx12.png',
  '学前教育/康养': 'lx13.png'
}
const CLASSIFY_BANNER_BY_ID: Record<string, string> = {
  '1': 'lx01.png', '2': 'lx02.png', '3': 'lx03.png', '4': 'lx04.png',
  '5': 'lx05.png', '6': 'lx06.png', '7': 'lx07.png', '8': 'lx08.png',
  '9': 'lx09.png', '11': 'lx11.png', '12': 'lx12.png', '13': 'lx13.png'
}

interface CurriculumCard extends Curriculum { exps: { id: string | number; title: string; image?: string }[]; expsLoading: boolean }
interface ExpItem extends Experiment { imageUrl?: string; fromName?: string; fromParam?: string }

const loading = ref(false)
const isEmpty = ref(false)
const emptyText = ref('')
const searchText = ref('')
const showSearch = ref(true)
const navBreadcrumb = ref('')
const showExpTypeTabs = ref(false)
const classifies = ref<Classify[]>([])
const curriculaCards = ref<CurriculumCard[]>([])
const failedCategoryBannerUrl = ref('')

const state = reactive({
  classifyId: '' as string | number,
  curriculumId: '' as string | number,
  viewMode: 'curricula' as 'curricula' | 'experiments',
  page: 1, search: '', expType: '0', resourceMode: 'vr' as 'vr' | 'ai' | 'knowledge',
  items: [] as ExpItem[], total: 0
})

let lastClassifyId: string | number = ''
let currentCurriculumName = ref('')
let currentCurriculumId: string | number = ''
let fromClassifyDirectly = false
const courseDisplayName = (name: string) => name === '工程机械' ? '工程训练' : name
const displayCurriculumName = computed(() => courseDisplayName(currentCurriculumName.value))
const currentClassify = computed(() => classifies.value.find(item => item.id == state.classifyId))
const currentClassifyName = computed(() => currentClassify.value?.className || '')
const categoryBannerUrl = computed(() => {
  if (!state.classifyId || state.search) return ''
  const fileName = CLASSIFY_BANNER_BY_NAME[currentClassifyName.value]
    || CLASSIFY_BANNER_BY_ID[String(state.classifyId)]
  return fileName ? `https://www.keming365.com/img/${fileName}` : ''
})
const showCategoryBanner = computed(() => (
  Boolean(categoryBannerUrl.value) && failedCategoryBannerUrl.value !== categoryBannerUrl.value
))
const categoryBannerAlt = computed(() => (
  currentClassifyName.value ? `${currentClassifyName.value}课程分类横幅` : '课程分类横幅'
))

const totalPages = computed(() => Math.ceil(state.total / PAGE_SIZE))

const specialVrCurriculumNames = ['画法几何与机械制图', '液压与气压传动', '工程机械', '工程训练']
const isDrawingCurriculum = computed(() => currentCurriculumName.value.includes('画法几何与机械制图'))
const isSpecialVrCurriculum = computed(() => {
  if (state.viewMode !== 'experiments' || !state.curriculumId) return false
  const name = currentCurriculumName.value || ''
  return specialVrCurriculumNames.some(item => name.includes(item))
})
const knowledgeGraphUrl = computed(() => {
  const name = currentCurriculumName.value || ''
  let lessonId = 2
  if (name.includes('液压与气压传动')) lessonId = 1
  else if (name.includes('工程机械') || name.includes('工程训练')) lessonId = 12
  return `/sdxx/knowledge-graph.html?lessonId=${lessonId}`
})
const showPagination = computed(() => {
  if (totalPages.value <= 1) return false
  if (state.resourceMode === 'ai' || state.resourceMode === 'knowledge') return false
  if (state.viewMode === 'experiments' && state.expType === '3' && isDrawingCurriculum.value) return false
  return true
})
const isHomeSearchResult = computed(() => route.query.from === 'home-search')

function doSearch() {
  const keyword = searchText.value.trim()
  if (!keyword) return
  state.search = keyword
  searchText.value = keyword
  state.page = 1
  state.curriculumId = ''
  state.viewMode = 'experiments'
  showExpTypeTabs.value = false
  void router.replace({ path: '/qbkc', query: { search: keyword, from: 'home-search' } })
  loadContent()
}

// === 导航 ===
function showExperiments(curriculumId: string | number, curriculumName: string, fromDirectly = false) {
  lastClassifyId = state.classifyId
  state.curriculumId = curriculumId
  currentCurriculumId = curriculumId
  currentCurriculumName.value = curriculumName || '课程详情'
  state.viewMode = 'experiments'
  state.page = 1
  state.expType = '0'
  state.resourceMode = 'vr'
  fromClassifyDirectly = fromDirectly
  if (fromClassifyDirectly) {
    navBreadcrumb.value = `<a href="javascript:;" onclick="return false">← 返回分类</a> &gt; <span>${displayCurriculumName.value}</span>`
  } else {
    navBreadcrumb.value = `<a href="javascript:;" onclick="return false">返回课程列表</a> &gt; <span>${displayCurriculumName.value}</span>`
  }
  showSearch.value = false
  loadContent()
}

function backToClassifies() {
  router.push('/')
}

function backToCurricula() {
  if (!lastClassifyId) {
    router.push('/')
    return
  }
  state.curriculumId = ''
  state.page = 1
  state.classifyId = lastClassifyId
  state.viewMode = 'curricula'
  navBreadcrumb.value = '<a href="javascript:;" onclick="return false">← 返回首页</a>'
  showSearch.value = false
  showExpTypeTabs.value = false
  loadContent()
}

// === 模式切换 ===
function switchResourceMode(mode: 'vr' | 'ai' | 'knowledge') {
  if ((mode === 'ai' || mode === 'knowledge') && !isSpecialVrCurriculum.value) return
  if (state.resourceMode === mode) return
  state.resourceMode = mode
  if (mode !== 'vr') {
    loading.value = false
    isEmpty.value = false
    return
  }
  if (state.items.length === 0) loadContent()
}
function switchExpType(type: string) {
  if (state.expType === type && state.resourceMode === 'vr') return
  state.expType = type
  state.page = 1
  if (state.resourceMode === 'vr' && state.viewMode === 'experiments') {
    isEmpty.value = false
    loadExperiments()
    return
  }
  loadContent()
}

// === 统一加载 ===
async function loadContent() {
  loading.value = true
  isEmpty.value = false
  if (state.search) { await loadExperiments(); loading.value = false; return }
  if (state.curriculumId && state.viewMode === 'experiments') await loadExperiments()
  else if (state.classifyId && state.viewMode === 'experiments') await loadExperiments()
  else if (state.classifyId && state.viewMode === 'curricula') await loadCurricula()
  else { await router.replace('/') }
  loading.value = false
}

async function loadClassifies() {
  try {
    const list = await getCurriculumClassifies()
    list.sort((a, b) => (CLASSIFY_ORDER[a.className] || 999) - (CLASSIFY_ORDER[b.className] || 999))
    classifies.value = list
  } catch {
    classifies.value = []
  }
}

function hideBrokenImage(event: Event) {
  if (event.target instanceof HTMLImageElement) event.target.style.display = 'none'
}

// === 加载课程列表 ===
async function loadCurricula() {
  showExpTypeTabs.value = false
  try {
    const params: any = { page: state.page, page_size: PAGE_SIZE }
    if (state.classifyId) params.classifyId = state.classifyId
    if (state.search) params.search = state.search
    const d = await getCurricula(params)
    const items = d.results || []
    state.total = d.count || 0
    // 单课程自动跳过
    if (items.length === 1 && state.total === 1) {
      loading.value = false
      showExperiments(items[0].id, items[0].curriculumName, true)
      return
    }
    navBreadcrumb.value = '<a href="javascript:;" onclick="return false">← 返回分类</a>'
    const cards: CurriculumCard[] = items.map(c => reactive({ ...c, exps: [], expsLoading: true }))
    curriculaCards.value = cards
    // 异步加载每个课程的实验预览（实验教学不够5个用课堂教学补）
    cards.forEach(async (card, idx) => {
      try {
        const ed0 = await getExperiments({ curriculumId: card.id, page_size: 5, type: '0' })
        let exps = (ed0.results || []).map(e => ({ id: e.id, title: e.title || '', image: e.image || '' }))
        if (exps.length < 5) {
          const ed1 = await getExperiments({ curriculumId: card.id, page_size: 5 - exps.length, type: '1' })
          exps = exps.concat((ed1.results || []).map(e => ({ id: e.id, title: e.title || '', image: e.image || '' })))
        }
        card.exps = exps
      } catch { card.exps = [] }
      finally { card.expsLoading = false }
    })
  } catch (e: any) {
    isEmpty.value = true; emptyText.value = '加载失败：' + (e.message || '')
  }
}

// === 加载实验列表 ===
async function loadExperiments() {
  try {
    const params: any = {
      page: state.page,
      page_size: state.expType === '3' && isDrawingCurriculum.value ? 100 : PAGE_SIZE
    }
    if (state.search) params.search = state.search
    if (state.classifyId && !state.curriculumId) params.classifyId = state.classifyId
    if (state.curriculumId) params.curriculumId = state.curriculumId
    if (state.expType !== undefined && state.expType !== '') params.type = state.expType
    const d = await getExperiments(params)
    const fromName = state.curriculumId ? currentCurriculumName.value : (state.classifyId ? '分类实验' : '全部课程')
    const fromParam = state.curriculumId ? 'curriculum' : (state.classifyId ? 'classify' : 'courses')
    state.items = (d.results || []).map(e => ({
      ...e, imageUrl: getImageUrl(e.image || ''),
      fromName, fromParam
    }))
    state.total = d.count || 0
    // 面包屑
    if (state.curriculumId) {
      navBreadcrumb.value = `<a href="javascript:;" onclick="return false">返回课程列表</a> &gt; <span>${displayCurriculumName.value}</span>`
    } else if (state.classifyId) {
      const cl = classifies.value.find(c => c.id == state.classifyId)
      const name = cl ? cl.className : ''
      navBreadcrumb.value = `<a href="javascript:;" onclick="return false">← 返回分类</a> &gt; <span>${name}</span>`
    }
    showSearch.value = false
    showExpTypeTabs.value = true
  } catch (e: any) {
    isEmpty.value = true; emptyText.value = '加载失败：' + (e.message || '')
  }
}

function goExperiment(id: string | number, fromName: string, fromParam: string) {
  localStorage.setItem('experimentId', String(id))
  localStorage.setItem('experimentFrom', fromParam || 'curriculum')
  localStorage.setItem('experimentFromName', fromName || '')
  if (state.classifyId) localStorage.setItem('experimentClassifyId', String(state.classifyId))
  else localStorage.removeItem('experimentClassifyId')
  router.push('/enterItem')
}

function goPage(p: number) {
  if (p < 1 || p > totalPages.value || p === state.page) return
  state.page = p
  loadContent()
}

// 面包屑点击处理（通过事件委托）
function handleBreadcrumbClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target.tagName === 'A') {
    e.preventDefault()
    const text = target.textContent || ''
    if (text.includes('返回首页')) router.push('/')
    else if (text.includes('返回分类')) backToClassifies()
    else if (text.includes('返回课程列表')) backToCurricula()
  }
}

watch(() => route.fullPath, (currentPath, previousPath) => {
  if (currentPath === previousPath || route.path !== '/qbkc') return
  const urlSearch = route.query.search as string || ''
  if (urlSearch && urlSearch !== state.search) {
    state.search = urlSearch
    searchText.value = urlSearch
    state.page = 1
    state.curriculumId = ''
    state.viewMode = 'experiments'
    showExpTypeTabs.value = false
    loadContent()
    return
  }
  const hasRouteFilter = Boolean(route.query.search || route.query.classifyId || route.query.curriculumId)
  if (!hasRouteFilter) router.replace('/')
})

onMounted(async () => {
  // 监听面包屑点击
  document.addEventListener('click', (e) => {
    const bc = document.querySelector('.nav-bc')
    if (bc && bc.contains(e.target as Node)) handleBreadcrumbClick(e)
  })
  // URL参数处理
  const urlClassify = route.query.classifyId as string || ''
  const urlCurriculum = route.query.curriculumId as string || ''
  const urlSearch = route.query.search as string || ''
  if (urlSearch) {
    state.search = urlSearch; searchText.value = urlSearch
    state.viewMode = 'experiments'
    loadContent()
  } else if (urlCurriculum) {
    await loadClassifies()
    state.classifyId = ''
    state.curriculumId = urlCurriculum
    state.viewMode = 'experiments'
    getCurriculumDetail(urlCurriculum).then(course => {
      state.classifyId = course.classifyId || ''
      lastClassifyId = state.classifyId
      currentCurriculumName.value = course.curriculumName || '课程'
      navBreadcrumb.value = `<a href="javascript:;" onclick="return false">返回课程列表</a> &gt; <span>${displayCurriculumName.value}</span>`
    }).catch(() => {})
    loadContent()
  } else if (urlClassify) {
    await loadClassifies()
    // 先检查分类下是否只有一个课程
    getCurricula({ classifyId: urlClassify, page_size: 2 }).then(d => {
      const curricula = d.results || []
      state.classifyId = urlClassify
      lastClassifyId = urlClassify
      if (curricula.length === 1) {
        state.curriculumId = curricula[0].id
        state.viewMode = 'experiments'
        currentCurriculumName.value = curricula[0].curriculumName || '课程'
        navBreadcrumb.value = `<a href="javascript:;" onclick="return false">← 返回分类</a> &gt; <span>${displayCurriculumName.value}</span>`
        showSearch.value = false
        loadContent()
      } else {
        state.viewMode = 'curricula'
        loadContent()
      }
    }).catch(() => {
      state.classifyId = urlClassify; state.viewMode = 'curricula'; lastClassifyId = urlClassify
      loadContent()
    })
  } else {
    router.replace('/')
  }
})
</script>

<style scoped lang="scss">
.courses-page { flex: 1; width: 100%; min-width: 0; }
.category-banner {
  width: 100%; height: clamp(150px, 16.84vw, 320px); overflow: hidden; background: #173d9d;
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
}
.page-wrap { flex: 1; padding: 24px 40px; max-width: 1200px; margin: 0 auto; width: 100%; }
.result-search {
  width: min(720px, 100%); height: 46px; margin: 0 auto 18px;
  display: flex; align-items: center; overflow: hidden;
  border: 1px solid #d4deeb; border-radius: 6px; background: #fff;
  box-shadow: 0 3px 12px rgba(39, 71, 113, .08);
  > svg { flex: 0 0 auto; margin-left: 15px; color: #7a889b; }
  input {
    min-width: 0; flex: 1; height: 100%; padding: 0 13px;
    border: 0; outline: 0; color: #25324a; background: transparent; font: 14px inherit;
  }
  input::placeholder { color: #9aa6b6; }
  button {
    align-self: stretch; width: 92px; border: 0; background: #1677ff;
    color: #fff; font: 14px inherit; cursor: pointer;
  }
  button:hover:not(:disabled) { background: #0968e8; }
  button:disabled { background: #9fc5f8; cursor: default; }
  &:focus-within { border-color: #1677ff; box-shadow: 0 0 0 2px rgba(22, 119, 255, .12); }
}
.breadcrumb { font-size: 13px; color: #999; margin-bottom: 16px;
  a { color: #1677ff; text-decoration: none; &:hover { text-decoration: underline; } }
}
.nav-bc {
  margin-bottom: 12px;
  :deep(a) { color: #1677ff; text-decoration: none; cursor: pointer; }
  :deep(a:hover) { text-decoration: underline; }
}
.filter-bar { background: #fff; border-radius: 12px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,.06);
  .row { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
  .label { font-size: 13px; color: #666; white-space: nowrap; }
}
.filter-tag { padding: 5px 14px; border-radius: 20px; font-size: 13px; cursor: pointer; border: 1px solid #e0e0e0; background: #fff; color: #666; transition: all .2s;
  &:hover { border-color: #1677ff; color: #1677ff; }
  &.active { background: #1677ff; color: #fff; border-color: #1677ff; }
}
.search-box { display: flex; max-width: 400px;
  input { flex: 1; padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px 0 0 6px; font-size: 13px; outline: none; &:focus { border-color: #1677ff; } }
  button { padding: 8px 14px; background: #1677ff; color: #fff; border: none; border-radius: 0 6px 6px 0; cursor: pointer; font-size: 13px; }
}
.exp-type-tabs { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-bottom: 16px; padding-bottom: 0; }
.resource-mode-btns { display: flex; gap: 8px; margin-right: 20px; }
.resource-mode-btn { padding: 6px 16px; border-radius: 4px; border: 1px solid #1677ff; background: #fff; color: #1677ff; cursor: pointer; font-size: 13px; transition: all .2s;
  &.active { background: #1677ff; color: #fff; }
  &:hover { background: #eaf3ff; }
  &.active:hover { background: #1677ff; }
}
.exp-type-tab { padding: 10px 20px; cursor: pointer; font-size: 14px; color: #666; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all .2s;
  &.active { color: #1677ff; border-bottom-color: #1677ff; font-weight: 600; }
  &.disabled { color: #bbb; cursor: not-allowed; border-bottom-color: transparent; }
}
.special-vr-tabs { display: block; padding-bottom: 0; border-bottom: 0; }
.special-course-bar { display: flex; align-items: center; gap: 34px; margin-bottom: 0; }
.special-course-title { position: relative; padding-left: 14px; font-size: 20px; font-weight: 700; color: #111; white-space: nowrap; }
.special-course-title::before { content: ''; position: absolute; left: 0; top: 4px; width: 5px; height: 22px; background: #5db8ff; }
.vr-sub-tabs { display: flex; align-items: center; gap: 0; }
.special-vr-tabs .resource-mode-btns { margin-right: 0; gap: 34px; }
.special-vr-tabs .resource-mode-btn { min-width: 128px; height: 36px; font-size: 14px; }
.special-vr-tabs .vr-sub-tabs .exp-type-tab { padding: 10px 18px; }
.course-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;
  &.ai-vr-layout { display: block; width: 100%; min-width: 0; padding-top: 8px; }
  &:has(.curriculum-section) { display: block; }
}
.knowledge-panel { background: #fff; border-radius: 8px; padding: 20px; height: 720px; box-sizing: border-box; overflow: hidden; }
.knowledge-title { font-size: 18px; font-weight: 700; color: #333; margin-bottom: 15px; }
.knowledge-frame { width: 100%; height: calc(100% - 35px); border: 0; display: block; }
.teaching-model-list { grid-column: 1 / -1; display: grid; gap: 6px; width: 100%; }
.teaching-model-item {
  box-sizing: border-box;
  min-height: 46px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  gap: 18px;
  border: 1px solid #1677ff;
  border-radius: 8px;
  color: #1677ff;
  background: #f4f8ff;
  font-size: 14px;
  cursor: default;
}
.teaching-model-item svg { flex: 0 0 auto; }
.teaching-model-item span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.classify-card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.08); transition: transform .2s, box-shadow .2s; cursor: pointer; padding: 16px;
  &:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,.12); }
}
.classify-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; border-bottom: 1px solid #f0f0f0; padding-bottom: 10px;
  h3 { font-size: 16px; color: #1677ff; margin: 0; }
}
.classify-icon { font-size: 28px; }
.classify-exps { padding: 4px 0; }
.classify-exp-item { padding: 6px 0; font-size: 13px; color: #555; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: .15s; border-bottom: 1px dashed #f0f0f0;
  &:last-of-type { border-bottom: none; }
  &:hover { color: #1677ff; }
}
.exp-dot { color: #64b5f6; font-size: 8px; }
.classify-more { text-align: right; font-size: 13px; color: #1677ff; margin-top: 8px; cursor: pointer; padding: 4px 0; &:hover { text-decoration: underline; } }
.curriculum-section { margin-bottom: 28px; }
.curriculum-header {
  display: flex; align-items: center; justify-content: space-between;
  height: 36px; margin-bottom: 14px;
}
.curriculum-icon { font-size: 22px; }
.curriculum-name { font-size: 20px; font-weight: bold; color: #111; margin-left: 10px; flex: 1; }
.curriculum-more { font-size: 13px; color: #1677ff; cursor: pointer; white-space: nowrap; &:hover { text-decoration: underline; } }
.curriculum-exp-grid {
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 36px;
}
.exp-card {
  background: #fff; border-radius: 8px; overflow: hidden;
  box-shadow: 0 1px 6px rgba(0,0,0,.08); cursor: pointer; transition: .2s;
  &:hover { transform: translateY(-3px); box-shadow: 0 4px 16px rgba(0,0,0,.12); }
}
.exp-card-thumb {
  width: 100%; height: 130px; overflow: hidden;
  background: #f0f2f5;
  display: flex; align-items: center; justify-content: center;
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
}
.exp-card-title {
  font-size: 14px; color: #111; padding: 8px 10px 2px;
  overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
}
.exp-card-pub {
  font-size: 12px; color: #999; padding: 0 10px 8px;
}
.course-card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.08); transition: transform .2s, box-shadow .2s; cursor: pointer;
  &:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,.12); }
  .thumb { height: 180px; background: #f0f2f5; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative;
    img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .fallback { font-size: 36px; }
  }
  .body { padding: 14px 16px;
    h3 { font-size: 14px; margin-bottom: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .meta { font-size: 12px; color: #999; }
  }
}
.loading { text-align: center; padding: 60px; color: #999; grid-column: 1 / -1;
  &.mini { padding: 10px; }
}
.spinner { display: inline-block; width: 32px; height: 32px; border: 3px solid #e0e0e0; border-top-color: #1677ff; border-radius: 50%; animation: spin .8s linear infinite; margin-bottom: 12px;
  &.small { width: 16px; height: 16px; border-width: 2px; margin-bottom: 0; }
}
@keyframes spin { to { transform: rotate(360deg); } }
.empty { text-align: center; padding: 60px; color: #999; font-size: 14px; grid-column: 1 / -1;
  .icon { font-size: 48px; margin-bottom: 12px; }
}
.courses-pagination { margin: 24px 0; }
@media (max-width: 768px) {
  .page-wrap { padding: 16px; }
  .course-grid { grid-template-columns: 1fr; }
  .curriculum-exp-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .curriculum-name { font-size: 16px; }
}
</style>



