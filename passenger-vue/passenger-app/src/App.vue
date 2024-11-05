<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header class="flex flex-col items-center justify-center max-h-screen">
    <img alt="Vue logo" class="logo mb-8" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper flex flex-col items-center">
      <HelloWorld msg="You did it!" />

      <nav class="mt-8 text-center space-x-6 text-sm">
        <RouterLink
          to="/"
          class="px-4 py-2 border-l border-gray-300 hover:bg-gray-100 first:border-0"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/about"
          class="px-4 py-2 border-l border-gray-300 hover:bg-gray-100 first:border-0"
        >
          About
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.logo {
  display: block;
}
</style>
