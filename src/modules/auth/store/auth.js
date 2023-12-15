import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'
import authApi from '@/api/authApi'

export const useAuthStore = defineStore('auth', () => {
    // State
    const user = reactive({
        status: 'authenticating', // 'authenticated', 'not-authenticated'
        user: null,
        idToken: null,
        refreshToken: null
    })

    // Actions
    const createUser = async( userx ) => {
        const { name, email, password } = userx

        try {
            const { data } = await authApi.post(':signUp', { email, password, returnSecureToken: true})
            const { idToken, refreshToken } = data

            await authApi.post(':update', { displayName: name, idToken, refreshToken })

            // Set State and localStorage
             
            if ( idToken ) {
                localStorage.setItem( 'idToken', idToken )
                user.idToken = idToken
            }

            if ( refreshToken ) {
                localStorage.setItem( 'refreshToken', refreshToken )
                user.refreshToken = refreshToken
            }

            delete userx.password
            user.user   = userx
            user.status = 'authenticated'

            return { ok: true  }
        } catch(error) {
            return {ok: false, message: error.response.data.error.message}
        }
    }

    const signInUser = async( userx ) => {
        const { email, password } = userx

        try {
            const { data } = await authApi.post(':signInWithPassword', { email, password, returnSecureToken: true})
            const { idToken, refreshToken, displayName } = data
            userx.name = displayName

            // Set State and localStorage
            if ( idToken ) {
                localStorage.setItem( 'idToken', idToken )
                user.idToken = idToken
            }

            if ( refreshToken ) {
                localStorage.setItem( 'refreshToken', refreshToken )
                user.refreshToken = refreshToken
            }
            user.user   = userx
            user.status = 'authenticated'

            return { ok: true  }
        } catch(error) {
            return {ok: false, message: error.response.data.error.message}
        }
    }

    const logout = () => {
            user.user = null
            user.idToken = null
            user.refreshToken = null
            user.status = 'not-authenticated'

            localStorage.removeItem('idToken')
            localStorage.removeItem('refreshToken')
    }

    const checkAuthentication = async( ) => {
        const idToken = localStorage.getItem('idToken')
        const refreshToken = localStorage.getItem('refreshToken')
        
        if ( !idToken ) {
            logout()
            return { ok: false, message: 'No hay token en la petición'}
        }

        try {

            const { data } = await authApi.post(':lookup', { idToken })
            // console.log( data )
            const { displayName, email } = data.users[0]

            const userx = {
                name: displayName,
                email
            }

            // Set State and localStorage
            user.idToken = idToken
            user.refreshToken = refreshToken
            user.user   = userx
            user.status = 'authenticated'

            return { ok: true }

        } catch (error) {
            logout()
            return { ok: false, message: error.response.data.error.message }
        }
    }

    // Getters
    const currentState = computed(() => 
        user.status
    )
    const userName = computed(() => 
        user.user?.name
)

    return {
        user,
        createUser,
        signInUser,
        checkAuthentication,
        currentState,
        userName,
        logout
    } 
 })