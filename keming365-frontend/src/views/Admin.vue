<template>
  <div class="admin-page">
    <div class="admin-shell">
      <header class="admin-header">
        <div>
          <h1>管理后台</h1>
          <p>维护用户、课程和 AI+VR 课程智能体资源</p>
        </div>
      </header>

      <section class="stats-grid">
        <div v-for="item in statsCards" :key="item.label" class="stat-card">
          <strong>{{ item.num }}</strong>
          <span>{{ item.label }}</span>
        </div>
      </section>

      <nav class="tabs">
        <button v-for="tab in tabs" :key="tab.key" :class="{ active: activeTab === tab.key }" @click="switchTab(tab.key)">
          {{ tab.label }}
        </button>
      </nav>

      <section v-if="activeTab === 'users'" class="panel">
        <div class="toolbar">
          <input v-model="userSearch" class="field" placeholder="搜索用户名、姓名、手机号" @input="refreshUsers" />
          <select v-model="userFilter" class="field compact" @change="refreshUsers">
            <option value="">全部用户</option>
            <option value="2">学生</option>
            <option value="1">教师</option>
            <option value="4">管理员</option>
            <option value="8">临时管理员</option>
          </select>
        </div>
        <table class="data-table user-table">
          <colgroup>
            <col class="user-username-col" />
            <col class="user-name-col" />
            <col class="user-phone-col" />
            <col class="user-type-col" />
            <col class="user-created-col" />
            <col class="user-expire-col" />
            <col class="user-action-col" />
          </colgroup>
          <thead>
            <tr>
              <th>用户名</th>
              <th>姓名</th>
              <th>手机</th>
              <th>类型</th>
              <th>注册时间</th>
              <th>到期时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td class="ellipsis-cell" :title="user.username">{{ user.username }}</td>
              <td class="ellipsis-cell" :title="user.name || '-'">{{ user.name || '-' }}</td>
              <td class="ellipsis-cell" :title="user.telephone || '-'">{{ user.telephone || '-' }}</td>
              <td>{{ typeMap[user.type] || '未知' }}</td>
              <td>{{ user.createTime || '-' }}</td>
              <td>{{ user.type === 8 ? (user.expireTime || '-') : '-' }}</td>
              <td><button class="danger-link" @click="deleteUser(user)">删除</button></td>
            </tr>
          </tbody>
        </table>
        <div v-if="!users.length" class="empty">暂无用户数据</div>
        <Pagination :page="userPage" :total="userTotal" :page-size="20" @update:page="goUserPage" />
      </section>

      <section v-else-if="activeTab === 'aiVr'" class="panel ai-vr-panel">
        <div class="toolbar split">
          <div class="toolbar-left">
            <input v-model="aiVrSearch" class="field" placeholder="搜索课程、章节、小节、标题" @input="loadAiVrContents" />
            <select v-model="aiVrTypeFilter" class="field compact" @change="loadAiVrContents">
              <option value="">全部类型</option>
              <option v-for="type in resourceTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
            </select>
          </div>
          <button class="primary-btn" @click="startCreate">新增内容</button>
        </div>

        <div class="editor-grid">
          <form class="edit-form" @submit.prevent="saveAiVrContent">
            <h2>{{ editingId ? '编辑 AI+VR 内容' : '新增 AI+VR 内容' }}</h2>
            <label>课程名称
              <select v-model="selectedCourseId" class="field" required :disabled="coursesLoading" @change="selectExistingCourse">
                <option value="" disabled>{{ coursesLoading ? '课程加载中...' : '请选择 AI+VR 课程' }}</option>
                <option v-for="course in courseOptions" :key="course.id" :value="String(course.id)">{{ course.displayName }}</option>
              </select>
            </label>
            <label>课程 ID<input :value="aiVrForm.curriculum_id" class="field readonly-field" readonly placeholder="选择课程后自动填写" /></label>
            <div class="two-col">
              <label>章标题<input v-model="aiVrForm.chapter_title" class="field" required placeholder="如：2.正投影基础" /></label>
              <label>章排序<input v-model.number="aiVrForm.chapter_order" class="field" type="number" min="0" /></label>
            </div>
            <div class="two-col">
              <label>小节标题<input v-model="aiVrForm.section_title" class="field" required placeholder="如：2.2 三视图的形成和投影规律" /></label>
              <label>小节排序<input v-model.number="aiVrForm.section_order" class="field" type="number" min="0" /></label>
            </div>
            <div class="two-col">
              <label>内容栏目
                <select v-model="aiVrForm.resource_type" class="field">
                  <option v-for="type in resourceTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
                </select>
              </label>
              <label>排序<input v-model.number="aiVrForm.sort_order" class="field" type="number" min="0" /></label>
            </div>
            <label>显示标题<input v-model="aiVrForm.title" class="field" placeholder="可选，默认使用小节标题" /></label>
            <label>资源地址<textarea v-model="aiVrForm.url" class="field textarea" placeholder="可选。视频、PPT、VR可填文件地址；陪你练、帮你改可只填写下方说明"></textarea></label>
            <p v-if="aiVrForm.resource_type === 'ai'" class="form-tip">AI助学会对接大模型并根据学生问题推荐课程，不需要上传资料文件。</p>
            <div class="upload-row">
              <input ref="uploadInput" type="file" class="file-input" @change="uploadAiVrFile" />
              <span>{{ uploading ? '上传中...' : '上传 PPT、视频或资源文件后会自动填入地址' }}</span>
            </div>
            <label>页面展示说明<textarea v-model="aiVrForm.description" class="field textarea short" placeholder="会直接展示在AI+VR课程智能体页面，适合填写练习要求、批改说明、学习提示"></textarea></label>
            <label class="check-row"><input v-model="aiVrForm.enabled" type="checkbox" /> 启用</label>
            <div class="form-actions">
              <button class="primary-btn" type="submit">{{ editingId ? '保存修改' : '创建内容' }}</button>
              <button class="ghost-btn" type="button" @click="resetAiVrForm">清空</button>
            </div>
          </form>

          <div class="content-list">
            <div v-for="item in aiVrContents" :key="item.id" class="resource-row">
              <div>
                <strong>{{ item.curriculum_name }}</strong>
                <p>{{ item.chapter_title }} / {{ item.section_title }}</p>
                <span>{{ resourceLabel(item.resource_type) }} · {{ item.enabled ? '启用' : '停用' }}</span>
              </div>
              <div class="row-actions">
                <button class="text-link" @click="editAiVrContent(item)">编辑</button>
                <button class="danger-link" @click="deleteAiVr(item)">删除</button>
              </div>
            </div>
            <div v-if="!aiVrContents.length" class="empty">暂无 AI+VR 内容，先新增一条吧</div>
            <Pagination :page="aiVrPage" :total="aiVrTotal" :page-size="20" @update:page="goAiVrPage" />
          </div>
        </div>
      </section>

      <section v-else class="panel">
        <div class="system-grid">
          <div><span>系统状态</span><strong>正常运行</strong></div>
          <div><span>当前时间</span><strong>{{ currentTime }}</strong></div>
          <div><span>API 地址</span><strong>{{ apiBase }}</strong></div>
          <div><span>登录状态</span><strong>{{ isLoggedIn ? '已登录' : '未登录' }}</strong></div>
          <div><span>用户类型</span><strong>{{ userTypeLabel }}</strong></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api, {
  createAdminAiVrContent,
  deleteAdminAiVrContent,
  getAdminAiVrContents,
  getCurricula,
  updateAdminAiVrContent,
  uploadAdminAiVrFile,
  type AiVrContentItem
} from '@/api'
import { hasAdminAccess, toast } from '@/utils'
import { useUserStore } from '@/stores/user'
import Pagination from '@/components/Pagination.vue'

type TabKey = 'users' | 'aiVr' | 'system'
type CourseOption = { id: string | number; curriculumName: string; displayName: string }

const router = useRouter()
const userStore = useUserStore()
const activeTab = ref<TabKey>('users')
const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'users', label: '用户管理' },
  { key: 'aiVr', label: 'AI+VR内容' },
  { key: 'system', label: '系统信息' }
]

const resourceTypes: Array<{ value: AiVrContentItem['resource_type']; label: string }> = [
  { value: 'video', label: '带你学：课程视频' },
  { value: 'ppt', label: '带你学：课程PPT' },
  { value: 'test', label: '陪你练：在线测验' },
  { value: 'correct', label: '帮你改：在线批改' },
  { value: 'ai', label: '助你学：AI助学' },
  { value: 'vr', label: '助你学：VR资源' }
]

const typeMap: Record<number, string> = { 1: '教师', 2: '学生', 4: '管理员', 5: '普通用户', 8: '临时管理员' }
const apiBase = '/api/v1'
const isLoggedIn = computed(() => !!localStorage.getItem('token'))
const canAccessAdmin = computed(() => hasAdminAccess(userStore.user))
const userTypeLabel = computed(() => typeMap[userStore.user?.type ?? -1] || '普通用户')

const users = ref<any[]>([])
const userTotal = ref(0)
const userPage = ref(1)
const userSearch = ref('')
const userFilter = ref('')

const aiVrContents = ref<AiVrContentItem[]>([])
const aiVrTotal = ref(0)
const aiVrPage = ref(1)
const aiVrSearch = ref('')
const aiVrTypeFilter = ref('')
const editingId = ref('')
const uploading = ref(false)
const uploadInput = ref<HTMLInputElement | null>(null)
const courseOptions = ref<CourseOption[]>([])
const selectedCourseId = ref('')
const coursesLoading = ref(false)
const aiVrCourseNames: Record<string, string> = {
  '画法几何与机械制图': '画法几何与机械制图',
  '液压与气压传动': '液压与气压传动',
  '工程机械': '工程训练',
  '工程训练': '工程训练'
}

const emptyAiVrForm = (): AiVrContentItem => ({
  curriculum_id: '',
  curriculum_name: '',
  chapter_title: '',
  chapter_order: 0,
  section_title: '',
  section_order: 0,
  resource_type: 'video',
  title: '',
  url: '',
  description: '',
  enabled: true,
  sort_order: 0
})
const aiVrForm = ref<AiVrContentItem>(emptyAiVrForm())

const statsCards = ref([
  { num: 0, label: '总用户' },
  { num: 0, label: '总课程' },
  { num: 0, label: '总实验' },
  { num: 0, label: '总订单' }
])

const currentTime = ref('')
let timer: number | undefined

function resourceLabel(type: string) {
  return resourceTypes.find(item => item.value === type)?.label || type
}

function updateTime() {
  currentTime.value = new Date().toLocaleString('zh-CN')
}

async function loadStats() {
  try {
    const { data } = await api.get('/admin/dashboard/')
    statsCards.value = [
      { num: data.userCount || 0, label: '总用户' },
      { num: data.courseCount || 0, label: '总课程' },
      { num: data.experimentCount || 0, label: '总实验' },
      { num: data.orderCount || 0, label: '总订单' }
    ]
  } catch {
    // Dashboard is non-critical.
  }
}

async function loadUsers() {
  try {
    const { data } = await api.get('/admin/users/', {
      params: { page: userPage.value, search: userSearch.value, type: userFilter.value }
    })
    users.value = data.results || []
    userTotal.value = data.count || 0
  } catch (error: any) {
    if (userPage.value > 1) {
      userPage.value = 1
      return loadUsers()
    }
    users.value = []
    userTotal.value = 0
    toast(error.message || '加载用户失败', 'error')
  }
}

function refreshUsers() {
  userPage.value = 1
  loadUsers()
}

function goUserPage(value: number) {
  userPage.value = value
  loadUsers()
}

async function loadAiVrContents() {
  try {
    const data = await getAdminAiVrContents({
      page: aiVrPage.value,
      search: aiVrSearch.value,
      resourceType: aiVrTypeFilter.value
    })
    aiVrContents.value = data.results || []
    aiVrTotal.value = data.count || 0
  } catch (error: any) {
    toast(error.message || '加载 AI+VR 内容失败', 'error')
  }
}

async function loadCourseOptions() {
  if (coursesLoading.value || courseOptions.value.length) return
  coursesLoading.value = true
  try {
    const data = await getCurricula({ page: 1, page_size: 100 })
    courseOptions.value = (data.results || [])
      .filter(course => Boolean(aiVrCourseNames[course.curriculumName || '']))
      .map(course => ({
        id: course.id,
        curriculumName: course.curriculumName || '',
        displayName: aiVrCourseNames[course.curriculumName || '']
      }))
      .sort((a, b) => a.displayName.localeCompare(b.displayName, 'zh-CN'))
    if (editingId.value) syncCourseSelectionFromForm()
  } catch (error: any) {
    toast(error.message || '加载课程列表失败', 'error')
  } finally {
    coursesLoading.value = false
  }
}

function goAiVrPage(value: number) {
  aiVrPage.value = value
  loadAiVrContents()
}

function switchTab(tab: TabKey) {
  activeTab.value = tab
  refreshCurrent()
}

function refreshCurrent() {
  if (activeTab.value === 'users') loadUsers()
  if (activeTab.value === 'aiVr') {
    loadAiVrContents()
    loadCourseOptions()
  }
  if (activeTab.value === 'system') updateTime()
}

async function deleteUser(user: any) {
  if (!confirm(`确认彻底删除用户“${user.username}”？\n该用户的成绩、订单、课程记录等历史数据将一并删除，且无法恢复。`)) return
  if (!confirm(`请再次确认：确定要删除用户“${user.username}”吗？\n这是最后一次确认，删除后无法恢复。`)) return
  try {
    const { data } = await api.delete(`/admin/users/${user.id}/`)
    toast(data.message || '用户及关联历史数据已删除', 'success')
    loadUsers()
  } catch (error: any) {
    toast(error.message || '删除失败', 'error')
  }
}

function startCreate() {
  resetAiVrForm()
  loadCourseOptions()
}

function editAiVrContent(item: AiVrContentItem) {
  editingId.value = item.id || ''
  aiVrForm.value = { ...item }
  syncCourseSelectionFromForm()
}

function selectExistingCourse() {
  const selected = courseOptions.value.find(course => String(course.id) === selectedCourseId.value)
  aiVrForm.value.curriculum_id = selected ? String(selected.id) : ''
  aiVrForm.value.curriculum_name = selected?.curriculumName || ''
}

function syncCourseSelectionFromForm() {
  const match = courseOptions.value.find(course => (
    (aiVrForm.value.curriculum_id && String(course.id) === String(aiVrForm.value.curriculum_id))
    || course.curriculumName === aiVrForm.value.curriculum_name
  ))
  if (match) {
    selectedCourseId.value = String(match.id)
    aiVrForm.value.curriculum_id = String(match.id)
    aiVrForm.value.curriculum_name = match.curriculumName
    return
  }
  selectedCourseId.value = ''
}

function resetAiVrForm() {
  editingId.value = ''
  aiVrForm.value = emptyAiVrForm()
  selectedCourseId.value = ''
  if (uploadInput.value) uploadInput.value.value = ''
}

async function saveAiVrContent() {
  if (!selectedCourseId.value) {
    toast('请选择 AI+VR 课程', 'error')
    return
  }
  try {
    if (editingId.value) {
      await updateAdminAiVrContent(editingId.value, aiVrForm.value)
      toast('AI+VR 内容已更新', 'success')
    } else {
      await createAdminAiVrContent(aiVrForm.value)
      toast('AI+VR 内容已创建', 'success')
    }
    resetAiVrForm()
    loadAiVrContents()
  } catch (error: any) {
    toast(error.message || '保存失败', 'error')
  }
}

async function uploadAiVrFile(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  uploading.value = true
  try {
    const result = await uploadAdminAiVrFile(file, aiVrForm.value.resource_type)
    aiVrForm.value.url = result.url
    if (!aiVrForm.value.title) aiVrForm.value.title = result.fileName
    if (aiVrForm.value.resource_type === 'ppt' && result.previewReady === false) {
      toast('PPT 已上传，但服务器未能生成完整预览，请安装 PowerPoint 后重试', 'error')
    } else {
      toast('上传成功，地址已填入', 'success')
    }
  } catch (error: any) {
    toast(error.message || '上传失败', 'error')
  } finally {
    uploading.value = false
  }
}

async function deleteAiVr(item: AiVrContentItem) {
  if (!item.id || !confirm(`确认删除“${item.title || item.section_title}”？`)) return
  try {
    await deleteAdminAiVrContent(item.id)
    toast('已删除 AI+VR 内容', 'success')
    loadAiVrContents()
  } catch (error: any) {
    toast(error.message || '删除失败', 'error')
  }
}

onMounted(() => {
  if (!isLoggedIn.value) {
    toast('请先登录', 'error')
    router.push('/login')
    return
  }
  if (!canAccessAdmin.value) {
    toast('您没有后台访问权限', 'error')
    router.push('/')
    return
  }
  updateTime()
  timer = window.setInterval(updateTime, 1000)
  loadStats()
  refreshCurrent()
})

onUnmounted(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.admin-page { background: #f4f6f9; min-height: 70vh; padding: 24px 0 36px; }
.admin-shell { max-width: 1240px; margin: 0 auto; padding: 0 20px; }
.admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;
  h1 { font-size: 28px; color: #172554; margin: 0 0 6px; }
  p { color: #64748b; margin: 0; }
}
.stats-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin-bottom: 16px; }
.stat-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;
  strong { display: block; color: #0f766e; font-size: 28px; line-height: 1.1; }
  span { color: #64748b; font-size: 13px; }
}
.tabs { display: flex; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px 8px 0 0; overflow: hidden;
  button { flex: 1; min-height: 46px; border: 0; background: #fff; color: #475569; cursor: pointer; font-size: 14px; }
  button.active { background: #172554; color: #fff; font-weight: 600; }
}
.panel { background: #fff; border: 1px solid #e2e8f0; border-top: 0; border-radius: 0 0 8px 8px; padding: 20px; }
.toolbar { display: flex; gap: 10px; align-items: center; margin-bottom: 14px; flex-wrap: wrap; }
.toolbar.split { justify-content: space-between; }
.toolbar-left { display: flex; gap: 10px; flex-wrap: wrap; }
.field { width: 100%; min-height: 38px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 10px; outline: none; background: #fff; }
.field:focus { border-color: #0f766e; box-shadow: 0 0 0 3px rgba(15, 118, 110, .12); }
.toolbar .field { width: 280px; }
.field.compact { width: 160px; }
.textarea { min-height: 86px; resize: vertical; }
.textarea.short { min-height: 62px; }
.primary-btn, .ghost-btn { min-height: 38px; border-radius: 6px; padding: 0 16px; cursor: pointer; }
.primary-btn { border: 1px solid #0f766e; background: #0f766e; color: #fff; }
.ghost-btn { border: 1px solid #cbd5e1; background: #fff; color: #334155; }
.data-table { width: 100%; border-collapse: collapse;
  th, td { border-bottom: 1px solid #edf2f7; padding: 11px 8px; text-align: left; font-size: 13px; vertical-align: top; }
  th { color: #475569; background: #f8fafc; font-weight: 600; }
}
.user-table { table-layout: fixed;
  .user-username-col { width: 17%; }
  .user-name-col { width: 12%; }
  .user-phone-col { width: 15%; }
  .user-type-col { width: 9%; }
  .user-created-col { width: 18%; }
  .user-expire-col { width: 21%; }
  .user-action-col { width: 8%; }
  th, td { white-space: nowrap; }
  .ellipsis-cell { overflow: hidden; text-overflow: ellipsis; }
}
.text-link, .danger-link { border: 0; background: transparent; cursor: pointer; padding: 0; }
.text-link { color: #0f766e; }
.danger-link { color: #dc2626; }
.empty { text-align: center; padding: 34px 12px; color: #94a3b8; }
.editor-grid { display: grid; grid-template-columns: minmax(360px, 440px) 1fr; gap: 18px; align-items: start; }
.edit-form { border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; background: #fbfdff;
  h2 { font-size: 17px; color: #172554; margin: 0 0 14px; }
  label { display: block; color: #334155; font-size: 13px; margin-bottom: 12px; }
}
.readonly-field { color: #64748b; background: #f1f5f9; cursor: default; }
.two-col { display: grid; grid-template-columns: 1fr 110px; gap: 10px; }
.form-tip { margin: -6px 0 12px; color: #0f766e; font-size: 12px; line-height: 1.6; }
.upload-row { display: flex; gap: 10px; align-items: center; color: #64748b; font-size: 12px; margin-bottom: 12px; }
.file-input { max-width: 220px; }
.check-row { display: flex !important; align-items: center; gap: 8px; }
.form-actions { display: flex; gap: 10px; }
.content-list { display: grid; gap: 10px; }
.resource-row { display: flex; justify-content: space-between; gap: 12px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px;
  strong { color: #172554; }
  p { margin: 6px 0; color: #475569; }
  span { color: #64748b; font-size: 12px; }
}
.row-actions { display: flex; gap: 10px; align-items: center; flex-shrink: 0; }
.system-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px;
  div { border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; }
  span { display: block; color: #64748b; font-size: 13px; margin-bottom: 6px; }
  strong { color: #172554; }
}

@media (max-width: 900px) {
  .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .editor-grid { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .admin-header { align-items: flex-start; flex-direction: column; gap: 12px; }
  .stats-grid { grid-template-columns: 1fr; }
  .tabs { overflow-x: auto; }
  .tabs button { min-width: 110px; }
  .toolbar .field, .field.compact { width: 100%; }
  .toolbar-left { width: 100%; }
  .two-col { grid-template-columns: 1fr; }
}
</style>
