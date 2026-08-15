<script setup>
import HeroSection from '../components/HeroSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import ArticlesSection from '../components/ArticlesSection.vue'
import TechStackSection from '../components/TechStackSection.vue'
</script>

<template>
  <div class="home">
    <HeroSection />
    <ProjectsSection :limit="4" />
    <ArticlesSection />
    <TechStackSection />
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
