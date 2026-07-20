<template>
  <header class="header">
    <div class="top-bar">
      <div class="top-inner">
        <div class="logo" @click="$router.push('/')">
          <img src="https://www.keming365.com:443/images/header_logos.png" alt="科明365 AI+VR 数智教学云平台" />
        </div>
        <nav class="main-nav">
          <router-link to="/" :class="{ active: isNavActive('/') }">首页</router-link>
          <router-link to="/ptjj" :class="{ active: isNavActive('/ptjj') }">平台简介</router-link>
          <button class="nav-text nav-button" :class="{ active: route.path.startsWith('/study-management') }" @click="goStudyManagement">学习管理</button>
          <router-link to="/digital-textbooks" :class="{ active: isNavActive('/digital-textbooks') }">数字教材</router-link>
          <router-link to="/zzch" :class="{ active: isNavActive('/zzch') }">职教出海</router-link>
          <router-link to="/about" :class="{ active: isNavActive('/about') }">关于我们</router-link>
        </nav>
        <div class="user" v-if="userStore.isLoggedIn">
          <div class="user-dropdown">
            <button
              class="account-trigger"
              type="button"
              aria-label="打开账号菜单"
              aria-haspopup="menu"
              :aria-expanded="showMenu"
              @click.stop="showMenu = !showMenu"
            >
              <span class="avatar-letter">{{ avatarLetter }}</span>
              <ChevronDown :size="14" :class="{ rotated: showMenu }" />
            </button>
            <div class="dropdown-menu" :class="{ show: showMenu }" role="menu">
              <button v-if="canAccessAdmin" class="dropdown-item" type="button" role="menuitem" @click="openAdmin">
                <ShieldCheck :size="17" />
                管理后台
              </button>
              <div v-if="canAccessAdmin" class="dropdown-divider"></div>
              <button class="dropdown-item danger" type="button" role="menuitem" @click="handleLogout">
                <LogOut :size="17" />
                退出登录
              </button>
            </div>
          </div>
        </div>
        <div class="user" v-else>
          <router-link to="/login" class="login-link">登录/注册</router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronDown, LogOut, ShieldCheck } from '@lucide/vue'
import { useUserStore } from '@/stores/user'
import { hasAdminAccess } from '@/utils'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const showMenu = ref(false)
const canAccessAdmin = computed(() => hasAdminAccess(userStore.user))
const avatarLetter = computed(() => (
  userStore.user?.name || userStore.user?.username || 'U'
).charAt(0).toUpperCase())

function isNavActive(path: string) {
  return path === '/' ? route.path === '/' : route.path.startsWith(path)
}

const goStudyManagement = async () => {
  showMenu.value = false
  if (!userStore.isLoggedIn && userStore.token) await userStore.fetchUser()
  if (!userStore.isLoggedIn) {
    router.push({ path: '/login', query: { redirect: '/study-management' } })
    return
  }
  router.push('/study-management')
}
const openAdmin = () => { showMenu.value = false; router.push('/admin') }

const handleLogout = () => {
  userStore.logout()
  showMenu.value = false
  router.push('/')
}

const closeMenu = (e: MouseEvent) => {
  if (!(e.target as HTMLElement).closest('.user-dropdown')) showMenu.value = false
}

onMounted(() => {
  document.addEventListener('click', closeMenu)
  if (userStore.token) userStore.fetchUser()
})
onUnmounted(() => document.removeEventListener('click', closeMenu))
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  z-index: 100;
  background: #fff;
  box-shadow: 0 1px 6px rgba(15, 23, 42, .08);
}
.top-bar {
  height: 120px;
  background: #fff;
  border-top: 1px solid #e5e7eb;
}
.top-inner {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
.logo {
  display: flex; align-items: center; cursor: pointer;
  width: 506px; flex-shrink: 0;
  img {
    display: block;
    width: 100%;
    max-height: 90px;
    object-fit: contain;
  }
}
.main-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 22px;
  margin-left: 28px;
  font-size: 16px;
  white-space: nowrap;
  a,
  .nav-button,
  .nav-placeholder {
    color: #111827;
    line-height: 36px;
    font-size: 16px;
    font-family: inherit;
    font-weight: 400;
    transition: color .2s;
    &:hover, &.active { color: #2f80ff; }
  }
  .nav-text {
    color: #111827;
    line-height: 36px;
  }
  .nav-button {
    border: 0;
    padding: 0;
    background: transparent;
    cursor: pointer;
    appearance: none;
    &:hover, &.active { color: #2f80ff; }
  }
}
.user {
  font-size: 15px; display: flex; align-items: center;
  margin-left: auto;
  flex-shrink: 0;
}
.login-link {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0 8px;
  color: #2f80ff;
  background: #edf4ff;
  border-radius: 8px;
}
.user-dropdown { position: relative; display: inline-flex; }
.account-trigger {
  height: 36px;
  min-width: 43px;
  padding: 0 8px 0 10px;
  border: 0;
  border-radius: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  background: #edf5ff;
  color: #1677ff;
  transition: background .2s;
  user-select: none;

  &:hover { background: #dfeeff; }

  svg {
    transition: transform .2s;
    &.rotated { transform: rotate(180deg); }
  }
}
.avatar-letter {
  min-width: 13px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}
.dropdown-menu {
  position: absolute;
  top: 45px;
  right: 0;
  min-width: 154px;
  padding: 7px 0;
  border: 1px solid #e5ebf3;
  border-radius: 11px;
  background: #fff;
  box-shadow: 0 12px 30px rgba(32, 66, 105, .17);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-6px);
  transition: opacity .18s, visibility .18s, transform .18s;
  z-index: 200;

  &.show { opacity: 1; visibility: visible; transform: translateY(0); }
}
.dropdown-item {
  width: 100%;
  height: 42px;
  padding: 0 17px;
  border: 0;
  display: flex;
  align-items: center;
  gap: 9px;
  background: transparent;
  color: #50647d;
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  transition: background .15s, color .15s;

  &:hover { background: #f5f8fc; color: #1769e8; }
  &.danger {
    color: #ee4055;
    &:hover { background: #fff4f5; color: #dc2e43; }
  }
}
.dropdown-divider { height: 1px; background: #e8edf3; margin: 3px 10px; }
@media(max-width:768px) {
  .top-bar { height: 76px; }
  .top-inner { padding: 0 16px; }
  .logo { width: 250px; }
  .main-nav { display: none; }
  .login-link { min-height: 34px; font-size: 13px; }
}
</style>
