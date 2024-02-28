<script setup>
import {IconSearch, IconX} from "@tabler/icons-vue"
import img1 from "~/assets/img/mainPage/team/1.png"
import img2 from "~/assets/img/mainPage/team/2.png"
import img3 from "~/assets/img/mainPage/team/3.png"
import img4 from "~/assets/img/mainPage/team/4.png"
import img5 from "~/assets/img/mainPage/team/5.png"
import img6 from "~/assets/img/mainPage/team/6.png"
import img7 from "~/assets/img/mainPage/team/7.png"

const team = ref([
  {
    name: "Айгерим Төлегенова",
    position: "Гинеколог",
    img: img1
  },
  {
    name: "Айнұр Қайратқызы",
    position: "Невролог",
    img: img2
  },
  {
    name: "Аскар Абдрахманов",
    position: "Кардиолог",
    img: img3
  },
  {
    name: "Жандос Токтаров",
    position: "Хирург",
    img: img4
  },
  {
    name: "Бауыржан Бекболатұлы",
    position: "Ортопед",
    img: img5
  },
  {
    name: "Әділжан Маханов",
    position: "Уролог",
    img: img6
  },
  {
    name: "Гүлмира Тлеубаева",
    position: "Терапевт",
    img: img7
  },
  {
    name: "Айгерим Төлегенова",
    position: "Гинеколог",
    img: img1
  },
  {
    name: "Айнұр Қайратқызы",
    position: "Невролог",
    img: img2
  },
  {
    name: "Аскар Абдрахманов",
    position: "Кардиолог",
    img: img3
  },
  {
    name: "Жандос Токтаров",
    position: "Хирург",
    img: img4
  },
  {
    name: "Бауыржан Бекболатұлы",
    position: "Ортопед",
    img: img5
  },
  {
    name: "Әділжан Маханов",
    position: "Уролог",
    img: img6
  },
  {
    name: "Гүлмира Тлеубаева",
    position: "Терапевт",
    img: img7
  },
])
</script>

<template>
  <div class="relative">
    <div class="relative z-10 container mx-auto px-4 lg:px-0">
      <div class="rounded-3xl p-0 lg:p-10 relative z-10 bg-none lg:bg-white">
        <div class="block lg:flex items-center justify-between">
          <div class="w-full lg:w-[60%] text-start lg:text-center text-mainColor">
            <h2 class="text-lg lg:text-6xl font-semibold mb-3">
              Наша команда
            </h2>
            <p class="text-sm lg:text-2xl mb-4 lg:mb-14 text-[#252525] lg:text-mainColor">
              Врачи, готовые помочь, заботиться и лечить. Мы здесь для вас!
            </p>
            <div class="flex justify-between items-center">
              <div class="w-1/3 text-center">
                <p class="text-4xl lg:text-8xl">25</p>
                <p class="text-[#9A9BA4] lg:text-mainColor text-xs lg:text-2xl">Врачей</p>
              </div>
              <div class="block w-[3px] lg:w-[5px] bg-mainColor h-[78px]"></div>
              <div class="w-1/3 text-center">
                <p class="text-4xl lg:text-8xl">65</p>
                <p class="text-[#9A9BA4] lg:text-mainColor text-xs lg:text-2xl">Мед персонала</p>
              </div>
              <div class="block w-[3px] lg:w-[5px] bg-mainColor h-[78px]"></div>
              <div class="w-1/3 text-center">
                <p class="text-4xl lg:text-8xl">12</p>
                <p class="text-[#9A9BA4] lg:text-mainColor text-xs lg:text-2xl">Услуг</p>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-[40%] mt-4 lg:mt-0">
            <div>
              <p class="text-sm lg:text-base">Поиск врача</p>
              <div class="relative w-full mb-5">
                <input
                    type="text"
                    class="w-full py-3 px-12 border  rounded-xl"
                    placeholder="Поиск">
                <IconSearch
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-mainColor"
                    size="24"/>
                <IconX
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-mainColor"
                    size="24"/>
              </div>
              <div
                  style="box-shadow: 2px 4px 15px 0px rgba(6, 85, 220, 0.15) inset;"
                  class="overflow-y-auto p-5 rounded-3xl max-h-[400px] bg-white">
                <div
                    v-for="(item, index) of team"
                    :key="index"
                    class="flex items-center pb-1 border-b border-mainColor text-xs lg:text-base"
                    :class="{ 'mb-5' : team.length !== index + 1 }"
                >
                  <img
                      class="w-7 lg:w-12 h-7 lg:h-12 rounded-full mr-4"
                      :src="item.img"
                      alt="">
                  <p>
                    {{ item.name }} &nbsp;
                  </p>
                  <p class="text-mainColor font-bold">
                    {{ item.position }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-mainColor mt-4 lg:mt-0">
          <p class="text-lg lg:text-4xl font-medium mb-7 border-b border-mainColor lg:border-none pb-2">
            Сертификаты
          </p>
          <div class="flex items-center justify-between overflow-x-auto">
            <img class="w-max mr-10 rounded-2xl" src="~/assets/img/mainPage/certificates/1.png" alt="">
            <img class="w-max mr-10 rounded-2xl" src="~/assets/img/mainPage/certificates/1.png" alt="">
            <img class="w-max mr-10 rounded-2xl" src="~/assets/img/mainPage/certificates/1.png" alt="">
            <img class="w-max mr-10 rounded-2xl" src="~/assets/img/mainPage/certificates/1.png" alt="">
            <img class="w-max mr-10 rounded-2xl" src="~/assets/img/mainPage/certificates/1.png" alt="">
            <img class="w-max mr-10 rounded-2xl" src="~/assets/img/mainPage/certificates/1.png" alt="">
            <img class="w-max mr-10 rounded-2xl" src="~/assets/img/mainPage/certificates/1.png" alt="">
            <img class="w-max mr-10 rounded-2xl" src="~/assets/img/mainPage/certificates/1.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>