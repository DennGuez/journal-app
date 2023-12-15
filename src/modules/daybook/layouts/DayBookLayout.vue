<template>
  <sub>DayBook Layout</sub>
  <NavBarDaybook />

  <Suspense>
      <template #fallback>
        <div class="row justify-content-md-center">
          <div class="col-3 alert-info text-center mt-5">
            Espere por favor...
            <h3 class="mt-2">
              <i class="fa fa-spin fa-sync"></i>
            </h3>
          </div >
        </div>
      </template>

      <template #default>
        <div class="d-flex">
          <div class="col-4">
              <EntryList />
          </div>
          <div class="col">
              <router-view />
          </div>
        </div>
      </template>
  </Suspense>




</template>

<script setup>
import { defineAsyncComponent, onMounted } from 'vue'
import { useJournalStore } from '../store/journalStore'

// AsyncComponents -----
const NavBarDaybook = defineAsyncComponent(() =>
  import('../components/NavBarDaybook.vue')
)

const EntryList = defineAsyncComponent(() =>
  import('../components/EntryList.vue')
)

// Data -----
const journalStore = useJournalStore()

// Methods -----

// LifeCycles -----
onMounted(() => {
  journalStore.loadEntries()
})


 


</script>