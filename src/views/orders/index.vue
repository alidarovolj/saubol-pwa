<script setup>
import { IconChevronRight } from "@tabler/icons-vue";
import {useOrdersStore} from "@/stores/orders.js";
import {useUserStore} from "@/stores/user.js";
import {ref, nextTick, onMounted, watch} from "vue";
import {storeToRefs} from "pinia";
import Orders from "@/layouts/orders.vue";
import Spinner from "@/components/general/spinner.vue";
import {useRoute, useRouter} from "vue-router";

const layout = ref("profile");

const user = useUserStore()
const {result} = storeToRefs(user)

const route = useRoute()
const router = useRouter()

const orders = useOrdersStore()

const pending = ref(true)

onMounted(async () => {
  await nextTick()
  router.push({ query: { ...router.currentRoute.value.query, type: 'created' } })
  await orders.listOrders(route.query)
  pending.value = false
})

watch(route, async () => {
  pending.value = true
  await orders.listOrders(route.query)
  pending.value = false
})
</script>

<template>
  <div class="bg-white py-2">
    <div class="container mx-auto px-4 lg:px-0">
      <div class="flex gap-2 overflow-x-auto">
        <RouterLink
            to="/orders?type=created"
            :class="{ 'bg-mainColor text-white' : route.query.type === 'created' }"
            class="py-2 px-8 rounded-lg">
          Новые
        </RouterLink>
        <RouterLink
            to="/orders?type=accepted"
            :class="{ 'bg-mainColor text-white' : route.query.type === 'accepted' }"
            class="py-2 px-8 rounded-lg">
          Принятые
        </RouterLink>
        <RouterLink
            to="/orders?type=completed"
            :class="{ 'bg-mainColor text-white' : route.query.type === 'completed' }"
            class="py-2 px-8 rounded-lg">
          Завершенные
        </RouterLink>
      </div>
    </div>
  </div>
  <div class="mt-8">
    <div class="container mx-auto px-4 lg:px-0">
      <Orders :name="layout">
        <div v-if="!pending">
          <p
              v-if="orders.result.data.length === 0"
              class="text-red-500 text-center bg-white p-4 rounded-lg"
          >
            У вас нет заказов
          </p>
          <div
              v-else
          >
            <div
                style="box-shadow: 0px 0px 10px 0px #0000001A;"
                class="bg-white p-4 rounded-lg">
              <RouterLink
                  :to="'/orders/' + item.id"
                  v-for="(item, index) of orders.result.data"
                  :key="index"
                  class="block p-3 rounded"
                  :class="{ '!bg-[#E7F0FF]' : index % 2 === 0 }"
              >
                <div class="flex items-center justify-between mb-2">
                  <div class="text-sm flex items-center gap-2">
                    <p>
                      №{{ item.order_number }}
                    </p>
                    <p class="bg-mainColor text-white px-4 py-1 rounded">
                      {{ item.status }}
                    </p>
                  </div>
                  <IconChevronRight />
                </div>
                <div class="flex justify-between mb-2">
                  <div class="w-1/2">
                    <p class="text-xs text-[#9A9BA4]">
                      Дата
                    </p>
                    <p class="text-sm">
                      {{ item.date.day }}
                    </p>
                  </div>
                  <div class="w-1/2">
                    <p class="text-xs text-[#9A9BA4]">
                      Цена
                    </p>
                    <p class="text-sm">
                      {{ item.price }}
                    </p>
                  </div>
                </div>
                <div class="flex justify-between">
                  <div class="w-1/2">
                    <p class="text-xs text-[#9A9BA4]">
                      Время
                    </p>
                    <p class="text-sm">
                      {{ item.date.start }} - {{ item.date.end }}
                    </p>
                  </div>
                  <div class="w-1/2">
                    <p class="text-xs text-[#9A9BA4]">
                      Тип
                    </p>
                    <p class="text-sm">
                      {{ item.name }}
                    </p>
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
        <Spinner v-else/>
      </Orders>
    </div>
  </div>
</template>