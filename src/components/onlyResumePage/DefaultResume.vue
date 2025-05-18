<script setup>
  import {useScreen} from '@/composables/screen'
  import DesktopResume from './Desktop/DesktopResume.vue'
  import MobileResume from './Mobile/MobileResume.vue'
  const {isMobile} = useScreen()
</script>

<template>
  <div>
    <DesktopResume v-if="!isMobile" />
    <MobileResume v-else />
  </div>
</template>

<style scoped>

</style>
