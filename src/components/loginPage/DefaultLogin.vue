<script setup>
  import {useScreen} from '@/composables/screen'
  import DesktopLogin from './Desktop/DesktopLogin.vue'
  import MobileLogin from './Mobile/MobileLogin.vue'
  const {isMobile} = useScreen()
</script>

<template>
  <div>
    <DesktopLogin v-if="!isMobile" />
    <MobileLogin v-else />
  </div>
</template>

<style scoped>

</style>
