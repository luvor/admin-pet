<script lang="ts" setup>
import type { Truck } from '@/types/models'
import { api } from '@/services/api'

const router = useRouter()

function handleSaveTruck(truck: Truck) {
  api.addTruck(truck).then(() => {
    router.push('/trucks')
  })
}
</script>

<template>
  <div class="w-full border border-[0.5px] rounded-lg p-4 shadow">
    <h1 class="mb-4 text-xl">
      Add truck
    </h1>
    <TruckForm @saved="handleSaveTruck" />
  </div>
</template>

<route lang="json">
{
  "meta": {
    "requiresAuth": true,
    "showSidebar": true
  }
}
</route>
