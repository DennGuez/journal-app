<template>
 <sub>Entry</sub>  
  <div
    class="entry-container mb-3 pointer p-2"
    @click="$router.push({ name: 'entry', params: { id: entry.id } })"
  >
    <div class="entry-title d-flex">
        <span class="text-success fs-5 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-5">{{ month }}</span>
        <span class="mx-2 fw-light">{{ yearDay }}</span>
    </div>
    <div class="entry-description">
        {{ shortText }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// Props 
const { entry } = defineProps({
  entry: {
    type: Object,
    required: true
  } 
})

// Data
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']

// Computed
const shortText = computed(() => {
  return ( entry.text.length > 130 )
        ? entry.text.substring(0,130) + '...'
        : entry.text
})

const day = computed(() => {
  const date = new Date( entry.date )
  return date.getDate()
 })
const month = computed(() => { 
  const date = new Date( entry.date )
  return months[ date.getMonth() ]
 })
const yearDay = computed(() => { 
  const date = new Date( entry.date )
  return `${ date.getFullYear() }, ${ days[ date.getDay() ] }`
 })

 
</script>

<style lang="scss" scoped>
.entry-container {
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover {
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
    }
}

</style>
