<script setup>
  import {useScreen} from '@/composables/screen'
  import DesktopDashboard from './Desktop/DesktopDashboard.vue'
  import MobileDashboard from './Mobile/MobileDashboard.vue'
  const {isMobile} = useScreen()
</script>

<template>
  <div>
    <DesktopDashboard v-if="!isMobile" />
    <MobileDashboard v-else />
  </div>
</template>

<style scoped>

</style>
