import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'

import { useAuthStore } from './stores/auth'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)
app.use(createPinia())
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})

// Router guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated && to.meta.requiresAuth) {
    return next('/login')
  }
  else {
    next()
  }
})

app.use(router)
app.mount('#app')
