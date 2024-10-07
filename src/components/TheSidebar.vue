<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const router = useRouter()

const menu = [
  { title: 'Trucks', icon: 'i-carbon-delivery-truck', route: '/trucks' },
  { title: 'Drivers', icon: 'i-carbon-user', route: '/drivers' },
  { title: 'Reports', icon: 'i-carbon-analytics', route: '/reports' },
]

const route = useRoute()
const authStore = useAuthStore()

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="w-full border border-[0.5px] rounded-lg shadow">
    <div class="flex items-center justify-between gap-4 p-4">
      <h1 class="whitespace-nowrap">
        Racoon AI
      </h1>
      <button class="icon-btn" @click="toggleDark()">
        <div class="i-carbon-sun dark:i-carbon-moon" />
      </button>
    </div>
    <div class="px-2">
      <ul>
        <li v-for="item in menu" :key="item.title">
          <router-link
            :to="item.route"
            class="w-full flex items-center gap-2 rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            :class="{
              'bg-gray-100 dark:bg-gray-800': item.route === route.path,
            }"
          >
            <div class="i-carbon" :class="item.icon" />
            <span>{{ item.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="mx-4 my-2 border-t" />
    <div class="px-2 pb-2">
      <!-- logout -->
      <button
        class="w-full flex items-center gap-2 rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        @click="logout"
      >
        <div class="i-carbon i-carbon-logout" />
        <span>Logout</span>
      </button>
    </div>
  </div>
</template>
