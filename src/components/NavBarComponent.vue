<script setup></script>

<template>
  <nav>
    <span>
      <img src="../../public/logo.png" alt="GenIA" />
      <img src="../../public/title-nav.png" alt="GenIA" />
    </span>
    <span >
      <button class="login-btn">Login</button>
      <button class="green-btn">Registre-se</button>
    </span>
  </nav>
</template>

<style scoped>
nav{
  height: 8vh;
  border-bottom: 2px solid #1A5D46;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2vw;
}

span{
display: flex;
align-items: center;
}

span:last-of-type{
  gap: 2vw;

  & .login-btn{
    background-color: transparent;
    border: none;
    outline: none;
    font-weight: 600;
  }
}

img:first-of-type{
  height: 8vh;
}
img{
  height: 5vh;
}
</style>
