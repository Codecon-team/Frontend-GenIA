<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usePaymentStore } from '@/stores/payment'

const paymentStore = usePaymentStore()
const loading = ref(false)
const timer = ref(null)
const error = ref(null)

const generatePayment = async () => {
  if (loading.value) return

  loading.value = true
  error.value = null
  clearInterval(timer.value)
  console.log('Iniciando geração de pagamento')

  try {
    const response = await paymentStore.createPayment()
    console.log('Resposta do pagamento:', response)

    if (!response) {
      throw new Error('Resposta vazia do servidor')
    }

    startExpirationTimer(new Date(response.date_of_expiration))
    console.log('Timer iniciado')
  } catch (err) {
    console.error('Erro detalhado:', err)
    error.value = 'Erro ao gerar pagamento. Tente novamente.'
  } finally {
    console.log('Finalizando loading')
    loading.value = false
  }
}

const startExpirationTimer = (expirationDate) => {
  clearInterval(timer.value)

  timer.value = setInterval(() => {
    const now = new Date()
    if (now >= expirationDate) {
      clearInterval(timer.value)
      paymentStore.clearPayment()
    }
  }, 1000)
}

const getTimeRemaining = () => {
  if (!paymentStore.payment?.date_of_expiration) return null

  const expiration = new Date(paymentStore.payment.date_of_expiration)
  const now = new Date()
  const diff = expiration - now

  if (diff <= 0) return null

  const minutes = Math.floor((diff / 1000 / 60) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('pt-BR')
}

onMounted(() => {
  // Remove automatic payment generation
})

onUnmounted(() => {
  clearInterval(timer.value)

  paymentStore.clearPayment()
})
</script>

<template>
  <div class="main">
    <div class="qr-container glass-container">
      <h1 class="text">Pagamento com PIX</h1>

      <div v-if="!paymentStore.payment && !loading && !error" class="generate-pix">
        <p>Clique no botão abaixo para gerar o pagamento via PIX</p>
        <button @click="generatePayment" class="green-btn">
          Gerar Pagamento PIX
        </button>
      </div>

      <div v-else-if="loading" class="loading">
        <p class="box-qr">Gerando QR Code...</p>
        <div class="spinner"></div>
      </div>

      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="generatePayment" class="green-btn">
          Tentar Novamente
        </button>
      </div>

      <div v-else-if="paymentStore.payment" class="payment-info">
        <div class="qr-section">
          <img
            :src="'data:image/png;base64,' + paymentStore.payment.point_of_interaction.transaction_data.qr_code_base64"
            alt="QR Code de Pagamento"
            class="qr"
          />
          <p class="msn">Escaneie com o app do seu banco ou carteira digital</p>

          <div class="pix-code">
            <p class="pix-code-label">Código PIX</p>
            <div class="pix-code-container">
              <p class="pix-code-text">{{ paymentStore.payment.point_of_interaction.transaction_data.qr_code }}</p>
              <button
                class="copy-btn"
                @click="navigator.clipboard.writeText(paymentStore.payment.point_of_interaction.transaction_data.qr_code)"
              >
                Copiar
              </button>
            </div>
          </div>

          <div v-if="getTimeRemaining()" class="timer">
            Expira em: {{ getTimeRemaining() }}
          </div>

          <div v-if="paymentStore.payment.transaction_amount" class="amount">
            Valor: R$ {{ paymentStore.payment.transaction_amount.toFixed(2) }}
          </div>
        </div>

        <div class="payment-details">
          <h2>Detalhes do Pagamento</h2>
          <p>Status: {{ paymentStore.payment.status || 'Pendente' }}</p>
          <p>ID: {{ paymentStore.payment.id }}</p>
          <p v-if="paymentStore.payment.date_created">Data de criação: {{ formatDate(paymentStore.payment.date_created) }}</p>
          <p v-if="paymentStore.payment.date_of_expiration">Expira em: {{ formatDate(paymentStore.payment.date_of_expiration) }}</p>
          <a
            v-if="paymentStore.payment.point_of_interaction.transaction_data.ticket_url"
            :href="paymentStore.payment.point_of_interaction.transaction_data.ticket_url"
            target="_blank"
            class="ticket-link"
          >
            Abrir Comprovante
          </a>
        </div>
      </div>

      <div v-else class="expired">
        <p>QR Code expirado ou não gerado.</p>
        <button @click="generatePayment" class="green-btn">
          Gerar Novo QR Code
        </button>
      </div>
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

.qr-container {
  background-color: white;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.text {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #1a5d46;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.box-qr {
  font-size: 1rem;
  color: #1a5d46;
}

.spinner {
  width: 40px;
  height: 40px;
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

.payment-info {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.qr-section {
  flex: 1;
}

.qr {
  width: 250px;
  height: 250px;
  object-fit: contain;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}

.payment-details {
  flex: 1;
  text-align: left;
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 0.5rem;
}

.payment-details h2 {
  color: #1a5d46;
  margin-bottom: 1rem;
}

.payment-details p {
  margin-bottom: 0.5rem;
  color: #444;
}

.msn {
  font-size: 0.95rem;
  color: #1a5d46;
  margin-bottom: 1rem;
}

.pix-code {
  margin: 1rem 0;
  text-align: left;
}

.pix-code-label {
  font-size: 0.9rem;
  color: #1a5d46;
  margin-bottom: 0.5rem;
}

.pix-code-container {
  display: flex;
  gap: 1rem;
  background: #f8f8f8;
  padding: 0.75rem;
  border-radius: 0.5rem;
  align-items: center;
}

.pix-code-text {
  flex: 1;
  font-size: 0.8rem;
  color: #444;
  word-break: break-all;
}

.copy-btn {
  background: #1a5d46;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
}

.copy-btn:hover {
  background: #154835;
}

.timer {
  font-size: 1.2rem;
  font-weight: bold;
  color: #1a5d46;
  margin: 1rem 0;
}

.amount {
  font-size: 1.2rem;
  font-weight: bold;
  color: #1a5d46;
  margin: 1rem 0;
}

.green-btn {
  background-color: #1a5d46;
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.green-btn:hover {
  background-color: #154835;
}

.ticket-link {
  display: inline-block;
  margin-top: 1rem;
  color: #1a5d46;
  text-decoration: none;
  font-weight: 500;
}

.ticket-link:hover {
  text-decoration: underline;
}

.error {
  color: #dc2626;
  margin: 1rem 0;
}

.expired {
  color: #666;
  margin: 1rem 0;
}

.generate-pix {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}

.generate-pix p {
  color: #1a5d46;
  font-size: 1.1rem;
  text-align: center;
}

@media (max-width: 768px) {
  .payment-info {
    flex-direction: column;
  }

  .payment-details {
    width: 100%;
  }

  .qr {
    width: 200px;
    height: 200px;
  }
}
</style>

