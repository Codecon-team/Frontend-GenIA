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
      <span class="glass">
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
        <img src="../../public/home-image.png" alt="" />
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

  & p {
    width: 15vw;
    text-align: center;
  }

  & p:last-of-type {
    font-size: 18px;
    color: #60696c;
    font-weight: 600;
  }

  & label {
    width: fit-content;

    & input {
      display: none;
    }
  }
}

.glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(120px);
  -webkit-backdrop-filter: blur(5px);
  padding: 1rem;
  border-radius: 20px;
  display: block;
  width: fit-content;
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
