<script setup lang="ts">
import {IconMicroscope, IconNurse, IconStethoscope, IconVaccine} from "@tabler/icons-vue";

const route = useRoute()
</script>

<template>
  <div class="overflow-x-auto flex justify-between mb-7">
    <router-link
        to="/services/doctors"
        class="flex w-max lg:w-half relative cursor-pointer mr-5 lg:mr-0"
    >
      <div
          class="min-w-8 lg:min-w-12 w-8 lg:w-12 min-h-8 lg:min-h-12 h-8 lg:h-12 bg-mainColor text-white rounded-full flex items-center justify-center absolute -left-1 top-0"
          :class="{ '!bg-white !text-mainColor' : route.fullPath.includes('/services/doctors') }"
          style="filter: drop-shadow(3px 0px 12px rgba(0, 0, 0, 0.15));"
      >
        <IconStethoscope class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"/>
      </div>
      <div
          class="flex items-center justify-center bg-white w-full rounded-3xl border border-mainColor h-8 lg:h-12 min-h-8 lg:min-h-12 text-mainColor px-12 lg:px-0"
          :class="{ '!bg-mainColor !text-white' : route.fullPath.includes('/services/doctors') }"
      >
        <h2 class="text-sm lg:text-2xl font-semibold whitespace-nowrap lg:whitespace-normal">Доктор</h2>
      </div>
    </router-link>
    <router-link
        to="/services/med-services"
        class="flex w-max lg:w-half relative cursor-pointer mr-5 lg:mr-0"
    >
      <div
          class="min-w-8 lg:min-w-12 w-8 lg:w-12 min-h-8 lg:min-h-12 h-8 lg:h-12 bg-mainColor text-white rounded-full flex items-center justify-center absolute -left-1 top-0"
          :class="{ '!bg-white !text-mainColor' : route.fullPath.includes('/services/med-services') }"
          style="filter: drop-shadow(3px 0px 12px rgba(0, 0, 0, 0.15));"
      >
        <IconNurse class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"/>
      </div>
      <div
          class="flex items-center justify-center bg-white w-full rounded-3xl border border-mainColor h-8 lg:h-12 min-h-8 lg:min-h-12 text-mainColor px-12 lg:px-0"
          :class="{ '!bg-mainColor !text-white' : route.fullPath.includes('/services/med-services') }"
      >
        <h2 class="text-sm lg:text-2xl font-semibold whitespace-nowrap lg:whitespace-normal">Мед-услуги</h2>
      </div>
    </router-link>
<!--    <router-link-->
<!--        to="/services/detox"-->
<!--        class="flex w-max lg:w-fourth relative cursor-pointer mr-5 lg:mr-0"-->
<!--    >-->
<!--      <div-->
<!--          class="min-w-8 lg:min-w-12 w-8 lg:w-12 min-h-8 lg:min-h-12 h-8 lg:h-12 bg-mainColor text-white rounded-full flex items-center justify-center absolute -left-1 top-0"-->
<!--          :class="{ '!bg-white !text-mainColor' : route.fullPath.includes('/services/detox') }"-->
<!--          style="filter: drop-shadow(3px 0px 12px rgba(0, 0, 0, 0.15));"-->
<!--      >-->
<!--        <IconVaccine class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"/>-->
<!--      </div>-->
<!--      <div-->
<!--          class="flex items-center justify-center bg-white w-full rounded-3xl border border-mainColor h-8 lg:h-12 min-h-8 lg:min-h-12 text-mainColor px-12 lg:px-0"-->
<!--          :class="{ '!bg-mainColor !text-white' : route.fullPath.includes('/services/detox') }"-->
<!--      >-->
<!--        <h2 class="text-sm lg:text-2xl font-semibold whitespace-nowrap lg:whitespace-normal">Процедуры детокс</h2>-->
<!--      </div>-->
<!--    </router-link>-->
<!--    <router-link-->
<!--        to="/services/tests"-->
<!--        class="flex w-max lg:w-fourth relative cursor-pointer"-->
<!--    >-->
<!--      <div-->
<!--          class="min-w-8 lg:min-w-12 w-8 lg:w-12 min-h-8 lg:min-h-12 h-8 lg:h-12 bg-mainColor text-white rounded-full flex items-center justify-center absolute -left-1 top-0"-->
<!--          :class="{ '!bg-white !text-mainColor' : route.fullPath.includes('/services/tests') }"-->
<!--          style="filter: drop-shadow(3px 0px 12px rgba(0, 0, 0, 0.15));"-->
<!--      >-->
<!--        <IconMicroscope class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"/>-->
<!--      </div>-->
<!--      <div-->
<!--          class="flex items-center justify-center bg-white w-full rounded-3xl border border-mainColor h-8 lg:h-12 min-h-8 lg:min-h-12 text-mainColor px-12 lg:px-0"-->
<!--          :class="{ '!bg-mainColor !text-white' : route.fullPath.includes('/services/tests') }"-->
<!--      >-->
<!--        <h2 class="text-sm lg:text-2xl font-semibold whitespace-nowrap lg:whitespace-normal">Сдать анализы</h2>-->
<!--      </div>-->
<!--    </router-link>-->
  </div>
</template>