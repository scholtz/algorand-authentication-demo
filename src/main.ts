import 'algorand-authentication-component-vue/dist/style.css'
import 'primeflex/primeflex.scss'
import './assets/main.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css' /* Deprecated */

import { createApp } from 'vue'

import App from './App.vue'

import PrimeVue from 'primevue/config'
import Toast from 'primevue/toast'
import Button from 'primevue/button'
import ToastService from 'primevue/toastservice'

export const app = createApp(App)
app.use(PrimeVue, { ripple: true })
app.use(ToastService)

app.component('Button', Button)
app.component('Toast', Toast)

//app.use(a)
app.mount('#app')
