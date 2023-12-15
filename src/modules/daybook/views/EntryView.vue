<template>
  <sub>EntryView</sub>
  <template v-if="entry">
      <div class="entry-title d-flex justify-content-between p-2">
        <div>
            <span class="text-success fs-3 fw-bold">{{ day }}</span>
            <span class="mx-1 fs-3">{{ month }}</span>
            <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
        </div>

        <div>
            <input type="file"
                    @change="onSelectedImage"
                    ref="input"
                    v-show="false"
                    accept="image/png, image/jpeg">
            <button @click="onDeleteEntry"
                    v-if="entry.id"
                    class="btn btn-danger mx-2">
                Borrar
                <i class="fa fa-trash-all"></i>
            </button>
            <button @click="onSelectImage"
                    class="btn btn-primary">
                Subir foto
                <i class="fa fa-upload"></i>
            </button>
        </div>
     </div>
    <hr>
    <div class="d-flex flex-column px-3 h-75">
        <textarea
            v-model="entry.text"
            placeholder="¿Qué sucedió?"
        ></textarea>
    </div>
    <img v-if="entry.picture && !localImage"
         :src="entry.picture" 
         alt="entry-picture"
         class="img-thumbnail">
   
   <img v-if="localImage"
         :src="localImage" 
         alt="entry-picture"
         class="img-thumbnail">
  </template>
  
  <FabButton 
    icon="fa-save"
    @on-click="saveEntry"
  />
  
</template>

<script setup>
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useJournalStore } from '../store/journalStore'
import getDayMonthYear from '../helpers/getDayMonthYear'
import uploadImage from '../helpers/uploadImage'

// AsyncComponents
const FabButton = defineAsyncComponent(() =>
  import('../components/Fab.vue')
)

//  PROPS 
const props = defineProps({
    id: {
        type: String,
        required: true
    }
}) 


//  DATA 
const journalStore = useJournalStore()
const router = useRouter()
const entry = ref(null)
const localImage = ref(null)
const file = ref(null)
const input = ref(null)

//  METHODS
const loadEntry = () => {
        let entryx

        if ( props.id === 'new' ) {
            entryx = { text: '', date: new Date().getTime() }
        } else {
            entryx = journalStore.getEntryById( props.id )
            if ( !entryx ) return router.push({ name: 'no-entry'})
        }

        entry.value = entryx
 }

const saveEntry = async () => {

    new Swal({
        title: 'Espere por favor',
        allowOutsideClick: false
    })
    Swal.showLoading()

    const picture = await uploadImage( file.value )

    entry.value.picture = picture

    if( entry.value.id ) {
        // Actualizar
        await journalStore.updateEntry( entry.value )
    } else {
        const id = await journalStore.createEntry( entry.value )
        router.push({ name: 'entry', params: { id: id }})
    }

    file.value = null
    Swal.fire('Guardado', 'Entrada registrada con éxito', 'success')


}

const onDeleteEntry = async () => {

    const result = await Swal.fire({
        title: '¿Esta Seguro?',
        text: 'Una vez borrado no se puede recuperar',
        showDenyButton: true,
        confirmButtonText: 'Si, estoy Seguro'
    })

    if( result.isConfirmed ) {
        new Swal({
            title: 'Espere por favor',
            allowOutsideClick: false
        })
        Swal.showLoading()
            await journalStore.deleteEntry( props.id )
            router.push({ name: 'no-entry' })
        Swal.fire('Eliminado','','success')
    }
}

const onSelectedImage = (event) => {
    const filex = event.target.files[0]
    if ( !filex ) {
        localImage.value = null
        file.value = null
        return
    }

    file.value = filex
    const fr = new FileReader()
    fr.onload = () => localImage.value = fr.result
    fr.readAsDataURL( filex )
    
}

const onSelectImage = () => {
    input.value.click()
}

    // COMPUTED
 const day = computed(() => {
     const { day } = getDayMonthYear( entry.value.date )
     return day
  })
 const month = computed(() => {
     const { month } = getDayMonthYear( entry.value.date )
     return month
  })
 const yearDay = computed(() => {
     const { yearDay } = getDayMonthYear( entry.value.date )
     return yearDay
  })
  
// Created() 
      loadEntry()
      

// Watcher 
  watch(() => props.id, () => {
    loadEntry()
  })

</script>

<style lang="scss" scoped>

textarea { 
    font-size: 20px;
    border: none;
    height: 100%;

    &:focus {
        outline: none;
    }
}

img { 
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #0000, $alpha: 0.2);
}
</style>
