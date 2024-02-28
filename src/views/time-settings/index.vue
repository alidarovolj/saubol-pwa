<script setup>
import {useUserStore} from "@/stores/user.js";
import {ref, nextTick, onMounted, watch} from "vue";
import {storeToRefs} from "pinia";
import Orders from "@/layouts/orders.vue";
import Spinner from "@/components/general/spinner.vue";
import {useStaffStore} from "@/stores/staff.js";
import {toast} from "vue3-toastify";

const layout = ref("profile");

const pending = ref(false);
const loading = ref(false);

const user = useUserStore()
const {result} = storeToRefs(user)

const staff = useStaffStore()

const times = ref([])

const days = ref([
  {
    title: "Понедельник",
    value: 1
  },
  {
    title: "Вторник",
    value: 2
  },
  {
    title: "Среда",
    value: 3
  },
  {
    title: "Четверг",
    value: 4
  },
  {
    title: "Пятница",
    value: 5
  },
  {
    title: "Суббота",
    value: 6
  },
  {
    title: "Воскресенье",
    value: 7
  }
])

const notify = (text, type) => {
  toast(text, {
    type: type,
    autoClose: 1000,
  });
}

function generateTimes(duration) {
  const times = [];
  let hours = 0;
  let minutes = 0;

  while (hours < 24) {
    const start = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    minutes += duration;
    if (minutes >= 60) {
      hours += 1;
      minutes = 0;
    }
    const end = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    times.push({start, end});
  }

  return times;
}

const periods = ref([]);

const addDay = (val) => {
  if (isWeekdayNumberIncluded(val.value)) {
    form.value.schedule.days = form.value.schedule.days.filter(day => day.weekday_number !== val.value);
  } else {
    form.value.schedule.days.push({
      weekday_number: val.value,
      times: []
    });
  }
};

const isWeekdayNumberIncluded = (val) => {
  return form.value.schedule.days.some(day => day.weekday_number === val);
};

onMounted(async () => {
  await nextTick()
  await user.getProfile()
  form.value.schedule.duration = result.value.data.staff.schedule[0].duration
  periods.value = generateTimes(form.value.schedule.duration)
  pending.value = false

  result.value.data.staff.schedule.forEach(schedule => {
    const day = days.value.find(day => day.value === schedule.weekday_number);
    if (day) {
      addDay(day);
    }
  });

  times.value = result.value.data.staff.schedule[0].times
})

const form = ref({
  schedule: {
    duration: 15,
    days: [],
    times: [],
  },
});

const setDuration = () => {
  times.value = [];
  periods.value = [];
  periods.value = [...generateTimes(form.value.schedule.duration)];
  form.value.schedule.days = []
};

const sendForm = async () => {
  loading.value = true
  form.value.schedule.days = form.value.schedule.days.map(day => {
    return {
      ...day,
      times: times.value.filter(time => time.start && time.end)
    }
  });
  await staff.updateSchedule(result.value.data.staff.id, form.value)
  if(staff.resultUpdatedSchedule.value !== false) {
    await user.getProfile()
    loading.value = false
    notify('График успешно обновлен', 'success')
  } else {
    loading.value = false
    notify('Произошла ошибка', 'error')
  }
}

const checkTime = (item) => {
  if (times.value.some(time => time.start === item.start && time.end === item.end)) {
    times.value = times.value.filter(time => time.start !== item.start || time.end !== item.end);
  } else {
    times.value.push(item);
  }
};

// watch(() => form.value.schedule.duration, () => {
//   times.value = [];
//   periods.value = [];
//   periods.value = [...generateTimes(form.value.schedule.duration)];
//   form.value.schedule.days = []
// }, {deep: true});
</script>

<template>
  <div class="bg-white py-2 mt-3">
    <div class="mt-8">
      <div class="container mx-auto px-4 lg:px-0">
        <Orders :name="layout">
          <div
              v-if="!pending"
              class="mb-5 w-full">
            <div class="mb-5 flex items-center justify-between">
              <p class="text-xl font-bold">
                График работы <span class="text-red-500">*</span>
              </p>
              <select
                  v-model="form.schedule.duration"
                  @change="setDuration"
                  class="p-3 border w-max rounded-lg"
                  name=""
                  id="">
                <option :value="15">
                  15 мин
                </option>
                <option :value="30">
                  30 мин
                </option>
                <option :value="45">
                  45 мин
                </option>
              </select>
            </div>
            <p class="font-medium bg-[#E7F0FF] py-1 px-4 mb-5 rounded">
              Дни приема
            </p>
            <div class="flex flex-row flex-wrap gap-3 mb-5">
              <div
                  v-for="(day, index) of days"
                  :key="index"
                  @click="addDay(day)"
                  :class="{ 'bg-mainColor text-white' : form.schedule.days.some(scheduleDay => scheduleDay.weekday_number === day.value) }"
                  class="w-max px-3 py-2 border text-xs border-[#ECECEC] rounded text-center cursor-pointer transition-all">
                {{ day.title }}
              </div>
            </div>
            <p class="font-medium bg-[#E7F0FF] py-1 px-4 mb-5 rounded">
              Время приема
            </p>
            <div class="flex flex-wrap gap-1 lg:gap-2">
              <p
                  v-for="(item, index) of periods"
                  :key="index"
                  @click="checkTime(item)"
                  :class="{ 'bg-mainColor text-white' : times.some(time => time.start === item.start && time.end === item.end) }"
                  class="cursor-pointer w-third lg:w-fifth transition-all border border-[#ECECEC] rounded text-center py-2 bg-[#F6F6F7] text-[#9A9BA4]">
                {{ item.start }} - {{ item.end }}
              </p>
            </div>
            <div>
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
          <Spinner v-else/>
        </Orders>
      </div>
    </div>
  </div>
</template>