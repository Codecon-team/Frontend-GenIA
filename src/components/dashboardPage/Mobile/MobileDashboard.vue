'<script setup>
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import ResumeService from '@/services/resume'
import { useRouter } from 'vue-router'
import { notify } from '@/utils/notifications'

const userStore = useUserStore()
const formData = ref({
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  cpf: ''
})

const resumes = ref([])
const isUploading = ref(false)
const selectedResume = ref(null)
const router = useRouter()

onMounted(async () => {
  await userStore.getMeUser()
  if (userStore.user) {
    formData.value = {
      username: userStore.user.username || '',
      firstname: userStore.user.firstname || '',
      lastname: userStore.user.lastname || '',
      email: userStore.user.email || '',
      cpf: userStore.user.cpf || ''
    }
  }
  await loadResumes()
})

async function loadResumes() {
  try {
    const response = await ResumeService.getResumeAnalyze()
    resumes.value = response.resumes || []
  } catch (error) {
    console.error('Erro ao carregar currículos:', error)
  }
}

async function handleSave() {
  try {
    await userStore.updateUser(formData.value)
    await userStore.getMeUser()
  } catch (error) {
    console.error('Erro ao atualizar:', error)
  }
}

async function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  try {
    isUploading.value = true
    await ResumeService.analyzeResume(file)
    await loadResumes()
    notify.success('Currículo enviado com sucesso!')
  } catch (error) {
    console.error('Erro ao enviar currículo:', error)
    notify.error('Erro ao enviar o currículo. Tente novamente.')
  } finally {
    isUploading.value = false
    event.target.value = ''
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getLatestAnalysis(resume) {
  return resume.analyses?.[0] || null
}

function toggleResumeDetails(resume) {
  if (selectedResume.value === resume) {
    selectedResume.value = null
  } else {
    router.push(`/resume/${resume.id}`)
  }
}


function isUserPremium(user) {
  return user.subscriptions?.some(subscription =>
    subscription.status === 'active' &&
    subscription.plan?.slug !== 'basic'
  );
}

defineExpose({
  isUserPremium
});
</script>

<template>
  <main>
    <div class="user">
      <div class="info-user">
        <div class="glass-container">
          <h1>{{ userStore.user?.username || 'Usuário' }}</h1>
          <p>Criado em: {{ new Date(userStore.user?.created_at).toLocaleDateString('pt-BR') }}</p>
          <p>Última atualização: {{ new Date(userStore.user?.updated_at).toLocaleDateString('pt-BR') }}</p>
        </div>
        <div class="glass-container">
          <h1>Tipo: {{ userStore.user?.role === 'candidate' ? 'Candidato' : 'Usuário' }}</h1>
          <p>Status:  {{ isUserPremium(userStore.user) ? 'Premium' : 'Gratuito' }}</p>
          <p>Email verificado: {{ userStore.user?.email_verified_at ? 'Sim' : 'Não' }}</p>
          <div class="premium-section">
            <p class="plan-status">
              {{ isUserPremium(userStore.user) ? '🤴 Plano Patrão' : '👨‍🌾 Plano Camponês' }}
            </p>
            <button
              class="green-btn upgrade-btn"
              @click="router.push('/premium')"
              v-if="!isUserPremium(userStore.user)"
            >
              Fazer Upgrade
            </button>
          </div>
        </div>
      </div>
      <div class="bottom-container">
        <div class="user-form glass-container">
          <span class="inputs-container">
            <label class="input-field">
              <p>Nome de Usuário</p>
              <input
                type="text"
                v-model="formData.username"
                placeholder="Digite seu nome de usuário"
              />
            </label>
            <label class="input-field">
              <p>Primeiro Nome</p>
              <input
                type="text"
                v-model="formData.firstname"
                placeholder="Digite seu primeiro nome"
              />
            </label>
            <label class="input-field">
              <p>Segundo nome</p>
              <input
                type="text"
                v-model="formData.lastname"
                placeholder="Digite seu sobrenome"
              />
            </label>
            <label class="input-field">
              <p>Email</p>
              <input
                type="email"
                v-model="formData.email"
                placeholder="Digite seu email"
              />
            </label>
            <label class="input-field">
              <p>CPF</p>
              <input
                type="text"
                v-model="formData.cpf"
                placeholder="Digite seu CPF"
              />
            </label>
          </span>
          <button class="green-btn" @click="handleSave">Salvar</button>
        </div>
        <div class="upload-cv" :class="{ 'uploading': isUploading }">
          <p>Faça o Upload do Arquivo aqui mano, relaxa que tá seguro!</p>
          <label class="green-btn" :class="{ 'disabled': isUploading }">
            {{ isUploading ? 'Enviando...' : 'Upload CV' }}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              @change="handleFileUpload"
              :disabled="isUploading"
            />
          </label>
        </div>
      </div>
    </div>
    <div class="curriculums-container">
      <h2>Histórico de Currículos</h2>
      <div v-if="resumes.length === 0" class="no-resumes">
        <p>Nenhum currículo enviado ainda</p>
      </div>
      <div v-else v-for="resume in resumes" :key="resume.id"
           class="curriculum-card"
           :class="{ 'expanded': selectedResume === resume }"
           @click="toggleResumeDetails(resume)">
        <div class="resume-header">
          <img
            src="https://www.dicasdecurriculo.com.br/wp-content/uploads/2024/03/modelo-de-curriculo-word-simples.jpg"
            alt="Currículo"
          />
          <span class="resume-info">
            <p class="filename">{{ resume.fileName }}</p>
            <p class="date">Enviado em: {{ formatDate(resume.createdAt) }}</p>
          </span>
          <span class="score" v-if="getLatestAnalysis(resume)">
            {{ getLatestAnalysis(resume).score }}/100
          </span>
        </div>

        <div v-if="selectedResume === resume" class="resume-details">
          <div class="analysis-section">
            <h3>Pontos Fortes</h3>
            <p>{{ getLatestAnalysis(resume).strengths }}</p>
          </div>
          <div class="analysis-section">
            <h3>Pontos a Melhorar</h3>
            <p>{{ getLatestAnalysis(resume).weaknesses }}</p>
          </div>
          <div class="analysis-section">
            <h3>Sugestões</h3>
            <p>{{ getLatestAnalysis(resume).suggestions }}</p>
          </div>
          <div class="analysis-section funny">
            <h3>Comentário Humorístico</h3>
            <p>{{ getLatestAnalysis(resume).funnyComment }}</p>
          </div>
        </div>
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
  text-align: center;
}

.upload-cv p {
  font-size: 2vh;
}

.upload-cv > label{
  font-size: 2vh;
}

.upload-cv > label input {
  display: none;
}

.bottom-container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.bottom-container > label {
  width: 20%;
  text-align: center;
  height: fit-content;
}

.curriculum-card {
  padding: 2vh 2vw;
  width: 100%;
  background: white;
  border-radius: 8px;
  margin-bottom: 2vh;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.curriculum-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.resume-header {
  display: flex;
  align-items: center;
  gap: 1vw;
}

.resume-info {
  flex: 1;
}

.filename {
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5vh;
}

.date {
  font-size: 0.8rem;
  color: #666;
}

.score {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a5d46;
  padding: 0.5vh 1vw;
  background: rgba(26, 93, 70, 0.1);
  border-radius: 20px;
}

.resume-details {
  margin-top: 2vh;
  padding-top: 2vh;
  border-top: 1px solid #e0e0e0;
}

.analysis-section {
  margin-bottom: 2vh;
}

.analysis-section h3 {
  color: #1a5d46;
  font-size: 1rem;
  margin-bottom: 1vh;
}

.analysis-section p {
  color: #444;
  line-height: 1.5;
  white-space: pre-line;
}

.analysis-section.funny {
  background: #f8f8f8;
  padding: 2vh;
  border-radius: 8px;
}

.analysis-section.funny h3 {
  color: #1a5d46;
}

.curriculum-card img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  flex-direction: column;
  gap: 2vh;
  width: 100%;
}

.input-field {
  width: 100%;
}

.input-field p {
  font-size: 0.9rem;
  color: #1a5d46;
  margin-bottom: 0.5vh;
  font-weight: 500;
}

.input-field input {
  width: 100%;
  padding: 1vh 1vw;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  outline: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.input-field input:focus {
  border-color: #1a5d46;
  box-shadow: 0 0 0 2px rgba(26, 93, 70, 0.1);
}

.input-field input::placeholder {
  color: #999;
}

.user-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4vh;
  border-radius: 10px;
  width: 70%;
  box-shadow: 6px 6px 15px rgba(128, 128, 128, 0.346);
  padding: 4vh 2vw;
}

.user-form button {
  margin-top: 3vh;
  width: 100%;
  padding: 1.2vh 0;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.user-form button:hover {
  background-color: #154835;
  transform: translateY(-1px);
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

.green-btn {
  background-color: #1A5D46;
  color: white;
  border: none;
  outline: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.upload-cv.uploading {
  opacity: 0.7;
  pointer-events: none;
}

.upload-cv .disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.no-resumes {
  text-align: center;
  padding: 2vh 0;
  color: #666;
}

.premium-section {
  margin-top: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
}

.plan-status {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a5d46;
}

.upgrade-btn {
  padding: 1vh 4vw;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 50%;
}

.upgrade-btn:hover {
  background-color: #154835;
  transform: translateY(-1px);
}

@media screen and (max-width: 768px) {
  main {
    padding: 4vh 4vw;
    flex-direction: column;
    align-items: center;
  }

  .user {
    width: 100%;
    gap: 4vh;
  }

  .info-user {
    flex-direction: column;
    gap: 3vh;
    height: auto;
  }

  .bottom-container {
    flex-direction: column;
    gap: 4vh;
  }

  .user-form {
    width: 100%;
    padding: 4vh 5vw;
  }

  .upload-cv {
    width: 100%;
    height: auto;
    padding: 3vh 5vw;
  }

  .curriculums-container {
    width: 100%;
    max-height: none;
    padding: 4vh 5vw;
  }

  .upgrade-btn {
    width: 80%;
  }

  .score {
    font-size: 1rem;
    padding: 0.4vh 0.8vw;
  }

  .resume-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1vh;
  }

  .curriculum-card {
    padding: 4vh 4vw;
  }

  .resume-details {
    padding: 2vh 0;
  }
}
</style>
'