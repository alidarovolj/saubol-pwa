<script setup>
const route = useRoute()
const router = useRouter()
const props = defineProps({
  meta: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['navigate'])

const perPage = ref(route.query.perPage || 10)
const page = ref(route.query.page || 1)

watch(perPage, async (newPerPage) => {
  await router.push({ query: { ...route.query, perPage: newPerPage, page: page.value } })
  emit('navigate')
})

const links = computed(() => props.meta.links.map(link => {
  if (link.label.includes('Previous')) {
    return { ...link, label: '«' }
  } else if (link.label.includes('Next')) {
    return { ...link, label: '»' }
  }
  return link
}))
</script>

<template>
  <nav class="relative z-20 flex justify-between">
    <select v-model="perPage" class="rounded-md p-2 shadow">
      <option :value="10">10</option>
      <option :value="20">20</option>
      <option :value="30">30</option>
      <option :value="40">40</option>
      <option :value="50">50</option>
    </select>
    <ul class="pagination flex gap-3 bg-white w-max p-2 rounded-md shadow">
      <li v-for="(link, index) in links" :key="index" :class="{ active: link.active }">
        <router-link :to="{ path: route.path, query: { ...route.query, page: link.label, perPage: perPage.value } }"
                  v-if="link.url" @click="() => emit('navigate', link.url)">
          <span v-html="link.label"></span>
        </router-link>
        <button :disabled="!link.url" v-else>
          <span v-html="link.label"></span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.active {
  /* Add your active button styles here */
}
</style>