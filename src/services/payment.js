import api from '@/plugins/api'

class PaymentService {
  async createPayment(data) {
    try {
      const response = await api.post('payments/', data)
      return response.data
    } catch (error) {
      console.log('Error creating payment:', error)
      throw error
    }
  }

  async getPayment() {
    try {
      const response = await api.get('payments/')
      return response.data
    } catch (error) {
      console.log('getPayment error:', error)
      throw error
    }
  }
}

export default new PaymentService()