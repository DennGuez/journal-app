<template>
    <nav class="navbar bg-primary">
        <a class="navbar-brand text-white" href="">
            <img src="@/assets/logo.png" 
                 alt="Vue logo"
                 height="24"
                 class="d-inline-block align-text-top mx-2">
            Daybook
        </a>

        <div class="d-flex mx-2 username">
            {{ store.userName }}
            <button class="btn btn-outline-info mx-2"
                    @click="onLogout">
                <i class="fa fa-sign-out-alt"></i>
            </button>
        </div>

    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
// import useAuth from '../../auth/composables/useAuth'
import { useAuthStore } from '@/modules/auth/store/auth'

const router = useRouter()
const store = useAuthStore()

const onLogout = () => { 
    
    store.logout()

    router.push({ name: 'login' })
}

</script>

<style scoped>
.username {
    color: #ffff;
}
</style>