<script setup>
import {IconUserCircle} from "@tabler/icons-vue"
import {useUserStore} from "@/stores/user.js";
import {storeToRefs} from "pinia";
import {ref} from "vue";

const user = useUserStore()
const {result} = storeToRefs(user)

const links = ref([
  {
    title: 'Новости',
    link: '/news'
  },
  {
    title: 'Услуги',
    link: '/services/doctors'
  },
  {
    title: 'Контакты',
    link: '/contacts'
  },
  {
    title: 'О нас',
    link: '/about'
  }
])

const logoutLocal = async () => {
  await user.logoutProfile()
  await user.getProfile()
}
</script>

<template>
  <div class="py-4 relative z-50 w-full bg-white">
    <div class="container mx-auto px-4 lg:px-0">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <router-link to="/profile">
            <img
                class="w-7 h-7 lg:w-12 lg:h-12"
                src="@/assets/img/logo.png"
                alt=""
            >
          </router-link>
        </div>
        <div class="flex items-center gap-5">
          <div>
            <div v-if="result">
              <div class="dropdown">
                <div tabindex="0" role="button" class="flex items-center gap-3 text-mainColor">
                  <p class="text-sm">
                    {{ result.data.name }}
                  </p>
                  <IconUserCircle size="24" />
                </div>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <router-link to="/profile">Профиль</router-link>
                  </li>
                  <li @click="logoutLocal"><a>Выйти</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>