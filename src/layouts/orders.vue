<script setup lang="ts">
import Spinner from "@/components/general/spinner.vue";
import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia";
import {ref, onMounted} from "vue";

const user = useUserStore()
const {result} = storeToRefs(user)

const pending = ref(true)

const editMode = ref(false)

onMounted(async () => {
  await user.getProfile()
  if (result.value === false) {
    router.push('/')
    pending.value = false
  }
  pending.value = false
})
</script>

<template>
  <div class="block lg:flex justify-between gap-6 h-screen overflow-y-auto">
    <div class="w-full lg:w-4/5">
      <div v-if="!pending">
        <div>
          <slot/>
        </div>
      </div>
      <div v-else class="bg-white px-5 py-6 rounded-lg">
        <Spinner/>
      </div>
    </div>
  </div>
</template>