<script setup>
import Header from "@/components/layout/header.vue";
import {useUserStore} from "@/stores/user.js";
import {onMounted, nextTick} from "vue";
import {storeToRefs} from "pinia";

const user = useUserStore()
const {result} = storeToRefs(user)

onMounted(async () => {
  await nextTick()
  await user.getProfile()
})
</script>

<template>
  <div class="relative h-full">
    <div>
      <Header/>
    </div>
    <div class="relative z-30 pb-20">
      <slot/>
    </div>
<!--    <Footer/>-->
  </div>
</template>

<style scoped>
.fillSvg {
  fill: linear-gradient(90deg, #3979F5 0%, rgba(57, 121, 245, 0.89) 0.03%, rgba(57, 121, 245, 0.81) 0.24%, rgba(57, 121, 245, 0.76) 0.8%, rgba(57, 121, 245, 0.72) 1.9%, rgba(57, 121, 245, 0.69) 3.7%, rgba(57, 121, 245, 0.67) 6.4%, rgba(57, 121, 245, 0.66) 10.16%, rgba(57, 121, 245, 0.64) 15.17%, rgba(57, 121, 245, 0.61) 21.6%, rgba(57, 121, 245, 0.57) 29.63%, rgba(57, 121, 245, 0.51) 39.44%, rgba(57, 121, 245, 0.43) 51.2%, rgba(57, 121, 245, 0.32) 65.1%, rgba(57, 121, 245, 0.18) 81.3%, rgba(57, 121, 245, 0.00) 100%);
  opacity: 0.4;
}
</style>