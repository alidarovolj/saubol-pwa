<script setup>
import {useAddressesStore} from "~/store/addresses.js";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {useNursesStore} from "~/store/nurses.js";

const addresses = useAddressesStore()

const user = useUserStore()
const {result} = storeToRefs(user)

const nurse = useNursesStore()
const cart = useCartStore()

const props = defineProps({
  service: Object,
  required: true
})

const pickedDay = ref(null)

const loading = ref(false)

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const type = ref(1)

const form = ref({
  date: {
    day: "",
    start: "",
    end: ""
  },
  service_id: null,
  price: null,
  address_id: null
})

const v$ = useVuelidate({
  date: {
    day: {required},
    start: {required},
    end: {required}
  },
  service_id: {required},
  price: {required},
  address_id: {required}
}, form);

const setTime = (index) => {
  props.service.times.forEach((it, ind) => {
    if (it === index.target.value) {
      form.value.date.start = props.service.times[ind]
      form.value.date.end = props.service.times[ind + 1]
    }
  })
}

const setDay = (index) => {
  form.value.date.day = props.service.dates[index].date
  pickedDay.value = index
}

onMounted(async () => {
  form.value.price = props.service.price
  form.value.service_id = props.service.id
})

const sendForm = async () => {
  loading.value = true;
  v$.value.$validate();

  if (v$.value.$error) {
    loading.value = false;
    notify(false, 'Заполните все поля')
    return;
  }

  await nurse.cartNurses(form.value)
  if (nurse.resultNurseCart) {
    await cart.cartList()
    notify(true, 'Услуга успешно добавлена в корзину')
    loading.value = false;
  } else {
    notify(false, 'Ошибка при добавлении услуги в корзину')
    loading.value = false;
  }
}

watch(form.value, (val) => {
  if (val.service_id == props.service.id) {
    form.value.price = props.service.price
  } else {
    props.service.premium_service.forEach((it) => {
      if (it.id === form.value.service_id) {
        form.value.price = it.price
      }
    })
    // form.value.price = props.service.premium_service.price
  }
})
</script>

<template>
  <div>
    <div
        class="w-full bg-white rounded-lg p-5"
        style="box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.05);"
    >
      <div class="flex items-center mb-4 gap-5">
        <img
            v-if="props.service.img"
            class="rounded-md h-full w-[130px]"
            :src="props.service.img"
            alt=""
        >
        <img
            v-else
            class="rounded-md h-full w-[130px]"
            src="@/assets/img/services/male_doctor.png"
            alt=""
        >
        <div class="block lg:flex items-center justify-between w-full">
          <div>
            <p class="text-sm lg:text-xl font-semibold mb-3">
              {{ props.service.category.name }}
            </p>
            <p class="text-mainColor font-semibold mb-2">
              {{ props.service.name }}
            </p>
            <div class="block">
              <p class="text-sm mb-4">
                Вид услуги:
              </p>
              <div class="flex flex-col gap-2">
                <div class="flex items-center text-sm gap-3">
                  <input
                      name="service"
                      v-model="form.service_id"
                      :value="props.service.id"
                      type="radio">
                  <p :class="[{'text-red-500': v$.service_id.$error}]">
                    Стандарт
                  </p>
                </div>
                <div
                    v-for="(it, ind) of props.service.premium_service"
                    class="flex items-center text-sm gap-3">
                  <input
                      name="service"
                      v-model="form.service_id"
                      :value="it.id"
                      type="radio">
                  <p :class="[{'text-red-500': v$.service_id.$error}]">
                    {{ it.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p class="text-sm mb-2">
              Цена
            </p>
            <p class="px-7 py-3 bg-[#E7F0FF] rounded-md text-center w-max font-bold text-mainColor">
              <span>
                {{ form.price }}
              </span> ₸
            </p>
          </div>
        </div>
      </div>
      <div class="block lg:flex justify-between gap-4 mb-4">
        <div class="w-full lg:w-3/5 mb-3 lg:mb-0">
          <p class="text-sm lg:text-base mb-1">
            Дни приема:
          </p>
          <div class="flex justify-between">
            <!--            :class="{ 'bg-gray-200 cursor-not-allowed' : props.doctor.free_time[0].length === 0 }"-->
            <div
                v-for="(it, ind) of props.service.dates"
                :key="ind"
                @click="setDay(ind)"
                :class="[{'bg-mainColor text-white': pickedDay === ind}, {'border-red-500': v$.date.day.$error}]"
                class="cursor-pointer transition-all py-1 px-3 border w-max rounded text-sm lg:text-base text-center">
              <p class="text-xs">{{ it.day_number }}</p>
              <p>{{ it.day_of_week }}</p>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-2/5">
          <p class="mb-1">
            Время
          </p>
          <select
              @change="setTime"
              class="px-3 py-3 border rounded-lg w-full"
              :class="{'border-red-500': v$.date.start.$error}"
              name=""
              id="">
            <option :value="null">
              Выберите время
            </option>
            <option
                v-for="(it, ind) of props.service.times"
                :key="ind"
                :value="it">
              {{ it }}
            </option>
          </select>
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
            :to="'/services/med-services/' + props.service.id"
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
  <LoginModal v-if="!user.result"/>
</template>