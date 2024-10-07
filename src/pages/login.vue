<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

function handleLogin() {
  loading.value = true
  authStore
    .login(username.value, password.value)
    .then((res) => {
      if (res.isAuthenticated) {
        router.push('/')
      }
    })
    .catch((err) => {
      error.value = err.message
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="w-full p-4">
    <form
      class="mx-auto max-w-sm border border-[0.5px] rounded-lg p-4 shadow"
      @submit.prevent="handleLogin"
    >
      <h2 class="mb-4 text-center text-xl font-semibold">
        Admin Login
      </h2>
      <div class="mb-4">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="w-full border rounded px-3 py-2 dark:bg-gray-800"
        >
      </div>
      <div class="mb-4">
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full border rounded px-3 py-2 dark:bg-gray-800"
        >
      </div>
      <div class="flex justify-center">
        <button type="submit" class="btn">
          Login
        </button>
      </div>
      <p v-if="error" class="mt-2 text-sm text-red-500">
        {{ error }}
      </p>
    </form>
  </div>
</template>
