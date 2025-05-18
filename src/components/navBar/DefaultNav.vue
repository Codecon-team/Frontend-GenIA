<script setup>
  import {useScreen} from '@/composables/screen'
  import DesktopNav from './Desktop/DesktopNav.vue'
  import MobileNav from './Mobile/MobileNav.vue'
  const {isMobile} = useScreen()
</script>

<template>
  <div>
    <DesktopNav v-if="!isMobile" />
    <MobileNav v-else />
  </div>
</template>

<style scoped>

</style>
