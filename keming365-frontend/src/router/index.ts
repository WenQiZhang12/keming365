import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 }
  },
  routes: [
    { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
    { path: '/qbkc', name: 'Courses', component: () => import('@/views/Courses.vue') },
    { path: '/xwzx', name: 'News', component: () => import('@/views/News.vue') },
    { path: '/xwzx/:id', alias: '/news/:id', name: 'NewsDetail', component: () => import('@/views/NewsDetail.vue') },
    { path: '/ptjj', name: 'Platform', component: () => import('@/views/Platform.vue') },
    { path: '/digital-textbooks', name: 'DigitalTextbooks', component: () => import('@/views/DigitalTextbooks.vue') },
    { path: '/about', name: 'About', component: () => import('@/views/About.vue') },
    { path: '/zzch', name: 'Video', component: () => import('@/views/Video.vue') },
    { path: '/login', name: 'Login', component: () => import('@/views/Login.vue'), meta: { hideLayout: true } },
    { path: '/register', name: 'Register', component: () => import('@/views/Register.vue'), meta: { hideLayout: true } },
    { path: '/enterItem', name: 'EnterItem', component: () => import('@/views/Experiment.vue') },
    { path: '/experiment/:id', name: 'Experiment', component: () => import('@/views/Experiment.vue') },
    { path: '/lesson', name: 'Lesson', component: () => import('@/views/Lesson.vue') },
    { path: '/study-management', name: 'StudyManagement', component: () => import('@/views/StudyManagement.vue') },
    { path: '/files', name: 'Files', component: () => import('@/views/Files.vue') },
    { path: '/admin', name: 'Admin', component: () => import('@/views/Admin.vue') },
    { path: '/review-report', name: 'ReviewReport', component: () => import('@/views/ReviewReport.vue') },
    { path: '/student-reports', name: 'StudentReports', component: () => import('@/views/StudentReports.vue') },
    { path: '/teacher-reports', name: 'TeacherReports', component: () => import('@/views/TeacherReports.vue') },
    { path: '/api-test', name: 'ApiTest', component: () => import('@/views/ApiTest.vue') },
    { path: '/create-admin', name: 'CreateAdmin', component: () => import('@/views/CreateAdmin.vue'), meta: { hideLayout: true } },
  ]
})

export default router
