<script setup lang="ts">
import { api } from '@/services/api'
import { onMounted, ref } from 'vue'
import type { Truck } from '@/types/models'

const trucks = ref<Truck[]>([])

const page = ref(1)
const limit = ref(10)
const total = ref(0)

const loading = ref(false)

function loadTrucks(page: number, limit: number) {
  loading.value = true
  api.getTrucks({
    page,
    limit,
  }).then((res) => {
    trucks.value = res.data
    total.value = res.total
  }).catch(() => {
    loading.value = false
  }).finally(() => {
    loading.value = false
  })
}

function handleNextPage() {
  page.value += 1
  loadTrucks(page.value, limit.value)
}

function handlePrevPage() {
  page.value -= 1
  loadTrucks(page.value, limit.value)
}

onMounted(async () => {
  loadTrucks(page.value, limit.value)
})
</script>

<template>
  <div class="w-full border border-[0.5px] rounded-lg p-4 shadow">
    <h1 class="mb-4 text-2xl font-bold">
      Truck List
    </h1>
    <table class="w-full table-auto">
      <thead>
        <tr class="grid grid-cols-[1fr_2fr_2fr_4fr] w-full border-b text-left">
          <th class="px-4 py-2">
            ID
          </th>
          <th class="px-4 py-2">
            Plate
          </th>
          <th class="px-4 py-2">
            Type
          </th>
          <th class="px-4 py-2">
            VIN
          </th>
        </tr>
      </thead>
      <!-- skeleton -->
      <tbody v-if="loading">
        <tr v-for="i in 10" :key="i" class="grid grid-cols-[1fr_2fr_2fr_4fr] w-full border-b">
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
            <div class="h-6 w-60 animate-pulse rounded bg-gray-200" />
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="truck in trucks" :key="truck.id" class="grid grid-cols-[1fr_2fr_2fr_4fr] w-full border-b">
          <td class="px-4 py-2">
            {{ truck.id }}
          </td>
          <td class="px-4 py-2">
            {{ truck.plate }}
          </td>
          <td class="px-4 py-2">
            {{ truck.type }}
          </td>
          <td class="px-4 py-2">
            {{ truck.vin }}
          </td>
        </tr>
      </tbody>

      <TablePagination
        :current-page="page"
        :per-page="limit"
        :total-pages="total / limit"
        :next-page="handleNextPage"
        :prev-page="handlePrevPage"
      />
    </table>
  </div>
</template>
