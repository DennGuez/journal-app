import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import App from './App.vue'

import './styles/styles.scss'
import 'sweetalert2/dist/sweetalert2.min.css';

createApp(App)
    .use( createPinia() )
    .use( router )
    .mount('#app')