import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import UserService from '@/services/user'
import { notify } from '@/utils/notifications'

const userService = UserService

export const useUserStore = defineStore('user', () => {
  const state = reactive({
    user: [],
    token: useStorage('authToken', ''),
    loading: false,
    isLogged: useStorage('isLogged', false),
  })

  const isLoading = computed(() => state.loading)
  const isLogged = computed(() => state.isLogged)
  const token = computed(() => state.token)
  const user = computed(() => state.user)

  const setToken = (newToken) => {
    state.token = newToken
  }

  const setLogged = (value) => {
    state.isLogged = value
  }

  const clearToken = () => {
    state.token = ''
    state.isLogged = false
    notify.info('Você foi desconectado')
  }

  const loginUser = async (user) => {
    clearToken()
    state.loading = true
    try {
      const response = await userService.loginUser(user)
      setToken(response.accessToken)
      setLogged(true)
      notify.success('Login realizado com sucesso!')
      return response
    } catch (error) {
      notify.error('Falha no login', error)
      clearToken()
    } finally {
      state.loading = false
    }
  }

  const registerUser = async (user) => {
    clearToken()
    state.loading = true
    try {
      const response = await userService.registerUser(user)
      notify.success('Cadastro realizado com sucesso! Faça login para continuar.')
      return response
    } catch (error) {
      notify.error('Falha no cadastro', error)
      clearToken()
    } finally {
      state.loading = false
    }
  }

  const updateUser = async (user) => {
    state.loading = true
    try {
      const response = await userService.updateUser(user)
      notify.success('Perfil atualizado com sucesso!')
      return response
    } catch (error) {
      notify.error('Falha ao atualizar perfil', error)
    } finally {
      state.loading = false
    }
  }

  const getMeUser = async () => {
    state.loading = true
    try {
      const response = await userService.getMeUser()
      state.user = response
      return response
    } catch (error) {
      notify.error('Falha ao carregar dados do usuário', error)
    } finally {
      state.loading = false
    }
  }

  return {
    isLoading,
    isLogged,
    token,
    user,
    loginUser,
    registerUser,
    updateUser,
    getMeUser,
    clearToken,
  }
})

