import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import UserService from '@/services/user'

const userService = UserService

export const useUserStore = defineStore('user', () => {
  const state = reactive({
    token: useStorage('authToken', ''),
    loading: false,
    isLogged: useStorage('isLogged', false),
  })

  const isLoading = computed(() => state.loading)
  const isLogged = computed(() => state.isLogged)
  const token = computed(() => state.token)

  // Métodos auxiliares públicos
  const setToken = (newToken) => {
    state.token = newToken
  }

  const setLogged = (value) => {
    state.isLogged = value
  }

  const clearToken = () => {
    state.token = ''
    state.isLogged = false
  }

  const loginUser = async (user) => {
    clearToken()
    state.loading = true
    try {
      const response = await userService.loginUser(user)
      setToken(response.accessToken)
      setLogged(true)
      return response
    } catch (error) {
      console.error('Erro no login:', error)
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
      return response
    } catch (error) {
      console.error('Erro no registro:', error)
      clearToken()
    } finally {
      state.loading = false
    }
  }

  const updateUser = async (user) => {
    state.loading = true
    try {
      const response = await userService.updateUser(user)
      return response
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
    } finally {
      state.loading = false
    }
  }

  const getMeUser = async () => {
    state.loading = true
    try {
      const response = await userService.getMeUser()
      return response
    } catch (error) {
      console.error('Erro ao buscar usuário:', error)
    } finally {
      state.loading = false
    }
  }

  return {
    loginUser,
    registerUser,
    updateUser,
    getMeUser,
    isLoading,
    isLogged,
    token,
    setToken,
    setLogged,
    clearToken
  }
})


// import { useUserStore } from './stores/user';
// import { reactive } from 'vue';

// const userStore = useUserStore();

// const user = reactive({
//     username: "eduardo",
//     email: "lima@gabigol.com",
//     password: "pedroguilherme"

// })

// async function handleRegister() {
//   console.log("Função handleRegister foi chamada");

//   try {
//     const response = await userStore.registerUser(user);

    
//   } catch (error) {
//     console.error('Erro no login:', error);
//     alert('Erro no login. Verifique suas credenciais.');
//   }
// }

// async function handleLogin() {
//   console.log("Função handleLogin foi chamada");

//   try {
//     const response = await userStore.loginUser(user);

//     if (response) {
//       alert('Login efetuado com sucesso. Redirenionando para a página de home.');
//     }
//   } catch (error) {
//     console.error('Erro no login:', error);
//     alert('Erro no login. Verifique suas credenciais.');
//   }
// }

// async function handleUpdate() {
//   console.log("Função handleUpdate foi chamada");

//   try {
//     const response = await userStore.updateUser(user);

//     if (response) {
//       alert('Usuário atualizado com sucesso.');
//     }
//   } catch (error) {
//     console.error('Erro ao atualizar usuário:', error);
//     alert('Erro ao atualizar. Verifique os dados e tente novamente.');
//   }
// }


// async function handleGetMeUser() {
//   console.log("Função handleGetMeUser foi chamada");

//   try {
//     const response = await userStore.getMeUser();
//     if (response) {
//       alert('Usuário atualizado com sucesso.');
//     }
//   } catch (error) {
//     console.error('Erro ao handleGetMeUser :', error);
//     alert('Erro ao handleGetMeUser. Verifique os dados e tente novamente.');
//   }
// }
