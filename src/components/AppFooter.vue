<script setup>
import { SITE } from '../data/site'
</script>

<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <p>{{ SITE.copyright }}</p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-top: 40px;
  padding: 24px 16px;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 13px;
  border-top: 1px solid var(--color-border);
}
</style>
