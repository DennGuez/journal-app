import { useAuthStore } from '../store/auth'

const isAuthenticatedGuard = async( to, from, next) => {

    const store = useAuthStore()

    const { ok } = await store.checkAuthentication()
    
    ok ? next() : next({ name: 'login' })

}

export default isAuthenticatedGuard