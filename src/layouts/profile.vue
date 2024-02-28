<script setup lang="ts">
import {IconExclamationMark} from "@tabler/icons-vue";
import Spinner from "@/components/general/spinner.vue";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia";
import {ref, computed, onMounted} from "vue";
import VerifyNumber from "@/components/modals/verifyNumber.vue";

const user = useUserStore()
const {result} = storeToRefs(user)

const loading = ref(false)

const pending = ref(true)

const editMode = ref(false)

const logoutLocal = async () => {
  await user.logoutProfile()
  router.push('/')
  await user.getProfile()
}

onMounted(async () => {
  await user.getProfile()
  if (result.value === false) {
    router.push('/')
  }
  pending.value = false
})
</script>

<template>
  <div class="block lg:flex justify-between gap-6">
    <div class="w-full">
      <div v-if="result">
        <div
            v-if="result.data.phone_number && !result.data.is_phone_verified"
            style="box-shadow: 0px 4px 20px 0px #0000001A;"
            class="text-sm flex items-center gap-3 bg-white p-3 rounded-lg mb-5 w-full">
          <div class="bg-red-500 rounded-full p-1 text-white w-14 h-14 flex items-center justify-center ">
            <IconExclamationMark size="40"/>
          </div>
          <div>
            <p class="mb-2">
              Необходимо верифицировать номер
            </p>
            <button
                onclick="verificationModal.showModal()"
                class="bg-mainColor text-white rounded-lg px-10 py-2">
              Отправить код
            </button>
          </div>
        </div>
        <form class="block lg:flex justify-between w-full gap-5">
          <div
              style="box-shadow: 0px 4px 20px 0px #0000001A;"
              class="flex mb-4 items-center bg-white w-full gap-3 h-full p-5 rounded-lg">
            <div
                v-if="result.data.img"
                class="relative h-full"
            >
              <img
                  :src="result.data.img"
                  class="min-w-28 w-28 min-h-28 h-28 rounded-full object-cover mx-auto"
                  alt=""
              >
            </div>
            <div
                v-else
                class="relative h-full"
            >
              <img
                  class="min-w-28 w-28 min-h-28 h-28 rounded-full object-cover mx-auto"
                  src="@/assets/img/services/male_doctor.png"
                  alt="">
            </div>
            <div>
              <h1 class="text-sm font-bold mb-3">
                {{ result.data.name }}
              </h1>
              <p class="text-xs font-semibold text-mainColor px-5 py-1 rounded bg-[#E7F0FF] w-max">
                {{ result.data.staff.specialization.name }}
              </p>
            </div>
          </div>
        </form>
        <div>
          <slot/>
        </div>
        <VerifyNumber :numPhone="result.data.phone_number"/>
      </div>
      <div v-else class="bg-white px-5 py-6 rounded-lg">
        <Spinner/>
      </div>
    </div>
  </div>
</template>