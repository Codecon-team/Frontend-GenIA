<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>

<template>
  <nav>
    <button class="logo-btn" @click="router.push('/')">
      <img src="/logo.png" alt="GenIA" class="logo-img" />
      <img src="/title-nav.png" alt="GenIA" class="title-img" />
    </button>

    <button class="hamburger-btn" @click="toggleMenu">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <div class="dropdown" v-if="menuOpen">
      <button class="login-btn" @click="router.push('/login')">Login</button>
      <button class="green-btn" @click="router.push('/register')">Registre-se</button>
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
  background-color: white;
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
}

.icon {
  width: 2rem;
  height: 2rem;
  color: #1A5D46;
}

.dropdown {
  position: absolute;
  top: 10vh;
  right: 1rem;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 1000;
}

.login-btn {
  background: transparent;
  border: none;
  font-weight: 500;
  font-size: 1rem;
  color: #1A5D46;
  text-align: left;
}

.green-btn {
  background-color: #1A5D46;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 6px;
  text-align: left;
}
</style>
