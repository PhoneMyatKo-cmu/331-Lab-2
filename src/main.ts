//import './assets/main.css'
import './assets/style.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import { inject } from '@vercel/analytics'
import 'nprogress/nprogress.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
inject()
app.use(createPinia())
app.use(router)

app.mount('#app')
