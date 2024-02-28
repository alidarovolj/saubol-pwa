<script setup>
import {useUserStore} from "@/stores/user.js";
import {ref, nextTick, onMounted, watch} from "vue";
import {storeToRefs} from "pinia";
import Orders from "@/layouts/orders.vue";
import Spinner from "@/components/general/spinner.vue";
import { toast } from 'vue3-toastify';
import {useStaffStore} from "@/stores/staff.js";

const user = useUserStore()
const {result} = storeToRefs(user)
const staff = useStaffStore()

const pending = ref(true)
const loading = ref(false)

const editMode = ref(false)

const form = ref({
  service_ids: []
})

const formData = ref({
  password: '',
  password_confirmation: ""
})

const notify = (text, type) => {
  toast(text, {
    type: type,
    autoClose: 1000,
  });
}

const sendForm = async () => {
  loading.value = true
  if (formData.value.password === formData.value.password_confirmation) {
    if (formData.value.password.length >= 8 && /[A-Z]/.test(formData.value.password) && /[a-z]/.test(formData.value.password) && /[0-9]/.test(formData.value.password)) {
      await nextTick()
      await staff.changePassword(formData.value)
      editMode.value = false
      notify('Пароль успешно изменен', 'success')
    } else {
      notify('Пароль не соответствует требованиям', 'error')
    }
  } else {
    notify('Пароли не совпадают', 'error')
  }
  loading.value = false
}

const changeService = async (id) => {
  if (form.value.service_ids.includes(id)) {
    form.value.service_ids = form.value.service_ids.filter(item => item !== id)
  } else {
    form.value.service_ids.push(id)
  }
  await nextTick()
  await staff.changeServices(form.value)
  await user.getProfile()
}

onMounted(async () => {
  await nextTick()
  await user.getProfile()
  form.value.service_ids = result.value.data.staff.services.map(item => item.service_id)
  pending.value = false
})
</script>

<template>
  <div class="bg-white py-2 mt-3">
    <div class="container mx-auto px-4 lg:px-0">
      <Orders>
        <div v-if="!pending">
          <div>
            <p class="text-mainColor font-bold mb-4">
              Предоставляемые услуги
            </p>
            <div class="flex items-center justify-between mb-4">
              <p class="text-sm font-bold">
                Консультация
              </p>
              <input
                  @click="changeService(1)"
                  type="checkbox"
                  class="toggle cursor-pointer"
                  :checked="form.service_ids.includes(1)"
              />
            </div>
            <div class="flex items-center justify-between mb-4">
              <p class="text-sm font-bold">
                Выезд
              </p>
              <input
                  @click="changeService(2)"
                  type="checkbox"
                  class="toggle cursor-pointer"
                  :checked="form.service_ids.includes(2)"
              />
            </div>
            <div>
              <p class="text-mainColor font-bold mb-4">
                Безопасность
              </p>
              <div
                  v-if="!editMode"
                  class="mb-4">
                <p class="text-sm font-bold text-[#9A9BA4]">
                  Пароль
                </p>
                <p class="text-lg">
                  *************
                </p>
                <p
                    @click="editMode = true"
                    class="text-mainColor text-sm cursor-pointer">
                  Редактировать
                </p>
              </div>
              <div v-else>
                <div class="mb-3">
                  <p class="text-sm font-semibold mb-2">
                    Пароль
                  </p>
                  <input
                      v-model="formData.password"
                      type="password"
                      class="p-3 border w-full rounded-lg text-sm"
                      placeholder="Введите телефон"
                  >
                </div>
                <div class="mb-3">
                  <p class="text-sm font-semibold mb-2">
                    Подтверждение пароля
                  </p>
                  <input
                      v-model="formData.password_confirmation"
                      type="password"
                      class="p-3 border w-full rounded-lg text-sm"
                      placeholder="Введите телефон"
                  >
                </div>
                <ul class="list-disc pl-5 mb-5">
                  <li :class="{ 'text-green-400' : formData.password.length >= 8 }">Длина пароля должна быть не менее 8
                    символов
                  </li>
                  <li :class="{ 'text-green-400' : /[A-Z]/.test(formData.password) }">Латинские заглавные буквы</li>
                  <li :class="{ 'text-green-400' : /[a-z]/.test(formData.password) }">Латинские строчные буквы</li>
                  <li :class="{ 'text-green-400' : /[0-9]/.test(formData.password) }">Цифры 0-9</li>
                </ul>
                <p
                    @click="editMode = false"
                    class="text-mainColor text-sm cursor-pointer">
                  Отменить редактирование
                </p>
                <div v-if="editMode">
                  <p
                      v-if="!loading"
                      @click="sendForm"
                      class="bg-[#1EDA00] cursor-pointer text-white mt-4 text-center py-2 rounded-lg">
                    Сохранить
                  </p>
                  <p
                      v-else
                      class="bg-[#1EDA00] cursor-pointer text-white mt-4 text-center py-2 rounded-lg">
                    <span class="spinner"></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Spinner v-else/>
      </Orders>
    </div>
  </div>
</template>