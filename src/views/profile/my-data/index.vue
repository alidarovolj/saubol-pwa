<script setup>
import {IconEdit} from "@tabler/icons-vue";
import {useUserStore} from "@/stores/user.js";
import {ref, nextTick, onMounted, watch} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {storeToRefs} from "pinia";
import {vMaska} from "maska"
import Profile from "@/layouts/profile.vue";
import SetImage from "@/components/modals/setImage.vue";
import ProfileNavigation from "@/components/layout/profileNavigation.vue";
import {useStaffStore} from "@/stores/staff.js";
import {toast} from "vue3-toastify";

const layout = ref("profile");
const editMode = ref(false)
const loading = ref(false)

const user = useUserStore()
const {result} = storeToRefs(user)
const staff = useStaffStore()

const notify = (text, type) => {
  toast(text, {
    type: type,
    autoClose: 1000,
  });
}

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

const form = ref({
  name: "",
  iin: "",
  email: "",
  phone_number: "",
  specialization_id: null
})

const v$ = useVuelidate({
  name: {required},
  iin: {required},
  email: {required},
  phone_number: {required},
  specialization_id: {required}
}, form);

const sendForm = async () => {
  loading.value = true;
  v$.value.$touch();

  if (v$.value.$error) {
    loading.value = false;
    console.log(v$.value.$errors)
    return;
  }

  await staff.updateStaff(form.value)
  console.log(staff.resultUpdate)
  if (staff.resultUpdate !== false) {
    await nextTick()
    notify('Данные успешно обновлены', 'success')
    await user.getProfile()
    editMode.value = false
  } else {
    notify('Произошла ошибка', 'error')
  }
  loading.value = false
}

onMounted(async () => {
  await nextTick()
  await user.getProfile()
  await staff.specializationList()
  form.value.name = result.value.data.name
  form.value.iin = result.value.data.iin
  form.value.phone_number = result.value.data.phone_number
  form.value.email = result.value.data.email
  form.value.specialization_id = result.value.data.staff.specialization.id
})

watch(user, () => {
  form.value.name = result.value.data.name
  form.value.iin = result.value.data.iin
  form.value.phone_number = result.value.data.phone_number
  form.value.email = result.value.data.email
  form.value.specialization_id = result.value.data.staff.specialization.id
})

watch(staff.resultUpdate, async () => {
  await nextTick()
  await user.getProfile()
})
</script>

<template>
  <div class="mt-8">
    <div class="container mx-auto px-4 lg:px-0">
      <Profile :name="layout">
        <ProfileNavigation/>
        <div
            v-if="result"
            style="box-shadow: 0px 4px 20px 0px #0000001A;"
            class="mt-5 rounded-lg lg:mt-0 w-full bg-white">
          <div class="flex items-center justify-between text-mainColor w-full bg-[#E7F0FF] px-4 py-2">
            <h1 class="text-mainColor font-bold">
              Мои данные
            </h1>
            <div class="flex items-center gap-5">
              <IconEdit
                  class="cursor-pointer"
                  size="24"
                  @click="editMode = !editMode"/>
            </div>
          </div>
          <div class="p-5 flex flex-col gap-3">
            <div class="">
              <p class="text-sm text-[#9A9BA4]">
                Профиль работы
              </p>
              <p
                  v-if="!editMode"
                  class="p-3 border-b border-[#235CEE40]">
                {{ result.data.staff.specialization.name }}
              </p>
              <select
                  v-else
                  v-model="form.specialization_id"
                  type="text"
                  class="p-3 border w-full rounded-lg"
              >
                <option :value="null">
                  Выберите специализацию
                </option>
                <option
                    v-for="(it, ind) of staff.resultSpecs"
                    :class="{'border-red-500': v$.specialization_id.$error}"
                    :key="ind"
                    :value="it.id">
                  {{ it.name }}
                </option>
              </select>
            </div>
            <div class="">
              <p class="text-sm text-[#9A9BA4]">
                Номер телефона
              </p>
              <p v-if="!editMode" class="p-3 border-b border-[#235CEE40]">
                {{ result.data.phone_number }}
              </p>
              <input
                  v-else
                  v-model="form.phone_number"
                  data-maska="+7 (###) ###-##-##"
                  v-maska
                  :class="{'border-red-500': v$.phone_number.$error}"
                  type="text"
                  class="p-3 border w-full rounded-lg"
                  placeholder="Введите телефон"
              >
            </div>
            <div class="">
              <p class="text-sm text-[#9A9BA4]">
                ИИН
              </p>
              <p
                  v-if="!editMode"
                  class="p-3 border-b border-[#235CEE40]">
                {{ result.data.iin }}
              </p>
              <input
                  v-else
                  v-model="form.iin"
                  :class="{'border-red-500': v$.iin.$error}"
                  type="text"
                  class="p-3 border w-full rounded-lg"
                  placeholder="Введите телефон"
              >
            </div>
            <div class="">
              <p class="text-sm text-[#9A9BA4]">
                Email
              </p>
              <p
                  v-if="!editMode"
                  class="p-3 border-b border-[#235CEE40]">
                {{ result.data.email }}
              </p>
              <input
                  v-else
                  v-model="form.email"
                  :class="{'border-red-500': v$.email.$error}"
                  type="text"
                  class="p-3 border w-full rounded-lg"
                  placeholder="Введите телефон"
              >
            </div>
            <div class="">
              <p class="text-sm text-[#9A9BA4]">
                Места работы
              </p>
              <div class="flex flex-col gap-1 border-b border-[#235CEE40]">
                <p
                    v-for="(item, index) of result.data.staff.job_places"
                    class="p-3">
                  {{ item.job_place }}
                </p>
              </div>
            </div>
          </div>
        </div>
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
      </Profile>
    </div>
  </div>
  <SetImage/>
</template>