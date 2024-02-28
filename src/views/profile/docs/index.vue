<script setup>
import {IconDownload, IconTrash, IconPlus} from "@tabler/icons-vue";
import {useUserStore} from "@/stores/user.js";
import {ref, onMounted, nextTick} from "vue";
import {storeToRefs} from "pinia";
import Profile from "@/layouts/profile.vue";
import ProfileNavigation from "@/components/layout/profileNavigation.vue";

const layout = ref("profile");


const user = useUserStore()
const {result} = storeToRefs(user)

const links = ref([
  {
    title: 'Главная',
    link: '/'
  },
  {
    title: 'Профиль',
    link: '/profile'
  }
])

onMounted(async () => {
  await nextTick()
  await user.getProfile()
})
</script>

<template>
  <div class="mt-8">
    <div class="container mx-auto px-4 lg:px-0">
      <Profile :name="layout">
        <ProfileNavigation />
        <div
            v-if="result"
            style="box-shadow: 0px 4px 20px 0px #0000001A;"
            class="mt-5 rounded-lg w-full bg-white">
          <div class="flex items-center justify-between text-mainColor w-full bg-[#E7F0FF] px-4 py-2">
            <h1 class="text-mainColor font-bold">
              Дипломы
            </h1>
          </div>
          <div class="p-5 flex flex-col gap-3">
            <div class="flex justify-between">
              <div class="w-full rounded flex flex-col gap-4">
                <div
                    v-for="(item, index) of result.diploma"
                    :key="index"
                    class="flex justify-between gap-2">
                  <div class="w-full bg-[#E7F0FF] rounded-md px-3 py-2 flex justify-between items-center gap-3">
                    <img class="w-max" src="@/assets/img/attachment.png" alt="">
                    <div class="w-full flex justify-between text-xs">
                      <p>{{ item.filename }}</p>
                    </div>
                  </div>
                  <a
                      :href="item.path"
                      target="_blank"
                      class="bg-[#E7F0FF] flex rounded-md items-center justify-center px-2">
                    <IconDownload
                        class="text-mainColor  cursor-pointer"
                        size="24"
                    />
                  </a>
                  <div class="bg-[#FFDEDB] flex rounded-md items-center justify-center px-2">
                    <IconTrash
                        class="text-red-500  cursor-pointer"
                        size="24"
                    />
                  </div>
                </div>
                <div
                    class="flex justify-center gap-2 text-sm border border-mainColor rounded py-1 w-full text-mainColor items-center">
                  <IconPlus/>
                  <p>
                    Добавить диплом
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
            v-if="result"
            style="box-shadow: 0px 4px 20px 0px #0000001A;"
            class="mt-5 rounded-lg w-full bg-white">
          <div class="flex items-center justify-between text-mainColor w-full bg-[#E7F0FF] px-4 py-2">
            <h1 class="text-mainColor font-bold">
              Сертификаты
            </h1>
          </div>
          <div class="p-5 flex flex-col gap-3">
            <div class="flex justify-between">
              <div class="w-full rounded flex flex-col gap-4">
                <div
                    v-for="(item, index) of result.certificates"
                    :key="index"
                    class="flex justify-between gap-2">
                  <div class="w-full bg-[#E7F0FF] rounded-md px-3 py-2 flex justify-between items-center gap-3">
                    <img class="w-max" src="@/assets/img/attachment.png" alt="">
                    <div class="w-full flex justify-between text-xs">
                      <p>{{ item.filename }}</p>
                    </div>
                  </div>
                  <a
                      :href="item.path"
                      target="_blank"
                      class="bg-[#E7F0FF] flex rounded-md items-center justify-center px-2">
                    <IconDownload
                        class="text-mainColor  cursor-pointer"
                        size="24"
                    />
                  </a>
                  <div class="bg-[#FFDEDB] flex rounded-md items-center justify-center px-2">
                    <IconTrash
                        class="text-red-500  cursor-pointer"
                        size="24"
                    />
                  </div>
                </div>
                <div
                    class="flex justify-center gap-2 text-sm border border-mainColor rounded py-1 w-full text-mainColor items-center">
                  <IconPlus/>
                  <p>
                    Добавить сертификат
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Profile>
    </div>
  </div>
  <SetImage/>
</template>