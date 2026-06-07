<template>
  <div id="app" class="app-container">
    <!-- Header Component -->
    <Header />

    <!-- Main Router View -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- Virtual Assistant Component -->
    <VirtualAssistant />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import VirtualAssistant from './components/VirtualAssistant.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    VirtualAssistant,
  },
  mounted() {
    console.log('🚀 iGestione Rep 2026 - App Loaded');
  },
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f7fa;
}

.main-content {
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 5px;

  &:hover {
    background: #999;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Focus visible for accessibility */
button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
</style>
