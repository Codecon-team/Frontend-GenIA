<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { RouterView } from 'vue-router'
import DesktopNav from '@/components/navBar/Desktop/DesktopNav.vue';
</script>
<template>
  <span class="bg-blue-circle" />
  <span class="bg-purp-circle" />
  <div class="glass-bg">
    <DesktopNav/>
    <RouterView />
  </div>
</template>

<style scoped>
.glass-bg {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(120px);
  -webkit-backdrop-filter: blur(5px);
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
}

.bg-blue-circle {
  position: absolute;
  left: 30vw;
  top: 20vh;
  height: 60vh;
  width: 20vw;
  rotate: 9deg;
  border-radius: 20vw;
  background-color: aqua;
  display: block;
}
.bg-purp-circle {
  position: absolute;
  left: 40vw;
  top: 40vh;
  height: 20vw;
  width: 20vw;
  rotate: 0.5;
  border-radius: 20vw;
  background-color: purple;
  display: block;
}
</style>
