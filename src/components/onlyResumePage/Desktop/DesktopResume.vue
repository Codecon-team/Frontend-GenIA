<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useResumeStore } from "@/stores/resume";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const route = useRoute();
const resumeStore = useResumeStore();
const id = route.params.id;

const pontuacao = ref(0);
const resumo = ref("");
const nomeIndividuo = ref("[Nome do individuo]");
const areaIndividuo = ref("[Área do individuo]");
const pontosFortes = ref();
const pontosFracos = ref();
const loading = ref(false);
const error = ref(null);
const user = ref();

onMounted(async () => {
  user.value = await userStore.getMeUser();
  await fetchResume();
});

async function fetchResume() {
  loading.value = true;
  error.value = null;
  try {
    const response = await resumeStore.getOneResumeAnalyze(id);
    console.log(response.resume);
    if (response) {
      pontuacao.value = response.resume.analyses[0].score || 0;
      resumo.value =
        response.resume.analyses[0].funny_comment || "Nenhum resumo encontrado.";
      nomeIndividuo.value = user.value?.username || "[Nome não encontrado]";
      areaIndividuo.value = response.area || "[Área não encontrada]";

      const strengths = response.resume.analyses[0].strengths || "";
      const weaks = response.resume.analyses[0].weaknesses || "";

      pontosFortes.value = strengths.split(",").map((p) => p.trim());
      pontosFracos.value = weaks.split(",").map((p) => p.trim());
    } else {
      error.value = "Currículo não encontrado.";
    }
  } catch (err) {
    console.error("Erro ao buscar o currículo:", err);
    error.value = "Erro ao buscar o currículo. Tente novamente.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <main v-if="!loading && !error">
    <span>
      <div class="glass-container padding-box">
        <p>💥 Pontos Negativos</p>
        <ul>
          <li v-for="(ponto, index) in pontosFracos?.slice(0, 5)" :key="index">
            {{ ponto }}
          </li>
        </ul>
        <p>🤏 Ponto Positivos</p>
        <ul>
          <li v-for="(ponto, index) in pontosFortes?.slice(0, 5)" :key="index">
            {{ ponto }}
          </li>
        </ul>
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
      <router-link class="green-btn">
        <label class="text-center"> Voltar </label>
      </router-link>
    </span>
    <div class="info glass-container">
      <span class="title-container">
        <h1>{{ nomeIndividuo }}</h1>
      </span>
      <h3>Resumo:</h3>
      <p>{{ resumo }}</p>
    </div>
  </main>
  <div v-else-if="loading">Carregando informações do currículo...</div>
  <div v-else-if="error">Erro ao carregar o currículo: {{ error }}</div>
</template>

<style scoped>
.info {
  flex: 1 1 60%;
  min-width: 300px;
  max-width: 64vw;
  height: auto;
  padding: 5vh 3vw;
}
p {
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

.text-center{
  text-align: center;
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
  width: 25vw;
  background-color: #d9d9d959;
}

ul{
  margin-left: 4vh;
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
