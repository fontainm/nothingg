import './styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useUsersStore } from './stores/users.js'

const app = createApp(App)

app.use(createPinia())

const usersStore = useUsersStore()
app.config.globalProperties.$usersStore = usersStore

app.use(router)

app.mount('#app')
