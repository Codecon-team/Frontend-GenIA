<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

function logout() {
  userStore.clearToken()
  router.push('/login')
}
</script>

<template>
  <nav>
    <button class="logo-btn" @click="router.push('/')">
      <img src="/logo.png" alt="GenIA" class="logo-img" />
      <img src="/title-nav.png" alt="GenIA" class="title-img" />
    </button>

    <button class="hamburger-btn" @click="toggleMenu">
      <i class="mdi mdi-menu"></i>
    </button>

    <div class="dropdown" v-if="menuOpen">
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
    </div>
  </nav>
</template>

<style scoped>
nav {
  position: relative;
  height: 10vh;
  border-bottom: 1px solid #1A5D46;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.logo-btn {
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-img {
  height: 6vh;
}

.title-img {
  height: 4vh;
}

.hamburger-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  color: #1A5D46;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.hamburger-btn:hover {
  background: rgba(26, 93, 70, 0.1);
}

.dropdown {
  position: absolute;
  top: 10vh;
  right: 1rem;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  z-index: 1000;
  min-width: 200px;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: transparent;
  border: 2px solid #1A5D46;
  color: #1A5D46;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  width: 100%;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background-color: #1A5D46;
  color: white;
}

.green-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #1A5D46;
  color: white;
  border: none;
  outline: none;
  padding: 0.75rem 1rem;
  font-weight: 500;
  border-radius: 8px;
  width: 100%;
  transition: all 0.3s ease;
}

.green-btn:hover {
  background-color: #154835;
}

.danger-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #dc3545;
  color: white;
  border: none;
  outline: none;
  padding: 0.75rem 1rem;
  font-weight: 500;
  border-radius: 8px;
  width: 100%;
  transition: all 0.3s ease;
}

.danger-btn:hover {
  background-color: #bb2d3b;
}

i {
  font-size: 1.2rem;
}
</style>
