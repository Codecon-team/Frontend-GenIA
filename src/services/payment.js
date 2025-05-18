import axios from "axios"
class PaymentService {
  async createPayment() {
    try {
      const response = await axios.post('payments/')
      return response
    } catch (error) {
      console.log('Error creating payment:', error)
      throw error
    }
  }

  async getPayment() {
    try {
      const response = await axios.get('payments/')
      return response.data
    } catch (error) {
      console.log('getPayment error:', error)
      throw error
    }
  }
}

export default new PaymentService()