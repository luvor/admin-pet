// src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref<boolean>(false)

  function login(username: string, password: string) {
    // Mock authentication
    if (username === 'admin' && password === 'password') {
      isAuthenticated.value = true
      localStorage.setItem('isAuthenticated', 'true')
      return true
    }
    return false
  }

  function logout() {
    isAuthenticated.value = false
    localStorage.removeItem('isAuthenticated')
  }

  function checkAuth() {
    isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
  }

  return { isAuthenticated, login, logout, checkAuth }
})
