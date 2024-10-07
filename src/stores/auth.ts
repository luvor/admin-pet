import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  // INFO: useStorage это хук, который дает реактивность в localStorage
  const isAuthenticated = useStorage('isAuthenticated', false, localStorage)

  async function login(username: string, password: string) {
    return new Promise<{
      isAuthenticated: boolean
    }>((resolve, reject) => {
      setTimeout(() => {
        if (username === 'admin' && password === 'admin') {
          isAuthenticated.value = true
          resolve({
            isAuthenticated: true,
          })
        }
        else {
          reject(new Error('Invalid username or password.'))
        }
      }, 300)
    })
  }

  function logout() {
    isAuthenticated.value = false
  }

  return { isAuthenticated, login, logout }
})
