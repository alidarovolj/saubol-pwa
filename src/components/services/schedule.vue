<script setup>
import {IconChevronRight, IconChevronLeft} from "@tabler/icons-vue";

let now = ref(new Date());
let month = ref(now.value.getMonth());
let year = ref(now.value.getFullYear());

const staff = useStaffStore()
const {resultDetail} = storeToRefs(staff);

const incrementMonth = () => {
  if (month.value === 11) {
    month.value = 0;
    year.value++;
  } else {
    month.value++;
  }
};

const decrementMonth = () => {
  if (month.value === 0) {
    month.value = 11;
    year.value--;
  } else {
    month.value--;
  }
};

const getFirstDayOfWeek = (date) => {
  const dayOfWeek = date.getDay();
  const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

const getLastDayOfWeek = (date) => {
  const firstDay = getFirstDayOfWeek(date);
  return new Date(firstDay.setDate(firstDay.getDate() + 6));
};

const daysInCurrentMonth = computed(() => {
  const startDate = getFirstDayOfWeek(new Date(year.value, month.value, 1));
  const endDate = getLastDayOfWeek(new Date(year.value, month.value + 1, 0));
  const days = [];
  for (let dt = new Date(startDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
    const day = {
      day: dt.getDate().toString().padStart(2, '0'),
      month: dt.getMonth(),
      year: dt.getFullYear(),
      dayOfWeek: dt.getDay(),
      schedule: []
    };

    const scheduleItem = resultDetail.value.schedule.find(item => item.day === `${day.year}-${day.month + 1}-${day.day}`);
    if (scheduleItem) {
      day.schedule.push(scheduleItem);
    }

    days.push(day);
  }
  return days;
});

const dayLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
</script>

<template>
  <div>
    <div class="bg-[#235CEE40] px-4 py-5 rounded-t-lg">
      <p class="text-mainColor text-xl font-semibold">
        График работы
      </p>
    </div>
    <div
        style="box-shadow: 0px 3px 10px 0px #0000000D;"
        class="flex flex-col items-center space-y-4 bg-white rounded-b-lg">
      <div class="px-4 py-5">
        <div class="flex justify-between items-center w-full mb-4">
          <p class="font-bold">
            {{ month }} / {{ year }}
          </p>
          <div class="flex gap-4">
            <button
                @click="decrementMonth"
                class="p-2 bg-[#E7F0FF] text-mainColor rounded hover:bg-mainColor hover:text-white transition-all">
              <IconChevronLeft size="15"/>
            </button>
            <button
                @click="incrementMonth"
                class="p-2 bg-[#E7F0FF] text-mainColor rounded hover:bg-mainColor hover:text-white transition-all">
              <IconChevronRight size="15"/>
            </button>
          </div>
        </div>
        <div class="flex justify-between w-full">
          <div v-for="(label, index) in dayLabels" :key="index"
               class="w-[14%] flex items-center justify-center">
            {{ label }}
          </div>
        </div>
        <div class="flex flex-wrap justify-between">
          <div
              v-for="(day, index) in daysInCurrentMonth"
              :key="index"
              class="w-[14%] flex items-center justify-center border-b border-mainColor my-1 hover:bg-mainColor hover:text-white cursor-pointer hover:rounded-t transition-all">
            {{ day.day }}
            <div v-if="day.schedule.length > 0">
              <div v-for="(item, itemIndex) in day.schedule" :key="itemIndex">
                <p class="w-full bg-[#E7F0FF] text-mainColor px-4 py-1">
                  Day: {{ item.day }}
                </p>
                <div class="flex flex-wrap gap-3 px-4 py-5 pt-0">
                  <p
                      v-for="(time, timeIndex) in item.times"
                      :key="timeIndex"
                      class="bg-[#E7F0FF] text-mainColor px-4 py-1 rounded-lg cursor-pointer hover:bg-mainColor hover:text-white transition-all"
                  >
                    {{ time.start }} - {{ time.end }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>