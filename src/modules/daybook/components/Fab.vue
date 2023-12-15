<template>
  <sub>Fab</sub>  
  <button @click="emit('on-click')"
          class="btn btn-primary"> 
      <i  class="fa fa-2x"
          :class="`${ icon }`"></i>
  </button>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: 'fa-plus'
  }
})

const emit = defineEmits(['on-click'])

</script>

<style lang="scss" scoped>
button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 80px;
  height: 80px;
  border-radius: 100%
}
</style>
