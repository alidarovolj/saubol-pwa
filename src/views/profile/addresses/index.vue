<script setup>
import {IconUserCircle, IconLogout, IconAddressBook, IconVaccine, IconEdit} from "@tabler/icons-vue"
import BottomMenu from "~/components/layout/bottomMenu.vue";
import {useAddressesStore} from "~/store/addresses.js";

const layout = ref("profile");
const route = useRoute()

const user = useUserStore()
const {result} = storeToRefs(user)

const addresses = useAddressesStore()
const {resultAddresses} = storeToRefs(addresses)

const links = ref([
  {
    title: 'Главная',
    link: '/'
  },
  {
    title: 'Профиль',
    link: '/profile'
  },
  {
    title: 'Адреса',
    link: '/profile/addresses'
  }
])

const pending = ref(true)

onMounted(async () => {
  await nextTick()
  await addresses.listAddresses()
  pending.value = false
})

useHead({
  title: "Адреса | SaubolMed",
  meta: [
    {
      property: "og:title",
      content: "Адреса | SaubolMed",
    },
    {
      property: "og:url",
      content: route.fullPath,
    },
  ],
  link: [{rel: "canonical", href: "https://saubolmed.kz/"}],
});
</script>

<template>
  <div class="mt-8">
    <div class="container mx-auto px-4 lg:px-0">
      <Breadcrumbs :links="links"/>
      <h1 class="text-6xl font-semibold text-mainColor mb-7">
        Адреса
      </h1>
      <NuxtLayout :name="layout">
        <NuxtLoadingIndicator color="#3E46FF"/>
        <DelayHydration>
          <div v-if="!pending">
            <div class="block lg:flex justify-between items-center mb-10">
              <p class="text-2xl font-bold mb-3 lg:mb-0">
                Адресная книга
              </p>
              <button
                  class="bg-mainColor text-center text-white py-3 px-16 rounded-md w-full lg:w-auto"
                  onclick="create_address.showModal()">
                + Добавить адрес
              </button>
            </div>
            <p
                v-if="resultAddresses.data.length === 0"
                class="text-red-500 text-center my-10"
            >
              У вас нет адресов
            </p>
            <div
                v-else
                class="flex flex-wrap gap-3"
            >
              <div
                  v-for="(item, index) of resultAddresses.data"
                  :key="index"
                  class="w-full lg:w-1/3 p-5 bg-gray-100 rounded-lg"
              >
                <p class="text-lg font-bold mb-5">
                  {{ item.address.title }}
                </p>
                <div class="flex gap-3">
                  <button class="text-mainColor">
                    Редактировать
                  </button>
                  <button class="text-red-500">
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Spinner v-else/>
        </DelayHydration>
      </NuxtLayout>
    </div>
  </div>
  <CreateAddress/>
</template>