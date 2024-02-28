<script setup>
import {useUserStore} from "~/store/user.js";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {useAuthStore} from "~/store/auth.js";
import {IconEye, IconEyeClosed} from "@tabler/icons-vue";

const passwordFieldType = ref("password");

const runtimeConfig = useRuntimeConfig();
const auth = useAuthStore()
const user = useUserStore()
const {result} = storeToRefs(user)
const loading = ref(false);
const addresses = useAddressesStore()

const switchVisibility = () => {
  passwordFieldType.value =
      passwordFieldType.value === "password" ? "text" : "password";
}

const form = ref({
  login: "",
  password: ""
})

const v$ = useVuelidate({
  login: {required},
  password: {required}
}, form);

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const sendForm = async () => {
  loading.value = true;
  v$.value.$validate();

  if (v$.value.$error) {
    loading.value = false;
    return;
  }

  const {data, error} = await useFetch("/auth/login", {
    method: "POST",
    baseURL: runtimeConfig.public.API_LINK,
    body: JSON.stringify(form.value),
    lazy: true
  });

  if (data.value) {
    await auth.initCookieToken(data.value.access_token)
    auth.token = data.value.access_token
    await user.getProfile()
    await addresses.listAddresses()
    loading.value = false;
    loginModal.close()
    notify(true, 'Спасибо за авторизацию!')
  } else {
    notify(false, 'An error has occurred')
    loading.value = false;
  }
}
</script>

<template>
  <dialog id="loginModal" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <form
          @submit.prevent="sendForm"
          class="w-full mx-auto px-4 lg:px-0 relative z-20">
        <img
            class="mx-auto mb-5"
            src="@/assets/img/main-color-logo.svg"
            alt=""
        >
        <div class="mb-5">
          <p class="text-sm mb-1">
            Email
          </p>
          <input
              class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
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
                class="w-full border border-[#E5E5E5] rounded-lg px-3 py-2"
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
        <div class="flex justify-between mb-5">
          <router-link
              to="/auth/registration"
              class="text-mainColor text-sm">
            Перейти к регистрации
          </router-link>
          <router-link
              class="text-mainColor text-sm text-end"
              to="/">
            Забыли пароль?
          </router-link>
        </div>
        <button class="bg-mainColor py-3 text-white rounded-md w-full">
          Войти
        </button>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>