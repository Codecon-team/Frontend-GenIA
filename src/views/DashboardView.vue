<script setup>
const premium = true;
</script>

<template>
  <main>
    <div class="user">
      <div class="info-user">
        <div class="glass-container">
          <h1>[Nome da pessoa]</h1>
          <p>Apareceu para incomodar em [data]</p>
          <p>Mudou de identidade em: [data]</p>
        </div>
        <div class="glass-container">
          <h1>classe: [classe]</h1>
          <p>Assinatura vai até [data]</p>
          <p>Ultimo pagamento em [data]</p>
        </div>
      </div>
      <div class="bottom-container">
        <div class="user-form glass-container">
          <span class="inputs-container">
            <label>
              <p>Primeiro Nome</p>
              <input type="text" />
            </label>
            <label>
              <p>Segundo nome</p>
              <input type="text" />
            </label>
            <label>
              <p>Email</p>
              <input type="text" />
            </label>
            <label>
              <p>CPF</p>
              <input type="text" />
            </label>
          </span>
          <button class="green-btn">Salvar</button>
        </div>
        <div class="upload-cv">
          <p>Faça o Upload do Arquivo aqui mano, relaxa que tá seguro!</p>
          <label class="green-btn"
            >Upload CV<input type="file" id="file" name="file"
          /></label>
        </div>
      </div>
    </div>
    <div class="curriculums-container">
      <h2>Histórico</h2>
      <div class="curriculum-card">
        <img
          src="https://www.dicasdecurriculo.com.br/wp-content/uploads/2024/03/modelo-de-curriculo-word-simples.jpg"
          alt=""
        />
        <span>
          <p>[data curriculo]</p>
          <p>[nota curriculo]</p>
        </span>
      </div>
    </div>
  </main>
</template>

<style scoped>
.upload-cv{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1vh 1vw;
  width: 20%;
  height: 20vh;
  border-radius: 10px;
  background-color: #ffffff5e;
  border: dashed #1a5d46 1px;
  gap: 2vh;
  text-align: center  ;
}

.upload-cv p {
  font-size: 2vh;
}

.upload-cv > label{
  font-size: 2vh;
}

.upload-cv > label  input {
  display: none;
}

.bottom-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bottom-container > label {
  width: 20%;
  text-align: center;
  height: fit-content;
}

.curriculum-card {
  padding: 2vh 0;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 5vw;
}
.curriculum-card img {
  width: 2vw;
  box-shadow: 6px 6px 10px rgba(128, 128, 128, 0.346);
}

h2 {
  margin-bottom: 3vh;
}

.curriculums-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  width: 23vw;
  max-height: 70vh;
  padding: 3vh 0;
  overflow-y: scroll;
  box-shadow: 6px 6px 15px rgba(128, 128, 128, 0.346);
}

.inputs-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2vw;
}

.user-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4vh;
  border-radius: 10px;
  max-width: 60%;
  box-shadow: 6px 6px 15px rgba(128, 128, 128, 0.346);
  padding: 4vh 2vw;
}

.user-form button {
  margin-top: 3vh;
}

label p {
  font-size: 2vh;
}

.user-form input {
  padding: 0.5vh 0.4vw;
  border-radius: 5px;
  outline: none;
  border: none;
}

.user-form input:enabled {
  border: #1a5d46 1px solid;
}

.user {
  width: 55vw;
  display: flex;
  flex-direction: column;
  gap: 5vh;
}

.info-user > div {
  position: inherit;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 4vh 0;
  border-radius: 10px;
  box-shadow: 6px 6px 15px rgba(128, 128, 128, 0.346);
}

.info-user > div > p {
  font-size: 2vh;
  margin-bottom: 2vh;
}

h1 {
  z-index: 3;
  font-size: 3vh;
  margin-bottom: 3vh;
}

main {
  padding: 8vh 8vw;
  display: flex;
  justify-content: space-between;
}

.info-user {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  height: 25vh;
  max-width: 100%;
  gap: 5vw;
}
</style>
