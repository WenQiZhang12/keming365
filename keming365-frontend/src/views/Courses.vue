<template>
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
        <template v-if="state.classifyId == '3' || state.classifyId == 3">
          <div :class="['exp-type-tab', { active: state.expType === '4' && state.resourceMode === 'vr', disabled: state.resourceMode === 'ai' }]" @click="state.resourceMode === 'vr' && switchExpType('4')">教学视频</div>
          <div :class="['exp-type-tab', { active: state.expType === '5' && state.resourceMode === 'vr', disabled: state.resourceMode === 'ai' }]" @click="state.resourceMode === 'vr' && switchExpType('5')">典型实景资料</div>
        </template>
        <div v-if="state.classifyId != '50' && state.classifyId != 50"
          :class="['exp-type-tab', { active: state.expType === '3' && state.resourceMode === 'vr', disabled: state.resourceMode === 'ai' }]" @click="state.resourceMode === 'vr' && switchExpType('3')">教学模型</div>
      </template>
    </div>
    <!-- 全部课程：左侧分类，右侧完整课程列表 -->
    <div v-if="state.viewMode === 'allClassifies'" class="course-browser">
      <aside class="category-panel" aria-label="课程分类">
        <h2>课程分类</h2>
        <button
          v-for="(c, index) in classifies"
          :key="c.id"
          type="button"
          class="category-item"
          :class="{ active: state.classifyId == c.id }"
          @click="selectBrowseClassify(c)"
        >
          <span class="category-index">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="category-name">{{ c.className }}</span>
        </button>
      </aside>

      <section class="course-list-panel">
        <div class="course-list-heading">
          <div class="course-title-row">
            <h1>{{ selectedClassifyName }}</h1>
            <span v-if="!loading">共 {{ browseTotal }} 项{{ browseItemLabel }}</span>
          </div>
          <form class="browse-search" @submit.prevent="doBrowseSearch">
            <input v-model="browseSearchText" type="search" placeholder="搜索课程名称..." aria-label="搜索课程名称" />
            <button type="submit" aria-label="搜索"><Search :size="17" />搜索</button>
          </form>
        </div>

        <div v-if="loading" class="browser-status"><div class="spinner"></div><span>加载中...</span></div>
        <div v-else-if="isEmpty" class="browser-status empty"><p>{{ emptyText }}</p></div>
        <div v-else class="browse-course-list">
          <button
            v-for="(item, index) in browseItems"
            :key="`${item.kind}-${item.id}`"
            type="button"
            class="browse-course-item"
            @click="openBrowseItem(item)"
          >
            <span class="course-index">{{ String((state.page - 1) * BROWSE_PAGE_SIZE + index + 1).padStart(2, '0') }}</span>
            <span class="course-name" :title="item.label">{{ item.label }}</span>
            <span class="course-kind">{{ item.kind === 'curriculum' ? '课程' : '实验' }}</span>
            <ChevronRight class="course-arrow" :size="16" />
          </button>
        </div>

        <Pagination
          class="browse-pagination"
          :page="state.page"
          :total="browseTotal"
          :page-size="BROWSE_PAGE_SIZE"
          @update:page="goBrowsePage"
        />
      </section>
    </div>

    <div v-else class="course-grid" :class="{ 'ai-vr-layout': (state.resourceMode === 'ai' || state.resourceMode === 'knowledge') && state.viewMode === 'experiments' && state.curriculumId && isSpecialVrCurriculum }">
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
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronLeft, ChevronRight, Search } from '@lucide/vue'
import { getCurriculumClassifies, getCurricula, getExperiments, getCurriculumDetail } from '@/api'
import { getImageUrl } from '@/utils'
import type { Classify, Curriculum, Experiment } from '@/types'
import AiVrView from '@/components/AiVrView.vue'
import Pagination from '@/components/Pagination.vue'

const route = useRoute()
const router = useRouter()
const PAGE_SIZE = 12
const BROWSE_PAGE_SIZE = 20
const directExpClassifies = ['大学物理', '能源动力', '生物工程']
const CLASSIFY_ORDER: Record<string, number> = {
  '机械工程': 1, '工程训练': 2, '力学': 3, '土木工程': 4, '装配式建筑': 5,
  '大学物理': 6, '能源动力': 7, '水利工程': 8, '生物工程': 9, '文化艺术': 10, '航海类': 11, '学前教育/康养': 12
}

interface CurriculumCard extends Curriculum { exps: { id: string | number; title: string; image?: string }[]; expsLoading: boolean }
interface ExpItem extends Experiment { imageUrl?: string; fromName?: string; fromParam?: string }
interface BrowseItem { id: string | number; label: string; kind: 'curriculum' | 'experiment' }

const loading = ref(false)
const isEmpty = ref(false)
const emptyText = ref('')
const searchText = ref('')
const showSearch = ref(true)
const navBreadcrumb = ref('')
const showExpTypeTabs = ref(false)
const classifies = ref<Classify[]>([])
const curriculaCards = ref<CurriculumCard[]>([])
const browseItems = ref<BrowseItem[]>([])
const browseTotal = ref(0)
const browseSearchText = ref('')
const browseSearch = ref('')

const state = reactive({
  classifyId: '' as string | number,
  curriculumId: '' as string | number,
  viewMode: 'allClassifies' as 'allClassifies' | 'curricula' | 'experiments',
  page: 1, search: '', expType: '0', resourceMode: 'vr' as 'vr' | 'ai' | 'knowledge',
  items: [] as ExpItem[], total: 0, classifies: [] as Classify[]
})

let lastClassifyId: string | number = ''
let currentCurriculumName = ref('')
let currentCurriculumId: string | number = ''
let fromClassifyDirectly = false
const courseDisplayName = (name: string) => name === '工程机械' ? '工程训练' : name
const displayCurriculumName = computed(() => courseDisplayName(currentCurriculumName.value))

const totalPages = computed(() => Math.ceil(state.total / PAGE_SIZE))
const browseTotalPages = computed(() => Math.ceil(browseTotal.value / BROWSE_PAGE_SIZE))
const selectedClassify = computed(() => classifies.value.find(c => c.id == state.classifyId))
const selectedClassifyName = computed(() => selectedClassify.value?.className || '全部课程')
const browseIsDirectExp = computed(() => directExpClassifies.includes(selectedClassifyName.value))
const browseItemLabel = computed(() => browseIsDirectExp.value ? '实验' : '课程')

const specialVrCurriculumNames = ['画法几何与机械制图', '液压与气压传动', '工程机械']
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
  if (state.viewMode === 'allClassifies') return false
  return true
})
const isHomeSearchResult = computed(() => route.query.from === 'home-search')

// === 分类筛选 ===
function filterByClassify(c: Classify | null, id: string | number) {
  state.classifyId = id
  state.curriculumId = ''
  state.page = 1
  state.search = ''
  searchText.value = ''
  if (!id) {
    state.viewMode = 'allClassifies'
  } else {
    const name = c ? c.className : ''
    state.viewMode = directExpClassifies.includes(name) ? 'experiments' : 'curricula'
  }
  navBreadcrumb.value = ''
  showSearch.value = true
  showExpTypeTabs.value = false
  loadContent()
}

function openClassify(cid: string | number) {
  const c = classifies.value.find(x => x.id == cid)
  filterByClassify(c || null, cid)
}

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
  state.classifyId = ''
  state.curriculumId = ''
  state.page = 1
  state.viewMode = 'allClassifies'
  state.search = ''
  searchText.value = ''
  navBreadcrumb.value = ''
  showSearch.value = true
  showExpTypeTabs.value = false
  loadContent()
}

function backToCurricula() {
  state.curriculumId = ''
  state.page = 1
  if (lastClassifyId) state.classifyId = lastClassifyId
  state.viewMode = 'allClassifies'
  navBreadcrumb.value = ''
  showSearch.value = true
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
  if (state.viewMode === 'allClassifies') await loadAllClassifies()
  else if (state.curriculumId && state.viewMode === 'experiments') await loadExperiments()
  else if (state.classifyId && state.viewMode === 'experiments') await loadExperiments()
  else if (state.classifyId && state.viewMode === 'curricula') await loadCurricula()
  else { state.viewMode = 'allClassifies'; await loadAllClassifies() }
  loading.value = false
}

// === 加载全部课程浏览页 ===
async function loadAllClassifies() {
  showExpTypeTabs.value = false
  try {
    const list = await getCurriculumClassifies()
    list.sort((a, b) => (CLASSIFY_ORDER[a.className] || 999) - (CLASSIFY_ORDER[b.className] || 999))
    classifies.value = list
    state.classifies = list
    if (list.length === 0) {
      browseItems.value = []
      browseTotal.value = 0
      isEmpty.value = true
      emptyText.value = '暂无分类'
      return
    }
    if (!list.some(c => c.id == state.classifyId)) state.classifyId = list[0].id
    await loadBrowseItems()
  } catch (e: any) {
    isEmpty.value = true; emptyText.value = '加载失败：' + (e.message || '')
  }
}

async function loadBrowseItems() {
  isEmpty.value = false
  const classify = selectedClassify.value
  if (!classify) {
    browseItems.value = []
    browseTotal.value = 0
    isEmpty.value = true
    emptyText.value = '暂无分类'
    return
  }

  try {
    if (directExpClassifies.includes(classify.className)) {
      const data = await getExperiments({
        classifyId: classify.id,
        page: state.page,
        page_size: BROWSE_PAGE_SIZE,
        search: browseSearch.value || undefined
      })
      browseItems.value = (data.results || []).map(item => ({
        id: item.id,
        label: item.title || '',
        kind: 'experiment'
      }))
      browseTotal.value = data.count || 0
    } else {
      const data = await getCurricula({
        classifyId: classify.id,
        page: state.page,
        page_size: BROWSE_PAGE_SIZE,
        search: browseSearch.value || undefined
      })
      browseItems.value = (data.results || []).map(item => ({
        id: item.id,
        label: item.curriculumName || '',
        kind: 'curriculum'
      }))
      browseTotal.value = data.count || 0
    }
    if (browseItems.value.length === 0) {
      isEmpty.value = true
      emptyText.value = browseSearch.value ? '没有找到相关内容' : `暂无${browseItemLabel.value}`
    }
  } catch (e: any) {
    browseItems.value = []
    browseTotal.value = 0
    isEmpty.value = true
    emptyText.value = '加载失败：' + (e.message || '')
  }
}

async function selectBrowseClassify(classify: Classify) {
  if (state.classifyId == classify.id && !browseSearch.value) return
  state.classifyId = classify.id
  state.page = 1
  browseSearchText.value = ''
  browseSearch.value = ''
  loading.value = true
  await loadBrowseItems()
  loading.value = false
}

async function doBrowseSearch() {
  browseSearch.value = browseSearchText.value.trim()
  state.page = 1
  loading.value = true
  await loadBrowseItems()
  loading.value = false
}

async function goBrowsePage(page: number) {
  if (page < 1 || page > browseTotalPages.value || page === state.page) return
  state.page = page
  loading.value = true
  await loadBrowseItems()
  loading.value = false
}

function openBrowseItem(item: BrowseItem) {
  if (item.kind === 'curriculum') {
    showExperiments(item.id, item.label)
    return
  }
  goExperiment(item.id, selectedClassifyName.value, 'classify')
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
    const params: any = { page: state.page, page_size: PAGE_SIZE }
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
      const cl = state.classifies.find(c => c.id == state.classifyId)
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
    if (text.includes('返回分类')) backToClassifies()
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
  if (!hasRouteFilter) backToClassifies()
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
    await loadAllClassifies()
    state.classifyId = ''
    state.curriculumId = urlCurriculum
    state.viewMode = 'experiments'
    getCurriculumDetail(urlCurriculum).then(course => {
      currentCurriculumName.value = course.curriculumName || '课程'
      navBreadcrumb.value = `<a href="javascript:;" onclick="return false">返回课程列表</a> &gt; <span>${displayCurriculumName.value}</span>`
    }).catch(() => {})
    loadContent()
  } else if (urlClassify) {
    await loadAllClassifies()
    // 先检查分类下是否只有一个课程
    getCurricula({ classifyId: urlClassify, page_size: 2 }).then(d => {
      const curricula = d.results || []
      if (curricula.length === 1) {
        state.curriculumId = curricula[0].id
        state.viewMode = 'experiments'
        currentCurriculumName.value = curricula[0].curriculumName || '课程'
        navBreadcrumb.value = `<a href="javascript:;" onclick="return false">← 返回分类</a> &gt; <span>${displayCurriculumName.value}</span>`
        showSearch.value = false
        loadContent()
      } else {
        state.classifyId = urlClassify
        state.viewMode = 'curricula'
        lastClassifyId = urlClassify
        loadContent()
      }
    }).catch(() => {
      state.classifyId = urlClassify; state.viewMode = 'curricula'; lastClassifyId = urlClassify
      loadContent()
    })
  } else {
    state.viewMode = 'allClassifies'
    loadContent()
  }
})
</script>

<style scoped lang="scss">
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
.course-browser {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 36px;
  align-items: stretch;
  min-height: 640px;
}
.category-panel {
  align-self: start;
  overflow: hidden;
  background: #fff;
  border: 1px solid #dfe6f0;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(28, 45, 78, .06);
  h2 { height: 58px; padding: 0 18px; display: flex; align-items: center; margin: 0; font-size: 18px; font-weight: 700; color: #17243b; }
}
.category-item {
  position: relative;
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr);
  align-items: center;
  width: 100%;
  min-height: 46px;
  padding: 0 14px;
  border: 0;
  border-top: 1px solid #e8edf4;
  background: #fff;
  color: #617087;
  text-align: left;
  font-family: inherit;
  transition: color .15s, background .15s;
  &::before { content: ''; position: absolute; inset: 0 auto 0 0; width: 3px; background: transparent; }
  &:hover { color: #1769e8; background: #f7faff; }
  &.active { color: #1769e8; background: #eaf2ff; font-weight: 600; }
  &.active::before { background: #1769e8; }
}
.category-index { font-size: 11px; color: #97a3b4; font-variant-numeric: tabular-nums; }
.category-item.active .category-index { color: #1769e8; }
.category-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px; }
.course-list-panel { min-width: 0; display: flex; flex-direction: column; }
.course-list-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 58px;
  padding-bottom: 14px;
  border-bottom: 1px solid #d8e0eb;
}
.course-title-row {
  display: flex;
  align-items: center;
  min-width: 0;
  h1 { position: relative; margin: 0; padding-left: 14px; color: #122038; font-size: 23px; line-height: 30px; font-weight: 700; white-space: nowrap; }
  h1::before { content: ''; position: absolute; left: 0; top: 4px; width: 4px; height: 22px; border-radius: 2px; background: #1769e8; }
  span { margin-left: 18px; color: #7d899b; font-size: 12px; white-space: nowrap; }
}
.browse-search {
  display: flex;
  flex: 0 1 330px;
  height: 36px;
  input { min-width: 0; flex: 1; padding: 0 12px; border: 1px solid #d7dfeb; border-right: 0; border-radius: 5px 0 0 5px; background: #fff; color: #25324a; font: 13px inherit; outline: none; }
  input:focus { border-color: #1769e8; box-shadow: inset 0 0 0 1px #1769e8; }
  button { display: inline-flex; align-items: center; justify-content: center; gap: 5px; width: 78px; border: 1px solid #1769e8; border-radius: 0 5px 5px 0; background: #1769e8; color: #fff; font: 13px inherit; }
  button:hover { background: #0d5bd6; }
}
.browse-course-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 28px; }
.browse-course-item {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr) auto 16px;
  align-items: center;
  gap: 10px;
  min-width: 0;
  height: 55px;
  padding: 0 9px 0 4px;
  border: 0;
  border-bottom: 1px solid #e3e8ef;
  background: transparent;
  color: #17233a;
  text-align: left;
  font-family: inherit;
  transition: color .15s, border-color .15s, background .15s;
  &:hover { color: #1769e8; border-bottom-color: #88b5f6; background: #f7faff; }
}
.course-index { color: #9aa6b7; font-size: 12px; font-variant-numeric: tabular-nums; }
.course-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px; }
.course-kind { padding: 2px 6px; border-radius: 3px; background: #f0f5fb; color: #6d7d92; font-size: 11px; }
.course-arrow { color: #1769e8; }
.browser-status { min-height: 440px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #8b96a7; font-size: 14px;
  .spinner { margin-bottom: 12px; }
}
.browse-pagination {
  min-height: 48px;
  margin-top: auto;
}
.course-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;
  &.ai-vr-layout { display: block; width: 100%; min-width: 0; padding-top: 8px; }
  &:has(.curriculum-section) { display: block; }
}
.knowledge-panel { background: #fff; border-radius: 8px; padding: 20px; height: 720px; box-sizing: border-box; overflow: hidden; }
.knowledge-title { font-size: 18px; font-weight: 700; color: #333; margin-bottom: 15px; }
.knowledge-frame { width: 100%; height: calc(100% - 35px); border: 0; display: block; }
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
  .course-browser { grid-template-columns: 1fr; gap: 22px; min-height: 0; }
  .category-panel { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .category-panel h2 { grid-column: 1 / -1; height: 50px; }
  .category-item { min-height: 43px; }
  .course-list-heading { align-items: stretch; flex-direction: column; gap: 12px; padding-bottom: 16px; }
  .course-title-row { justify-content: space-between; }
  .browse-search { flex-basis: 36px; width: 100%; }
  .browse-course-list { grid-template-columns: 1fr; }
  .browse-course-item { height: 52px; }
  .course-grid { grid-template-columns: 1fr; }
  .curriculum-exp-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .curriculum-name { font-size: 16px; }
}
</style>



