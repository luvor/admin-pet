<script setup lang="ts">
import { ref } from 'vue'
import type { Truck } from '@/types/models'

const props = defineProps<{ truckData?: Truck }>()
const emit = defineEmits(['saved'])

const truck = ref<Truck>(
  props.truckData || { id: 0, plate: '', type: 'General', vin: '' },
)

function handleSubmit() {
  emit('saved', truck.value)
}
</script>

<template>
  <form class="rounded bg-white p-4 shadow-md" @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label class="mb-1 block">Plate</label>
      <input v-model="truck.plate" class="w-full border rounded px-3 py-2">
    </div>
    <div class="mb-4">
      <label class="mb-1 block">Type</label>
      <select v-model="truck.type" class="w-full border rounded px-3 py-2">
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
      <input v-model="truck.vin" class="w-full border rounded px-3 py-2">
    </div>
    <button
      type="submit"
      class="rounded bg-green-500 px-4 py-2 text-white font-semibold hover:bg-green-600"
    >
      Save
    </button>
  </form>
</template>
