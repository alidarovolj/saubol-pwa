<script setup>
import {useUserStore} from "~/store/user.js";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {useAddressesStore} from "~/store/addresses.js";
import {useStaffStore} from "~/store/staff.js";

const props = defineProps({
  doctor: Object,
  required: true
})

const user = useUserStore()
const {result} = storeToRefs(user)
const addresses = useAddressesStore()
const cart = useCartStore()

const staff = useStaffStore()

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const loading = ref(false)

const pickedDay = ref("")

const pickedTime = ref([])

const form = ref({
  user_id: null,
  time_id: null,
  staff_id: null,
  service_id: null,
  price: null,
  address_id: null
})

const v$ = useVuelidate({
  user_id: {required},
  time_id: {required},
  staff_id: {required},
  service_id: {required},
  price: {required},
  address_id: {required}
}, form);

const setPickDay = (day) => {
  pickedDay.value = day
  for (let i = 0; i < pickedDay.value.times.length; i++) {
    pickedTime.value.push(pickedDay.value.times[i])
  }
}

const changeService = (val) => {
  form.value.service_id = val.service_id
  form.value.price = val.price
}

const sendForm = async () => {
  loading.value = true;
  v$.value.$validate();

  if (v$.value.$error) {
    loading.value = false;
    notify(false, 'Заполните все поля')
    return;
  }

  await staff.setOrderDoctor(form.value)
  if(staff.resultOrderDoc) {
    await cart.cartList()
    notify(true, 'Услуга успешно добавлена в корзину')
    loading.value = false;
  } else {
    notify(false, 'Ошибка при добавлении услуги в корзину')
    loading.value = false;
  }
}

onMounted(async () => {
  form.value.price = props.doctor.services[0].price
  form.value.service_id = props.doctor.services[0].service_id
  form.value.staff_id = props.doctor.id
  if (user.result) {
    form.value.user_id = user.result.data.id
  }
})

watch(() => user.result, () => {
  if (user.result) {
    form.value.user_id = user.result.data.id
  }
})
</script>

<template>
  <div>
    <div
        class="w-full bg-white rounded-lg p-5"
        style="box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.05);"
    >
      <div class="block lg:flex justify-between items-center mb-4">
        <div class="flex items-center gap-5">
          <img
              v-if="props.doctor.user.img"
              class="rounded-md h-full w-[130px]"
              :src="props.doctor.user.img"
              alt=""
          >
          <div v-else>
            <img
                v-if="props.doctor.is_female"
                class="rounded-md h-full w-[130px]"
                src="@/assets/img/services/female_doctor.png"
                alt=""
            >
            <img
                v-else
                class="rounded-md h-full w-[130px]"
                src="@/assets/img/services/male_doctor.png"
                alt=""
            >
          </div>
          <div>
            <p class="text-sm lg:text-xl font-semibold mb-3">
              {{ props.doctor.user.name }}
            </p>
            <p class="text-mainColor font-semibold mb-2">
              {{ props.doctor.specialization.name }}
            </p>
            <!--          <p class="text-mainColor font-semibold mb-3 text-xs">-->
            <!--            {{ props.doctor.job.name }}-->
            <!--          </p>-->
            <p class="w-max py-1 lg:py-2 px-5 bg-mainColor rounded text-white mb-2">
              Стаж {{ props.doctor.experience }} лет
            </p>
            <div>
            </div>
          </div>
        </div>
        <div>
          <p class="text-xs lg:text-sm mb-1">
            Цена
          </p>
          <p class="px-7 py-3 bg-[#E7F0FF] rounded-md text-center w-max font-bold text-mainColor">
            {{ form.price }} тг
          </p>
        </div>
      </div>
      <div class="block lg:flex justify-between gap-4 mb-4">
        <div class="w-full lg:w-3/5 mb-3 lg:mb-0">
          <p class="text-sm lg:text-base mb-1">
            Дни приема:
          </p>
          <div class="flex gap-2">
            <div
                @click="setPickDay(it)"
                v-for="(it, ind) of props.doctor.schedule"
                :key="ind"
                :class="[{ 'bg-mainColor text-white' : pickedDay.id === it.id }]"
                class="cursor-pointer py-1 px-3 border w-max rounded text-sm lg:text-base text-center leading-none">
              <p class="text-xs">
                {{ it.weekday }}
              </p>
              <div>
                <p class="text-xs">
                  {{ it.dayNumber }}
                </p>
                <p class="uppercase">
                  {{ it.dayOfWeek }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-2/5">
          <p class="mb-1">
            Время
          </p>
          <select
              :disabled="!pickedDay"
              v-model="form.time_id"
              :class="{'border-red-500': v$.time_id.$error || v$.time_id.$error}"
              class="px-3 py-3 border rounded-lg w-full">
            <option :value="null">
              Выберите время
            </option>
            <option
                v-for="(it, ind) of pickedDay.times"
                :key="ind"
                :value="it.id">
              {{ it.start }} - {{ it.end }}
            </option>
          </select>
        </div>
      </div>
      <div class="mb-4">
        <p class="text-sm mb-3">
          Вид услуги
        </p>
        <div class="flex gap-5">
          <label
              @click="changeService(it)"
              v-for="(it, ind) of props.doctor.services"
              :key="ind"
              :class="{'border-red-500': v$.service_id.$error}"
              class="text-sm lg:text-base w-max flex items-center gap-2 cursor-pointer"
              for="">
            <input
                v-model="form.service_id"
                type="radio"
                class="w-5 h-5"
                name="service"
                :value="it.service_id">
            <p class="w-max">
              {{ it.name }}
            </p>
          </label>
        </div>
      </div>
      <div
          v-if="addresses.resultAddresses"
          class="mb-4"
      >
        <p class="text-sm mb-3">
          Адресная книга <span class="text-red-500">*</span>
        </p>
        <div class="block lg:flex justify-between gap-5">
          <div class="relative w-full lg:w-3/5 mb-2 lg:mb-0">
            <select
                v-model="form.address_id"
                :class="{'border-red-500': v$.address_id.$error}"
                class="px-3 py-3 border rounded-lg w-full">
              <option :value="null">
                Выберите адрес
              </option>
              <option
                  v-for="(it, ind) of addresses.resultAddresses.data"
                  :key="ind"
                  :value="it.address.id">
                {{ it.address.title }}
              </option>
            </select>
          </div>
          <button
              onclick="create_address.showModal()"
              class="border border-mainColor text-sm w-full lg:w-2/5 block rounded-lg text-mainColor py-2 lg:py-0">
            Добавить новый адрес
          </button>
        </div>
      </div>
      <div class="flex gap-6 border-t border-[#E7F0FF] pt-4">
        <router-link
            :to="'/services/doctors/' + props.doctor.id"
            class="block w-full py-3 rounded-lg text-mainColor bg-[#E7F0FF] text-center">
          Подробнее
        </router-link>
        <p
            v-if="user.result && !loading"
            @click="sendForm"
            class="w-full py-3 rounded-lg text-white bg-mainColor text-center cursor-pointer">
          Заказать услугу
        </p>
        <p
            v-else-if="user.result && loading"
            class="w-full py-3 rounded-lg text-white bg-mainColor text-center cursor-pointer">
          <span class="spinner"></span>
        </p>
        <button
            v-else
            onclick="loginModal.showModal()"
            class="w-full py-3 rounded-lg text-white bg-mainColor text-center cursor-pointer">
          Заказать услугу
        </button>
      </div>
    </div>
  </div>
</template>