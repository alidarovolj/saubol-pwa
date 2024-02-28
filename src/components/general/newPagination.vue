<script>
export default {
  name: "PaginationComponent",
  props: {
    pagesData: {
      type: Object,
      required: false,
    },
  },
  emits: ['navigate'],
  computed: {
    filterLinks() {
      const newArray = [...this.pagesData.links];
      newArray[0].label = "<";
      newArray[newArray.length - 1].label = ">";
      return newArray;
    },
  },
  methods: {
    async navigate(item) {
      try {
        const currentPage = this.pagesData.current_page;
        const lastPage = this.pagesData.last_page;
        let newPage;

        if (item === "<" && currentPage !== 1) {
          newPage = currentPage - 1;
        } else if (item === ">" && currentPage !== lastPage) {
          newPage = currentPage + 1;
        } else if (item !== "..." && item !== '<' && item !== '>') {
          newPage = item;
        }

        if (newPage !== undefined) {
          await this.$router.push({
            query: {
              ...this.$route.query,
              page: newPage,
              perPage: this.$route.query.perPage,
            },
          });
        }

        this.$emit("navigate");
      } catch (error) {
        console.error("Ошибка при навигации по маршруту:", error.response);
      }
    }
  },
};
</script>


<template>
  <div class="flex items-center justify-between lg:justify-end  overflow-x-auto">
    <p
        v-for="(page, item) of filterLinks"
        :key="item"
        :class="{
        'bg-secondaryColor bg-[#3E46FF] text-white': page.active,
      }"
        class="mx-2 lg:mx-1 text-black dark:bg-darkElBg px-2 lg:px-4 py-1 lg:py-2  rounded-full dark:text-darkText hover:bg-secondaryColor cursor-pointer"
        @click="navigate(page.label)"
    >
      {{ page.label }}
    </p>
  </div>
</template>
