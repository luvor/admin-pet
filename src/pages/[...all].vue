<script lang="ts" setup>
const router = useRouter()
</script>

<template>
  <div
    class="mx-auto max-w-sm w-full flex flex-col items-center border border-[0.5px] rounded-lg p-4 py-10 shadow"
  >
    <h1 class="text-4xl">
      404
    </h1>
    <p class="text-lg">
      Page not found
    </p>

    <button class="mt-4 flex items-center gap-2 btn" @click="router.push('/')">
      <div class="i-carbon-home" />
      Go Home
    </button>
  </div>
</template>
