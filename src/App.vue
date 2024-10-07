<script setup lang="ts">
// INFO: опционально в будущем можно добавить layouts для разных типов страниц
// но для экономии времени не стал реализовывать их

const router = useRouter()
</script>

<template>
  <main class="min-h-screen font-sans">
    <div
      v-if="router.currentRoute.value.meta.showSidebar"
      class="grid grid-cols-[2fr_10fr] gap-3 p-4"
    >
      <TheSidebar />
      <RouterView />
    </div>
    <div v-else class="p-4">
      <RouterView />
    </div>
    <TheFooter />
  </main>
</template>
