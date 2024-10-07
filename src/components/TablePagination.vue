<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
  perPage: number
  prevPage: () => void
  nextPage: () => void
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center justify-between gap-4 p-4">
    <button class="icon-btn" :disabled="currentPage === 1" @click="prevPage">
      <div class="i-carbon-chevron-left" />
    </button>
    <span> Page {{ currentPage }} of {{ totalPages }} </span>
    <button
      class="icon-btn"
      :disabled="currentPage === totalPages"
      @click="nextPage"
    >
      <div class="i-carbon-chevron-right" />
    </button>
  </div>
</template>
