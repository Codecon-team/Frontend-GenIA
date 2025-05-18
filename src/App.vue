<script setup>
import { RouterView } from 'vue-router'
import {LoadingPage} from '@/components'
import { useLoadingStore } from './stores/loading';
import { storeToRefs } from 'pinia';
const loadingStore = useLoadingStore()
const { isLoading } = storeToRefs(loadingStore)
</script>

<template>
      <LoadingPage v-if="isLoading" />
      <RouterView />
</template>

<style scoped>

</style>