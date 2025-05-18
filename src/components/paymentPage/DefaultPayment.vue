<script setup>
  import {useScreen} from '@/composables/screen'
  import DesktopPayment from './Desktop/DesktopPayment.vue'
  import MobilePayment from './Mobile/MobilePayment.vue'
  const {isMobile} = useScreen()
</script>

<template>
  <div>
    <DesktopPayment v-if="!isMobile" />
    <MobilePayment v-else />
  </div>
</template>

<style scoped>

</style>
