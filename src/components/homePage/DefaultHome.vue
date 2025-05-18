<script setup>
  import {useScreen} from '@/composables/screen'
  import DesktopHome from './Desktop/DesktopHome.vue'
  import MobileHome from './Mobile/MobileHome.vue'
  const {isMobile} = useScreen()
</script>

<template>
  <div>
    <DesktopHome v-if="!isMobile" />
    <MobileHome v-else />
  </div>
</template>

<style scoped>

</style>