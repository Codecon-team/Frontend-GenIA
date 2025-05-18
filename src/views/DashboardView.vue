<script setup>
const pontuacao = 90;
</script>

<template>
  <main>
    <span>
      <div class="glass-container">
        <p>💥 [Ponto negativo]</p>
        <p>🤏 [Ponto positivo]</p>
      </div>
      <div class="glass-container">
        <div class="progress-text">
          <span>
            <p v-if="pontuacao < 33">Bucha 💀</p>
            <p v-else-if="pontuacao < 66">Dá pro gasto 🤏</p>
            <p v-else-if="pontuacao < 90">Razoável 🤙</p>
            <p v-else>Diamante do gueto 💎</p>
          </span>
          <span> {{ pontuacao }}%</span>
        </div>
        <progress :value="pontuacao" max="100" />
      </div>
      <label class="green-btn">
        Upload
        <input type="file" id="file" name="file" />
      </label>
    </span>
    <div class="info glass-container">
      <span class="title-container">
        <h1>[Nome do individuo]</h1>
        <h2>[Área do individuo]</h2>
      </span>
      <h3>Resumo:</h3>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla nesciunt fuga enim, doloribus illum quod porro, natus corporis harum debitis vel assumenda iure consequatur dignissimos. Quidem, quasi atque. Quae, laborum.
      Architecto possimus, mollitia delectus rerum consequuntur consectetur blanditiis esse accusantium totam, temporibus quaerat id exercitationem cupiditate! Itaque, mollitia unde error sunt deleniti, officiis illum architecto laborum vitae, aspernatur pariatur laudantium?
      Voluptatum neque ex ducimus est! Ullam aperiam a quos totam nesciunt, mollitia in magnam quae culpa consequatur harum quasi accusamus, iure excepturi, corporis nostrum sint quisquam esse natus facere asperiores!</p>
    </div>
  </main>
</template>

<style scoped>
.info {
  width: 64vw;
  height: 63vh;
  padding: 5vh 3vw;

  
}
p{
    font-size: 20px;
    text-align: justify;
  }

.title-container {
  border-bottom: #000000 1px solid;
  padding-bottom: 3vh;
  margin-bottom: 3vh;
}

progress {
  margin-top: 0.5vw;
  border-radius: 7px;
  width: 100%;
}

progress::-webkit-progress-bar {
  background-color: #ffffff;
  border-radius: 7px;
}

progress::-webkit-progress-value {
  background-color: #1a5d46;
  border-radius: 7px 0 0 7px;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 700;
}

label {
  text-align: center;
}

input {
  display: none;
}

main > div {
  background-color: #d9d9d959;
  padding: 3vh 2vw;
}

main {
  display: flex;
  padding-top: 8vh;
  justify-content: space-around;
}

main span {
  display: flex;
  flex-direction: column;
  gap: 2vh;
}

main span .glass-container {
  display: flex;
  flex-direction: column;
  width: 20vw;
  background-color: #d9d9d959;
}

main span .glass-container p {
  font-size: 20px;
  font-weight: 700;
}

main span .glass-container:first-of-type {
  height: 100%;
  gap: 1vh;
}

</style>
