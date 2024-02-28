<script setup>
import { defineProps, computed, watch } from 'vue';

const props = defineProps(["links"])
const computedLinks = computed(() => props.links);

watch(computedLinks, (newLinks, oldLinks) => {
  console.log('Links updated', newLinks);
}, {deep: true});
</script>

<template>
  <div class="text-sm breadcrumbs dark:text-dText">
    <ul>
      <li v-for="(item, index) of props.links" :key="index">
        <router-link
            class="uppercase text-xs text-inner_head dark:text-dText"
            :to="item.link">
          {{ item.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
html.dark .breadcrumbs > ul > li + *:before,
html.dark .breadcrumbs > ol > li + *:before {
  color: #fff;
}
</style>