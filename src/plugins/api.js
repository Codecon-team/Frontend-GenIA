import axios from 'axios'
import { useLoadingStore } from '@/stores/loading'
import { notify } from '@/utils/notifications'

export function setupAxios() {
  const loadingStore = useLoadingStore()

  axios.defaults.baseURL = 'http://backend.genia.lat:3000/api/'

  axios.interceptors.request.use(config => {
    loadingStore.show()
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  axios.interceptors.response.use(
    response => {
      loadingStore.hide()
      return response
    },
    error => {
      loadingStore.hide()

      // Tratamento de erros específicos
      if (error.response) {
        switch (error.response.status) {
          case 401:
            notify.error('Sessão expirada. Por favor, faça login novamente.')
            localStorage.removeItem('authToken')
            window.location.href = '/login'
            break
          case 403:
            notify.error('Você não tem permissão para realizar esta ação.')
            break
          case 404:
            notify.error('Recurso não encontrado.')
            break
          case 422:
            notify.error('Dados inválidos. Verifique as informações e tente novamente.')
            break
          case 429:
            notify.error('Muitas tentativas. Por favor, aguarde um momento.')
            break
          case 500:
            notify.error('Erro interno do servidor. Tente novamente mais tarde.')
            break
          default:
            notify.error('Ocorreu um erro inesperado.', error)
        }
      } else if (error.request) {
        notify.error('Não foi possível conectar ao servidor. Verifique sua conexão.')
      } else {
        notify.error('Erro ao processar sua requisição.', error)
      }

      return Promise.reject(error)
    }
  )
}
