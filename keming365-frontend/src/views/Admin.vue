<template>
  <div class="admin-page">
    <div class="admin-shell">
      <header class="admin-header">
        <div>
          <h1>管理后台</h1>
          <p>维护平台用户和基础数据</p>
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
        <div class="toolbar split">
          <div class="toolbar-left">
            <input v-model="userSearch" class="field" placeholder="搜索用户名、姓名、手机号" @input="refreshUsers" />
            <select v-model="userFilter" class="field compact" @change="refreshUsers">
              <option value="">全部用户</option>
              <option value="2">学生</option>
              <option value="1">教师</option>
              <option value="4">管理员</option>
              <option value="5">普通用户</option>
              <option value="8">临时管理员</option>
            </select>
          </div>
          <button class="primary-btn" type="button" @click="openCreateUser">新增用户</button>
        </div>
        <table class="data-table user-table">
          <colgroup>
            <col class="user-username-col" />
            <col class="user-name-col" />
            <col class="user-phone-col" />
            <col class="user-type-col" />
            <col class="user-status-col" />
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
              <th>状态</th>
              <th>创建时间</th>
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
              <td><span :class="['status-badge', user.enabled ? 'enabled' : 'disabled']">{{ user.enabled ? '启用' : '禁用' }}</span></td>
              <td>{{ user.createTime || '-' }}</td>
              <td>{{ user.type === 8 ? (user.expireTime || '-') : '-' }}</td>
              <td>
                <div class="row-actions">
                  <button class="text-link" type="button" @click="openEditUser(user)">编辑</button>
                  <button class="text-link" type="button" :disabled="isCurrentUser(user)" @click="toggleUserStatus(user)">{{ user.enabled ? '禁用' : '启用' }}</button>
                  <button class="danger-link" type="button" :disabled="isCurrentUser(user)" @click="deleteUser(user)">删除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="!users.length" class="empty">暂无用户数据</div>
        <Pagination :page="userPage" :total="userTotal" :page-size="20" @update:page="goUserPage" />
      </section>

      <div v-if="showUserEditor" class="modal-backdrop" @click.self="closeUserEditor">
        <form class="user-modal" @submit.prevent="saveUser">
          <div class="modal-header">
            <div>
              <h2>{{ editingUserId ? '编辑用户' : '新增用户' }}</h2>
              <p>{{ editingUserId ? '维护用户资料、身份和临时权限期限' : '创建新的平台账号' }}</p>
            </div>
            <button class="icon-close" type="button" aria-label="关闭" @click="closeUserEditor">×</button>
          </div>
          <div class="user-form-grid">
            <label>用户名<input v-model.trim="userForm.username" class="field" maxlength="255" required /></label>
            <label>姓名<input v-model.trim="userForm.name" class="field" maxlength="20" /></label>
            <label>手机号<input v-model.trim="userForm.telephone" class="field" maxlength="11" inputmode="numeric" /></label>
            <label>邮箱<input v-model.trim="userForm.email" class="field" type="email" maxlength="50" /></label>
            <label>用户身份
              <select v-model.number="userForm.type" class="field" :disabled="editingCurrentUser">
                <option :value="2">学生</option>
                <option :value="1">教师</option>
                <option :value="5">普通用户</option>
                <option :value="4">管理员</option>
                <option :value="8">临时管理员</option>
              </select>
            </label>
            <label v-if="userForm.type === 8">到期时间<input v-model="userForm.expireTime" class="field" type="datetime-local" required :disabled="editingCurrentUser" /></label>
            <label v-if="!editingUserId">初始密码<input v-model="userForm.password" class="field" type="password" minlength="8" required autocomplete="new-password" /></label>
          </div>
          <div v-if="editingUserId" class="password-reset">
            <label>重置密码<input v-model="resetPasswordValue" class="field" type="password" minlength="8" placeholder="输入至少8位新密码" autocomplete="new-password" /></label>
            <button class="ghost-btn" type="button" :disabled="resetPasswordValue.length < 8 || savingUser" @click="resetUserPassword">确认重置</button>
          </div>
          <p v-if="editingCurrentUser" class="form-tip current-user-tip">当前登录账号不能变更自身身份；禁用和删除操作已在用户列表中锁定。</p>
          <div class="modal-actions">
            <button class="ghost-btn" type="button" @click="closeUserEditor">取消</button>
            <button class="primary-btn" type="submit" :disabled="savingUser">{{ savingUser ? '保存中...' : '保存用户' }}</button>
          </div>
        </form>
      </div>

      <section v-if="false" class="panel ai-vr-panel">
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
            <label>章标题
              <select
                v-model="aiVrForm.chapter_title"
                class="field"
                required
                :disabled="!selectedCourseId"
                @change="selectChapter"
              >
                <option value="" disabled>{{ selectedCourseId ? '请选择章标题' : '请先选择课程' }}</option>
                <option v-for="chapter in chapterOptions" :key="chapter.title" :value="chapter.title">{{ chapter.title }}</option>
              </select>
            </label>
            <label>小节标题
              <select
                v-model="aiVrForm.section_title"
                class="field"
                required
                :disabled="!aiVrForm.chapter_title"
                @change="selectSection"
              >
                <option value="" disabled>{{ aiVrForm.chapter_title ? '请选择小节标题' : '请先选择章标题' }}</option>
                <option v-for="section in sectionOptions" :key="section.title" :value="section.title">{{ section.title }}</option>
              </select>
            </label>
            <label>内容栏目
              <select v-model="aiVrForm.resource_type" class="field">
                <option v-for="type in resourceTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
              </select>
            </label>
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

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
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
import { aiVrCourseData } from '@/data/aiVrCourses'

type TabKey = 'users'
type CourseOption = { id: string | number; curriculumName: string; displayName: string }
type AdminUser = {
  id: string; username: string; name?: string; telephone?: string; email?: string
  type: number; enabled: boolean; createTime?: string; expireTime?: string | null
}
type UserForm = {
  username: string; name: string; telephone: string; email: string
  type: number; expireTime: string; password: string
}

const router = useRouter()
const userStore = useUserStore()
const activeTab = ref<TabKey>('users')
const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'users', label: '用户管理' }
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
const isLoggedIn = computed(() => !!localStorage.getItem('token'))
const canAccessAdmin = computed(() => hasAdminAccess(userStore.user))

const users = ref<AdminUser[]>([])
const userTotal = ref(0)
const userPage = ref(1)
const userSearch = ref('')
const userFilter = ref('')
const showUserEditor = ref(false)
const editingUserId = ref('')
const savingUser = ref(false)
const resetPasswordValue = ref('')
const emptyUserForm = (): UserForm => ({
  username: '', name: '', telephone: '', email: '',
  type: 2, expireTime: '', password: ''
})
const userForm = ref<UserForm>(emptyUserForm())
const editingCurrentUser = computed(() => Boolean(editingUserId.value) && String(editingUserId.value) === String(userStore.user?.id || ''))

const aiVrContents = ref<AiVrContentItem[]>([])
const aiVrTotal = ref(0)
const aiVrPage = ref(1)
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
const selectedCourseOption = computed(() => (
  courseOptions.value.find(course => String(course.id) === selectedCourseId.value)
))
const chapterOptions = computed(() => (
  aiVrCourseData[selectedCourseOption.value?.displayName || '']?.chapters || []
))
const sectionOptions = computed(() => (
  chapterOptions.value.find(chapter => chapter.title === aiVrForm.value.chapter_title)?.children || []
))

const statsCards = ref([
  { num: 0, label: '总用户' },
  { num: 0, label: '总课程' },
  { num: 0, label: '总实验' },
  { num: 0, label: '总订单' }
])

function resourceLabel(type: string) {
  return resourceTypes.find(item => item.value === type)?.label || type
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

function isCurrentUser(user: AdminUser) {
  return String(user.id) === String(userStore.user?.id || '')
}

function toLocalDateTime(value?: string | null) {
  if (!value) return ''
  const date = new Date(value.replace(' ', 'T'))
  if (Number.isNaN(date.getTime())) return ''
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 16)
}

function openCreateUser() {
  editingUserId.value = ''
  userForm.value = emptyUserForm()
  resetPasswordValue.value = ''
  showUserEditor.value = true
}

function openEditUser(user: AdminUser) {
  editingUserId.value = user.id
  userForm.value = {
    username: user.username || '',
    name: user.name || '',
    telephone: user.telephone || '',
    email: user.email || '',
    type: user.type,
    expireTime: toLocalDateTime(user.expireTime),
    password: ''
  }
  resetPasswordValue.value = ''
  showUserEditor.value = true
}

function closeUserEditor() {
  if (savingUser.value) return
  showUserEditor.value = false
  editingUserId.value = ''
  resetPasswordValue.value = ''
}

function userPayload() {
  return {
    username: userForm.value.username,
    name: userForm.value.name,
    telephone: userForm.value.telephone,
    email: userForm.value.email,
    type: userForm.value.type,
    expireTime: userForm.value.type === 8 && userForm.value.expireTime
      ? new Date(userForm.value.expireTime).toISOString()
      : null
  }
}

async function saveUser() {
  if (userForm.value.type === 8 && !userForm.value.expireTime) {
    toast('请设置临时管理员到期时间', 'error')
    return
  }
  if (editingUserId.value) {
    if (!confirm(`确认保存用户“${userForm.value.username}”的修改？`)) return
    if (!confirm(`请再次确认：保存后将立即更新用户“${userForm.value.username}”的资料和权限。`)) return
  }
  savingUser.value = true
  try {
    if (editingUserId.value) {
      await api.patch(`/admin/users/${editingUserId.value}/`, userPayload())
      toast('用户资料已更新', 'success')
    } else {
      await api.post('/admin/users/', { ...userPayload(), password: userForm.value.password })
      toast('用户已创建', 'success')
    }
    showUserEditor.value = false
    editingUserId.value = ''
    resetPasswordValue.value = ''
    refreshUsers()
    loadStats()
  } catch (error: any) {
    toast(error.message || '保存用户失败', 'error')
  } finally {
    savingUser.value = false
  }
}

async function resetUserPassword() {
  if (!editingUserId.value || resetPasswordValue.value.length < 8) return
  if (!confirm(`确认重置用户“${userForm.value.username}”的密码？`)) return
  savingUser.value = true
  try {
    await api.post(`/admin/users/${editingUserId.value}/reset-password/`, { newPassword: resetPasswordValue.value })
    resetPasswordValue.value = ''
    toast('密码已重置', 'success')
  } catch (error: any) {
    toast(error.message || '重置密码失败', 'error')
  } finally {
    savingUser.value = false
  }
}

async function toggleUserStatus(user: AdminUser) {
  if (isCurrentUser(user)) return
  const action = user.enabled ? '禁用' : '启用'
  if (!confirm(`确认${action}用户“${user.username}”？`)) return
  try {
    await api.patch(`/admin/users/${user.id}/`, { enabled: !user.enabled })
    toast(`用户已${action}`, 'success')
    loadUsers()
  } catch (error: any) {
    toast(error.message || `${action}失败`, 'error')
  }
}

async function loadAiVrContents() {
  try {
    const data = await getAdminAiVrContents({
      page: aiVrPage.value
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
}

async function deleteUser(user: AdminUser) {
  if (isCurrentUser(user)) return
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

function editAiVrContent(item: AiVrContentItem) {
  editingId.value = item.id || ''
  aiVrForm.value = { ...item }
  syncCourseSelectionFromForm()
}

function selectExistingCourse() {
  const selected = courseOptions.value.find(course => String(course.id) === selectedCourseId.value)
  aiVrForm.value.curriculum_id = selected ? String(selected.id) : ''
  aiVrForm.value.curriculum_name = selected?.curriculumName || ''
  aiVrForm.value.chapter_title = ''
  aiVrForm.value.chapter_order = 0
  aiVrForm.value.section_title = ''
  aiVrForm.value.section_order = 0
}

function selectChapter() {
  const chapterIndex = chapterOptions.value.findIndex(chapter => (
    chapter.title === aiVrForm.value.chapter_title
  ))
  aiVrForm.value.chapter_order = Math.max(chapterIndex, 0)
  aiVrForm.value.section_title = ''
  aiVrForm.value.section_order = 0
}

function selectSection() {
  const sectionIndex = sectionOptions.value.findIndex(section => (
    section.title === aiVrForm.value.section_title
  ))
  aiVrForm.value.section_order = Math.max(sectionIndex, 0)
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
  aiVrForm.value.title = ''
  aiVrForm.value.sort_order = 0
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
  loadStats()
  refreshCurrent()
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
  .user-username-col { width: 15%; }
  .user-name-col { width: 10%; }
  .user-phone-col { width: 11%; }
  .user-type-col { width: 8%; }
  .user-status-col { width: 7%; }
  .user-created-col { width: 15%; }
  .user-expire-col { width: 17%; }
  .user-action-col { width: 17%; }
  th, td { white-space: nowrap; }
  .ellipsis-cell { overflow: hidden; text-overflow: ellipsis; }
}
.text-link, .danger-link { border: 0; background: transparent; cursor: pointer; padding: 0; white-space: nowrap; }
.text-link { color: #0f766e; }
.danger-link { color: #dc2626; }
.text-link:disabled, .danger-link:disabled { color: #94a3b8; cursor: not-allowed; }
.status-badge { display: inline-flex; align-items: center; min-height: 24px; padding: 0 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
.status-badge.enabled { color: #047857; background: #d1fae5; }
.status-badge.disabled { color: #b91c1c; background: #fee2e2; }
.empty { text-align: center; padding: 34px 12px; color: #94a3b8; }
.modal-backdrop { position: fixed; z-index: 1000; inset: 0; display: grid; place-items: center; padding: 24px; background: rgba(15, 23, 42, .48); }
.user-modal { width: min(760px, 100%); max-height: calc(100vh - 48px); overflow-y: auto; border-radius: 8px; padding: 22px; background: #fff; box-shadow: 0 24px 70px rgba(15, 23, 42, .24); }
.modal-header { display: flex; justify-content: space-between; gap: 20px; margin-bottom: 18px;
  h2 { margin: 0 0 5px; color: #172554; font-size: 21px; }
  p { margin: 0; color: #64748b; font-size: 13px; }
}
.icon-close { width: 34px; height: 34px; border: 0; background: transparent; color: #64748b; font-size: 26px; line-height: 1; cursor: pointer; }
.user-form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px;
  label { color: #334155; font-size: 13px; }
  .field { margin-top: 6px; }
}
.password-reset { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: end; gap: 10px; margin-top: 18px; padding-top: 18px; border-top: 1px solid #e2e8f0;
  label { color: #334155; font-size: 13px; }
  .field { margin-top: 6px; }
}
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
.editor-grid { display: grid; grid-template-columns: minmax(360px, 440px) 1fr; gap: 18px; align-items: start; }
.edit-form { border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; background: #fbfdff;
  h2 { font-size: 17px; color: #172554; margin: 0 0 14px; }
  label { display: block; color: #334155; font-size: 13px; margin-bottom: 12px; }
}
.readonly-field { color: #64748b; background: #f1f5f9; cursor: default; }
.form-tip { margin: -6px 0 12px; color: #0f766e; font-size: 12px; line-height: 1.6; }
.current-user-tip { margin: 10px 0 0; }
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
  .user-form-grid, .password-reset { grid-template-columns: 1fr; }
}
</style>
