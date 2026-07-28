<template>
  <div class="study-page">
    <div class="study-shell">
      <div class="toolbar">
        <label>
          <span>学科：</span>
          <select v-model="selectedCourse" @change="handleCourseChange">
            <option value="">[请选择]</option>
            <option v-for="course in courses" :key="course.curriculumId" :value="course.curriculumId">
              {{ course.curriculumStr }}
            </option>
          </select>
        </label>
        <label>
          <span>实验：</span>
          <select v-model="selectedExperiment">
            <option value="">[请选择]</option>
            <option v-for="experiment in experiments" :key="experiment.experimentId" :value="experiment.experimentId">
              {{ experiment.experimentStr }}
            </option>
          </select>
        </label>
        <button class="query-btn" @click="queryScores">查询</button>
      </div>

      <div class="score-table-wrap">
        <table class="score-table">
          <thead>
            <tr>
              <th style="width: 15%">学校</th>
              <th style="width: 10%">姓名</th>
              <th style="width: 20%">课程</th>
              <th style="width: 40%">资源</th>
              <th style="width: 15%">操作成绩</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="5" class="empty-cell">加载中...</td>
            </tr>
            <tr v-else-if="scores.length === 0">
              <td colspan="5" class="empty-cell">暂无实验信息</td>
            </tr>
            <tr v-for="item in scores" v-else :key="item.id">
              <td>{{ item.schoolStr }}</td>
              <td>{{ item.studentName }}</td>
              <td>{{ item.curriculumStr }}</td>
              <td>{{ item.experimentStr }}</td>
              <td>{{ item.operationScore }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="footer-row">
        <div class="page-info">当前第{{ pageInfo.pageNum }}页，总共{{ pageInfo.pages }}页，一共{{ pageInfo.total }}条记录</div>
        <Pagination
          class="pager"
          :page="pageInfo.pageNum"
          :total="pageInfo.total"
          :page-size="10"
          @update:page="loadScores"
        />
        <button class="export-btn" @click="exportScores">导出成绩</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'
import { toast } from '@/utils'
import { useUserStore } from '@/stores/user'
import Pagination from '@/components/Pagination.vue'

interface StudyCourse { curriculumId: string; curriculumStr: string }
interface StudyExperiment { experimentId: string; experimentStr: string }
interface StudyScore {
  id: string
  schoolStr: string
  studentName: string
  curriculumStr: string
  experimentStr: string
  operationScore: string
}

const router = useRouter()
const userStore = useUserStore()
const courses = ref<StudyCourse[]>([])
const experiments = ref<StudyExperiment[]>([])
const scores = ref<StudyScore[]>([])
const selectedCourse = ref('')
const selectedExperiment = ref('')
const loading = ref(false)
const pageInfo = ref({ pageNum: 1, pages: 0, total: 0 })

const redirectToLogin = (message: string) => {
  toast(message, 'error')
  router.replace({ path: '/login', query: { redirect: '/study-management' } })
}

const requireLogin = async () => {
  const storedToken = localStorage.getItem('token') || ''
  if (!userStore.token && storedToken) userStore.token = storedToken
  if (!userStore.token) {
    redirectToLogin('您还没有登录，无法进入学习管理')
    return false
  }

  await userStore.fetchUser()
  if (userStore.isLoggedIn) return true

  redirectToLogin('登录状态已失效，请重新登录')
  return false
}

const loadCourses = async () => {
  try {
    const { data } = await api.get('/scores/study/courses/')
    courses.value = Array.isArray(data) ? data : []
    return true
  } catch (error: any) {
    courses.value = []
    experiments.value = []
    scores.value = []
    toast(error.message || '学科数据加载失败', 'error')
    return false
  }
}

const loadExperiments = async () => {
  selectedExperiment.value = ''
  experiments.value = []
  if (!selectedCourse.value) return
  const { data } = await api.get('/scores/study/experiments/', {
    params: { curriculumId: selectedCourse.value }
  })
  experiments.value = data || []
}

const handleCourseChange = async () => {
  await loadExperiments()
}

const queryScores = () => {
  if (!selectedCourse.value && !selectedExperiment.value) {
    scores.value = []
    pageInfo.value = { pageNum: 1, pages: 0, total: 0 }
    window.alert('请选择检索条件')
    return
  }
  loadScores(1)
}

const loadScores = async (page = 1) => {
  loading.value = true
  try {
    const { data } = await api.get('/scores/study/scores/', {
      params: {
        curriculumId: selectedCourse.value,
        experimentId: selectedExperiment.value,
        page,
        page_size: 10
      }
    })
    scores.value = data.results || []
    pageInfo.value = data.pageInfo || { pageNum: page, pages: 0, total: 0 }
  } finally {
    loading.value = false
  }
}

const exportScores = async () => {
  if (!scores.value.length) {
    toast('请选择要导出的实验数据', 'error')
    return
  }
  const { data } = await api.get('/scores/study/scores/export/', {
    params: {
      curriculumId: selectedCourse.value,
      experimentId: selectedExperiment.value
    },
    responseType: 'blob'
  })
  const url = URL.createObjectURL(data)
  const link = document.createElement('a')
  link.href = url
  link.download = '实验成绩.xlsx'
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

onMounted(async () => {
  if (!(await requireLogin())) return
  if (!(await loadCourses())) return
})
</script>

<style lang="scss" scoped>
.study-page { background: #f4f4f4; min-height: 720px; padding: 30px 0 60px; }
.study-shell { width: 1200px; min-height: 650px; margin: 0 auto; background: #f7f7f7; position: relative; padding: 20px 24px 70px; }
.toolbar { display: flex; align-items: center; gap: 12px; min-height: 60px; border-bottom: 1px solid #ececec; }
.toolbar label { display: inline-flex; align-items: center; gap: 6px; font-size: 18px; font-weight: 700; color: #111; }
.toolbar select { height: 30px; border: 1px solid #777; background: #fff; font-size: 13px; padding: 0 6px; }
.toolbar label:first-child select { width: 100px; }
.toolbar label:nth-child(2) select { width: 400px; }
.query-btn { width: 100px; height: 32px; border-radius: 9px; border: 2px solid #1f2937; background: #428bca; color: #fff; font-size: 16px; font-weight: 700; cursor: pointer; }
.score-table-wrap { padding-top: 20px; min-height: 420px; }
.score-table { width: 96%; margin: 0 auto; border-collapse: collapse; table-layout: fixed; background: #fff; }
.score-table th, .score-table td { border: 1px solid #cad9ea; height: 40px; color: #555; text-align: center; font-size: 16px; padding: 0 10px; word-break: break-all; }
.score-table th { font-weight: 400; background: #fff; }
.score-table tbody tr:nth-child(even) { background: #f5fafa; }
.empty-cell { color: #999; height: 120px !important; }
.footer-row { position: absolute; left: 24px; right: 24px; bottom: 14px; display: flex; align-items: center; justify-content: space-between; gap: 14px; }
.page-info { color: #666; font-size: 13px; }
.pager { position: absolute; left: 50%; transform: translateX(-50%); margin: 0; }
.export-btn { width: 80px; height: 30px; border: none; border-radius: 4px; background: #428bca; color: #fff; cursor: pointer; }
@media(max-width: 1240px) { .study-shell { width: calc(100% - 32px); } }
@media(max-width: 768px) {
  .study-page { padding: 16px 0 40px; }
  .study-shell { width: calc(100% - 20px); padding: 14px 12px 80px; }
  .toolbar { align-items: stretch; flex-direction: column; }
  .toolbar label {
    width: 100%;
    min-width: 0;
    display: grid;
    grid-template-columns: max-content minmax(0, 1fr);
  }
  .toolbar label > span { white-space: nowrap; }
  .toolbar select { width: 100% !important; min-width: 0; }
  .query-btn { width: 100% !important; }
  .score-table th, .score-table td { font-size: 13px; padding: 0 6px; }
  .footer-row { flex-wrap: wrap; }
  .pager { position: static; order: 3; width: 100%; transform: none; }
}
</style>
