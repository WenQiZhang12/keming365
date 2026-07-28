<template>
    <aside
      class="floating-tools"
      :class="{ 'popovers-hidden': popoversHidden }"
      aria-label="客服工具"
      @pointermove="restorePopovers"
    >
      <div class="tool-item tool-qq" :class="{ active: activePopover === 'qq' }" tabindex="0" @click="activatePopover('qq')" @pointerenter="activatePopover('qq')" @pointerleave="deactivatePopover" @focusin="activatePopover('qq')">
        <div class="tool-icon"><MessageCircleMore :size="27" stroke-width="1.7" /></div>
        <span>QQ咨询</span>
        <div class="tool-popover qq-popover">
          <button v-for="agent in qqAgents" :key="agent.number" type="button" class="qq-agent" @click="openQq(agent.number)">
            <MessageCircleMore :size="27" stroke-width="1.7" />
            <span><b>{{ agent.name }}</b>{{ agent.number }}</span>
          </button>
        </div>
      </div>

      <div class="tool-item tool-wechat" :class="{ active: activePopover === 'wechat' }" tabindex="0" @click="activatePopover('wechat')" @pointerenter="activatePopover('wechat')" @pointerleave="deactivatePopover" @focusin="activatePopover('wechat')">
        <div class="tool-icon"><QrCode :size="27" stroke-width="1.7" /></div>
        <span>官方微信</span>
        <div class="tool-popover qr-popover">
          <div class="qr-image-viewport">
            <img src="/images/support-qr.png" alt="官方微信二维码" />
          </div>
          <small>扫码关注官方微信</small>
        </div>
      </div>

      <div class="tool-item tool-phone" :class="{ active: activePopover === 'phone' }" tabindex="0" @click="activatePopover('phone')" @pointerenter="activatePopover('phone')" @pointerleave="deactivatePopover" @focusin="activatePopover('phone')">
        <div class="tool-icon"><PhoneCall :size="27" stroke-width="1.7" /></div>
        <span>联系电话</span>
        <div class="tool-popover phone-popover">
          <PhoneCall :size="28" stroke-width="1.7" />
          <span><b>座机</b>4000-927-928</span>
        </div>
      </div>

      <button type="button" class="tool-item tool-top" @click="deactivatePopover(); scrollTop()">
        <div class="tool-icon"><ChevronUp :size="28" stroke-width="1.8" /></div>
        <span>返回顶部</span>
      </button>
    </aside>

    <button
      type="button"
      class="ai-ball"
      :class="{ active: showChat }"
      aria-label="打开或关闭科明AI"
      @click="toggleChat"
    >
      <Bot :size="24" stroke-width="1.8" />
      <span>AI</span>
      <span v-if="showAiTooltip" class="ai-tooltip" @click.stop>
        科明365VR教学云平台AI对话窗口
        <span class="ai-tooltip-close" role="button" tabindex="0" aria-label="关闭提示" @click.stop="showAiTooltip = false">×</span>
      </span>
    </button>

    <Teleport to="body">
      <section v-if="showChat" class="ai-dialog" role="dialog" aria-modal="false" aria-label="科明AI">
        <button type="button" class="ai-dialog-close" aria-label="关闭科明AI" @click="showChat = false"><X :size="22" /></button>
        <iframe v-if="userStore.isLoggedIn" class="ai-frame" :src="aiUrl" title="科明AI对话窗口" />
        <div v-else class="ai-login-panel">
          <Bot :size="42" stroke-width="1.5" />
          <h3>登录后使用科明AI</h3>
          <p>登录后可进行智能问答并保留对话信息。</p>
          <button type="button" @click="goLogin">去登录</button>
        </div>
      </section>
    </Teleport>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Bot, ChevronUp, MessageCircleMore, PhoneCall, QrCode, X } from '@lucide/vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()
const showChat = ref(false)
const showAiTooltip = ref(true)
const popoversHidden = ref(false)
const activePopover = ref<string | null>(null)
const qqAgents = [
  { name: '客服一', number: '1378831402' },
  { name: '客服二', number: '1478598110' },
  { name: '客服三', number: '1379759069' },
]

const aiUrl = computed(() => {
  const userId = userStore.user?.id
  return userId ? `https://www.keming365.com/kmai/api/chatCustomerInfo?userId=${encodeURIComponent(String(userId))}` : 'https://www.keming365.com/kmai'
})

const toggleChat = () => { showChat.value = !showChat.value }
const restorePopovers = () => { popoversHidden.value = false }
const activatePopover = (name: string) => {
  popoversHidden.value = false
  activePopover.value = name
}
const deactivatePopover = (event?: PointerEvent) => {
  if (event && event.pointerType !== 'mouse') return
  activePopover.value = null
  popoversHidden.value = false
}
const hidePopoversOnScroll = () => {
  popoversHidden.value = true
  activePopover.value = null
  const activeElement = document.activeElement
  if (activeElement instanceof HTMLElement) activeElement.blur()
}
const handleDocumentPointerDown = (event: PointerEvent) => {
  const target = event.target
  if (!(target instanceof Node) || !document.querySelector('.floating-tools')?.contains(target)) {
    deactivatePopover()
  }
}
const goLogin = () => {
  showChat.value = false
  router.push({ path: '/login', query: { redirect: '/' } })
}
const openQq = (number: string) => {
  window.open(`https://wpa.qq.com/msgrd?v=3&uin=${number}&site=qq&menu=yes`, '_blank', 'noopener,noreferrer')
}
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

onMounted(() => {
  window.addEventListener('scroll', hidePopoversOnScroll, { passive: true })
  document.addEventListener('pointerdown', handleDocumentPointerDown)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', hidePopoversOnScroll)
  document.removeEventListener('pointerdown', handleDocumentPointerDown)
})
</script>

<style lang="scss" scoped>
.floating-tools {
  position: fixed;
  z-index: 1000;
  top: 50%;
  right: 0;
  width: 78px;
  transform: translateY(-50%);
  border: 1px solid #e0e0e0;
  background: #fff;
  box-shadow: 0 3px 14px rgba(31, 80, 137, .1);
}
.tool-item {
  position: relative;
  box-sizing: border-box;
  width: 78px;
  height: 79px;
  padding: 8px 2px 4px;
  border: 0;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  background: #fff;
  color: #252525;
  font: inherit;
  font-size: 14px;
  line-height: 1.35;
  cursor: pointer;
  transition: background .2s, color .2s;
}
.tool-item:last-child { border-bottom: 0; }
.tool-item:hover, .tool-item:focus-visible { color: #fff; background: #00a1ea; outline: none; }
.tool-icon { height: 29px; display: grid; place-items: center; }
.tool-top { color: #fff; background: #3a9ca7; }
.tool-top:hover, .tool-top:focus-visible { background: #328b95; }
.tool-popover {
  position: absolute;
  top: -1px;
  right: 77px;
  display: none;
  border: 1px solid #e0e0e0;
  box-shadow: 0 3px 14px rgba(31, 80, 137, .12);
  animation: pop-in .18s ease-out;
}
.tool-item.active .tool-popover { display: block; }
.tool-phone.active .phone-popover { display: flex; }
.tool-item.active { color: #fff; background: #00a1ea; outline: none; }
.floating-tools.popovers-hidden .tool-popover { display: none !important; }
.qq-popover { width: 240px; background: #78b6f5; color: #fff; }
.qq-agent {
  width: 100%;
  min-height: 79px;
  padding: 10px 18px 10px 26px;
  border: 0;
  border-bottom: 1px solid rgba(255,255,255,.24);
  display: flex;
  align-items: center;
  gap: 24px;
  color: #fff;
  background: transparent;
  font: inherit;
  font-size: 17px;
  text-align: left;
  cursor: pointer;
}
.qq-agent:last-child { border-bottom: 0; }
.qq-agent:hover { background: #65a9ef; }
.qq-agent span { display: flex; flex-direction: column; gap: 3px; white-space: nowrap; }
.qq-agent b, .phone-popover b { font-size: 16px; font-weight: 400; }
.qr-popover { width: 238px; min-height: 210px; padding: 22px 12px 14px; box-sizing: border-box; background: #fff; color: #425166; text-align: center; }
.qr-image-viewport { width: 116px; height: 129px; margin: 0 auto 12px; overflow: hidden; }
.qr-image-viewport img { width: 231px; height: 129px; max-width: none; display: block; transform: translateX(-115px); }
.qr-popover small { font-size: 12px; }
.phone-popover { width: 240px; height: 79px; box-sizing: border-box; padding: 0 23px; display: none; align-items: center; gap: 22px; color: #fff; background: #78b6f5; font-size: 18px; }
.phone-popover span { display: flex; flex-direction: column; gap: 3px; white-space: nowrap; }
@keyframes pop-in { from { opacity: 0; transform: translateX(6px); } to { opacity: 1; transform: translateX(0); } }
.ai-ball {
  position: fixed;
  z-index: 1001;
  right: 100px;
  bottom: 22px;
  width: 62px;
  height: 62px;
  border: 0;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  color: #fff;
  background: #087ff5;
  box-shadow: 0 4px 14px rgba(21, 99, 201, .28);
  font: inherit;
  font-size: 19px;
  line-height: 1;
  cursor: pointer;
  animation: ai-float 2.4s ease-in-out infinite;
  transition: background .2s, box-shadow .2s;
}
.ai-ball:hover, .ai-ball.active { background: #075fbd; box-shadow: 0 6px 18px rgba(21, 99, 201, .36); }
.ai-tooltip {
  position: absolute;
  right: -92px;
  bottom: calc(100% + 12px);
  width: max-content;
  max-width: 260px;
  padding: 8px 10px 8px 16px;
  border-radius: 8px;
  color: #3f3f3f;
  background: #f5f5f5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, .12);
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  white-space: nowrap;
}
.ai-tooltip::after {
  content: '';
  position: absolute;
  right: 112px;
  bottom: -7px;
  width: 14px;
  height: 14px;
  background: #f5f5f5;
  transform: rotate(45deg);
}
.ai-tooltip-close {
  position: relative;
  z-index: 1;
  display: inline-block;
  margin-left: 4px;
  color: #8c8c8c;
  font-size: 16px;
  line-height: 16px;
  cursor: pointer;
}
.ai-tooltip-close:hover { color: #333; }
@keyframes ai-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
}
.ai-dialog {
  position: fixed;
  z-index: 2000;
  right: 176px;
  bottom: 92px;
  width: min(800px, calc(100vw - 220px));
  height: min(620px, calc(100vh - 140px));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #d9e1eb;
  border-radius: 10px;
  background: #f7f9fc;
  box-shadow: 0 12px 36px rgba(18, 41, 70, .24);
}
.ai-dialog-close { position: absolute; z-index: 1; top: 16px; right: 14px; padding: 4px; border: 0; color: #6b7b8f; background: transparent; cursor: pointer; }
.ai-dialog-close:hover { color: #1677ff; }
.ai-frame { width: 100%; height: 100%; border: 0; background: #fff; }
.ai-login-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  color: #587087;
  text-align: center;
  background: #fff;
}
.ai-login-panel h3 { margin: 15px 0 8px; color: #25415d; font-size: 20px; }
.ai-login-panel p { margin: 0 0 22px; font-size: 14px; }
.ai-login-panel button { height: 40px; padding: 0 24px; border: 0; border-radius: 6px; color: #fff; background: #1677ff; font: inherit; cursor: pointer; }
.ai-login-panel button:hover { background: #0968e8; }
@media (max-width: 768px) {
  .floating-tools {
    position: relative;
    top: auto;
    right: auto;
    width: 100%;
    transform: none;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    border-width: 1px 0;
    box-shadow: none;
  }
  .tool-item {
    width: 100%;
    height: 66px;
    border-right: 1px solid #e0e0e0;
    border-bottom: 0;
    font-size: 11px;
  }
  .tool-item:last-child { border-right: 0; }
  .tool-icon { height: 24px; }
  .tool-icon svg { width: 22px; height: 22px; }
  .tool-popover {
    top: calc(100% + 1px);
    right: auto;
    bottom: auto;
    animation: mobile-pop-in .18s ease-out;
  }
  .qq-popover { width: 205px; }
  .tool-qq .tool-popover { left: 0; }
  .qr-popover { width: 190px; min-height: 190px; padding-top: 18px; }
  .tool-wechat .tool-popover { left: 50%; transform: translateX(-50%); }
  .phone-popover { width: 205px; height: 66px; font-size: 15px; }
  .tool-phone .tool-popover { right: 0; }
  .ai-ball {
    position: relative;
    right: auto;
    bottom: auto;
    width: 100%;
    height: 52px;
    border-radius: 0;
    flex-direction: row;
    gap: 6px;
    box-shadow: none;
    font-size: 16px;
    animation: none;
  }
  .ai-tooltip { display: none; }
  .ai-dialog {
    top: max(8px, env(safe-area-inset-top));
    right: max(8px, env(safe-area-inset-right));
    bottom: max(8px, env(safe-area-inset-bottom));
    left: max(8px, env(safe-area-inset-left));
    width: auto;
    height: auto;
    max-width: none;
    max-height: calc(100dvh - max(8px, env(safe-area-inset-top)) - max(8px, env(safe-area-inset-bottom)));
    box-sizing: border-box;
  }
}
@keyframes mobile-pop-in { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .ai-ball { animation: none; }
}
</style>
