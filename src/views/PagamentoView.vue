<script setup>
import { ref, onMounted } from 'vue'

const qrCodeUrl = ref(null)
const loading = ref(true)
const timer = ref(60)
const timerMax = 60
const timerInterval = ref(null)
const progress = ref(100)

const gerarQRCode = async () => {
  loading.value = true
  qrCodeUrl.value = null
  clearInterval(timerInterval.value)
  timer.value = timerMax
  progress.value = 100

  try {
    // QR Code estático (pode trocar para o endpoint real depois)
    qrCodeUrl.value = 'https://api.qrserver.com/v1/create-qr-code/?data=https://www.google.com&size=200x200'

    // Iniciar contagem com barra
    timerInterval.value = setInterval(() => {
      timer.value--
      progress.value = (timer.value / timerMax) * 100

      if (timer.value <= 0) {
        gerarQRCode() // Regenera automaticamente
      }
    }, 1000)
  } catch (error) {
    console.error('Erro ao gerar QR Code:', error)
    qrCodeUrl.value = null
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  gerarQRCode()
})
</script>


<template>
  <div class="main">
    <div class="qr-conteiner">
      <h1 class="text">Pagamento com QR Code</h1>

      <div v-if="loading" class="loading">
        <p class="box-qr">Gerando QR Code...</p>
        <div class="gerate"></div>
      </div>

      <div v-else-if="qrCodeUrl" class="my-6">
        <img :src="qrCodeUrl" alt="QR Code de Pagamento" class="qr" />
        <p class="msn">Escaneie com o app do Mercado Pago</p>

        <!-- Barra de progresso -->
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
      </div>

      <div v-else class="msn">
        <p>QR Code expirado ou não gerado.</p>
      </div>

      <button @click="gerarQRCode" class="button">
        Gerar Novo QR Code
      </button>
    </div>
  </div>
</template>


<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
}

.qr-conteiner {
  background-color: white;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.text {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #1a5d46;
}

.loading .box-qr {
  font-size: 1rem;
  color: #1a5d46;
  margin-bottom: 1rem;
}

.gerate {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border: 4px solid #ccc;
  border-top: 4px solid #1a5d46;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.qr {
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}

.msn {
  font-size: 0.95rem;
  color: #1a5d46;
  margin-bottom: 1rem;
}

.timer {
  font-size: 0.95rem;
  font-weight: bold;
  color: #1a5d46;
  margin-top: 0.5rem;
}

.button {
  background-color: #1a5d46;
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #071d15;
}
.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #e5e7eb;
  border-radius: 90x;
  overflow: hidden;
  margin-top: 0.5rem;
  position: relative;
  margin-bottom: 1rem;
  border-radius: 7px;
}

.progress-fill {
  height: 100%;
  background-color: #1a5d46;
  transition: width 1s linear;
  border-radius: 7px;
}

</style>
