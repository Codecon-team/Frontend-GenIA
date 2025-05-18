<script setup>
import { ref, onMounted } from 'vue'
import { usePaymentStore } from '@/stores/payment'

const paymentStore = usePaymentStore()
const qrCodeUrl = ref(null)
const loading = ref(true)


const gerarQRCode = async () => {
  loading.value = true
  qrCodeUrl.value = null

  try {
    const response = await paymentStore.createPayment()

    qrCodeUrl.value = `data:image/png;base64,${response.data.point_of_interaction.transaction_data.qr_code_base64}`
  } catch (error) {
    console.error('Erro ao gerar QR Code:', error)
    qrCodeUrl.value = null
  } finally {
    loading.value = false
  }
}

onMounted(() => {
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md text-center">
      <h1 class="text-2xl font-semibold text-gray-800 mb-4">Pagamento com QR Code</h1>

      <div v-if="loading" class="my-6">
        <p class="text-gray-600">Gerando QR Code...</p>
        <div class="mt-4 animate-pulse h-48 bg-gray-200 rounded-xl"></div>
      </div>

      <div v-else-if="qrCodeUrl" class="my-6">
        <img :src="qrCodeUrl" alt="QR Code de Pagamento" class="mx-auto rounded-lg border shadow-md" />
        <p class="mt-4 text-sm text-gray-500">Escaneie com o app do Mercado Pago</p>
      </div>

      <div v-else class="my-6 text-red-500">
        <p>Não foi possível gerar o QR Code.</p>
      </div>

      <button
        @click="gerarQRCode"
        class="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition"
      >
        Gerar Novo QR Code
      </button>
    </div>
  </div>
</template>



<style scoped>

</style>
