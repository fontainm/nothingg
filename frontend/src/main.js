import './styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import api from './plugins/axios'
import App from './App.vue'
import router from './router'
import { useAppStore } from '@/stores/app'
import { useUsersStore } from './stores/users.js'

const app = createApp(App)

app.use(createPinia())

app.config.globalProperties.$api = api

const usersStore = useUsersStore()
app.config.globalProperties.$usersStore = usersStore
usersStore.fetchUser()

const appStore = useAppStore()
app.config.globalProperties.$appStore = appStore

app.use(router)

app.mount('#app')

window.onload = () => {
  const loader = document.getElementById('loading')
  if (loader) {
    loader.classList.add('hide')
  }
}
