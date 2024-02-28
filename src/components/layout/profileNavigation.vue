<script setup></script>

<template>
  <div class="w-full mb-4">
    <div
        style="box-shadow: 0px 4px 20px 0px #0000001A;"
        class="bg-white p-2 rounded-lg flex overflow-x-auto gap-1 text-sm">
      <router-link
          class="flex items-center hover:bg-[#ECEDFF] hover:text-mainColor gap-3 px-3 py-2 rounded-lg transition-all whitespace-nowrap"
          :class="{ 'bg-mainColor !text-white' : $route.fullPath === '/profile/my-data' }"
          to="/profile/my-data">
        <p>Мои данные</p>
      </router-link>
      <router-link
          class="flex items-center hover:bg-[#ECEDFF] hover:text-mainColor gap-3 px-3 py-2 rounded-lg transition-all whitespace-nowrap"
          :class="{ 'bg-mainColor !text-white' : $route.fullPath === '/profile' }"
          to="/profile">
        <p>Мой профиль</p>
      </router-link>
      <router-link
          class="flex items-center hover:bg-[#ECEDFF] hover:text-mainColor gap-3 px-3 py-2 rounded-lg transition-all whitespace-nowrap"
          :class="{ 'bg-mainColor !text-white' : $route.fullPath === '/profile/docs' }"
          to="/profile/docs">
        <p>Документы</p>
      </router-link>
    </div>
  </div>
</template>