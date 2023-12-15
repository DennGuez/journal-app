import { computed } from 'vue'
import { useAuthStore } from '../store/auth'
 

const useAuth = () => {

    const store = useAuthStore()

    const createUser = async( user ) => {
        const resp = await store.createUser( user )
        return resp
    }

    const loginUser = async( user ) => {
        const resp = await store.signInUser( user )
        return resp
    }

    const checkAuthStatus = async() => {
        const resp = await store.checkAuthentication()
        return resp
    }

    return {
        createUser,
        loginUser,
        checkAuthStatus,

        authStatus: computed(() => store.currentState),
        username: computed(() => store.userName)
    }
}

export default useAuth