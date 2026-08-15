<script setup>
import ProfileCard from './ProfileCard.vue'
import NoticeCard from './NoticeCard.vue'
import TagCloud from './TagCloud.vue'
import EagleDecoration from './EagleDecoration.vue'
</script>

<template>
  <div class="left-sidebar">
    <ProfileCard />
    <NoticeCard />
    <TagCloud />
    <EagleDecoration />
  </div>
</template>

<style scoped>
.left-sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
