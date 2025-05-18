<script setup>
  import {useScreen} from '@/composables/screen'
  import DesktopRegister from './Desktop/DesktopRegister.vue'
  import MobileRegister from './Mobile/MobileRegister.vue'
  const {isMobile} = useScreen()
</script>

<template>
  <div>
    <DesktopRegister v-if="!isMobile" />
    <MobileRegister v-else />
  </div>
</template>

<style scoped>

</style>
