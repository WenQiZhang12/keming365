<template>
  <div class="ai-vr-wrap">
    <div v-if="!courseData" class="no-data">
      <div class="no-data-icon">AI</div>
      <h2>AI+VR课程智能体</h2>
      <p>该课程的AI+VR内容正在建设中，敬请期待...</p>
    </div>

    <template v-else>
      <aside class="catalog-left">
        <div class="catalog-top-bar">
          <div class="catalog-header">
            <span class="catalog-header-icon" aria-hidden="true"></span>
            <span class="catalog-header-title">目录</span>
          </div>
          <span class="free-tag">免费试用</span>
        </div>
        <div class="catalog-line"></div>

        <nav class="course-tree" aria-label="课程目录">
          <section v-for="(chapter, ci) in courseData.chapters" :key="ci" :class="['tree-chapter', { open: isChapterOpen(ci) }]">
            <button class="tree-chapter-title" :class="{ strong: chapterHasContent(chapter), selected: isChapterSelected(ci) }" type="button" @click="toggleChapter(ci)">
              <span class="chapter-icon" aria-hidden="true"></span>
              <span class="tree-text">{{ chapter.title }}</span>
              <span class="tree-arrow" aria-hidden="true">{{ isChapterOpen(ci) ? '▼' : '▶' }}</span>
            </button>

            <div class="tree-children">
              <section v-for="(section, si) in chapter.children" :key="si" :class="['tree-section', { open: isSectionOpen(ci, si) }]">
                <button class="tree-section-title" :class="{ strong: sectionHasContent(section), selected: isSectionSelected(ci, si) }" type="button" @click="toggleSection(ci, si)">
                  <span class="tree-text">{{ section.title }}</span>
                </button>

                <div class="tree-modules">
                  <section
                    v-for="mod in itemModules"
                    :key="mod.name"
                    :class="['tree-module', { open: isModuleOpen(ci, si, mod.name) }]"
                  >
                    <button
                      class="tree-module-title"
                      :class="{ strong: sectionHasContent(section) }"
                      type="button"
                      :aria-expanded="isModuleOpen(ci, si, mod.name)"
                      @click="toggleModule(ci, si, mod.name)"
                    >
                      <span class="tree-text">{{ mod.name }}</span>
                    </button>
                    <div class="tree-items">
                      <button
                        v-for="fun in mod.children"
                        :key="fun.type"
                        :class="['tree-item', { active: isActiveResource(ci, si, fun.type), strong: sectionHasContent(section) }]"
                        type="button"
                        @click="loadResource(fun.type, section.title, ci, si)"
                      >
                        {{ fun.name }}
                      </button>
                    </div>
                  </section>
                </div>
              </section>
            </div>
          </section>
        </nav>
      </aside>

      <main class="catalog-right">
        <section v-if="showIntro" class="course-intro">
          <div class="catalog-title">{{ courseData.intro.title }}</div>
          <div class="intro-content" v-html="courseData.intro.content"></div>

          <div class="catalog-sub-title">授课目标</div>
          <ul class="intro-list">
            <li v-for="(goal, i) in courseData.intro.goals" :key="i">{{ goal }}</li>
          </ul>

          <div class="catalog-sub-title">参考资料</div>
          <ul class="intro-list">
            <li v-for="(reference, i) in courseData.intro.references" :key="i">{{ reference }}</li>
          </ul>
        </section>

        <section v-else-if="activePanel" class="resource-show">
          <div class="res-title">{{ activePanel.resourceName }}</div>

          <div v-if="activePanel.type === 'vr' && activePanel.items.length" class="vr-card-container">
            <article v-for="(item, idx) in activePanel.items" :key="item.url || idx" class="vr-card" @click="openVrResource(item)">
              <div class="vr-card-thumb">
                <img v-if="item.image" :src="item.image" :alt="item.title || 'VR资源'">
                <span v-else>VR</span>
              </div>
              <div class="vr-card-body">
                <h3>{{ item.title || `${activePanel.sectionTitle} VR资源 ${idx + 1}` }}</h3>
                <p>{{ item.description || '点击进入对应的VR虚拟仿真资源。' }}</p>
              </div>
            </article>
          </div>

          <div
            v-else-if="frameUrl"
            ref="resourceFrameWrap"
            :class="['res-frame-wrap', { 'ppt-frame-wrap': activePanel.type === 'ppt' }]"
            @mousemove="trackPptPointer"
            @pointermove="trackPptPointer"
          >
            <iframe
              class="res-iframe"
              :src="frameUrl"
              :title="activePanel.resourceName"
              allow="fullscreen *; screen-wake-lock; clipboard-read; clipboard-write"
              allowfullscreen
              webkitallowfullscreen
              mozallowfullscreen
            ></iframe>
          </div>

          <div v-else-if="activePanel.items.length" class="inline-resource-list">
            <article v-for="(item, idx) in activePanel.items" :key="item.id || idx" class="inline-resource">
              <h3>{{ item.title || activePanel.resourceName }}</h3>
              <p>{{ item.description || activePanel.emptyText }}</p>
            </article>
          </div>

          <div v-else class="build-tip">
            <strong>{{ activePanel.emptyTitle }}</strong>
            <p>{{ activePanel.emptyText }}</p>
          </div>
        </section>

        <section v-else class="resource-show">
          <div class="build-tip">
            <strong>请选择一个栏目</strong>
            <p>点击左侧的带你学、陪你练、帮你改或助你学内容后，会在这里直接显示。</p>
          </div>
        </section>
      </main>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { getAiVrCourseContent } from '@/api'
import { aiVrCourseData, hasContent, itemModules, RESOURCE_TYPE_NAMES } from '@/data/aiVrCourses'
import { legacyCourseVrUrls, legacyVrMeta } from '@/data/legacyVrResources'
import type { AiVrChapter } from '@/data/aiVrCourses'

type ResourceType = 'video' | 'ppt' | 'test' | 'correct' | 'ai' | 'vr'
type ResourceItem = { id?: string; type?: string; title?: string; description?: string; url?: string; previewUrl?: string; image?: string; appliId?: string }
type ResourcePanel = { type: ResourceType; group: string; resourceName: string; sectionTitle: string; items: ResourceItem[]; emptyTitle: string; emptyText: string }

const props = defineProps<{ curriculumName: string }>()
const courseData = ref<any>(null)
const showIntro = ref(true)
const openChapters = ref(new Set<number>())
const openSections = ref(new Set<string>())
const openModules = ref(new Set<string>())
const selectedChapter = ref<number | null>(null)
const selectedSection = ref<string | null>(null)
const activeResource = ref<{ ci: number; si: number; type: string } | null>(null)
const activePanel = ref<ResourcePanel | null>(null)
const resourceFrameWrap = ref<HTMLElement | null>(null)
const pointerNearPptPlay = ref(false)

const panelCopy: Record<ResourceType, { group: string; emptyTitle: string; emptyText: string }> = {
  video: { group: '带你学', emptyTitle: '课程视频正在整理中', emptyText: '后续可在后台新增“带你学：课程视频”，上传视频文件或填写说明。' },
  ppt: { group: '带你学', emptyTitle: '课程PPT正在整理中', emptyText: '后续可在后台新增“带你学：课程PPT”，上传课件或补充课件说明。' },
  test: { group: '陪你练', emptyTitle: '练习内容正在建设中', emptyText: '可在后台维护测验标题、练习说明和排序，学生将在本页直接查看。' },
  correct: { group: '帮你改', emptyTitle: '批改内容正在建设中', emptyText: '可在后台维护提交要求、批改说明和评分标准，页面会直接展示。' },
  ai: { group: '助你学', emptyTitle: 'AI助学内容正在建设中', emptyText: '可在后台维护学习提示、问题引导或 AI 助学说明。' },
  vr: { group: '助你学', emptyTitle: 'VR资源正在整理中', emptyText: '可在后台维护 VR 资源标题、说明和资源文件，页面会直接展示资源信息。' }
}

const frameUrl = computed(() => {
  const panel = activePanel.value
  if (!panel) return ''
  if (panel.type === 'test') {
    const chapterFilter = sectionToChapterFilter(panel.sectionTitle)
    return `/sdxx/quiz-js.html?course=${encodeURIComponent(resolveCourseKey(props.curriculumName))}&chapter=${encodeURIComponent(chapterFilter)}`
  }
  if (panel.type === 'correct') return correctUrl(props.curriculumName)
  if (panel.type === 'ai') return `/sdxx/ai-chat.html?lessonId=${lessonIdForCourse(props.curriculumName)}`
  if (panel.type === 'ppt') return resolvePptPreviewUrl(panel.items[0]?.url || '', panel.sectionTitle)
  const first = panel.items[0]
  if (!first) return ''
  if (panel.type === 'video') return first.url || ''
  return ''
})

function resolveAiVrCourseName(name: string) {
  if (name.includes('工程机械') || name.includes('工程训练')) return '工程训练'
  if (name.includes('画法几何') || name.includes('机械制图')) return '画法几何与机械制图'
  if (name.includes('液压') || name.includes('气压传动')) return '液压与气压传动'
  return name
}

function resolveCourseKey(name: string) {
  const resolved = resolveAiVrCourseName(name)
  if (resolved === '液压与气压传动') return 'hydraulic'
  if (resolved === '工程训练') return 'engineering'
  return 'huafa'
}

function lessonIdForCourse(name: string) {
  const resolved = resolveAiVrCourseName(name)
  if (resolved === '液压与气压传动') return 1
  if (resolved === '工程训练') return 12
  return 2
}

function correctUrl(name: string) {
  return `/sdxx/correct-${resolveCourseKey(name)}.html`
}

function sectionToChapterFilter(sectionTitle: string) {
  const match = sectionTitle.match(/^(\d+)\.(\d+)/)
  return match ? `${match[1]}_${match[2]}` : ''
}

function chapterHasContent(chapter: AiVrChapter): boolean {
  return chapter.children.some(section => sectionHasContent(section))
}

function sectionHasContent(section: any): boolean {
  const resources = section.resources || {}
  const hasConfiguredResources = Object.values(resources).some(value => Array.isArray(value) && value.length > 0)
  return hasConfiguredResources || hasContent(section) || !!(section.testUrl || section.correctUrl || section.aiUrl)
}

async function loadCourseData() {
  openChapters.value = new Set<number>()
  openSections.value = new Set<string>()
  openModules.value = new Set<string>()
  selectedChapter.value = null
  selectedSection.value = null
  showIntro.value = true
  activeResource.value = null
  activePanel.value = null
  const resolvedCourseName = resolveAiVrCourseName(props.curriculumName)
  const builtInData = aiVrCourseData[resolvedCourseName] || aiVrCourseData[props.curriculumName] || null
  try {
    const remoteData = await getAiVrCourseContent({ curriculumName: props.curriculumName })
    if (remoteData?.chapters?.length) courseData.value = mergeCourseData(builtInData, remoteData)
    else if (resolvedCourseName !== props.curriculumName) {
      const resolvedRemoteData = await getAiVrCourseContent({ curriculumName: resolvedCourseName })
      courseData.value = resolvedRemoteData?.chapters?.length ? mergeCourseData(builtInData, resolvedRemoteData) : builtInData
    } else courseData.value = builtInData
  } catch {
    courseData.value = builtInData
  }
  if (courseData.value) {
    normalizeLegacyCourseData(resolvedCourseName, courseData.value)
    courseData.value.chapters.forEach((chapter: any, ci: number) => {
      if (chapter.defaultOpen) {
        openChapters.value.add(ci)
        if (selectedChapter.value === null) selectedChapter.value = ci
      }
      chapter.children.forEach((section: any, si: number) => {
        if (section.defaultOpen && openSections.value.size === 0) {
          const key = sectionKey(ci, si)
          openSections.value.add(key)
          selectedChapter.value = ci
          selectedSection.value = key
        }
      })
    })
  }
}

function mergeCourseData(builtInData: any, remoteData: any) {
  if (!builtInData) return remoteData
  const merged = JSON.parse(JSON.stringify(builtInData))
  for (const remoteChapter of remoteData.chapters || []) {
    let chapter = merged.chapters.find((item: any) => item.title === remoteChapter.title)
    if (!chapter) {
      merged.chapters.push(remoteChapter)
      continue
    }
    for (const remoteSection of remoteChapter.children || []) {
      let section = chapter.children.find((item: any) => item.title === remoteSection.title)
      if (!section) {
        chapter.children.push(remoteSection)
        continue
      }
      section.resources ||= {}
      for (const type of ['video', 'ppt', 'test', 'correct', 'ai', 'vr']) {
        const resources = remoteSection.resources?.[type]
        if (!Array.isArray(resources) || resources.length === 0) continue
        section.resources[type] = resources
        section[`${type}Url`] = remoteSection[`${type}Url`] || resources.map((item: any) => item.url).filter(Boolean).join(';')
      }
    }
  }
  return merged
}

const huafaHiddenSectionTitles = new Set([
  '1.5 AutoCAD 2024的入门知识',
  '2.8 AutoCAD绘图工具',
  '3.3 AutoCAD 2024常用编辑命令',
  '4.3 AutoCAD 2024的图层',
  '4.4 AutoCAD 2024绘制平面图形',
  '5.5 AutoCAD 2024尺寸标注',
  '6.4 AutoCAD 2024正等轴测图画法',
  '7.6 AutoCAD 2024图案填充',
  '7.7 AutoCAD样板文件的规划',
  '10.4 使用AutoCAD 2024绘制零件图实例',
  '11.9 使用AutoCAD 2024绘制装配图实例'
])

function normalizeLegacyCourseData(courseName: string, data: any) {
  if (courseName !== '画法几何与机械制图' || !Array.isArray(data?.chapters)) return
  data.chapters.forEach((chapter: any) => {
    if (!Array.isArray(chapter.children)) return
    chapter.children = chapter.children.filter((section: any) => !huafaHiddenSectionTitles.has(section.title))
  })
}

function toIndex(value: string | number) { return typeof value === 'number' ? value : Number(value) }
function sectionKey(ci: string | number, si: string | number) { return `${toIndex(ci)}-${toIndex(si)}` }
function moduleKey(ci: string | number, si: string | number, moduleName: string) { return `${sectionKey(ci, si)}-${moduleName}` }
function isChapterOpen(ci: string | number) { return openChapters.value.has(toIndex(ci)) }
function isSectionOpen(ci: string | number, si: string | number) { return openSections.value.has(sectionKey(ci, si)) }
function isModuleOpen(ci: string | number, si: string | number, moduleName: string) { return openModules.value.has(moduleKey(ci, si, moduleName)) }
function isChapterSelected(ci: string | number) { return selectedChapter.value === toIndex(ci) }
function isSectionSelected(ci: string | number, si: string | number) { return selectedSection.value === sectionKey(ci, si) }
function isActiveResource(ci: string | number, si: string | number, type: string) { return activeResource.value?.ci === toIndex(ci) && activeResource.value?.si === toIndex(si) && activeResource.value?.type === type }

function toggleChapter(ci: string | number) {
  const index = toIndex(ci)
  const openSet = new Set(openChapters.value)
  const willOpen = !openSet.has(index)
  willOpen ? openSet.add(index) : openSet.delete(index)
  openChapters.value = openSet
  selectedChapter.value = willOpen ? index : null
  selectedSection.value = null
  resetToIntro()
}

function toggleSection(ci: string | number, si: string | number) {
  const key = sectionKey(ci, si)
  const openSet = new Set(openSections.value)
  const willOpen = !openSet.has(key)
  willOpen ? openSet.add(key) : openSet.delete(key)
  openSections.value = openSet
  selectedChapter.value = toIndex(ci)
  selectedSection.value = willOpen ? key : null
  resetToIntro()
}

function toggleModule(ci: string | number, si: string | number, moduleName: string) {
  const key = moduleKey(ci, si, moduleName)
  const openSet = new Set(openModules.value)
  openSet.has(key) ? openSet.delete(key) : openSet.add(key)
  openModules.value = openSet
}

function resetToIntro() {
  showIntro.value = true
  activePanel.value = null
  activeResource.value = null
}

function loadResource(type: string, sectionTitle: string, ci: string | number, si: string | number) {
  if (!courseData.value || !isResourceType(type)) return
  const chapterIndex = toIndex(ci)
  const sectionIndex = toIndex(si)
  const section = courseData.value.chapters[chapterIndex].children[sectionIndex]
  const copy = panelCopy[type]
  selectedChapter.value = chapterIndex
  selectedSection.value = sectionKey(chapterIndex, sectionIndex)
  showIntro.value = false
  activeResource.value = { ci: chapterIndex, si: sectionIndex, type }
  activePanel.value = { type, group: copy.group, resourceName: RESOURCE_TYPE_NAMES[type] || type, sectionTitle, items: getResourceItems(section, type), emptyTitle: copy.emptyTitle, emptyText: copy.emptyText }
}

function isResourceType(type: string): type is ResourceType { return ['video', 'ppt', 'test', 'correct', 'ai', 'vr'].includes(type) }

function getResourceItems(section: any, type: ResourceType): ResourceItem[] {
  const configured = section.resources?.[type]
  if (Array.isArray(configured) && configured.length) return configured.map((item: ResourceItem) => normalizeResourceItem(item, type))
  const legacyUrl = type === 'vr'
    ? (section.vrUrl || legacyCourseVrUrl(resolveCourseKey(props.curriculumName), section.title))
    : section[type + 'Url']
  if (typeof legacyUrl === 'string' && legacyUrl.trim()) {
    const separator = type === 'vr' ? /[;,]/ : ';'
    return legacyUrl.split(separator).filter((url: string) => url.trim()).map((url: string, index: number) => normalizeResourceItem({ title: `${RESOURCE_TYPE_NAMES[type]}${index > 0 ? ` ${index + 1}` : ''}`, url: url.trim() }, type))
  }
  return []
}

function normalizeResourceItem(item: ResourceItem, type: ResourceType): ResourceItem {
  const url = item.url?.trim() || ''
  if (type === 'vr') return normalizeVrResourceItem(item, url)
  return { ...item, url, previewUrl: resolvePreviewUrl(url, type) }
}

function normalizeVrResourceItem(item: ResourceItem, url: string): ResourceItem {
  const appliId = item.appliId || appliIdFromUrl(url)
  const meta = appliId ? legacyVrMeta[appliId] : undefined
  return {
    ...item,
    url,
    appliId,
    title: meta?.title || item.title || 'VR资源',
    image: meta?.image || item.image || '',
    description: item.description || '点击进入对应的VR虚拟仿真资源。',
    previewUrl: url
  }
}

function appliIdFromUrl(url: string) {
  if (!url) return ''
  try {
    return new URL(url, window.location.origin).searchParams.get('appliId') || ''
  } catch {
    const match = url.match(/[?&]appliId=([^&#]+)/)
    return match ? decodeURIComponent(match[1]) : ''
  }
}

function legacyCourseVrUrl(courseKey: string, sectionTitle: string) {
  const normalized = sectionTitle.trim().replace(/\s+/g, ' ')
  const courseMap = legacyCourseVrUrls[courseKey] || {}
  if (courseMap[normalized]) return courseMap[normalized]
  const compact = normalized.replace(/\s/g, '')
  const compactMatch = Object.keys(courseMap).find(key => key.replace(/\s/g, '') === compact)
  if (compactMatch) return courseMap[compactMatch]
  const numberPrefix = normalized.match(/^(\d+\.\d+)/)?.[1]
  const prefixMatch = numberPrefix ? Object.keys(courseMap).find(key => key.startsWith(numberPrefix)) : ''
  return prefixMatch ? courseMap[prefixMatch] : ''
}

function openVrResource(item: ResourceItem) {
  const appliId = item.appliId || appliIdFromUrl(item.url || '')
  if (!appliId) return
  const title = item.title || 'VR资源'
  const experimentId = item.id || appliId
  const curriculumId = curriculumIdForCourse(props.curriculumName)
  localStorage.setItem('appliId', appliId)
  localStorage.setItem('experimentStr', title)
  localStorage.setItem('publisher', '科明数码')
  localStorage.setItem('zyType', '0')
  localStorage.setItem('status', '1')
  localStorage.setItem('curriculumId', curriculumId)
  localStorage.setItem('experimentId', experimentId)
  localStorage.setItem('experimentFrom', 'curriculum')
  localStorage.setItem('experimentFromName', props.curriculumName)
  localStorage.removeItem('experimentClassifyId')
  localStorage.setItem('sellPoint', `本实验通过虚拟现实技术，直观展示${title}的核心原理和操作流程。\n\n点击下方“开始学习”按钮进入VR实验环境。`)
  window.open(new URL('/enterItem', window.location.origin).toString(), '_blank')
}

function curriculumIdForCourse(name: string) {
  const key = resolveCourseKey(name)
  if (key === 'engineering') return '6'
  if (key === 'hydraulic') return '7'
  return '5'
}

function resolvePreviewUrl(url: string, type: ResourceType) {
  if (!url) return ''
  if (type === 'ppt') return resolvePptPreviewUrl(url, '')
  return url
}

function resolvePptPreviewUrl(url: string, sectionTitle: string) {
  if (!url) return legacyHuafaPptName(sectionTitle) ? pptOssPreviewUrl('', sectionTitle) : ''
  if (/\.pdf(?:[?#]|$)/i.test(url)) return localUploadPdfPreviewUrl(url) || url
  if (/^https?:\/\//i.test(url)) return pptOssPreviewUrl(url, sectionTitle)
  return localUploadPreviewUrl(url) || pptOssPreviewUrl(url, sectionTitle)
}

function pptOssPreviewUrl(url: string, sectionTitle: string) {
  const fileName = resolvePptFileName(url, sectionTitle)
  if (!fileName) return ''
  const params = new URLSearchParams({
    file: fileName,
    source: url || ''
  })
  return `/api/v1/files/ppt-oss-preview/?${params.toString()}`
}

function resolvePptFileName(url: string, sectionTitle: string) {
  if (!url) return legacyHuafaPptName(sectionTitle)
  if (/^https?:\/\//i.test(url)) {
    return legacyHuafaPptName(sectionTitle) || sectionTitleToPptName(sectionTitle) || fileNameFromUrl(url)
  }
  return fileNameFromUrl(url)
}

const huafaPptNameMap: Record<string, string> = {
  '1.1 技术制图国家标准的一般规定': '1.1 技术制图国家标准的一般规定.pptx',
  '1.2 绘图工具的使用方法': '1.2 绘图工具的使用方法.pptx',
  '1.3 几何作图': '1.3 几何作图.pptx',
  '1.4 平面图形分析及画法': '1.4 平面图形的分析及画法.pptx',
  '2.1 投影的基础知识': '2.1投影的基础知识.pptx',
  '2.2 三视图的形成和投影规律': '2.2三视图的形成和投影规律.pptx',
  '2.3 点的投影': '2.3  点的投影.pptx',
  '2.4 直线的投影': '2.4 直线的投影.pptx',
  '2.5 平面的投影': '2.5 平面的投影.pptx',
  '2.6 各种几何元素之间的相互位置': '2.6 各种几何元素间的相对位置.pptx',
  '2.7 换面法': '2.7 换面法.pptx',
  '3.1 平面立体': '3.1 平面立体的视图.pptx',
  '3.2 曲面立体': '3.2 曲面立体.pptx',
  '4.1 截交线': '4.1 截交线.pptx',
  '4.2 相贯线': '4.2 相贯线.pptx',
  '5.1 组合体形体分析': '5.1 组合体的形体分析.pptx',
  '5.2 组合体画图方法': '5.2 组合体的画图方法.pptx',
  '5.3 组合体视图的尺寸注法': '5.3 组合体的尺寸标注方法.pptx',
  '5.4 组合体读图': '5.4 组合体的读图.pptx',
  '6.1 轴测投影概念': '6.1 轴测投影的概念.pptx',
  '6.2 正等轴测图的画法': '6.2 正等轴测图.pptx',
  '6.3 斜二测投影图': '6.3 斜二测图的画法.pptx',
  '7.1 视图': '7.1 视图.pptx',
  '7.2 剖视图': '7.2 剖视图.pptx',
  '7.3 断面图': '7.3 断面图.pptx',
  '7.4 其他表达方法': '7.4 其它表达方法.pptx',
  '7.5 表示方法综合应用和看图': '7.5 表达方法的综合应用和读图.pptx',
  '8.1 螺纹': '8.1 螺纹及螺纹紧固件.pptx',
  '8.2 螺纹紧固件': '8.2 螺纹紧固件及表示法.pptx',
  '8.3 齿轮': '8.3 齿轮及表示法.pptx',
  '8.4 其他标准件': '8.4 键的表示法.pptx',
  '8.5 销': '8.5 销.pptx',
  '8.6 滚动轴承': '8.6 滚动轴承.pptx',
  '9.1 零件图概述': '9.1 零件图概述.pptx',
  '9.2 视图选择及尺寸标注': '9.2  零件图的视图选择及尺寸标注.pptx',
  '9.3 常见典型零件': '9.3 常见典型零件分析.pptx',
  '9.4 零件上常见结构及尺寸标柱': '9.4 零件上常见结构及尺寸标柱.pptx',
  '9.5 读零件图': '9.5 读零件图.pptx',
  '9.6 零件的测绘': '9.6 零件的测绘.pptx',
  '10.1 表面结构': '10.1 表面结构.pptx',
  '10.2 极限与配合的基本概念及标注': '10.2 极限与配合的基本概念及标注.pptx',
  '10.3 几何公差的基本概念及标注': '10.3 几何公差的基本概念及标注.pptx',
  '11.1 装配图基本概念': '11.1 装配图的基本概念.pptx',
  '11.2 装配图表达方法': '11.2  装配图的表达方法.pptx',
  '11.3 画装配图的方法和步骤': '11.3 画装配图的方法和步骤.pptx',
  '11.4 装配图的尺寸标注和技术要求': '11.4  装配图的尺寸标注和技术要求.pptx',
  '11.5 装配图中的序号、明细栏和标题栏': '11.5 装配图中的序号、明细栏和标题栏.pptx',
  '11.6 常见装配结构简介': '11.6 常见装配结构简介.pptx',
  '11.7 装配图读图': '11.7 读装配图.pptx',
  '11.8 装配图拆画零件图': '11.8 由装配图拆画零件图.pptx'
}

function legacyHuafaPptName(sectionTitle: string) {
  const normalized = sectionTitle.trim().replace(/\s+/g, ' ')
  return huafaPptNameMap[normalized] || ''
}

function sectionTitleToPptName(sectionTitle: string) {
  const title = sectionTitle.trim()
  if (!title) return ''
  return title.replace(/^(\d+\.\d+)\s+/, '$1') + '.pptx'
}

function fileNameFromUrl(url: string) {
  if (!url) return ''
  try {
    const parsed = new URL(url, window.location.origin)
    return decodeURIComponent(parsed.pathname.split('/').pop() || '')
  } catch {
    return decodeURIComponent(url.replace(/\\/g, '/').split('/').pop() || '')
  }
}

function trackPptPointer(event: MouseEvent | PointerEvent) {
  if (activePanel.value?.type !== 'ppt' || !resourceFrameWrap.value) {
    pointerNearPptPlay.value = false
    return
  }
  const rect = resourceFrameWrap.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  pointerNearPptPlay.value = x >= rect.width - 92 && y >= rect.height - 74
}

function handlePptIframeInteraction() {
  if (activePanel.value?.type !== 'ppt' || !pointerNearPptPlay.value) return
  window.setTimeout(() => requestPptFullscreen(), 0)
}

function requestPptFullscreen() {
  const element = resourceFrameWrap.value
  if (!element || document.fullscreenElement) return
  const fullscreenTarget = element as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void> | void
    mozRequestFullScreen?: () => Promise<void> | void
    msRequestFullscreen?: () => Promise<void> | void
  }
  if (fullscreenTarget.requestFullscreen) fullscreenTarget.requestFullscreen()
  else if (fullscreenTarget.webkitRequestFullscreen) fullscreenTarget.webkitRequestFullscreen()
  else if (fullscreenTarget.mozRequestFullScreen) fullscreenTarget.mozRequestFullScreen()
  else if (fullscreenTarget.msRequestFullscreen) fullscreenTarget.msRequestFullscreen()
}

function localUploadPreviewUrl(url: string) {
  const marker = '/media/uploads/'
  const index = url.indexOf(marker)
  if (index < 0) return ''
  const relativePath = url.slice(index + marker.length)
  return `/api/v1/files/preview/${relativePath}`
}

function localUploadPdfPreviewUrl(url: string) {
  const marker = '/media/uploads/'
  const index = url.indexOf(marker)
  if (index < 0) return ''
  const relativePath = url.slice(index + marker.length)
  return `/api/v1/files/pdf-inline/${relativePath}`
}

onMounted(() => {
  loadCourseData()
  window.addEventListener('blur', handlePptIframeInteraction, true)
})
onBeforeUnmount(() => {
  window.removeEventListener('blur', handlePptIframeInteraction, true)
})
watch(() => props.curriculumName, loadCourseData)
</script>

<style scoped>
.ai-vr-wrap { width: 100%; min-width: 0; min-height: 720px; margin: 0; display: flex; gap: 20px; overflow: hidden; position: relative; font-family: "Microsoft YaHei", Arial, sans-serif; }
.no-data { width: 100%; min-height: 520px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fff; border-radius: 4px; color: #666; }
.no-data-icon { width: 48px; height: 48px; margin-bottom: 18px; border-radius: 8px; background: #1677ff; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; }
.no-data h2 { font-size: 20px; color: #333; margin-bottom: 12px; }
.catalog-left { width: 220px; height: 720px; overflow-y: auto; overflow-x: hidden; background: #fff; border-radius: 4px; flex-shrink: 0; }
.catalog-left::-webkit-scrollbar { width: 4px; }
.catalog-left::-webkit-scrollbar-track { background: #fff; }
.catalog-left::-webkit-scrollbar-thumb { background: #ccc; border-radius: 2px; }
.catalog-top-bar { padding: 12px 15px; display: flex; justify-content: space-between; align-items: center; }
.catalog-header { display: flex; align-items: center; gap: 8px; }
.catalog-header-icon { width: 24px; height: 24px; background: linear-gradient(#1677ff 0 0) 0 0 / 8px 5px no-repeat, linear-gradient(#1677ff 0 0) 12px 0 / 12px 5px no-repeat, linear-gradient(#1677ff 0 0) 0 9px / 8px 5px no-repeat, linear-gradient(#1677ff 0 0) 12px 9px / 12px 5px no-repeat, linear-gradient(#1677ff 0 0) 0 18px / 8px 5px no-repeat, linear-gradient(#1677ff 0 0) 12px 18px / 12px 5px no-repeat; }
.catalog-header-title { font-size: 20px; font-weight: 600; color: #333; }
.free-tag { background-color: #fff3cd; color: #ffc107; border: 1px solid #ffda6a; font-size: 12px; padding: 4px 12px; border-radius: 20px; font-weight: 400; white-space: nowrap; }
.catalog-line { width: calc(100% - 24px); height: 1px; background: #eee; margin: 0 auto 12px; }
.course-tree { padding: 0 10px 14px; }
.tree-chapter { margin-bottom: 6px; }
.tree-chapter-title, .tree-section-title, .tree-module-title, .tree-item { width: 100%; border: 0; background: #fff; color: #333; cursor: pointer; text-align: left; font-family: inherit; line-height: 1.35; transition: all .2s; }
.tree-chapter-title { min-height: 44px; position: relative; display: grid; grid-template-columns: 24px 1fr 18px; align-items: center; gap: 4px; padding: 8px 8px; border: 1px solid #dcdcdc; border-radius: 8px; font-size: 15px; font-weight: 700; }
.tree-chapter-title:hover, .tree-chapter-title.selected { background: #f5f9ff; border-color: #1677ff; color: #1677ff; }
.chapter-icon { width: 18px; height: 18px; border: 2px solid currentColor; border-radius: 2px; position: relative; display: inline-block; }
.chapter-icon::before, .chapter-icon::after { content: ''; position: absolute; left: 3px; right: 3px; height: 2px; background: currentColor; }
.chapter-icon::before { top: 4px; }
.chapter-icon::after { bottom: 4px; }
.tree-text { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.tree-arrow { font-size: 13px; color: currentColor; text-align: center; }
.tree-children, .tree-modules, .tree-items { display: none; }
.tree-chapter.open > .tree-children, .tree-section.open > .tree-modules, .tree-module.open > .tree-items { display: block; }
.tree-section-title { margin: 6px 0 2px 15px; width: calc(100% - 15px); padding: 8px 8px; border-left: 3px solid transparent; border-radius: 6px; color: #333; font-size: 14px; font-weight: 700; }
.tree-section-title:hover, .tree-section-title.selected { background: #e6f4ff; color: #1677ff; }
.tree-module-title { margin-left: 28px; width: calc(100% - 28px); padding: 8px 8px; border-radius: 6px; color: #333; font-size: 14px; font-weight: 700; }
.tree-module-title:hover { background: #f5f9ff; color: #1677ff; }
.tree-items { padding-left: 35px; }
.tree-item { padding: 9px 8px 9px 10px; border-left: 3px solid transparent; color: #333; font-size: 14px; font-weight: 700; }
.tree-item:hover, .tree-item.active { background: #e6f4ff; border-left-color: #1677ff; color: #1677ff; font-weight: 700; }
.strong { font-weight: 700; }
.catalog-right { flex: 1; min-width: 0; min-height: 700px; background: #fff; border: 1px solid #eee; border-radius: 4px; padding: 25px; overflow: hidden; box-sizing: border-box; }
.catalog-title { font-size: 18px; font-weight: 700; color: #333; margin-bottom: 20px; line-height: 1.5; }
.catalog-sub-title { font-size: 16px; color: #666; margin: 18px 0 10px; font-weight: 600; }
.intro-content { line-height: 1.8; font-size: 15px; color: #333; }
.intro-list { padding-left: 20px; color: #333; font-size: 15px; line-height: 1.8; }
.resource-show { height: 650px; overflow: hidden; }
.res-title { font-size: 18px; font-weight: 700; color: #333; margin-bottom: 15px; }
.res-frame-wrap { position: relative; width: 100%; height: 600px; background: #f7f8fa; overflow: hidden; }
.res-iframe { width: 100%; height: 100%; border: 0; display: block; background: #f7f8fa; }
.ppt-frame-wrap:fullscreen { width: 100vw; height: 100vh; background: #111; }
.ppt-frame-wrap:fullscreen .res-iframe { width: 100vw; height: 100vh; }
.ppt-frame-wrap:-webkit-full-screen { width: 100vw; height: 100vh; background: #111; }
.ppt-frame-wrap:-webkit-full-screen .res-iframe { width: 100vw; height: 100vh; }
.vr-card-container { height: 600px; overflow-y: auto; display: grid; grid-template-columns: repeat(3, 220px); align-content: start; gap: 20px; padding-right: 6px; }
.vr-card { width: 220px; height: 180px; border: 1px solid #e8e8e8; border-radius: 8px; background: #fff; overflow: hidden; cursor: pointer; transition: transform .2s, box-shadow .2s, border-color .2s; }
.vr-card:hover { transform: scale(1.02); box-shadow: 0 4px 12px rgba(0, 0, 0, .1); border-color: #1677ff; }
.vr-card-thumb { height: 130px; background: #f8f9fa; display: flex; align-items: center; justify-content: center; color: #1677ff; font-weight: 700; font-size: 28px; overflow: hidden; }
.vr-card-thumb img { width: 100%; height: 100%; display: block; object-fit: cover; }
.vr-card-body { height: 50px; padding: 0 10px; display: flex; align-items: center; justify-content: center; }
.vr-card-body h3 { width: 100%; font-size: 14px; line-height: 50px; color: #333; font-weight: 400; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.vr-card-body p { display: none; }
.inline-resource-list { display: grid; gap: 12px; }
.inline-resource { border: 1px solid #e5e7eb; border-radius: 4px; padding: 16px; background: #fff; }
.inline-resource h3 { font-size: 16px; margin-bottom: 8px; color: #333; }
.inline-resource p { color: #555; line-height: 1.8; }
.build-tip { height: 600px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: #777; text-align: center; background: #f8fafc; border: 1px dashed #d0d7de; border-radius: 4px; padding: 24px; box-sizing: border-box; }
.build-tip strong { color: #333; font-size: 18px; }
.build-tip p { max-width: 420px; line-height: 1.8; }
@media (max-width: 768px) {
  .ai-vr-wrap { flex-direction: column; }
  .catalog-left { width: 100%; height: auto; max-height: 360px; }
  .catalog-right { width: 100%; min-height: 620px; }
}
</style>
