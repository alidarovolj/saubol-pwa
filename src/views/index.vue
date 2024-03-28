<script setup>
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {ref} from "vue";
import {IconEye, IconEyeClosed} from "@tabler/icons-vue"
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {useUserStore} from "@/stores/user.js";
import {storeToRefs} from "pinia";
import {IonPage, IonContent} from '@ionic/vue';
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
  <ion-page>
    <ion-content class="ion-padding">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h1 class="text-center">Авторизация</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <form @submit.prevent="sendForm">
              <div class="mb-3">
                <label for="login" class="form-label">Логин</label>
                <input type="text" class="form-control" id="login" v-model="form.login">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Пароль</label>
                <div class="input-group">
                  <input type="password" class="form-control" id="password" v-model="form.password" :type="passwordFieldType">
                  <button class="btn btn-outline-secondary" type="button" @click="switchVisibility">
                    <IconEye v-if="passwordFieldType === 'password'"/>
                    <IconEyeClosed v-else/>
                  </button>
                </div>
              </div>
              <div class="mb-3">
                <button type="submit" class="btn btn-primary" :disabled="loading">Войти</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>