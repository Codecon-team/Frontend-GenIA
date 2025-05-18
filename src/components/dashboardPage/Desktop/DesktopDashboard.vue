<script setup>
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import ResumeService from '@/services/resume'
import { useRouter } from 'vue-router'
import { useNotify } from '@/composables/useNotify'

const router = useRouter()
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
const notify = useNotify()

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
  console.log(userStore.user)
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
    <div class="dashboard-container">
      <!-- Seção de Perfil -->
      <section class="profile-section">
        <div class="profile-header glass-container">
          <div class="profile-info">
            <h1>{{ userStore.user?.username || 'Usuário' }}</h1>
            <div class="profile-meta">
              <p><span>Criado em:</span> {{ new Date(userStore.user?.created_at).toLocaleDateString('pt-BR') }}</p>
              <p><span>Última atualização:</span> {{ new Date(userStore.user?.updated_at).toLocaleDateString('pt-BR') }}</p>
            </div>
          </div>
          <div class="profile-status">
            <div class="status-badge">
              <span class="badge-label">Tipo:</span>
              <span class="badge">{{ userStore.user?.role === 'candidate' ? 'Candidato' : 'Usuário' }}</span>
            </div>
            <div class="status-badge">
              <span class="badge-label">Status:</span>
              <span class="badge">  {{ isUserPremium(userStore.user) ? 'Premium' : 'Gratuito' }}
              </span>
            </div>
            <div class="status-badge">
              <span class="badge-label">Email:</span>
              <span class="badge">{{ userStore.user?.email_verified_at ? 'Verificado' : 'Não Verificado' }}</span>
            </div>
          </div>
          <div class="premium-section">
            <p class="plan-status">
              {{ isUserPremium(userStore.user) ? '🤴 Plano Patrão' : '👨‍🌾 Plano Camponês' }}            </p>
            <button
              v-if="!isUserPremium(userStore.user)"
              class="upgrade-btn"
              @click="router.push('/premium')"
            >
              Fazer Upgrade para Premium
            </button>
          </div>
        </div>

        <div class="profile-form glass-container">
          <h2>Informações Pessoais</h2>
          <div class="form-grid">
            <label class="input-field">
              <span>Nome de Usuário</span>
              <input
                type="text"
                v-model="formData.username"
                placeholder="Digite seu nome de usuário"
              />
            </label>
            <label class="input-field">
              <span>Primeiro Nome</span>
              <input
                type="text"
                v-model="formData.firstname"
                placeholder="Digite seu primeiro nome"
              />
            </label>
            <label class="input-field">
              <span>Sobrenome</span>
              <input
                type="text"
                v-model="formData.lastname"
                placeholder="Digite seu sobrenome"
              />
            </label>
            <label class="input-field">
              <span>Email</span>
              <input
                type="email"
                v-model="formData.email"
                placeholder="Digite seu email"
              />
            </label>
            <label class="input-field">
              <span>CPF</span>
              <input
                type="text"
                v-model="formData.cpf"
                placeholder="Digite seu CPF"
              />
            </label>
          </div>
          <button class="save-btn" @click="handleSave">Salvar Alterações</button>
        </div>
      </section>

      <!-- Seção de Currículos -->
      <section class="resumes-section">
        <div class="upload-section glass-container">
          <h2>Upload de Currículo</h2>
          <div class="upload-area" :class="{ 'uploading': isUploading }">
            <i class="upload-icon">📄</i>
            <p>Arraste seu currículo aqui ou clique para selecionar</p>
            <label class="upload-btn" :class="{ 'disabled': isUploading }">
              {{ isUploading ? 'Enviando...' : 'Selecionar Arquivo' }}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                @change="handleFileUpload"
                :disabled="isUploading"
              />
            </label>
          </div>
        </div>

        <div class="resumes-list glass-container">
          <h2>Histórico de Currículos</h2>
          <div v-if="resumes.length === 0" class="no-resumes">
            <p>Nenhum currículo enviado ainda</p>
          </div>
          <div v-else class="resumes-grid">
            <div v-for="resume in resumes"
                 :key="resume.id"
                 class="resume-card"
                 @click="toggleResumeDetails(resume)">
              <div class="resume-header">
                <img
                  src="https://www.dicasdecurriculo.com.br/wp-content/uploads/2024/03/modelo-de-curriculo-word-simples.jpg"
                  alt="Currículo"
                />
                <div class="resume-info">
                  <h3>{{ resume.fileName }}</h3>
                  <p>{{ formatDate(resume.createdAt) }}</p>
                </div>
                <div class="resume-score" v-if="getLatestAnalysis(resume)">
                  {{ getLatestAnalysis(resume).score }}/100
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.dashboard-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
}

.profile-section,
.resumes-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.glass-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Profile Header Styles */
.profile-header {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.profile-info h1 {
  font-size: 2rem;
  color: #1a5d46;
  margin-bottom: 1rem;
}

.profile-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.profile-meta p {
  font-size: 0.9rem;
  color: #666;
}

.profile-meta p span {
  color: #1a5d46;
  font-weight: 500;
}

.profile-status {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.status-badge {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.badge-label {
  font-size: 0.8rem;
  color: #666;
}

.badge {
  background: #1a5d46;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
}

/* Profile Form Styles */
.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.profile-form h2 {
  color: #1a5d46;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.input-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-field span {
  font-size: 0.9rem;
  color: #1a5d46;
  font-weight: 500;
}

.input-field input {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input-field input:focus {
  border-color: #1a5d46;
  box-shadow: 0 0 0 2px rgba(26, 93, 70, 0.1);
}

.save-btn {
  background: #1a5d46;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.save-btn:hover {
  background: #154835;
  transform: translateY(-2px);
}

/* Upload Section Styles */
.upload-section {
  text-align: center;
}

.upload-section h2 {
  color: #1a5d46;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.upload-area {
  border: 2px dashed #1a5d46;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: rgba(26, 93, 70, 0.05);
  transition: all 0.3s ease;
}

.upload-area:hover {
  background: rgba(26, 93, 70, 0.1);
}

.upload-icon {
  font-size: 3rem;
}

.upload-area p {
  color: #666;
  font-size: 1rem;
}

.upload-btn {
  background: #1a5d46;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.upload-btn:hover {
  background: #154835;
  transform: translateY(-2px);
}

.upload-btn input {
  display: none;
}

/* Resumes List Styles */
.resumes-list {
  flex: 1;
}

.resumes-list h2 {
  color: #1a5d46;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.resumes-grid {
  display: grid;
  gap: 1rem;
  max-height: 500px;
  overflow-y: auto;
}

.resume-card {
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
}

.resume-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.resume-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.resume-header img {
  width: 48px;
  height: 48px;
  border-radius: 0.5rem;
  object-fit: cover;
}

.resume-info {
  flex: 1;
}

.resume-info h3 {
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.25rem;
}

.resume-info p {
  font-size: 0.8rem;
  color: #666;
}

.resume-score {
  background: rgba(26, 93, 70, 0.1);
  color: #1a5d46;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-weight: 600;
}

.premium-section {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.plan-status {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a5d46;
  margin-bottom: 1rem;
}

.upgrade-btn {
  background: #1a5d46;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upgrade-btn:hover {
  background: #154835;
  transform: translateY(-2px);
}

/* Responsive Adjustments */
@media (max-width: 1200px) {
  .dashboard-container {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .profile-status {
    grid-template-columns: 1fr;
  }
}
</style>
