<script setup>
import {IconMapPin} from "@tabler/icons-vue"
import {useDomoLabStore} from "~/store/domoLab.js";
import {useAddressesStore} from "~/store/addresses.js";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {useUserStore} from "~/store/user.js";

const lab = useDomoLabStore()
const {result} = storeToRefs(lab)

const user = useUserStore()

const loading = ref(false)

const addresses = useAddressesStore()
const {resultAddresses} = storeToRefs(addresses)

const pending = ref(true)

const notify = (type, text) => {
  const toast = useNuxtApp().$toast;
  type ? toast.success(text) : toast.error(text);
};

const times = ref([]);
const dates = ref([]);
const daysOfWeek = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

const pickedDay = ref(null)

for (let i = 0; i < 24; i++) {
  for (let j = 0; j < 2; j++) {
    let hour = i < 10 ? '0' + i : i;
    let minute = j === 0 ? '00' : '30';
    times.value.push(hour + ':' + minute);
  }
}

for (let i = 0; i < 7; i++) {
  let date = new Date();
  date.setDate(date.getDate() + i);
  let formattedDate = date.toISOString().split('T')[0];
  let dayOfWeek = daysOfWeek[date.getDay()];
  let dayNumber = String(date.getDate()).padStart(2, '0');
  dates.value.push({
    date: formattedDate,
    day_of_week: dayOfWeek,
    day_number: dayNumber
  });
}

const form = ref({
  address_id: null,
  analysis_ids: [],
  date: null,
  start_time: null,
  end_time: null
})

const v$ = useVuelidate({
  address_id: {required},
  analysis_ids: {required},
  date: {required},
  start_time: {required},
  end_time: {required}
}, form);

const setTime = (index) => {
  times.value.forEach((it, ind) => {
    if (it === index.target.value) {
      form.value.start_time = times.value[ind]
      form.value.end_time = ind === times.value.length - 1 ? times.value[0] : times.value[ind + 1]
    }
  })
}

const setDay = (index) => {
  form.value.date = dates.value[index].date
  pickedDay.value = index
}

const sendForm = async () => {
  loading.value = true;
  v$.value.$validate();

  if (v$.value.$error) {
    loading.value = false;
    notify(false, 'Заполните все поля')
    return;
  }

  await lab.createLab(form.value)
  if (lab.resultCreate) {
    notify(true, 'Услуга успешно добавлена в корзину')
    loading.value = false;
  } else {
    notify(false, 'Ошибка при добавлении услуги в корзину')
    loading.value = false;
  }
}

onMounted(async () => {
  await nextTick()
  await lab.listDomolab()
  await addresses.listAddresses()
  pending.value = false
})
</script>

<template>
  <div class="container mx-auto px-4 lg:px-0">
    <div class="flex flex-col lg:flex-row">
      <div class="w-full lg:w-1/2">
        <div class="relative rounded-2xl p-4 lg:p-0">
          <img
              class="w-full h-full object-cover absolute left-0 top-0 rounded-2xl"
              src="~/assets/img/mainPage/lab/bg.png"
              alt=""
          >
          <div class="setBg absolute left-0 top-0 w-full h-full rounded-2xl"></div>
          <div class="relative z-20">
            <div class="hidden lg:block py-6"></div>
            <div class="bg-white py-3 lg:py-6 px-4 lg:px-20 rounded-lg lg:rounded-none">
              <h2 class="text-xl lg:text-4xl text-mainColor font-semibold">
                Домо-Лаб
              </h2>
            </div>
            <div class="pt-4 pb-0 lg:pb-10 px-0 lg:px-20">
              <p class="text-sm lg:text-2xl font-medium text-white">
                "Анализы на дому для вашего удобства. Наш медперсонал приедет в удобное время, сэкономив ваше время и
                минимизировав стресс. Конфиденциально и точно. Ваше здоровье - наша забота, где бы вы ни находились.
                Приятный бонус: расшифровка полученных анализов абсолютно бесплатно. Мы ценим ваше здоровье так же, как
                и вы!"
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-1/2 bg-white flex items-center justify-center text-regText p-4 lg:p-0">
        <div
            v-if="!pending"
            class="w-full lg:w-[60%]">
          <div
              v-if="addresses.resultAddresses"
              class="mb-3"
          >
            <p class="text-sm mb-3">
              Адресная книга <span class="text-red-500">*</span>
            </p>
            <div class="block">
              <div class="relative w-full mb-2 lg:mb-3">
                <IconMapPin
                    class="absolute left-3 top-1/2 -translate-y-1/2"
                    size="24"
                />
                <select
                    v-model="form.address_id"
                    :class="{'border-red-500': v$.address_id.$error}"
                    class="px-3 py-3 border rounded-lg w-full pl-10">
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
                  class="border border-mainColor text-sm w-full block rounded-lg text-mainColor py-2">
                Добавить новый адрес
              </button>
            </div>
          </div>
          <div class="mb-3">
            <p class="text-sm mb-2">
              Вид анализа
            </p>
            <div class="relative">
              <select
                  @input="form.analysis_ids = []; form.analysis_ids.push($event.target.value)"
                  :class="{'border-red-500': v$.analysis_ids.$error}"
                  class="px-3 py-3 border rounded-lg w-full">
                <option
                    v-for="(item, index) in result.data"
                    :key="item.id"
                    :value="item.id">
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="block mb-3">
            <div class="w-full mb-3">
              <p class="text-sm lg:text-base mb-1">
                Дни приема:
              </p>
              <div class="flex justify-between">
                <div
                    v-for="(it, ind) of dates"
                    :key="ind"
                    @click="setDay(ind)"
                    :class="[{'bg-mainColor text-white': pickedDay === ind}, {'border-red-500': v$.date.$error}]"
                    class="cursor-pointer transition-all py-1 px-3 border w-max rounded text-sm lg:text-base text-center">
                  <p class="text-xs">{{ it.day_number }}</p>
                  <p>{{ it.day_of_week }}</p>
                </div>
              </div>
            </div>
            <div class="w-full">
              <p class="mb-1">
                Время
              </p>
              <select
                  @change="setTime"
                  class="px-3 py-3 border rounded-lg w-full"
                  :class="{'border-red-500': v$.start_time.$error}"
                  name=""
                  id="">
                <option :value="null">
                  Выберите время
                </option>
                <option
                    v-for="(it, ind) of times"
                    :key="ind"
                    :value="it">
                  {{ it }}
                </option>
              </select>
            </div>
          </div>
          <!--          <div class="flex flex-wrap justify-between">-->
          <!--            <label-->
          <!--                class="w-half flex items-center mb-4"-->
          <!--                for="">-->
          <!--              <input-->
          <!--                  type="radio"-->
          <!--                  name="lab"-->
          <!--                  class="w-6 h-6 mr-2">-->
          <!--              <p>-->
          <!--                Вариант 1-->
          <!--              </p>-->
          <!--            </label>-->
          <!--          </div>-->
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
        <Spinner v-else />
      </div>
    </div>
  </div>
  <CreateAddress/>
  <LoginModal/>
</template>

<style scoped>
.setBg {
  border-radius: 15px;
  background: linear-gradient(90deg, #196BF7 -26.72%, rgba(25, 107, 247, 0.00) 181.78%);
}
</style>