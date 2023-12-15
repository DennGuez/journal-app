<template>
  <div class="home">
    <img src="@/assets/logo.png" alt="Vue Logo">

    <h1>Hola Mundo</h1>

    <button @click="goToDaybook" class="btn btn-primary">Primary</button>
    <button @click="goToDaybook" class="btn btn-secondary">Secondary</button>
    <button @click="goToDaybook" class="btn btn-success">Success</button>
  </div> 
</template>

<script setup>
import { useRouter } from 'vue-router'

// Data
const router = useRouter()

// Methods
const goToDaybook = () => {
  router.push({ name: 'no-entry' })
}

</script>

<style scoped>

</style>
