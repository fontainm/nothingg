import './styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAppStore } from '@/stores/app'
import { useUsersStore } from './stores/users.js'

const app = createApp(App)

app.use(createPinia())

const usersStore = useUsersStore()
app.config.globalProperties.$usersStore = usersStore

const appStore = useAppStore()
app.config.globalProperties.$appStore = appStore

app.use(router)

app.mount('#app')
