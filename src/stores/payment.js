import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import PaymentService from '@/services/payment'

export const usePaymentStore = defineStore('payment', () => {
  const state = reactive({
    payments: [],
  })

  const payments = computed(() => state.payments)

  const createPayment = async (data) => {
    try {
      const response = await PaymentService.createPayment(data)
      state.payments = response.data
      return response
    } catch (error) {
      console.error('Error creating payment:', error)
      throw error
    }
  }

  return {
    payments,
    createPayment,
  }
})
