<script setup>
import {
  IconDisabled,
  IconStethoscope,
  IconHeartRateMonitor,
  IconEmergencyBed,
  IconCrutches,
  IconLamp2,
  IconChevronRight
} from "@tabler/icons-vue"
import img1 from "~/assets/img/mainPage/inventory/1.png";

const categories = [
  {
    id: 1,
    name: "Инвалидные кресла",
    icon: IconDisabled,
    products: [
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      }
    ]
  },
  {
    id: 2,
    name: "Медицинские диагностические приборы",
    icon: IconStethoscope,
    products: [
      {
        id: 1,
        name: "Мед. прибор",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "Мед. прибор",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "Мед. прибор",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "Мед. прибор",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "Мед. прибор",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "Мед. прибор",
        price: 15750,
        img: img1,
      }
    ]
  },
  {
    id: 3,
    name: "Медицинские мониторы и аппараты",
    icon: IconHeartRateMonitor,
    products: [
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      }
    ]
  },
  {
    id: 4,
    name: "Медицинские койки",
    icon: IconEmergencyBed,
    products: [
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      }
    ]
  },
  {
    id: 5,
    name: "Костыли",
    icon: IconCrutches,
    products: [
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      }
    ]
  },
  {
    id: 6,
    name: "Медицинские настольные лампы и стойки",
    icon: IconLamp2,
    products: [
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      },
      {
        id: 1,
        name: "МобилХелп Кресло",
        price: 15750,
        img: img1,
      }
    ]
  },
]

const pickedCategory = ref(0)
</script>

<template>
  <div class="relative">
    <div class="container mx-auto px-4 lg:px-0">
      <div class="block lg:flex items-center justify-between gap-5">
        <div class="w-full lg:w-1/4 bg-none lg:bg-mainColor rounded-3xl mb-3 lg:mb-0">
          <h2 class="text-lg lg:text-3xl font-semibold text-left lg:text-center text-mainColor lg:text-white pt-10 pb-7">
            Аренда инвентаря
          </h2>
          <div class="hidden lg:block">
            <div
                v-for="(item, index) of categories"
                :key="index"
                @click="pickedCategory = index"
                :class="[{ 'rounded-b-3xl' : categories.length - 1 === index }, { 'bg-white !text-mainColor' : index === pickedCategory }]"
                class="flex items-center py-4 px-5 text-white hover:bg-white hover:text-mainColor cursor-pointer transition-all duration"
            >
              <component
                  :is="item.icon"
                  class="w-10 h-10 mr-5"
              />
              <p class="text-lg">
                {{ item.name }}
              </p>
            </div>
          </div>
          <div class="border-b border-mainColor pb-3">
            <div class="flex lg:hidden overflow-x-auto">
              <div
                  v-for="(item, index) of categories"
                  :key="index"
                  @click="pickedCategory = index"
                  :class="[{ 'bg-mainColor !text-white' : index === pickedCategory }]"
                  class="flex items-center py-1 px-4 hover:bg-mainColor hover:text-white cursor-pointer transition-all rounded border border-mainColor text-mainColor mr-3"
              >
                <component
                    :is="item.icon"
                    class="w-6 h-6 mr-1"
                />
                <p class="text-xs whitespace-nowrap">
                  {{ item.name }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-3/4">
          <div class="block lg:flex flex-wrap justify-between">
            <div
                v-for="(item, index) of categories[pickedCategory].products"
                :key="index"
                class="w-full lg:w-[49%] rounded-2xl bg-[#E7F0FF] flex p-3 mb-5 items-center justify-between hover:bg-mainColor text-mainColor hover:text-white transition-all cursor-pointer"
                style="box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.05);"
            >
              <div class="flex items-center">
                <div class="bg-white px-4 py-1 rounded-xl mr-4">
                  <img
                      :src="item.img"
                      alt="">
                </div>
                <div>
                  <p class="font-semibold mb-3">
                    {{ item.name }}
                  </p>
                  <p class="text-mainColor bg-white w-max p-3 rounded-lg">
                    от {{ item.price }} ₸
                  </p>
                </div>
              </div>
              <IconChevronRight
                  class="text-white bg-mainColor p-1 rounded-full"
                  size="30"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>