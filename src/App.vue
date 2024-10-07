<template>
  <main class="min-h-screen font-sans">
    <div class="grid grid-cols-[2fr_10fr] gap-3 p-4">
      <TheSidebar />
      <RouterView />
    </div>
    <TheFooter />
  </main>
</template>
