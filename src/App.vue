<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import FeatherBackground from './components/FeatherBackground.vue'
import LeftSidebar from './components/LeftSidebar.vue'
import RightSidebar from './components/RightSidebar.vue'

const route = useRoute()
const transitionName = computed(() => 'fade')
</script>

<template>
  <div class="app">
    <FeatherBackground />
    <AppHeader />

    <main class="app-main">
      <div class="layout">
        <aside class="layout-left">
          <LeftSidebar />
        </aside>
        <section class="layout-center">
          <router-view v-slot="{ Component }">
            <transition :name="transitionName" mode="out-in">
              <component :is="Component" :key="route.fullPath" />
            </transition>
          </router-view>
        </section>
        <aside class="layout-right">
          <RightSidebar />
        </aside>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}
.app-main {
  flex: 1;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
}
.layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr) 280px;
  gap: 20px;
  align-items: start;
}
.layout-left,
.layout-right {
  position: sticky;
  top: 76px;
  align-self: start;
  max-height: calc(100vh - 76px - 20px);
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
}
.layout-left::-webkit-scrollbar,
.layout-right::-webkit-scrollbar {
  width: 4px;
}
.layout-left::-webkit-scrollbar-thumb,
.layout-right::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 4px;
}
.layout-center {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
@media (max-width: 1280px) {
  .layout {
    grid-template-columns: 220px minmax(0, 1fr) 260px;
  }
}
@media (max-width: 1024px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }
  .layout-left,
  .layout-right {
    position: static;
    max-height: none;
    overflow: visible;
  }
  .layout-left {
    order: 1;
  }
  .layout-center {
    order: 2;
  }
  .layout-right {
    order: 3;
  }
  .layout-right > * {
    width: 100%;
  }
}
@media (max-width: 768px) {
  .app-main {
    padding: 12px;
  }
}
</style>
