<script setup>
import {ref, onMounted, nextTick, watch} from "vue";
import {IconEdit, IconPlus, IconTrash} from "@tabler/icons-vue";
import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia";
import ProfileLayout from "@/layouts/profile.vue";
import SetImage from "@/components/modals/setImage.vue";
import ProfileNavigation from "@/components/layout/profileNavigation.vue";
import {useStaffStore} from "@/stores/staff.js";
import {useJobsStore} from "@/stores/jobs.js";
import {toast} from "vue3-toastify";

const layout = ref("profile");

const user = useUserStore()
const {result} = storeToRefs(user)
const jobs = useJobsStore()

const staff = useStaffStore()

const editMode = ref(false)
const editModeExp = ref(false)
const loading = ref(false)

const form = ref({
  specialization_details: []
})

const formData = ref(null)

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

const notify = (text, type) => {
  toast(text, {
    type: type,
    autoClose: 1000,
  });
}

const sendForm = async () => {
  loading.value = true
  await staff.updateSpecStaff(form.value)
  if(staff.resultUpdateSpec !== false) {
    notify('Данные успешно обновлены', 'success')
    await user.getProfile()
  } else {
    notify('Произошла ошибка', 'error')
  }
  loading.value = false
  editMode.value = false
}

const sendFormExp = async () => {
  loading.value = true
  await staff.updateJobPlaces(formData.value)
  if(staff.resultUpdatedJB !== false) {
    notify('Данные успешно обновлены', 'success')
    await user.getProfile()
  } else {
    notify('Произошла ошибка', 'error')
  }
  loading.value = false
  editModeExp.value = false
}

onMounted(async () => {
  await nextTick()
  await user.getProfile()
  await jobs.jobsList()
  form.value.specialization_details = result.value.data.staff.specialization_details
  formData.value = result.value.data.staff.job_places
})

watch(() => result, () => {
  if (result.value) {
    form.value.specialization_details = result.value.data.staff.specialization_details
  }
})
</script>

<template>
  <div class="mt-8">
    <div class="container mx-auto px-4 lg:px-0">
      <ProfileLayout :name="layout">
        <ProfileNavigation/>
        <div
            v-if="result"
            style="box-shadow: 0px 4px 20px 0px #0000001A;"
            class="mt-5 rounded-lg w-full bg-white">
          <div class="flex items-center justify-between text-mainColor w-full bg-[#E7F0FF] px-4 py-2">
            <h1 class="text-mainColor font-bold">
              Детали специализации
            </h1>
            <div class="flex items-center gap-5">
              <IconEdit
                  class="cursor-pointer"
                  size="24"
                  @click="editMode = !editMode"/>
            </div>
          </div>
          <div
              v-if="!editMode"
              class="p-5 flex flex-col gap-3">
            <div class="">
              <p
                  v-for="(item, index) of result.data.staff.specialization_details"
                  :key="index"
                  class="p-3 border-b border-[#235CEE40]">
                {{ item }}
              </p>
            </div>
          </div>
          <div
              v-else
              class="p-5 flex flex-col gap-3">
            <div
                v-for="(item, index) of form.specialization_details"
                :key="index"
                class="flex gap-2"
            >
              <input
                  v-model="form.specialization_details[index]"
                  placeholder="Введите детали специализации"
                  class="p-3 border w-full rounded-lg">
              <div
                  @click="form.specialization_details.splice(index, 1)"
                  class="bg-[#FFDEDB] flex rounded-md items-center justify-center px-2">
                <IconTrash
                    class="text-red-500  cursor-pointer"
                    size="24"
                />
              </div>
            </div>
            <div
                @click="form.specialization_details.push('')"
                class="flex justify-center cursor-pointer gap-2 text-sm border border-mainColor rounded py-1 w-full text-mainColor items-center mt-3">
              <IconPlus/>
              <p>
                Добавить детали специализации
              </p>
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
        <div
            v-if="result"
            style="box-shadow: 0px 4px 20px 0px #0000001A;"
            class="mt-5 rounded-lg w-full bg-white">
          <div class="flex items-center justify-between text-mainColor w-full bg-[#E7F0FF] px-4 py-2">
            <h1 class="text-mainColor font-bold">
              Опыт работы
            </h1>
            <div class="flex items-center gap-5">
              <IconEdit
                  class="cursor-pointer"
                  size="24"
                  @click="editModeExp = !editModeExp"/>
            </div>
          </div>
          <div class="p-5 flex flex-col gap-3">
            <div
                v-if="!editModeExp"
                class="">
              <div
                  v-for="(item, index) of result.data.staff.job_places"
                  :key="index"
                  class="p-3 rounded-lg"
                  :class="{ 'bg-[#E7F0FF]': index % 2 === 0 }"
              >
                <div class="mb-2">
                  <p class="text-sm text-[#9A9BA4]">
                    Место работы
                  </p>
                  <p class="p-3 border-b border-[#235CEE40]">
                    {{ item.job_place }}
                  </p>
                </div>
                <div class="flex justify-between gap-2">
                  <div class="w-full">
                    <p class="text-sm text-[#9A9BA4]">
                      Старт работы
                    </p>
                    <p class="p-3 border-b border-[#235CEE40]">
                      {{ item.start_date }}
                    </p>
                  </div>
                  <div class="w-full">
                    <p class="text-sm text-[#9A9BA4]">
                      Конец работы
                    </p>
                    <p class="p-3 border-b border-[#235CEE40]">
                      {{ item.end_date }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
                v-else
                class="">
              <div
                  v-for="(item, index) of formData"
                  :key="index"
                  class="p-3 rounded-lg block"
                  :class="{ 'bg-[#E7F0FF]': index % 2 === 0 }"
              >
                <div class="mb-2">
                  <div class="mb-2">
                    <p class="text-sm text-[#9A9BA4]">
                      Место работы
                    </p>
                    <select
                        v-model="formData[index].id"
                        type="text"
                        class="p-3 border w-full rounded-lg"
                    >
                      <option :value="null">
                        Выберите место работы
                      </option>
                      <option
                          v-for="(it, ind) of jobs.result"
                          :key="ind"
                          :value="it.id">
                        {{ it.full_name }}
                      </option>
                    </select>
                  </div>
                  <div class="flex justify-between gap-2">
                    <div class="w-full">
                      <p class="text-sm text-[#9A9BA4]">
                        Старт работы
                      </p>
                      <input
                          v-model="formData[index].start_date"
                          type="date"
                          placeholder="Введите детали специализации"
                          class="p-3 border w-full rounded-lg">
                    </div>
                    <div class="w-full">
                      <p class="text-sm text-[#9A9BA4]">
                        Конец работы
                      </p>
                      <input
                          v-model="formData[index].end_date"
                          type="date"
                          placeholder="Введите детали специализации"
                          class="p-3 border w-full rounded-lg">
                    </div>
                  </div>
                </div>
                <div
                    @click="formData.splice(index, 1)"
                    class="bg-[#FFDEDB]  cursor-pointer flex rounded-md items-center justify-center py-2">
                  <IconTrash
                      class="text-red-500"
                      size="24"
                  />
                </div>
              </div>
              <div
                  @click="formData.push({id: null, start_date: '', end_date: ''})"
                  class="flex cursor-pointer justify-center gap-2 text-sm border border-mainColor rounded py-1 w-full text-mainColor items-center mt-5">
                <IconPlus/>
                <p>
                  Добавить место работы
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="editModeExp">
          <p
              v-if="!loading"
              @click="sendFormExp"
              class="bg-[#1EDA00] cursor-pointer text-white mt-4 text-center py-2 rounded-lg">
            Сохранить
          </p>
          <p
              v-else
              class="bg-[#1EDA00] cursor-pointer text-white mt-4 text-center py-2 rounded-lg">
            <span class="spinner"></span>
          </p>
        </div>
      </ProfileLayout>
    </div>
  </div>
  <SetImage/>
</template>