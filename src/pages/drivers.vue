<script setup lang="ts">
import { api } from '@/services/api'
import { onMounted, ref } from 'vue'
import type { Driver } from '@/types/models'

const drivers = ref<Driver[]>([])

const page = ref(1)
const limit = ref(10)
const total = ref(0)

const loading = ref(false)

function loadDrivers(page: number, limit: number) {
  loading.value = true
  api.getDrivers({
    page,
    limit,
  }).then((res) => {
    drivers.value = res.data
    total.value = res.total
  }).catch(() => {
    loading.value = false
  }).finally(() => {
    loading.value = false
  })
}

function handleNextPage() {
  page.value += 1
  loadDrivers(page.value, limit.value)
}

function handlePrevPage() {
  page.value -= 1
  loadDrivers(page.value, limit.value)
}

onMounted(async () => {
  loadDrivers(page.value, limit.value)
})
</script>

<template>
  <div class="w-full border border-[0.5px] rounded-lg p-4 shadow">
    <h1 class="mb-4 text-2xl font-bold">
      Driver List
    </h1>
    <table class="w-full table-auto">
      <thead>
        <tr class="grid grid-cols-[1fr_2fr_2fr_2fr] w-full border-b text-left">
          <th class="px-4 py-2">
            ID
          </th>
          <th class="px-4 py-2">
            Name
          </th>
          <th class="px-4 py-2">
            Phone
          </th>
          <th class="px-4 py-2">
            Truck ID
          </th>
        </tr>
      </thead>
      <!-- skeleton -->
      <tbody v-if="loading">
        <tr v-for="i in 10" :key="i" class="grid grid-cols-[1fr_2fr_2fr_2fr] w-full border-b">
          <td class="px-4 py-2">
            <div class="h-6 w-8 animate-pulse rounded bg-gray-200" />
          </td>
          <td class="px-4 py-2">
            <div class="h-6 w-20 animate-pulse rounded bg-gray-200" />
          </td>
          <td class="px-4 py-2">
            <div class="h-6 w-40 animate-pulse rounded bg-gray-200" />
          </td>
          <td class="px-4 py-2">
            <div class="h-6 w-20 animate-pulse rounded bg-gray-200" />
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="driver in drivers" :key="driver.id" class="grid grid-cols-[1fr_2fr_2fr_2fr] w-full border-b">
          <td class="px-4 py-2">
            {{ driver.id }}
          </td>
          <td class="px-4 py-2">
            {{ driver.name }} {{ driver.surname }}
          </td>
          <td class="px-4 py-2">
            {{ driver.phone }}
          </td>
          <td class="px-4 py-2">
            {{ driver.truckId }}
          </td>
        </tr>
      </tbody>

      <TablePagination
        :current-page="page"
        :per-page="limit"
        :total-pages="Math.round(total / limit)"
        :next-page="handleNextPage"
        :prev-page="handlePrevPage"
      />
    </table>
  </div>
</template>
