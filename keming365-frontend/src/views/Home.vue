<template>
  <div class="home">
    <!-- Banner 轮播 -->
    <div class="banner" @mouseenter="hovering = true" @mouseleave="hovering = false">
      <div class="home-course-nav" @mouseenter="cancelCoursePanelClose" @mouseleave="scheduleCoursePanelClose">
        <div class="course-nav-inner">
          <button
            v-for="group in courseNavData"
            :key="group.classify.id"
            class="course-nav-item"
            :class="{ active: isCourseNavOpen && activeCourseGroup?.classify.id === group.classify.id }"
            @mouseenter="showCoursePanel(group, $event)"
            @focus="showCoursePanel(group, $event)"
          >
            {{ group.classify.className }}
          </button>
        </div>
        <div
          v-if="isCourseNavOpen && activeCourseGroup"
          class="course-nav-panel"
          @mouseenter="cancelCoursePanelClose"
          @mouseleave="scheduleCoursePanelClose"
          :style="{
            '--panel-left': coursePanelLeft + 'px',
            '--panel-width': coursePanelWidth + 'px',
            '--panel-arrow-left': coursePanelArrowLeft + 'px'
          }"
        >
          <button
            v-for="course in activeCourseGroup.courses"
            :key="course.id"
            class="course-chip"
            :class="{ expanded: expandedCourseId === course.id }"
            @pointermove="expandCourse(course.id)"
            @focus="expandCourse(course.id)"
            @click="goCurriculum(course.id)"
          >
            <span class="course-chip-label">{{ courseDisplayName(course) }}</span>
          </button>
          <span
            v-if="activeCourseGroup.courses.length === 0"
            class="course-chip empty"
          >
            暂无课程
          </span>
        </div>
      </div>
      <div v-for="(img, idx) in bannerImages" :key="idx"
           class="slide" :class="{ active: idx === bannerIdx }">
        <img :src="img" alt="">
      </div>
      <!-- 搜索框 -->
      <div class="banner-search">
        <input v-model="searchQuery" placeholder="请输入学习资源名称"
               @keydown.enter="doSearch" autocomplete="off">
        <button @click="doSearch">搜索</button>
      </div>
      <div class="dots">
        <span v-for="(_, idx) in bannerImages" :key="idx"
              :class="{ active: idx === bannerIdx }" @click="bannerIdx = idx" />
      </div>
    </div>

    <div class="container">
      <!-- 分类实验展示 -->
      <div v-if="loading" class="loading"><div class="spinner"></div>加载中...</div>
      <div v-else-if="classifyError" class="empty"><div class="icon">😵</div><p>{{ classifyError }}</p></div>
      <div v-else>
        <div v-for="section in classifyData" :key="section.classify.id" class="classify-section">
          <div class="classify-header">
            <div class="classify-header-left">
              <span class="classify-marker" aria-hidden="true"></span>
              <span class="classify-name">{{ section.classify.className }}</span>
            </div>
          </div>
          <div v-if="section.experiments.length === 0" class="classify-empty">暂无实验</div>
          <div v-else class="experiment-scroll">
            <div v-for="exp in section.experiments" :key="exp.id"
                 class="experiment-card" @click="openExperiment(exp.id)">
              <div class="experiment-thumb">
                <img v-if="getImageUrl(exp.image || '')" :src="getImageUrl(exp.image || '')" loading="lazy"
                     @error="hideBrokenImage">
                <span v-else style="font-size:36px">🔬</span>
              </div>
              <p class="experiment-title" :title="exp.title">{{ exp.title }}</p>
              <p class="experiment-publisher">{{ exp.publisher || '' }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- 友情链接 -->
    <div class="friend-link">
      <div class="container">
        <h3 class="link-title">友情链接</h3>
        <div class="link-row">
          <a href="http://www.moe.gov.cn" target="_blank" class="link-item">
            <img src="https://www.keming365.com/images/jyb01.png" alt="教育部">
          </a>
          <a href="http://www.hit.edu.cn" target="_blank" class="link-item">
            <img src="https://www.keming365.com/images/hgd02.png" alt="哈尔滨工业大学">
          </a>
          <a href="http://www.hust.edu.cn" target="_blank" class="link-item">
            <img src="https://www.keming365.com/images/hzkd03.png" alt="华中科技大学">
          </a>
          <a href="http://www.tongji.edu.cn" target="_blank" class="link-item">
            <img src="https://www.keming365.com/images/tjdx04.png" alt="同济大学">
          </a>
          <a href="http://www.hnu.edu.cn" target="_blank" class="link-item">
            <img src="https://www.keming365.com/images/hndx05.png" alt="湖南大学">
          </a>
          <a href="http://www.jlu.edu.cn" target="_blank" class="link-item">
            <img src="https://www.keming365.com/images/jldx06.png" alt="吉林大学">
          </a>
        </div>
        <div class="link-row">
          <a href="http://www.tju.edu.cn" target="_blank" class="link-item">
            <img src="https://www.keming365.com/images/tjdx07.png" alt="天津大学">
          </a>
          <a href="http://www.sdjzu.edu.cn" target="_blank" class="link-item">
            <img src="https://www.keming365.com/images/jd08.png" alt="山东建筑大学">
          </a>
          <a href="http://www.zju.edu.cn" target="_blank" class="link-item">
            <img src="https://www.keming365.com/images/zjdx09.png" alt="浙江大学">
          </a>
          <a href="http://www.csu.edu.cn" target="_blank" class="link-item">
            <img src="https://www.keming365.com/images/zndx10.png" alt="中南大学">
          </a>
          <a href="http://www.sdu.edu.cn" target="_blank" class="link-item">
            <img src="https://www.keming365.com/images/sddx11.png" alt="山东大学">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getClassifies, getClassifyExperiments, getCurricula, getFeaturedExperiments } from '@/api'
import { getImageUrl, hideBrokenImage } from '@/utils'
import type { Classify, Curriculum, Experiment } from '@/types'

const router = useRouter()

// Banner
const bannerImages = [
  'https://www.keming365.com/img/001.png',
  'https://www.keming365.com/img/002.png',
  'https://www.keming365.com/img/003.png',
]
const bannerIdx = ref(0)
const hovering = ref(false)
let bannerTimer: ReturnType<typeof setInterval> | null = null

// Search
const searchQuery = ref('')
const doSearch = () => {
  if (!searchQuery.value.trim()) return
  router.push({ path: '/qbkc', query: { search: searchQuery.value.trim(), from: 'home-search' } })
}

// Classify data
interface ClassifySection {
  classify: Classify
  experiments: Experiment[]
}
const classifyData = ref<ClassifySection[]>([])
const loading = ref(true)
const classifyError = ref('')

interface CourseNavGroup {
  classify: Classify
  courses: Curriculum[]
}
const CLASSIFY_NAV_ORDER: Record<string, number> = {
  '机械工程': 1,
  '工程训练': 2,
  '力学': 3,
  '土木工程': 4,
  '装配式建筑': 5,
  '大学物理': 6,
  '能源动力': 7,
  '水利工程': 8,
  '生物工程': 9,
  '文化艺术': 10,
  '航海类': 11,
  '学前教育/康养': 12
}
const HOME_FEATURED_CLASS_ID: Record<string, number> = {
  '机械工程': 1,
  '工程训练': 2,
  '力学': 3,
  '土木工程': 4,
  '大学物理': 5,
  '能源动力': 6,
  '水利工程': 7,
  '生物工程': 8,
  '文化艺术': 9
}
const HOME_HIDDEN_CLASSIFIES = new Set(['其他'])
const HOME_HIDDEN_SECTIONS = new Set(['其他', '能源动力', '学前教育/康养'])
const courseNavData = ref<CourseNavGroup[]>([])
const activeCourseGroup = ref<CourseNavGroup | null>(null)
const isCourseNavOpen = ref(false)
const coursePanelLeft = ref(6)
const coursePanelWidth = ref(716)
const coursePanelArrowLeft = ref(34)
const expandedCourseId = ref<string | number | null>(null)

const courseDisplayName = (course: Curriculum) => {
  return course.curriculumName === '工程机械' ? '工程训练' : course.curriculumName
}

const updateCoursePanelPosition = (_group: CourseNavGroup, target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return
  const rect = target.getBoundingClientRect()
  const viewport = window.innerWidth
  const panelMargin = viewport <= 768 ? 12 : 6
  const panelWidth = viewport <= 768 ? viewport - panelMargin * 2 : Math.min(716, viewport - panelMargin * 2)
  const buttonCenter = rect.left + rect.width / 2
  const minLeft = panelMargin
  const maxLeft = Math.max(minLeft, viewport - panelWidth - panelMargin)
  const desiredLeft = viewport <= 768 ? panelMargin : buttonCenter - panelWidth / 2
  const panelLeft = Math.min(Math.max(desiredLeft, minLeft), maxLeft)
  const arrowLeft = buttonCenter - panelLeft
  coursePanelLeft.value = panelLeft
  coursePanelWidth.value = panelWidth
  coursePanelArrowLeft.value = Math.min(Math.max(18, arrowLeft), Math.max(18, panelWidth - 18))
}
let coursePanelCloseTimer: ReturnType<typeof setTimeout> | null = null
const cancelCoursePanelClose = () => {
  if (!coursePanelCloseTimer) return
  clearTimeout(coursePanelCloseTimer)
  coursePanelCloseTimer = null
}
const showCoursePanel = (group: CourseNavGroup, event: MouseEvent | FocusEvent) => {
  cancelCoursePanelClose()
  if (activeCourseGroup.value?.classify.id !== group.classify.id) expandedCourseId.value = null
  activeCourseGroup.value = group
  isCourseNavOpen.value = true
  updateCoursePanelPosition(group, event.currentTarget)
}
const expandCourse = (courseId: string | number) => {
  if (expandedCourseId.value !== courseId) expandedCourseId.value = courseId
}
const scheduleCoursePanelClose = () => {
  cancelCoursePanelClose()
  expandedCourseId.value = null
  coursePanelCloseTimer = setTimeout(() => {
    isCourseNavOpen.value = false
    activeCourseGroup.value = null
    coursePanelCloseTimer = null
  }, 180)
}
const goCurriculum = (curriculumId: string | number) => {
  cancelCoursePanelClose()
  expandedCourseId.value = null
  isCourseNavOpen.value = false
  activeCourseGroup.value = null
  router.push({ path: '/qbkc', query: { curriculumId } })
}
const openExperiment = (id: string | number) => {
  localStorage.setItem('experimentId', String(id))
  router.push('/enterItem')
}
onMounted(async () => {
  // Start banner timer
  bannerTimer = setInterval(() => {
    if (!hovering.value) bannerIdx.value = (bannerIdx.value + 1) % bannerImages.length
  }, 4000)

  // Load homepage data
  try {
    const classifies = await getClassifies()

    const sortedClassifies = classifies.filter(
      item => !HOME_HIDDEN_CLASSIFIES.has(item.className)
    ).sort((a, b) => {
      const ai = CLASSIFY_NAV_ORDER[a.className] ?? Number(a.sortOrder) ?? 999
      const bi = CLASSIFY_NAV_ORDER[b.className] ?? Number(b.sortOrder) ?? 999
      return ai - bi
    })
    const navGroups = await Promise.all(
      sortedClassifies.map(async (c) => {
        try {
          const res = await getCurricula({ classifyId: c.id, page_size: 30 })
          return { classify: c, courses: res.results || [] }
        } catch {
          return { classify: c, courses: [] }
        }
      })
    )
    courseNavData.value = navGroups

    // Load experiments for each classify
    const sectionClassifies = sortedClassifies.filter(
      item => !HOME_HIDDEN_SECTIONS.has(item.className)
    )
    const sections = await Promise.all(
      sectionClassifies.map(async (c) => {
        try {
          const featuredClassId = HOME_FEATURED_CLASS_ID[c.className]
          let res = featuredClassId
            ? await getFeaturedExperiments(featuredClassId, 5)
            : await getClassifyExperiments(c.id, 5)
          if (featuredClassId && !res.results?.length) {
            res = await getClassifyExperiments(c.id, 5)
          }
          return { classify: c, experiments: res.results || [] }
        } catch {
          return { classify: c, experiments: [] }
        }
      })
    )
    classifyData.value = sections
  } catch (e: any) {
    classifyError.value = e.message || '加载失败'
  } finally {
    loading.value = false
  }
})

onUnmounted(() => {
  if (bannerTimer) clearInterval(bannerTimer)
  cancelCoursePanelClose()
})
</script>

<style lang="scss" scoped>
.banner {
  position: relative; height: 549px; overflow: hidden; background: #1677ff;
  .slide { position: absolute; inset: 0; opacity: 0; transition: opacity .8s;
    &.active { opacity: 1; }
    img { width: 100%; height: 100%; object-fit: cover; display: block; }
  }
  .banner-search {
    position: absolute; bottom: 50px; left: 50%; transform: translateX(-50%);
    display: flex; max-width: 700px; width: 90%;
    input {
      flex: 1; padding: 14px 24px; border: none;
      border-radius: 30px 0 0 30px; font-size: 15px; outline: none;
      box-shadow: 0 4px 20px rgba(0,0,0,.15);
    }
    button {
      padding: 14px 32px; background: #1677ff; color: #fff;
      border: none; border-radius: 0 30px 30px 0; font-size: 15px;
      &:hover { background: #4096ff; }
    }
  }
  .dots {
    position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);
    display: flex; gap: 8px;
    span {
      width: 10px; height: 10px; border-radius: 50%;
      background: rgba(255,255,255,.4); cursor: pointer;
      &.active { background: #fff; width: 28px; border-radius: 5px; }
    }
  }
}
.home-course-nav {
  position: absolute; top: 0; left: 0; right: 0; z-index: 5;
  pointer-events: none;
}
.course-nav-inner {
  height: 45px; padding: 0 max(24px, calc((100vw - 1200px) / 2));
  display: flex; align-items: center; justify-content: center; gap: 12px;
  background: rgba(33, 126, 246, .94);
  box-shadow: 0 4px 16px rgba(32, 104, 210, .16);
  pointer-events: auto;
}
.course-nav-item {
  height: 45px; padding: 0 12px; border: 0; background: transparent;
  color: #fff; font-size: 15px; font-weight: 600; cursor: default;
  white-space: nowrap; transition: color .18s, background .18s;
  &:hover, &:focus-visible, &.active { color: #ffb13a; outline: none; }
}
.course-nav-panel {
  position: absolute; top: 68px; left: var(--panel-left, 72px);
  width: var(--panel-width, 716px); padding: 16px 28px;
  display: flex; flex-wrap: wrap; align-items: flex-start; gap: 12px;
  background: #fff; border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, .24);
  pointer-events: auto;
}
.course-nav-panel::before {
  content: ''; position: absolute; top: -12px; left: var(--panel-arrow-left, 34px);
  width: 24px; height: 24px; background: #fff;
  transform: translateX(-50%) rotate(45deg); border-radius: 4px 0 0 0;
}
.course-nav-panel::after {
  content: ''; position: absolute; left: 0; right: 0; top: -28px; height: 28px;
  background: transparent;
}
.course-chip {
  position: relative; z-index: 1; box-sizing: border-box; flex: 0 0 122px; width: 122px; height: 42px; padding: 0 6px; border: 0;
  border-radius: 22px; background: #f4f4f4; color: #333; font-size: 14px;
  display: inline-flex; align-items: center; justify-content: center;
  cursor: pointer; overflow: hidden;
  transition: background .18s, color .18s;
  &.expanded, &:focus-visible {
    flex-basis: auto; min-width: 122px; width: max-content; max-width: min(280px, calc(100vw - 32px));
    background: #eaf2ff; color: #1677ff; outline: none; overflow: visible; z-index: 4;
  }
  &.empty { flex-basis: 122px; color: #1677ff; }
}
.course-chip-label {
  display: block; min-width: 0; width: 100%; overflow: hidden;
  text-overflow: ellipsis; white-space: nowrap;
}
.course-chip.expanded .course-chip-label,
.course-chip:focus-visible .course-chip-label {
  width: auto; overflow: visible; text-overflow: clip;
}
.search-bar { display: none; }
.classify-section { margin-bottom: 28px; }
.classify-section:first-of-type { margin-top: 30px; }
.classify-header {
  display: flex; align-items: center; justify-content: space-between;
  height: 36px; margin-bottom: 14px;
}
.classify-header-left { display: flex; align-items: center; gap: 10px; }
.classify-marker { width: 6px; height: 22px; flex: 0 0 6px; background: #5db8ff; }
.classify-name { font-size: 20px; font-weight: bold; color: #111; }
.classify-empty { color: #ccc; font-size: 13px; padding: 20px 0; text-align: center; }
.experiment-scroll {
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 36px;
}
.experiment-card {
  background: #fff; border-radius: 8px; overflow: hidden;
  box-shadow: 0 1px 6px rgba(0,0,0,.08); cursor: pointer; transition: .2s;
  &:hover { transform: translateY(-3px); box-shadow: 0 4px 16px rgba(0,0,0,.12); }
}
.experiment-thumb {
  width: 100%; height: 130px; overflow: hidden;
  background: #f0f2f5;
  display: flex; align-items: center; justify-content: center;
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
}
.experiment-title {
  font-size: 14px; color: #111; padding: 8px 10px 2px;
  overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
}
.experiment-publisher {
  font-size: 12px; color: #999; padding: 0 10px 8px;
  overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
}
.section-title {
  display: flex; justify-content: space-between; align-items: center; margin: 24px 0 16px;
  h2 { display: flex; align-items: center; gap: 10px; font-size: 20px; color: #111; }
  a { font-size: 13px; color: #1677ff; &:hover { text-decoration: underline; } }
}
.grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px; margin-bottom: 40px;
}
.card {
  background: #fff; border-radius: 12px; overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,.08); cursor: pointer; transition: .2s;
  &:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,.12); }
  .thumb {
    height: 150px; background: linear-gradient(135deg, #e3f2fd, #bbdefb);
    display: flex; align-items: center; justify-content: center;
    font-size: 42px; position: relative;
    img { width: 100%; height: 100%; object-fit: cover; }
    .tag { position: absolute; top: 10px; left: 10px; background: rgba(22,119,255,.82); color: #fff; font-size: 11px; padding: 3px 10px; border-radius: 4px; }
  }
  .body {
    padding: 14px 16px 16px;
    h3 { font-size: 15px; margin-bottom: 6px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4; min-height: 42px; }
    .summary { font-size: 13px; color: #999; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-top: 4px; line-height: 1.5; }
    .meta { font-size: 12px; color: #999; display: flex; gap: 12px; margin-top: 4px; }
  }
}
@media(max-width:768px) {
  .banner { height: 340px; }
  .course-nav-inner { justify-content: flex-start; overflow-x: auto; padding: 0 12px; gap: 6px; }
  .course-nav-item { flex: 0 0 auto; font-size: 13px; padding: 0 9px; }
  .course-nav-panel { top: 56px; left: 12px; right: 12px; width: auto; padding: 14px; gap: 10px; }
  .course-chip { flex-basis: calc((100% - 10px) / 2); width: calc((100% - 10px) / 2); height: 38px; font-size: 12px; }
  .grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
  .experiment-scroll { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .classify-name { font-size: 16px; }
}

.friend-link {
  height: 417px;
  margin-top: 42px;
  position: relative;
  overflow: hidden;
  background: #e8f3ff url('https://www.keming365.com/images/yqljbj.png') center top / cover no-repeat;
  &::before {
    content: 'FRIENDLY LINK';
    position: absolute;
    top: 34px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 62px;
    line-height: 1;
    font-weight: 700;
    color: rgba(70, 139, 239, .08);
    white-space: nowrap;
    pointer-events: none;
    letter-spacing: 0;
    z-index: 0;
  }
  .container { height: 100%; position: relative; z-index: 1; }
  .link-title {
    height: 140px;
    margin: 0;
    padding-top: 58px;
    box-sizing: border-box;
    text-align: center;
    font-size: 28px;
    line-height: 38px;
    color: #333;
    font-weight: 700;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 106px;
      left: 50%;
      transform: translateX(-50%);
      width: 52px;
      height: 5px;
      background: #2f67ff;
      border-radius: 3px;
    }
  }
  .link-row {
    display: flex;
    justify-content: center;
    gap: 19px;
    margin-bottom: 24px;
  }
  .link-item {
    width: 184px;
    height: 88px;
    flex: 0 0 184px;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    box-shadow: 0 2px 8px rgba(47, 103, 180, .08);
    transition: transform .2s, box-shadow .2s;
    &:hover { transform: translateY(-2px); box-shadow: 0 5px 14px rgba(47, 103, 180, .16); }
    img { width: 184px; height: 88px; display: block; object-fit: contain; }
  }
}

@media(max-width: 1200px) {
  .friend-link {
    height: auto;
    min-height: 417px;
    padding-bottom: 28px;
    .container { height: auto; }
    .link-row { flex-wrap: wrap; padding: 0 16px; }
  }
}

</style>













