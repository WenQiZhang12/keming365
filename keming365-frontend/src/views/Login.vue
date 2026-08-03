<template>
  <div class="login-page">
    <section class="login-shell">
      <aside class="brand-panel">
        <div class="brand-logo">
          <span class="brand-mark">365</span>
          <strong>科明365</strong>
        </div>

        <div class="brand-message">
          <p class="brand-eyebrow">VR TEACHING CLOUD</p>
          <h1>欢迎回到<br />数字学习空间</h1>
          <p class="brand-description">继续访问虚拟仿真课程、学习记录与实验数据。</p>
        </div>

        <ul class="brand-benefits">
          <li><Check :size="16" />跨专业课程资源</li>
          <li><Check :size="16" />虚拟实验在线练习</li>
          <li><Check :size="16" />学习过程数据追踪</li>
        </ul>
      </aside>

      <main class="form-panel">
        <router-link to="/" class="back-home">
          <ArrowLeft :size="16" />
          返回首页
        </router-link>

        <div class="login-content">
          <header class="form-heading">
            <p>ACCOUNT LOGIN</p>
            <h2>登录账号</h2>
            <span>请输入您的平台账号信息</span>
          </header>

          <form @submit.prevent="doLogin">
            <div class="form-group">
              <label for="login-username">用户名</label>
              <div class="input-control">
                <UserRound :size="19" />
                <input
                  id="login-username"
                  v-model="form.username"
                  type="text"
                  placeholder="请输入用户名"
                  autocomplete="username"
                  @keydown.enter="pwdRef?.focus()"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="login-password">密码</label>
              <div class="input-control">
                <LockKeyhole :size="19" />
                <input
                  id="login-password"
                  ref="pwdRef"
                  v-model="form.password"
                  type="password"
                  placeholder="请输入密码"
                  autocomplete="current-password"
                />
              </div>
            </div>

            <button class="login-btn" type="submit" :disabled="loading">
              {{ loading ? '登录中...' : '登录' }}
            </button>

            <p class="error-msg" role="alert">{{ errorMsg }}</p>

            <div class="link-row">
              <button type="button" @click="showForgotPassword">忘记密码?</button>
            </div>
          </form>
        </div>
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Check, LockKeyhole, UserRound } from '@lucide/vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const pwdRef = ref<HTMLInputElement | null>(null)
const loading = ref(false)
const errorMsg = ref('')

const form = reactive({ username: '', password: '' })

const doLogin = async () => {
  errorMsg.value = ''
  if (!form.username.trim()) { errorMsg.value = '请输入用户名'; return }
  if (!form.password) { errorMsg.value = '请输入密码'; return }

  loading.value = true
  try {
    await userStore.login(form.username.trim(), form.password)
    const redirect = (route.query.redirect as string)
      || sessionStorage.getItem('redirectAfterLogin')
      || '/'
    sessionStorage.removeItem('redirectAfterLogin')
    router.push(redirect)
  } catch (e: any) {
    errorMsg.value = e.message || '登录失败'
  } finally {
    loading.value = false
  }
}

const showForgotPassword = () => {
  alert('请联系管理员在用户管理中重置密码。')
}

onMounted(() => {
  if (userStore.token) {
    router.push((route.query.redirect as string) || '/')
  }
})
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  padding: 20px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  background: #edf4fb;
  color: #102d52;
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
}

.login-shell {
  width: min(1040px, 100%);
  height: min(648px, calc(100vh - 40px));
  min-height: 580px;
  display: grid;
  grid-template-columns: 47% 53%;
  overflow: hidden;
  border: 1px solid #dbe5f0;
  border-radius: 11px;
  background: #fff;
  box-shadow: 0 22px 56px rgba(16, 45, 82, .14);
}

.brand-panel {
  display: flex;
  flex-direction: column;
  padding: 42px 42px 39px;
  background: #102d52;
  color: #fff;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;

  strong {
    font-size: 20px;
    line-height: 1;
  }
}

.brand-mark {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #1769e8;
  font-size: 11px;
  font-weight: 700;
}

.brand-message {
  margin-top: auto;
  margin-bottom: auto;
  transform: translateY(7px);
}

.brand-eyebrow {
  margin-bottom: 18px;
  color: #57a6ff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.4px;
}

.brand-message h1 {
  margin: 0;
  font-size: 39px;
  line-height: 1.26;
  letter-spacing: 0;
}

.brand-description {
  margin-top: 17px;
  color: #bed1e8;
  font-size: 13px;
  line-height: 1.7;
}

.brand-benefits {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #e7f0fb;
    font-size: 13px;
  }

  svg {
    flex: 0 0 auto;
    color: #ffc44d;
    stroke-width: 2.5;
  }
}

.form-panel {
  position: relative;
  padding: 30px 72px 42px;
  background: #fff;
}

.back-home {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #7187a5;
  font-size: 13px;
  transition: color .2s;

  &:hover {
    color: #1769e8;
  }
}

.login-content {
  width: min(406px, 100%);
  margin: 78px auto 0;
}

.form-heading {
  margin-bottom: 32px;

  p {
    margin-bottom: 13px;
    color: #0f67ef;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.2px;
  }

  h2 {
    margin: 0 0 4px;
    color: #102d52;
    font-size: 28px;
    line-height: 1.3;
    letter-spacing: 0;
  }

  span {
    color: #7e91ab;
    font-size: 13px;
  }
}

.form-group {
  margin-bottom: 18px;

  label {
    display: block;
    margin-bottom: 7px;
    color: #244568;
    font-size: 13px;
    font-weight: 600;
  }
}

.input-control {
  height: 46px;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0 14px;
  border: 1px solid #d4dfec;
  border-radius: 7px;
  background: #fff;
  transition: border-color .2s, box-shadow .2s;

  &:focus-within {
    border-color: #2475e8;
    box-shadow: 0 0 0 3px rgba(36, 117, 232, .1);
  }

  svg {
    flex: 0 0 auto;
    color: #8ca0ba;
  }

  input {
    min-width: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: #102d52;
    font: inherit;
    font-size: 13px;

    &::placeholder {
      color: #a7b5c8;
    }
  }
}

.login-btn {
  width: 100%;
  height: 46px;
  margin-top: 6px;
  border: 0;
  border-radius: 7px;
  background: #1f6fe5;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  transition: background .2s, transform .1s;

  &:hover:not(:disabled) {
    background: #155fc9;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    background: #93b8eb;
    cursor: not-allowed;
  }
}

.error-msg {
  min-height: 18px;
  margin: 8px 0 1px;
  color: #e83b50;
  font-size: 12px;
  text-align: center;
}

.link-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
  color: #8998ad;
  font-size: 12px;

  button {
    padding: 0;
    border: 0;
    background: transparent;
    color: #1769e8;
    font: inherit;
  }

  button:hover {
    text-decoration: underline;
  }
}

@media (max-width: 800px) {
  .login-page {
    padding: 0;
    align-items: stretch;
    background: #fff;
  }

  .login-shell {
    min-height: 100vh;
    height: auto;
    grid-template-columns: 1fr;
    border: 0;
    border-radius: 0;
    box-shadow: none;
  }

  .brand-panel {
    min-height: 132px;
    padding: 24px;
  }

  .brand-message,
  .brand-benefits {
    display: none;
  }

  .form-panel {
    padding: 24px clamp(24px, 8vw, 56px) 48px;
  }

  .login-content {
    margin-top: 54px;
  }
}

</style>
