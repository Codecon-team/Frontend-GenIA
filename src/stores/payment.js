import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import PaymentService from '@/services/payment'
import { notify } from '@/utils/notifications'

export const usePaymentStore = defineStore('payment', () => {
  const state = reactive({
    currentPayment: null,
    loading: false,
    error: null
  })

  const payment = computed(() => state.currentPayment)
  const isLoading = computed(() => state.loading)
  const error = computed(() => state.error)

  const createPayment = async () => {
    state.loading = true
    state.error = null
    try {
      const response = await PaymentService.createPayment()
      if (response.status === 'success') {
        state.currentPayment = response
        notify.success('Pagamento gerado com sucesso!')
        return response
      }
    } catch (error) {
      state.error = error.message
      notify.error('Erro ao gerar pagamento', error)
      throw error
    } finally {
      state.loading = false
    }
  }

  const getPayment = async (id) => {
    state.loading = true
    state.error = null
    try {
      const response = await PaymentService.getPayment(id)
      if (response.status === 'success') {
        state.currentPayment = response
        return response
      }
    } catch (error) {
      state.error = error.message
      notify.error('Erro ao buscar pagamento', error)
      throw error
    } finally {
      state.loading = false
    }
  }

  const clearPayment = () => {
    state.currentPayment = null
    state.error = null
  }

  return {
    payment,
    isLoading,
    error,
    createPayment,
    getPayment,
    clearPayment
  }
})
