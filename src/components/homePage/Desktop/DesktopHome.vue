<script setup></script>

<template>
  <main>
    <span>
      <h1>Seu Currículo é</h1>
      <h2>bom o suficiente?</h2>
      <p>
        GenIA: lendo atentamente cada linha do seu currículo... só pra confirmar que
        “dinâmico” e “criativo” são sinônimos de “não sei o que colocar aqui”.
      </p>
    </span>
    <div class="container">
      <span class="glass-container">
        <div class="upload-container">
          <p>Faça o Upload do Arquivo aqui mano, relaxa que tá seguro!</p>
          <label class="green-btn">
            Upload CV
            <input type="file" id="file" name="file" />
          </label>
          <p>Privacidade garantida</p>
        </div>
      </span>
      <span class="glass">
        <img src="/home-image.png" alt="" />
      </span>
    </div>
  </main>
</template>

<style scoped>
.container {
  margin-top: 4vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

img {
  height: 45vh;
  pointer-events: none;
}

.upload-container {
  width: 25vw;
  background-color: #ffffff;
  border-radius: 10px;
  border: dashed #1a5d46 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3vh;
  padding: 3vh 0;
}

.upload-container p {
  width: 15vw;
  text-align: center;
}

.upload-container p:last-of-type {
  font-size: 18px;
  color: #60696c;
  font-weight: 600;
}

.upload-container label {
  width: fit-content;
}

.upload-container label input {
  display: none;
}


main {
  padding: 4vw 10vh 0 8vw;
}

h1,
h2 {
  font-size: 5rem;
  font-weight: 700;
}

p {
  font-size: 1.3rem;
  margin-top: 3vh;
  width: 38vw;
}
</style>
