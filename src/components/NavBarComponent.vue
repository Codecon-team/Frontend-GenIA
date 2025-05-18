<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <nav>
    <span>
      <button class="logo-btn" @click="router.push('/')">
        <img src="/logo.png" alt="GenIA" />
        <img src="/title-nav.png" alt="GenIA" /> 
      </button>
    </span>
    <span>
    <button class="login-btn" @click="router.push('/login')">Login</button>
    <button class="green-btn" @click="router.push('/login')">Registre-se</button>
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
}

span{
display: flex;
align-items: center;
}

span:last-of-type{
  gap: 1vw;


}
.logo-btn{
  background-color: transparent;
  border: none;
  outline: none;
  display: flex;
  gap: 1vw;
  align-items: center;
}
.login-btn{
    background-color: transparent;
    border: none;
    outline: none;
    font-weight: 600;
  }
.green-btn{
  background-color: #1A5D46;
  color: white;
  border: none;
  outline: none;
  padding: 0.5vw 2vw;
  font-weight: 60;
  border-radius: 5px;
}

img:first-of-type{
  height: 8vh;
}
img{
  height: 5vh;
}
</style>
