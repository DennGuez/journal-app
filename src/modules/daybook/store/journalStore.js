import { defineStore } from 'pinia'
import journalApi from '../../../api/journalApi'

export const useJournalStore =  defineStore('journal', {
    
    state: () => ({
        isLoading: true,
        entries: []
    }),
    actions: {
        async loadEntries() { 
        const { data } = await journalApi.get('/entries.json')
        if ( !data ) return this.entries = []
        for( let id of Object.keys( data ) ) {
            this.entries.unshift({
                id,
                ...data[id]
            })
        }
        // this.entries.reverse()
        this.isLoading = false
        },

        async updateEntry( entry ) { 
            const { date, picture, text } = entry
            const dataToSave = { date, picture, text }

            await journalApi.put(`/entries/${ entry.id }.json`, dataToSave)

            //Modificamos el state
            const idx = this.entries.map( e => e.id ).indexOf( entry.id )
            this.entries[idx] = dataToSave
        },

        async createEntry( entry ) {
            // dataToSave
            const { date, picture, text } = entry
            const dataToSave = { date, picture, text } 
            const { data } = await journalApi.post('/entries.json', dataToSave)
            
            // data = { "name": "-MfA77c5v-SKXalT03Cc" }
            dataToSave.id = data.name

            // Modificamos el state
            this.entries = [ dataToSave, ...this.entries ]

            return data.name
        },

        async deleteEntry( id ) {

            await journalApi.delete('/entries/'+id+'.json')
            const newEntries = this.entries.filter(entry => entry.id != id )
            // Modificamos el state
            this.entries = newEntries
        }
    },
    getters: {
        getEntriesByTerm: ( state ) => ( term = '' ) => {
                if ( term.length === 0 ) return state.entries

                return state.entries.filter( entry => entry.text.toLowerCase().includes( term.toLowerCase() ) )
            },

        getEntryById: ( state ) => ( id = '' ) => { 
            const entry = state.entries.find( entry => entry.id === id )
            if ( !entry ) return
            return { ...entry }
        },
    }

})