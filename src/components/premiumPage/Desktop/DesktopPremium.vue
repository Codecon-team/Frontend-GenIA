<script setup>

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
      <router-link to="/pagamento" class="router-link">
        <button class="green-btn">Tornar-se patrão</button>
      </router-link>
    </div>
  </main>
</template>

<style scoped>
button{
  margin-top: 4vh;
  width: 100%;
  padding: 1vh 2vw;
}

.router-link {
  width: 100%;
  display: block;
  text-decoration: none;
  z-index: 2;
}

img {
  width: 28vw;
  top: -10vh;
  position: absolute;
  z-index: 0;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 50%);
}

.card:first-of-type li {
  margin-bottom: 1vh;
  position: relative;
  list-style-type: none;
  z-index: 2;
}

.card:last-of-type li {
  margin-bottom: 1vh;
  position: relative;
  list-style-type: none;
  z-index: 2;
}

.green-btn:not([disabled]){
  cursor: pointer;
}

.plan-icon {
  font-size: 8vh;
  z-index: 2;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10vw;
  height: 83vh;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width: 20vw;
  padding: 2vh 3vw;
  background-color: rgba(185, 185, 185, 0.134);
  border-radius: 5px;
  box-shadow: 6px 6px 15px rgba(128, 128, 128, 0.346);
}

h1,
h2 {
  font-size: 3vh;
  margin-bottom: 6vh;
  z-index: 1;
}
</style>
