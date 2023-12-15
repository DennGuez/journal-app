import { createRouter, createWebHashHistory } from 'vue-router'


import daybookRouter from '@/modules/daybook/router'
import authRouter from '@/modules/auth/router'
import isAuthenticatedGuard from '@/modules/auth/router/auth-guard'

const routes = [
    {
        path: '/',
        redirect: { name: 'home-view'}
    },
    { 
        path: '/home', 
        name: 'home-view',
        component: () => import('@/views/HomeView.vue')
    },
    { 
        path: '/about', 
        name: 'about-view',
        component: () => import('@/views/AboutView.vue')
    },
    { 
        path: '/daybook',
        beforeEnter: [ isAuthenticatedGuard ],
        ...daybookRouter
    },
    { 
        path: '/auth',
        ...authRouter
    },
    { path: '/:pathMatch(.*)*', redirect: { name: 'home-view' } }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes  // routes: routes
})

export default router