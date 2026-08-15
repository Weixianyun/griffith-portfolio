<script setup>
import { onMounted } from 'vue'
import { useTheme } from '../composables/useTheme'
import { useGitHub } from '../composables/useGitHub'

const { theme } = useTheme()
onMounted(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
})

const { refresh } = useGitHub('Weixianyun')
onMounted(() => {
  refresh()
})

function featherStyle(n) {
  return {
    left: (n * 7) % 100 + '%',
    animationDuration: 12 + (n % 5) * 3 + 's',
    animationDelay: (n % 7) * 1.5 + 's',
    transform: `scale(${0.6 + (n % 4) * 0.25}) rotate(${(n % 6) * 30}deg)`
  }
}
</script>

<template>
  <div class="feather-bg" aria-hidden="true">
    <span v-for="n in 14" :key="n" class="feather" :style="featherStyle(n)"></span>
  </div>
</template>

<style scoped>
.feather-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
.feather {
  position: absolute;
  top: -10vh;
  width: 14px;
  height: 22px;
  background: var(--feather-color);
  border-radius: 50% 0 50% 50%;
  opacity: 0;
  filter: blur(0.5px);
  animation: featherFall linear infinite;
}
@keyframes featherFall {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  90% {
    opacity: 0.4;
  }
  100% {
    transform: translateY(120vh) translateX(60px) rotate(360deg);
    opacity: 0;
  }
}
</style>
