<script setup>
import { RouterView } from 'vue-router'
import 'vue3-toastify/dist/index.css';
import EmptyHeader from "@/components/layout/emptyHeader.vue";
import BottomMenu from "@/components/layout/bottomMenu.vue";
import Default from "@/layouts/default.vue";
localStorage.theme = 'light'

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}
</script>

<template>
  <div class="w-full min-h-screen overflow-y-auto">
    <Default v-if="$route.fullPath !== '/'" :name="layout">
        <RouterView />
        <BottomMenu />
    </Default>
    <div
        v-else
        class="w-full h-full flex flex-col justify-center items-center"
    >
      <EmptyHeader />
      <RouterView />
    </div>
  </div>
</template>