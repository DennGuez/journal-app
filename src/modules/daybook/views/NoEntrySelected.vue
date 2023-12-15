<template>
  <sup>NoEntrySelected</sup> 
  <div class="d-flex justify-content-center">
      <h1 class="align-self-center">No hay nada seleccionado</h1>
  </div>

  <FabButton 
    @on-click="createNewEntry"
  />
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'

const FabButton = defineAsyncComponent(() =>
  import('../components/Fab.vue')
)

// Data -----
const router = useRouter()

// Methods -----
const createNewEntry = () => {
    router.push({ name: 'entry', params: { id: 'new' }})
}

</script>

<style lang="scss" scoped>
div {
    height: 100%;
}
 
</style>
