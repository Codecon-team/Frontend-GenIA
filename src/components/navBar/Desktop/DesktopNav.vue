<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

function logout() {
  userStore.clearToken()
  router.push('/login')
}
</script>

<template>
  <nav>
    <span>
      <button class="logo-btn" @click="router.push('/')">
        <img src="/logo.png" alt="GenIA" />
        <img src="/title-nav.png" alt="GenIA" />
      </button>
    </span>
    <span class="nav-buttons">
      <template v-if="!userStore.isLogged">
        <button class="nav-btn" @click="router.push('/login')">
          <i class="mdi mdi-login"></i>
          Login
        </button>
        <button class="green-btn" @click="router.push('/register')">
          <i class="mdi mdi-account-plus"></i>
          Registre-se
        </button>
      </template>
      <template v-else>
        <button class="nav-btn" @click="router.push('/dashboard')">
          <i class="mdi mdi-view-dashboard"></i>
          Dashboard
        </button>
        <button class="nav-btn" @click="router.push('/premium')" v-if="!userStore.user?.stripe_customer_id">
          <i class="mdi mdi-crown"></i>
          Premium
        </button>
        <button class="danger-btn" @click="logout">
          <i class="mdi mdi-logout"></i>
          Sair
        </button>
      </template>
    </span>
  </nav>
</template>

<style scoped>
nav{
  height: 8vh;
  border-bottom: 1px solid #1A5D46;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2vw;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

span{
  display: flex;
  align-items: center;
}

.nav-buttons {
  gap: 1rem;
}

.logo-btn{
  background-color: transparent;
  border: none;
  outline: none;
  display: flex;
  gap: 1vw;
  align-items: center;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: 2px solid #1A5D46;
  color: #1A5D46;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background-color: #1A5D46;
  color: white;
}

.green-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #1A5D46;
  color: white;
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.green-btn:hover {
  background-color: #154835;
  transform: translateY(-2px);
}

.danger-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #dc3545;
  color: white;
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.danger-btn:hover {
  background-color: #bb2d3b;
  transform: translateY(-2px);
}

img:first-of-type{
  height: 8vh;
}

img{
  height: 5vh;
}

i {
  font-size: 1.2rem;
}
</style>
