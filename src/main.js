import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@/presets/aura'

import 'primeicons/primeicons.css'

import { registerSW } from 'virtual:pwa-register'
import './plugins/vee-validate'
import ms from 'primelocale/ms.json'

import ToastService from 'primevue/toastservice'

import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import './assets/main.css'

const app = createApp(App)

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {}
})

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  unstyled: true,
  pt: Aura,
  locale: ms.ms
})
app.use(ToastService)
app.use(LoadingPlugin)

app.mount('#app')
