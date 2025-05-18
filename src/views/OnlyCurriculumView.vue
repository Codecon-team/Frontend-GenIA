<script setup>
import { DefaultResume } from '@/components'
</script>

<template>
  <DefaultResume/>
</template>

<style scoped>
.info {
  width: 64vw;

  height: 63vh;

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
