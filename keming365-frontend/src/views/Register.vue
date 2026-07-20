<template>
  <div class="register-page">
    <section class="register-shell">
      <aside class="brand-panel">
        <div class="brand-logo">
          <span class="brand-mark">365</span>
          <strong>科明365</strong>
        </div>

        <div class="brand-message">
          <p class="brand-eyebrow">CREATE YOUR ACCOUNT</p>
          <h1>加入数字学习空间</h1>
          <p class="brand-description">注册后可保存学习计划、实验进度与个人成绩。</p>
        </div>

        <span class="brand-watermark" aria-hidden="true">VR</span>

        <ul class="brand-benefits">
          <li><Check :size="16" />随时访问课程资源</li>
          <li><Check :size="16" />沉浸个人实验记录</li>
          <li><Check :size="16" />支持多种用户身份</li>
        </ul>
      </aside>

      <main class="form-panel">
        <router-link to="/" class="back-home">
          <ArrowLeft :size="16" />
          返回首页
        </router-link>

        <div class="register-content">
          <header class="form-heading">
            <p>ACCOUNT REGISTER</p>
            <h2>创建账号</h2>
            <span>填写信息以注册科明365 VR教学云平台</span>
          </header>

          <form @submit.prevent="doRegister">
            <div class="form-group">
              <label for="register-username">用户名</label>
              <input
                id="register-username"
                v-model="form.username"
                type="text"
                placeholder="请输入用户名"
                maxlength="20"
                autocomplete="username"
                :class="{ error: errors.username }"
              />
              <div v-if="errors.username" class="error-msg">{{ errors.username }}</div>
            </div>

            <div class="form-group">
              <label for="register-name">姓名</label>
              <input
                id="register-name"
                v-model="form.name"
                type="text"
                placeholder="请输入真实姓名"
                maxlength="20"
                autocomplete="name"
                :class="{ error: errors.name }"
              />
              <div v-if="errors.name" class="error-msg">{{ errors.name }}</div>
            </div>

            <div class="form-group">
              <label for="register-password">密码</label>
              <input
                id="register-password"
                v-model="form.password"
                type="password"
                placeholder="请输入密码（至少6位）"
                maxlength="32"
                autocomplete="new-password"
                :class="{ error: errors.password }"
              />
              <div v-if="errors.password" class="error-msg">{{ errors.password }}</div>
            </div>

            <div class="form-group">
              <label for="register-password-confirm">确认密码</label>
              <input
                id="register-password-confirm"
                v-model="form.password2"
                type="password"
                placeholder="请再次输入密码"
                maxlength="32"
                autocomplete="new-password"
                :class="{ error: errors.password2 }"
              />
              <div v-if="errors.password2" class="error-msg">{{ errors.password2 }}</div>
            </div>

            <div class="form-group">
              <label for="register-phone">手机号（选填）</label>
              <input
                id="register-phone"
                v-model="form.phone"
                type="tel"
                inputmode="numeric"
                placeholder="请输入手机号"
                maxlength="11"
                autocomplete="tel"
              />
            </div>

            <div class="form-group">
              <label for="register-role">注册身份</label>
              <div class="select-control">
                <select id="register-role" v-model="form.role">
                  <option value="student">学生</option>
                  <option value="teacher">教师</option>
                  <option value="admin">管理员</option>
                  <option value="temporary_admin">临时管理员</option>
                </select>
                <ChevronDown :size="17" />
              </div>
            </div>

            <div v-if="form.role !== 'student'" class="form-group">
              <label for="register-invite-code">邀请码</label>
              <input
                id="register-invite-code"
                v-model="form.inviteCode"
                type="password"
                placeholder="请输入对应身份的邀请码"
                maxlength="64"
                :class="{ error: errors.inviteCode }"
              />
              <div v-if="errors.inviteCode" class="error-msg">{{ errors.inviteCode }}</div>
            </div>

            <div v-if="form.role === 'temporary_admin'" class="form-group">
              <label for="register-duration">有效期</label>
              <div class="select-control">
                <select id="register-duration" v-model.number="form.temporaryDays">
                  <option :value="1">1天</option>
                  <option :value="7">7天</option>
                  <option :value="30">30天</option>
                </select>
                <ChevronDown :size="17" />
              </div>
            </div>

            <button class="register-btn" type="submit" :disabled="loading">
              {{ loading ? '注册中...' : '注册' }}
            </button>

            <div class="login-tip">已有账号？<router-link to="/login">立即登录</router-link></div>
            <div class="register-message" :class="{ success: regSuccess }" role="status">{{ regMsg }}</div>
          </form>
        </div>
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Check, ChevronDown } from '@lucide/vue'
import api from '@/api'

const router = useRouter()
const loading = ref(false)
const regMsg = ref('')
const regSuccess = ref(false)

const form = reactive({
  username: '', name: '', password: '', password2: '', phone: '',
  role: 'student', inviteCode: '', temporaryDays: 7
})
const errors = reactive({
  username: '', name: '', password: '', password2: '', inviteCode: ''
})

const clearErrors = () => {
  errors.username = errors.name = errors.password = errors.password2 = errors.inviteCode = ''
}

const doRegister = async () => {
  clearErrors()
  regMsg.value = ''
  regSuccess.value = false
  let ok = true

  if (!form.username.trim()) { errors.username = '请输入用户名'; ok = false }
  if (!form.name.trim()) { errors.name = '请输入姓名'; ok = false }
  if (!form.password || form.password.length < 6) { errors.password = '密码至少6位'; ok = false }
  if (form.password !== form.password2) { errors.password2 = '两次密码不一致'; ok = false }
  if (form.phone && !/^1\d{10}$/.test(form.phone)) { regMsg.value = '手机号格式不正确'; ok = false }
  if (form.role !== 'student' && !form.inviteCode.trim()) { errors.inviteCode = '请输入邀请码'; ok = false }
  if (!ok) return

  loading.value = true
  try {
    await api.post('/accounts/auth/register/', {
      username: form.username.trim(),
      name: form.name.trim(),
      password: form.password,
      telephone: form.phone || undefined,
      role: form.role,
      inviteCode: form.role === 'student' ? undefined : form.inviteCode.trim(),
      temporaryDays: form.role === 'temporary_admin' ? form.temporaryDays : undefined
    })
    regSuccess.value = true
    regMsg.value = '注册成功！即将跳转登录...'
    setTimeout(() => router.push('/login'), 1500)
  } catch (e: any) {
    regMsg.value = e.message || '注册失败'
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.register-page {
  min-height: 100vh;
  padding: 32px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  background: #edf4fb;
  color: #102d52;
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
}

.register-shell {
  width: min(1080px, 100%);
  min-height: 810px;
  display: grid;
  grid-template-columns: 45% 55%;
  overflow: hidden;
  border: 1px solid #dbe5f0;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 22px 56px rgba(16, 45, 82, .14);
}

.brand-panel {
  position: relative;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 42px 42px 39px;
  overflow: hidden;
  background: #102d52;
  color: #fff;
}

.brand-logo {
  position: relative;
  z-index: 1;
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
  border-radius: 9px;
  background: #1769e8;
  font-size: 11px;
  font-weight: 700;
}

.brand-message {
  position: relative;
  z-index: 1;
  margin-top: auto;
  margin-bottom: auto;
  transform: translateY(22px);
}

.brand-eyebrow {
  margin-bottom: 19px;
  color: #57a6ff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.3px;
}

.brand-message h1 {
  margin: 0;
  font-size: 39px;
  line-height: 1.25;
  letter-spacing: 0;
}

.brand-description {
  margin-top: 18px;
  color: #bed1e8;
  font-size: 13px;
  line-height: 1.7;
}

.brand-watermark {
  position: absolute;
  right: -16px;
  bottom: 72px;
  color: rgba(70, 126, 190, .16);
  font-family: Arial, sans-serif;
  font-size: 164px;
  font-weight: 700;
  line-height: 1;
  pointer-events: none;
}

.brand-benefits {
  position: relative;
  z-index: 1;
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
  min-width: 0;
  padding: 28px 72px 30px;
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

.register-content {
  width: min(449px, 100%);
  margin: 24px auto 0;
}

.form-heading {
  margin-bottom: 26px;

  p {
    margin-bottom: 12px;
    color: #0f67ef;
    font-size: 11px;
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
  position: relative;
  margin-bottom: 14px;

  label {
    display: block;
    margin-bottom: 5px;
    color: #244568;
    font-size: 13px;
    font-weight: 600;
  }

  input,
  select {
    width: 100%;
    height: 43px;
    padding: 0 13px;
    border: 1px solid #d4dfec;
    border-radius: 6px;
    outline: 0;
    background: #fff;
    color: #102d52;
    font: inherit;
    font-size: 13px;
    transition: border-color .2s, box-shadow .2s;

    &:focus {
      border-color: #2475e8;
      box-shadow: 0 0 0 3px rgba(36, 117, 232, .1);
    }

    &.error {
      border-color: #e83b50;
    }

    &::placeholder {
      color: #98a8bc;
    }
  }

  select {
    padding-right: 40px;
    appearance: none;
    cursor: pointer;
  }
}

.select-control {
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    right: 12px;
    color: #294b70;
    transform: translateY(-50%);
    pointer-events: none;
  }
}

.error-msg {
  margin-top: 4px;
  color: #e83b50;
  font-size: 11px;
}

.register-btn {
  width: 100%;
  height: 45px;
  margin-top: 8px;
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

.login-tip {
  margin-top: 15px;
  color: #8998ad;
  font-size: 13px;
  text-align: center;

  a {
    margin-left: 5px;
    color: #1769e8;

    &:hover {
      text-decoration: underline;
    }
  }
}

.register-message {
  min-height: 16px;
  margin-top: 7px;
  color: #e83b50;
  font-size: 12px;
  text-align: center;

  &.success {
    color: #23834b;
  }
}

@media (max-width: 800px) {
  .register-page {
    padding: 0;
    align-items: stretch;
    background: #fff;
  }

  .register-shell {
    min-height: 100vh;
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
  .brand-benefits,
  .brand-watermark {
    display: none;
  }

  .form-panel {
    padding: 24px clamp(24px, 8vw, 56px) 48px;
  }

  .register-content {
    margin-top: 34px;
  }
}
</style>
