import axios from "axios"

class PaymentService {
  async createPayment() {
    try {
      const response = await axios.post('payments/')


      if (!response.data) {
        throw new Error('Resposta vazia da API')
      }

      const data = response.data
      return data
    } catch (error) {
      console.error('Service: Erro na requisição:', error)
      if (error.response) {
        console.error('Service: Detalhes do erro:', {
          status: error.response.status,
          data: error.response.data
        })
      }
      throw error.response?.data?.message || error.message || 'Erro ao criar pagamento'
    }
  }

  async getPayment(id) {
    try {
      const response = await axios.get(`payments/${id}`)
      if (!response.data) {
        throw new Error('Resposta vazia da API')
      }
      return response.data
    } catch (error) {
      console.error('getPayment error:', error)
      throw error.response?.data?.message || error.message || 'Erro ao buscar pagamento'
    }
  }
}

export default new PaymentService()
