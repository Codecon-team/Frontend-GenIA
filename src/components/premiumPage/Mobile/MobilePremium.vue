<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToPayment = () => {
  router.push('/pagamento')
}
</script>

<template>
  <main>
    <div class="card glass-container">
      <img src="https://i.ibb.co/6pKhgCP/image.png" alt="" />
      <span class="plan-icon">👨‍🌾</span>
      <h1>Camponês</h1>
      <ul>
        <li>✅ Análise de currículo</li>
        <li>❌ Sugestões para currículo</li>
        <li>❌ Funcionalidades exclusivas</li>
      </ul>
      <button class="green-btn" disabled style="opacity: .5;"> Adquirido</button>
    </div>
    <div class="card glass-container">
      <img src="https://i.ibb.co/4nBXzWVk/image.png" alt="" />
      <span class="plan-icon">🤴</span>
      <h2>Patrão</h2>
      <ul>
        <li>✅ Análise de currículo</li>
        <li>✅ Sugestões para currículo</li>
        <li>✅ Funcionalidades exclusivas</li>
      </ul>
      <button class="green-btn" @click="goToPayment">Tornar-se patrão</button>
    </div>
  </main>
</template>

<style scoped>
button {
  margin-top: 4vh;
}

img {
  width: 100%;
  max-width: 300px;
  top: -10vh;
  position: absolute;
  z-index: 0;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 50%);
}

.card li {
  margin-bottom: 1vh;
  position: relative;
  list-style-type: none;
  z-index: 2;
}

.plan-icon {
  font-size: 8vh;
  z-index: 2;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5vw;
  flex-wrap: wrap;
  padding: 4vh 2vw;
  min-height: 100vh;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width: 90vw;
  max-width: 350px;
  margin-bottom: 4vh;
  padding: 2vh 3vw;
  background-color: rgba(185, 185, 185, 0.134);
  border-radius: 10px;
  box-shadow: 6px 6px 15px rgba(128, 128, 128, 0.346);
}

h1,
h2 {
  font-size: 3vh;
  margin-bottom: 6vh;
  z-index: 1;
  text-align: center;
}

@media (min-width: 768px) {
  main {
    flex-wrap: nowrap;
    gap: 10vw;
  }

  .card {
    width: 40vw;
    max-width: 300px;
  }
}
</style>
