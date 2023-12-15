<template>
  <sub>EntryList</sub>  
  <div class="entry-list-container">
      <div class="px-2 pt-2">
          <input v-model="term"
                 type="text"
                 class="form-control"
                 placeholder="Buscar entrada"
          >
      </div>
      <div class="mt-2 d-flex flex-column">
          <button class="btn btn-primary mx-3"
                  @click="$router.push({ name: 'entry', params: { id: 'new' }})"  
                >
              <i class="fa fa-plus-circle"></i>
              Nueva entrada
          </button>
      </div>
      <div class="entry-scrollarea">
        <Entry
            v-for="entry in entriesByTerm"
            :key="entry.id"
            :entry="entry"
        />
      </div>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import { useJournalStore } from '../store/journalStore'


// AsyncComponents
const Entry = defineAsyncComponent(() =>
  import('../components/Entry.vue')
)

// Data
const journalStore = useJournalStore()
const term = ref('')

// Computed
const entriesByTerm = computed(() => {
    return journalStore.getEntriesByTerm(term.value)
})

</script>

<style lang="scss" scoped>
input {
    height: 40px;
}
.entry-list-container {
    border-right: 1px solid #2c3e50;
    height: calc( 100vh - 56px);
}

.entry-scrollarea {
    height: calc( 100vh - 120px );
    overflow: scroll;
}


</style>
