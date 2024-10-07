<script lang="ts" setup>
import { api } from '@/services/api'
import type { Truck } from '@/types/models'

const router = useRouter()

const truck = ref<Truck>()

function handleSaveTruck(truck: Truck) {
  api.updateTruck(truck).then(() => {
    router.push('/trucks')
  })
}

onMounted(() => {
  const params = router.currentRoute.value.params
  if ('id' in params) {
    const truckId = Number(params.id)
    api.getTruck(truckId).then((res) => {
      truck.value = res
    })
  }
})
</script>

<template>
  <div class="w-full border border-[0.5px] rounded-lg p-4 shadow">
    <h1 class="mb-4 text-xl">
      Edit truck
      {{
        "id" in router.currentRoute.value.params
          ? router.currentRoute.value.params.id
          : ""
      }}
    </h1>
    <div>
      <TruckForm v-if="truck" :truck-data="truck" @saved="handleSaveTruck" />
      <div v-else class="w-full flex items-center justify-center py-10">
        <TheLoading />
      </div>
    </div>
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
