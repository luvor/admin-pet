<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

const router = useRouter()

// INFO: планировал добавить дэшборды, но не хватило времени

onMounted(() => {
  router.push('/trucks')
})
</script>

<template>
  <div class="w-full border border-[0.5px] rounded-lg p-4 shadow">
    <h1>Racoon AI</h1>

    <div>Dashboards</div>
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
