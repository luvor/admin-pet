<script setup lang="ts">
import { ref } from 'vue'
import type { Truck } from '@/types/models'

const props = defineProps<{ truckData?: Truck }>()
const emit = defineEmits(['saved'])

const randomId = Math.floor(Math.random() * 1000)

const truck = ref<Truck>(
  props.truckData || { id: randomId, plate: '', type: 'General', vin: '' },
)

function handleSubmit() {
  emit('saved', truck.value)
}
</script>

<template>
  <form class="max-w-md" @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label class="mb-1 block">Plate</label>
      <input
        v-model="truck.plate"
        class="w-full border rounded px-2 py-1 dark:bg-gray-800"
      >
    </div>
    <div class="mb-4">
      <label class="mb-1 block">Type</label>
      <select
        v-model="truck.type"
        class="w-full border rounded px-2 py-1 dark:bg-gray-800"
      >
        <option value="Construction">
          Construction
        </option>
        <option value="General">
          General
        </option>
      </select>
    </div>
    <div class="mb-4">
      <label class="mb-1 block">VIN</label>
      <input
        v-model="truck.vin"
        class="w-full border rounded px-3 py-1 dark:bg-gray-800"
      >
    </div>
    <button type="submit" class="btn">
      Save
    </button>
  </form>
</template>
