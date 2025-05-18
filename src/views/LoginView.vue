<script setup>
import { ref } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiArrowLeft } from '@mdi/js'
import { useRouter } from 'vue-router'

const router = useRouter()
const path = mdiArrowLeft

const email = ref('')
const senha = ref('')
const repetirSenha = ref('')
const lembrar = ref(false)
const erroSenha = ref('')
const erroEmail = ref('')
function validarForm() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  erroEmail.value = ''
  erroSenha.value = ''

  if (!email.value) {
    erroEmail.value = 'O email é obrigatório.'
  } else if (!emailRegex.test(email.value)) {
    erroEmail.value = 'Formato de email inválido.'
  }

  if (!senha.value) {
    erroSenha.value = 'A senha é obrigatória.'
  } else if (senha.value !== repetirSenha.value) {
    erroSenha.value = 'As senhas não coincidem!'
  }
  if (!erroEmail.value && !erroSenha.value) {
    alert('Registrado com sucesso!')
  }
}


const senhaVisivel = ref(false)
const repetirSenhaVisivel = ref(false)

</script>

<template>
  <main class="login-wrapper">
    <div class="nav-placeholder"></div>

    <div class="login-container">
      <div class="login-box">
        <button class="back-button" @click="router.push('/')">
          <SvgIcon type="mdi" :path="path" />
          Go back
        </button>

        <h1>Registro</h1>
        <p class="subtitle">Não que eu ligue, mas põe teus dados aí:</p>

        <form class="form" @submit.prevent="validarForm">
          <label for="email">email:</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="não venha por jorginho123@hotmail.com"
          />

          <label for="senha">senha:</label>
          <div class="senha-wrapper">
             <input
              id="senha"
              v-model="senha"
              class="input-senha"
              :type="senhaVisivel ? 'text' : 'password'"
              placeholder="#@%&@&~$"
            />
            <button type="button" class="senha-toggle" @click="senhaVisivel = !senhaVisivel">
              {{ senhaVisivel ? '🙈' : '👁️' }}
            </button>
            <button type="button" class="senha-reset" @click="senha = ''">↺</button>
          </div>
          <label for="repetir">repetir senha:</label>
          <div class="senha-wrapper">
            <input
              id="repetir"
              v-model="repetirSenha"
              class="input-senha"
              :type="repetirSenhaVisivel ? 'text' : 'password'"
              placeholder="digita de novo aí"
            />
            <button type="button" class="senha-toggle" @click="repetirSenhaVisivel = !repetirSenhaVisivel">
              {{ repetirSenhaVisivel ? '🙈' : '👁️' }}
            </button>
            <button type="button" class="senha-reset" @click="repetirSenha = ''">↺</button>
          </div>

          <p v-if="erroSenha" class="erro">{{ erroSenha }}</p>

          <div class="toggle-row">
            <label class="switch">
              <input type="checkbox" v-model="lembrar" />
              <span class="slider"></span>
            </label>
            <span>Não me esquece</span>
          </div>

          <button type="submit" class="register-btn">Registrar</button>
        </form>

        <div class="social-buttons">
          <button class="social google">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
            O de sempre mestre?
          </button>
        </div>
      </div>

      <div class="side-box">
        <div class="overlay-box">
          <img src="/logo-reverse.png" alt="logo reverse" />
          <p>se tu quer feeedback fofo, procure outra IA.</p>
          <hr />
          <div class="msn1">
            A inteligência artificial que lê seu currículo... e te julga sem piedade.
          </div>
          <div class="msn2">
            Ela vai além da análise técnica: satiriza suas experiências, destaca suas “conquistas”
            com ironia, e te coloca num ranking implacável. Nada escapa — nem aquele curso de 4h que
            você colocou como formação.
          </div>
          <div class="msn3">
            Com humor ácido e sinceridade brutal, a GenIA entrega verdades que nem seu recrutador
            teria coragem de dizer.
          </div>
        </div>
        <div class="decor-square"></div>
        <div class="decor-square2"></div>
        <div class="decor-square3"></div>
        <div class="decor-square4"></div>
        <div class="decor-square5"></div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.login-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom right, #ffffff, #e9f5f4);
  font-family: sans-serif;
  padding: 0;
  margin: 0;
}
.nav-placeholder {
  height: 8vh;
  width: 100%;
}

.login-container {
  display: flex;
  width: 95vw;
  height: 90vh;
  background-color: #f9fdfd;
  border: 0.1vw solid #1a5d46;
  border-radius: 1.5vw;
  overflow: hidden;
  justify-self: center;
}

.login-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: white;
  padding: 2vw;
}
.senha-wrapper {
  position: relative;
  width: 100%;
}

.senha-wrapper input {
  width: 100%;
}

.senha-toggle,
.senha-reset {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1vw;
  cursor: pointer;
  color: #1a5d46;
}

.senha-toggle {
  right: 2.5vw;
}

.senha-reset {
  right: 0.5vw;
}
.input-senha {
  padding: 1vh;
  border: 0.02vw solid #1a5d46;
  border-radius: 0.3vw;
  font-size: 0.95vw;
  color: #333;
}



.side-box {
  flex: 1;
  background-image: url('/natureza.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2vw;
  margin-left: 0;
  border: 0.1vw solid #1c3c2e;
  border-radius: 1vw;
  overflow: hidden;
  box-shadow: 0 0 1vw rgba(0, 0, 0, 0.1);
  position: relative;
}
.decor-square {
  position: absolute;
  top: 2vw;      
  right: 11vw;    
  width: 4vw;
  height: 4vw;
  background-color: rgba(180, 180, 180, 0.5);
  border-radius: 0.5vw;
  border: 0.1vw solid #ffffff;
  z-index: 10;
  pointer-events: none;
}
.decor-square2 {
  position: absolute;
  top: 7vw;      
  right: 5vw;    
  width: 6vw;
  height: 6vw;
  background-color: rgba(180, 180, 180, 0.5);
  border-radius: 0.5vw;
  border: 0.1vw solid #ffffff;
  z-index: 10;
  pointer-events: none;
}
.decor-square3 {
  position: absolute;
  top: 31.5vw;      
  right: 8vw;    
  width: 4vw;
  height: 4vw;
  background-color: rgba(180, 180, 180, 0.5);
  border-radius: 0.5vw;
  border: 0.1vw solid #ffffff;
  z-index: 10;
  pointer-events: none;
}
.decor-square4 {
  position: absolute;
  top: 22vw;      
  right: 34vw;    
  width: 5vw;
  height: 5vw;
  background-color: rgba(180, 180, 180, 0.5);
  border-radius: 0.5vw;
  border: 0.1vw solid #ffffff;
  z-index: 10;
  pointer-events: none;
}
.decor-square5 {
  position: absolute;
  top: 21vw;      
  right: 38vw;    
  width: 2vw;
  height: 2vw;
  background-color: rgba(180, 180, 180, 0.5);
  border-radius: 0.5vw;
  border: 0.1vw solid #ffffff;
  z-index: 10;
  pointer-events: none;
}


.overlay-box {
  background-color: rgba(255, 255, 255, 0.9);
  position: relative;
  color: #1a5d46;
  padding: 2vw;
  border-radius: 0.8vw;
  font-size: 1.1vw;
  display: flex;
  flex-direction: column;
  gap: 1vh;
  width: 50%; /* Ocupa o espaço da .side-box */
  max-width: 40vw; /* Controla o limite pra não exagerar */
  height: auto;
  z-index: 1;
}

.overlay-box img {
  width: 5vw;
  height: 5vw;
  margin-bottom: 1vh;
  align-self: center;
}
start .overlay-box hr {
  border: none;
  height: 0.1vh;
  background-color: #1a5d46;
  margin: 1vh 0;
}

.msn1,
.msn3 {
  align-self: flex-start; /* alinha à esquerda */
  background-color: #1a5d46;
  color: white;
  padding: 1vh;
  border-radius: 0.8vw;
  max-width: 18vw;
  font-size: 0.9vw;
}
.msn2 {
  align-self: flex-end; /* alinha à direita */
  background-color: #1cac7a;
  color: white;
  padding: 1vh;
  border-radius: 0.8vw;
  max-width: 18vw;
  font-size: 0.9vw;
}
.back-button {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  color: #1a5d46;
  font-size: 0.9em;
  cursor: pointer;
  margin-bottom: 1vh;
  align-self: flex-start;
}

.back-button :deep(svg) {
  width: 1.2vw;
  height: 1.2vw;
  margin-right: 0.5vw;
}

h1 {
  font-size: 2vw;
  font-weight: bold;
  color: #1a5d46;
  margin-bottom: 0.5vh;
}

.subtitle {
  color: #1a5d46;
  font-size: 1vw;
  margin-bottom: 2vh;
  text-align: center;
}

form.form {
  display: flex;
  flex-direction: column;
  gap: 1vh;
  width: 100%;
  max-width: 30vw;
  align-items: flex-start;
}
label {
  font-size: 1.1vw;
  color: #1a5d46;
}

input[type='email'],
input[type='password'] {
  padding: 1vh;
  border: 0.02vw solid #1a5d46;
  border-radius: 0.3vw;
  font-size: 0.95vw;
  color: #333;
  width: 100%;
}

input::placeholder {
  color: #999;
  font-size: 0.9vw;
}

.toggle-row {
  display: flex;
  align-items: center;
  gap: 0.6vw;
  margin: 1vh 0;
}

.register-btn {
  background-color: #1a5d46;
  color: white;
  border: none;
  padding: 1vh;
  font-size: 1vw;
  border-radius: 0.3vw;
  cursor: pointer;
  width: 100%;
  max-width: 10vw;
  align-self: center;
  margin-top: 2vh;
}

.switch {
  position: relative;
  display: inline-block;
  width: 3vw;
  height: 1.5vw;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  display: flex;
  border-radius: 2vw;
}

.slider:before {
  position: absolute;
  content: '';
  height: 1.2vw;
  width: 1.2vw;
  left: 0.2vw;
  bottom: 0.15vw;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

.switch input:checked + .slider {
  background-color: #1a5d46;
}

.switch input:checked + .slider:before {
  transform: translateX(1.5vw);
}

.social-buttons {
  margin-top: 2vh;
  display: flex;
}

.social.google {
  display: flex;
  align-items: center;
  gap: 0.5vw;
  background: white;
  border: 0.1vw solid #1a5d46a1;
  padding: 1vh 1vw;
  border-radius: 0.3vw;
  cursor: pointer;
  font-size: 0.9vw;
  margin-bottom: 0vh;
}

.social.google img {
  width: 1.2vw;
  height: 1.2vw;
}

.erro {
  color: red;
  font-size: 0.85vw;
  margin-top: -0.5vh;
  margin-bottom: 1vh;
}
</style>
