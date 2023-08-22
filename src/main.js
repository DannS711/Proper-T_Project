import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'

const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = router
})

const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: '85737939242-jap4bcm7rjqlfrg02fr0ic6rae6qeb4g.apps.googleusercontent.com'
})

app.use(pinia)
app.use(router)

app.mount('#app')
