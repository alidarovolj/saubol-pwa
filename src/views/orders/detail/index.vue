<script setup>
import {IconChevronLeft, IconEdit, IconPlus} from "@tabler/icons-vue";
import {useOrdersStore} from "@/stores/orders.js";
import {useUserStore} from "@/stores/user.js";
import {ref, nextTick, onMounted} from "vue";
import {storeToRefs} from "pinia";
import Orders from "@/layouts/orders.vue";
import Spinner from "@/components/general/spinner.vue";
import {useRoute} from "vue-router";

const layout = ref("profile");
const route = useRoute()

const user = useUserStore()
const {result} = storeToRefs(user)

const orders = useOrdersStore()

const pending = ref(true)

const acceptOrderLocal = async () => {
  await orders.acceptOrder(orders.resultDetails.user_order_id)
  await orders.orderDetails(route.params.id)
}

onMounted(async () => {
  await nextTick()
  await orders.orderDetails(route.params.id)
  pending.value = false
})
</script>

<template>
  <div class="bg-white py-2">
    <div class="container mx-auto px-4 lg:px-0">
      <div v-if="!pending" class="flex justify-between">
        <div class="flex items-center gap-3">
          <RouterLink to="/orders">
            <IconChevronLeft class="text-mainColor"/>
          </RouterLink>
          <p class="font-bold">
            Заказ №{{ orders.resultDetails.user_order.order_number }}
          </p>
        </div>
        <p class="text-sm py-1 px-4 bg-mainColor rounded-full text-white">
          {{ orders.resultDetails.status }}
        </p>
      </div>
      <Spinner v-else/>
    </div>
  </div>
  <div class="mt-8">
    <div class="container mx-auto px-4 lg:px-0">
      <Orders :name="layout">
        <div
            v-if="!pending"
            style="box-shadow: 0px 3px 10px 0px #0000000D;"
            class="mb-4">
          <div class="flex items-center justify-between text-mainColor w-full bg-[#E7F0FF] px-4 py-2">
            <h1 class="text-mainColor font-bold">
              Данные заказчика
            </h1>
          </div>
          <div class="p-5 flex flex-col gap-3 bg-white">
            <div class="">
              <div>
                <div class="mb-2">
                  <p class="text-sm text-[#9A9BA4]">
                    ФИО
                  </p>
                  <p class="p-3 border-b border-[#235CEE40]">
                    {{ orders.resultDetails.user.name }}
                  </p>
                </div>
                <div class="flex justify-between gap-2">
                  <div class="w-full">
                    <p class="text-sm text-[#9A9BA4]">
                      Email
                    </p>
                    <p class="p-3 border-b border-[#235CEE40]">
                      {{ orders.resultDetails.user.email }}
                    </p>
                  </div>
                  <div class="w-full">
                    <p class="text-sm text-[#9A9BA4]">
                      Телефон
                    </p>
                    <p class="p-3 border-b border-[#235CEE40]">
                      {{ orders.resultDetails.user.phone_number }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Spinner v-else class="mb-4"/>
        <div v-if="!pending">
          <div
              style="box-shadow: 0px 3px 10px 0px #0000000D;"
              class="flex items-center justify-between text-mainColor w-full bg-[#E7F0FF] px-4 py-2">
            <h1 class="text-mainColor font-bold">
              Данные заказа
            </h1>
          </div>
          <div class="p-5 flex flex-col gap-3 bg-white">
            <div class="">
              <div>
                <div class="flex justify-between gap-2 mb-2">
                  <div class="w-full">
                    <p class="text-sm text-[#9A9BA4]">
                      Дата
                    </p>
                    <p class="p-3 border-b border-[#235CEE40]">
                      {{ orders.resultDetails.day }}
                    </p>
                  </div>
                  <div class="w-full">
                    <p class="text-sm text-[#9A9BA4]">
                      Время
                    </p>
                    <p class="p-3 border-b border-[#235CEE40]">
                      {{ orders.resultDetails.start }} - {{ orders.resultDetails.end }}
                    </p>
                  </div>
                </div>
                <div class="mb-2">
                  <p class="text-sm text-[#9A9BA4]">
                    Цена
                  </p>
                  <p class="p-3 border-b border-[#235CEE40]">
                    {{ orders.resultDetails.price }}
                  </p>
                </div>
                <div class="mb-2">
                  <p class="text-sm text-[#9A9BA4]">
                    Тип
                  </p>
                  <p class="p-3 border-b border-[#235CEE40]">
                    {{ orders.resultDetails.service.name }}
                  </p>
                </div>
                <div class="mb-2">
                  <p class="text-sm text-[#9A9BA4]">
                    Адрес
                  </p>
                  <p class="p-3 border-b border-[#235CEE40]">
                    {{ orders.resultDetails.address.title }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Spinner v-else/>
        <p
            v-if="orders.resultDetails.status === 'created'"
            @click="acceptOrderLocal"
            class="bg-[#1EDA00] cursor-pointer text-white mt-4 text-center py-2 rounded-lg">
          Принять заказ
        </p>
      </Orders>
    </div>
  </div>
</template>