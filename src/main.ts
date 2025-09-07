import { createApp } from 'vue'
import App from './App.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import routes from "./config/route.ts";

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')