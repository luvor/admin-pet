<!-- src/views/Login.vue -->
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')

function handleLogin() {
  if (authStore.login(username.value, password.value)) {
    router.push('/')
  }
  else {
    error.value = 'Invalid username or password'
  }
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <form class="rounded bg-white p-6 shadow-md" @submit.prevent="handleLogin">
      <h2 class="mb-4 text-center text-xl font-semibold">
        Admin Login
      </h2>
      <div class="mb-4">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="w-full border rounded px-3 py-2"
        >
      </div>
      <div class="mb-4">
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full border rounded px-3 py-2"
        >
      </div>
      <button
        type="submit"
        class="w-full rounded bg-blue-500 py-2 text-white font-semibold hover:bg-blue-600"
      >
        Login
      </button>
      <p v-if="error" class="mt-2 text-sm text-red-500">
        {{ error }}
      </p>
    </form>
  </div>
</template>
