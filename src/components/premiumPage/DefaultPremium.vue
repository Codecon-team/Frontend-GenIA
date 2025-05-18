<script setup>
  import {useScreen} from '@/composables/screen'
  import DesktopPremium from './Desktop/DesktopPremium.vue'
  import MobilePremium from './Mobile/MobilePremium.vue'
  const {isMobile} = useScreen()
</script>

<template>
  <div>
    <DesktopPremium v-if="!isMobile" />
    <MobilePremium v-else />
  </div>
</template>

<style scoped>

</style>
