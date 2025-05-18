<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { RouterView } from 'vue-router'
import DesktopNav from '@/components/navBar/Desktop/DesktopNav.vue';
</script>

<template>
  <div class="layout-container">
    <span class="bg-blue-circle" />
    <span class="bg-purp-circle" />
    <div class="glass-bg">
      <DesktopNav/>
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  background: #f5f5f5;
}

.glass-bg {
  position: relative;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(120px);
  -webkit-backdrop-filter: blur(5px);
  width: 100%;
  min-height: 100vh;
  z-index: 1;
}

.bg-blue-circle {
  position: fixed;
  left: 30vw;
  top: 20vh;
  height: 60vh;
  width: 20vw;
  rotate: 9deg;
  border-radius: 20vw;
  background-color: aqua;
  display: block;
  z-index: 0;
  filter: blur(70px);
}

.bg-purp-circle {
  position: fixed;
  left: 40vw;
  top: 40vh;
  height: 20vw;
  width: 20vw;
  rotate: 0.5;
  border-radius: 20vw;
  background-color: purple;
  display: block;
  z-index: 0;
  filter: blur(70px);
}
</style>
