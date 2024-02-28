<script setup>
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {ref} from "vue";
import {IconEye, IconEyeClosed} from "@tabler/icons-vue"
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {useUserStore} from "@/stores/user.js";
import {storeToRefs} from "pinia";
import axios from "@/utils/axios";
import router from "@/router";

const passwordFieldType = ref("password");

const authResponse = ref(null);

const user = useUserStore()
const {result} = storeToRefs(user)

const loading = ref(false);

const switchVisibility = () => {
  passwordFieldType.value =
      passwordFieldType.value === "password" ? "text" : "password";
}

const notify = (text, type) => {
  toast(text, {
    type: type,
    autoClose: 1000,
  });
}

const form = ref({
  login: "",
  password: ""
})

const v$ = useVuelidate({
  login: {required},
  password: {required}
}, form);

const sendForm = async () => {
  loading.value = true;
  v$.value.$validate();

  if (v$.value.$error) {
    loading.value = false;
    notify('Пожалуйста заполните все поля', 'error')
    return;
  }

  axios.post("/auth/staff-login", form.value)
      .then(async response => {
        console.log(response);
        authResponse.value = response;

        if (response.status === 200) {
          localStorage.setItem("token", "Bearer " + response.data.access_token);
          localStorage.setItem("token_exp", response.data.expires_in);
          await user.getProfile()
          notify('Вы успешно авторизовались', 'success')
          router.push('/profile');
        }
        loading.value = false;
      })
      .catch(error => {
        loading.value = false;
        notify('Неверный логин или пароль', 'error')
        authResponse.value = error.response;
      });
}
</script>

<template>
  <div class="relative h-screen w-full">
    <div class="flex justify-between h-full items-center">
      <div class="w-full bg-[#F6F6F7] relative h-full flex items-center justify-center">
        <form
            @submit.prevent="sendForm"
            class="w-full lg:w-3/5 mx-auto px-4 lg:px-0 relative z-20">
          <img
              class="mx-auto mb-5"
              src="@/assets/img/main-color-logo.svg"
              alt=""
          >
          <div class="mb-5">
            <p class="text-sm mb-1">
              Номер телефона или Email:
            </p>
            <input
                class="w-full border border-[#E5E5E5] bg-white rounded-lg px-3 py-2"
                type="text"
                :class="{'border-red-500': v$.login.$error}"
                v-model="form.login"
                placeholder="Введите email"/>
            <p
                v-if="v$.login.$error"
                class="text-red-500 text-xs">
              Пожалуйста заполните данное поле
            </p>
          </div>
          <div class="mb-5">
            <p class="text-sm mb-1">
              Пароль:
            </p>
            <div class="relative">
              <input
                  class="w-full border border-[#E5E5E5] bg-white rounded-lg px-3 py-2"
                  :type="passwordFieldType"
                  v-model="form.password"
                  :class="{'border-red-500': v$.password.$error}"
                  placeholder="Введите пароль"/>
              <IconEyeClosed
                  v-if="passwordFieldType === 'text'"
                  @click="switchVisibility"
                  class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              />
              <IconEye
                  v-if="passwordFieldType === 'password'"
                  @click="switchVisibility"
                  class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              />
              <p
                  v-if="v$.password.$error"
                  class="text-red-500 text-xs">
                Пожалуйста заполните данное поле
              </p>
            </div>
          </div>
          <div class="flex justify-end mb-5">
            <router-link
                class="text-mainColor text-sm text-end"
                to="/">
              Забыли пароль?
            </router-link>
          </div>
          <button
              type="submit"
              class="bg-mainColor py-3 text-white rounded-md w-full">
            Войти
          </button>
        </form>
      </div>
    </div>
  </div>
</template>