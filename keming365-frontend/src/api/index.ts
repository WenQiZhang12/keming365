import axios from 'axios'
import type {
  Classify, Curriculum, Experiment, NewsItem,
  PaginatedResponse, LoginResponse, UserInfo
} from '@/types'

const api = axios.create({
  baseURL: '/api/v1',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
})

// 请求拦截器
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 响应拦截器
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    const data = error.response?.data
    const firstFieldError: any = data && typeof data === 'object'
      ? Object.values(data).find(value => Array.isArray(value) || typeof value === 'string')
      : null
    const msg = data?.message || data?.detail
      || (Array.isArray(firstFieldError) ? firstFieldError[0] : firstFieldError)
      || '请求失败'
    return Promise.reject(new Error(msg))
  }
)

// ====== 首页 ======
export async function getClassifies(): Promise<Classify[]> {
  const { data } = await api.get<Classify[] | PaginatedResponse<Classify>>('/home/classify/')
  return Array.isArray(data) ? data : data.results
}

export async function getClassifyExperiments(
  classifyId: number | string, pageSize = 5
): Promise<PaginatedResponse<Experiment>> {
  const { data } = await api.get('/courses/experiments/', {
    params: { classifyId, page_size: pageSize, type: '0' }
  })
  return data
}

export async function getFeaturedExperiments(
  classId: number | string, pageSize = 5
): Promise<PaginatedResponse<Experiment>> {
  const { data } = await api.get('/home/featured-experiments/', {
    params: { classId, page_size: pageSize }
  })
  return data
}

// ====== 课程 ======
export async function getCurricula(params: {
  page?: number; page_size?: number;
  classifyId?: string | number; search?: string
}): Promise<PaginatedResponse<Curriculum>> {
  const { data } = await api.get('/courses/', { params })
  return data
}

export async function getCurriculumDetail(id: string | number): Promise<Curriculum> {
  const { data } = await api.get(`/courses/${id}/`)
  return data
}

export async function getExperiments(params: {
  page?: number; page_size?: number;
  curriculumId?: string | number; classifyId?: string | number;
  search?: string; type?: string
}): Promise<PaginatedResponse<Experiment>> {
  const { data } = await api.get('/courses/experiments/', { params })
  return data
}

export async function getCurriculumClassifies(): Promise<Classify[]> {
  const { data } = await api.get<Classify[] | PaginatedResponse<Classify>>('/courses/classifies/')
  return Array.isArray(data) ? data : data.results
}

// ====== 新闻 ======
export async function getNews(params: {
  page?: number; page_size?: number;
  search?: string; ordering?: string
}): Promise<PaginatedResponse<NewsItem>> {
  const { data } = await api.get('/news/', { params })
  return data
}

export async function getNewsDetail(id: string | number): Promise<NewsItem> {
  const { data } = await api.get(`/news/${id}/`)
  return data
}

// ====== 认证 ======
export async function login(username: string, password: string): Promise<LoginResponse> {
  const { data } = await api.post('/accounts/auth/login/', { username, password })
  return data
}

export async function register(params: {
  username: string; name: string; password: string; telephone?: string
}): Promise<void> {
  await api.post('/accounts/auth/register/', params)
}

export async function getProfile(): Promise<UserInfo> {
  const { data } = await api.get('/accounts/auth/profile/')
  return data
}

export async function logout(): Promise<void> {
  try { await api.post('/accounts/auth/logout/') } catch { /* ignore */ }
}

export interface AiVrContentItem {
  id?: string
  curriculum_id: string
  curriculum_name: string
  chapter_title: string
  chapter_order: number
  section_title: string
  section_order: number
  resource_type: 'video' | 'ppt' | 'test' | 'correct' | 'ai' | 'vr'
  title: string
  url: string
  description: string
  enabled: boolean
  sort_order: number
  createTime?: string
  updateTime?: string
}

export async function getAdminAiVrContents(params: {
  page?: number; search?: string; curriculumName?: string; resourceType?: string
}): Promise<PaginatedResponse<AiVrContentItem>> {
  const { data } = await api.get('/admin/ai-vr/', { params })
  return data
}

export async function createAdminAiVrContent(payload: AiVrContentItem): Promise<AiVrContentItem> {
  const { data } = await api.post('/admin/ai-vr/', payload)
  return data
}

export async function updateAdminAiVrContent(id: string, payload: AiVrContentItem): Promise<AiVrContentItem> {
  const { data } = await api.put(`/admin/ai-vr/${id}/`, payload)
  return data
}

export async function deleteAdminAiVrContent(id: string): Promise<void> {
  await api.delete(`/admin/ai-vr/${id}/`)
}

export async function uploadAdminAiVrFile(file: File, type: string): Promise<{ url: string; sourceUrl?: string; fileName: string; fileType: string; previewReady?: boolean }> {
  const form = new FormData()
  form.append('file', file)
  form.append('type', type)
  const { data } = await api.post('/admin/ai-vr/upload/', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return data
}

export async function getAiVrCourseContent(params: {
  curriculumName?: string; curriculumId?: string | number
}): Promise<any> {
  const { data } = await api.get('/admin/ai-vr/course/', { params })
  return data
}

export interface AiVrAssistantRecommendation {
  id: string
  title: string
  courseName?: string
  chapterTitle?: string
  sectionTitle?: string
  type?: string
  reason?: string
}

export async function askAiVrAssistant(payload: {
  question: string
  curriculumName?: string
  curriculumId?: string | number
}): Promise<{ answer: string; recommendations: AiVrAssistantRecommendation[]; llmEnabled: boolean }> {
  const { data } = await api.post('/admin/ai-vr/assistant/', payload)
  return data
}

export default api
