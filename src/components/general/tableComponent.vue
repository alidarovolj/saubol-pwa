<script>
import {IconChevronDown} from "@tabler/icons-vue";
import NewPagination from "@/components/general/newPagination.vue";

export default {
  name: "TableComponent",
  components: {
    IconChevronDown,
    NewPagination
  },
  props: {
    colorBG: {
      type: String,
      required: false
    },
    prefix: {
      type: String,
      required: false
    },
    pagination: {
      type: Object,
      required: false
    },
    columns: {
      type: Array,
      required: false
    },
    source: {
      type: [Object, null],
      required: false
    },
    spinner: {
      type: Boolean,
      default: false
    },
    linked: {
      type: Boolean,
      default: false
    }
  },
  emits: ["refreshTable"],
  data() {
    return {
      openedTab: []
    };
  },
  mounted() {
    document.addEventListener("click", this.handleOutsideClick);
    if (this.source?.data) {
      this.openedTab = this.source.data.map(() => false);
    } else {
      this.openedTab = this.source.map(() => false);
    }
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
  methods: {
    getValFrom: (row, column) =>
        column.fname.split(".").reduce((prev, curr) => {
          if ([null, undefined].includes(prev)) return;
          return prev[curr];
        }, row),
    navigateLink() {
      this.$emit("refreshTable");
    },
    openTab(key) {
      this.openedTab = this.openedTab.map((value, i) =>
          i === key ? !value : false
      );
    },
    handleOutsideClick(event) {
      this.openedTab.forEach((el) => {
        if (el && !this.$el.contains(event.target)) {
          el = false;
        }
      });
    }
  }
};
</script>

<template>
  <div v-if="source">
    <div
        v-if="source.data"
        class="rounded-lg overflow-x-auto"
    >
      <table
          :class="[{ 'pe-none': spinner }]"
          class="hidden lg:block custom-table dark:border-darkElBg text-black dark:text-darkText min-w-full bg-white dark:bg-darkElBg text-sm"
      >
        <div
            v-if="spinner"
            class="position-absolute d-flex align-items-baseline h-100 w-100 top-0 bg-white bg-opacity-50"
            style="z-index: 2"
        >
          <div class="position-sticky top-50 start-50 translate-middle">
            <span class="spinner-border text-primary"/>
          </div>
        </div>
        <thead
            :class="{ 'top-0': !source?.hasOwnProperty('total') }"
            class="position-sticky text-left"
        >
        <tr class="">
          <th
              v-for="(column, key) in columns"
              :key="key"
              class="py-2 lg:py-3 px-3 font-bold !text-[#9A9BA4] dark:text-darkText text-sm whitespace-nowrap"
          >
            {{ column.name }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="!spinner && !source?.data.length">
          <td
              :colspan="columns.length"
              class="text-center py-4 font-medium"
          >
            Нет данных
          </td>
        </tr>
        <template v-else>
          <tr
              v-for="(row, key) in source?.data"
              :key="key"
              :class="{'bg-[#ECEDFF]': key % 2 === 0}"
              class="whitespace-nowrap lg:whitespace-normal text-sm font-medium !rounded-lg"
          >
            <td
                v-for="(column, index) in columns"
                :key="index"
                :class="[column.tdClass, { 'position-relative': linked }]"
                :data-column-name="column.name"
                class="py-2 lg:py-5 px-3 border-gray-300 dark:border-gray-600"
            >
              <slot
                  :column="column"
                  :index="key"
                  :row="row"
                  :valFrom="getValFrom"
              >
                {{ getValFrom(row, column, index) }}
              </slot>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
      <div
          :class="{ 'pe-none': spinner }"
          class="block lg:hidden text-[#757575] dark:text-darkText dark:bg-darkElBg text-xs"
      >
        <div
            v-if="spinner"
            class="position-absolute d-flex align-items-baseline h-100 w-100 top-0 bg-white bg-opacity-50"
            style="z-index: 2"
        >
          <div class="position-sticky top-50 start-50 translate-middle">
            <span class="spinner-border text-primary"/>
          </div>
        </div>
        <div>
          <div v-if="!spinner && !source?.data.length">
            <div
                :colspan="columns.length"
                class="text-center py-4 font-medium"
            >
              Нет данных
            </div>
          </div>
          <template v-else>
            <div>
              <div
                  v-for="(row, key) in source?.data"
                  :key="key"
                  :class="{ '!h-full !text-clip': openedTab[key] }"
                  class="text-xs h-48 border-b py-3 pb-10 truncate relative"
              >
                <div
                    class="absolute w-full bottom-0 py-2 text-center bg-gray-50 dark:bg-darkInp"
                    @click="openTab(key)"
                >
                  <IconChevronDown :class="{ 'rotate-180': openedTab[key] }"/>
                </div>
                <div>
                  <div
                      v-for="(column, index) in columns"
                      :key="index"
                      :class="[column.tdClass, { 'position-relative': linked }]"
                      :data-column-name="column.name"
                      class="py-2 lg:py-3 px-3 text-xs border-gray-300 dark:border-gray-600 text-left"
                  >
                    <p class="font-semibold text-xs mb-1">
                      {{ column.name }}
                    </p>
                    <slot
                        :column="column"
                        :index="key"
                        :row="row"
                        :valFrom="getValFrom"
                    >
                      {{ getValFrom(row, column, index) }}
                    </slot>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div
        v-else
        class="rounded-lg"
    >
      <table
          :class="[{ 'pe-none': spinner }, { 'archiveTable' : $route.name === 'ArchiveGroups' }]"
          class="hidden lg:block custom-table dark:border-darkElBg text-black dark:text-darkText min-w-full bg-white dark:bg-darkElBg text-sm overflow-x-auto"
      >
        <div
            v-if="spinner"
            class="position-absolute d-flex align-items-baseline h-100 w-100 top-0 bg-white bg-opacity-50"
            style="z-index: 2"
        >
          <div class="position-sticky top-50 start-50 translate-middle">
            <span class="spinner-border text-primary"/>
          </div>
        </div>
        <thead
            :class="{ 'top-0': !source?.hasOwnProperty('total') }"
            class="position-sticky text-left dark:bg-darkInp"
        >
        <tr class="">
          <th
              v-for="(column, key) in columns"
              :key="key"
              class="py-2 lg:py-3 px-3 font-bold text-[#9A9BA4] dark:text-darkText text-sm whitespace-nowrap"
          >
            {{ column.name }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="!spinner && !source?.length">
          <td
              :colspan="columns.length"
              class="text-center py-4 font-medium"
          >
            Нет данных
          </td>
        </tr>
        <template v-else>
          <tr
              v-for="(row, key) in source"
              :key="key"
              :class="{'bg-[#ECEDFF]': key % 2 === 0}"
              class="whitespace-nowrap lg:whitespace-normal text-sm font-medium !rounded-lg"
          >
            <td
                v-for="(column, index) in columns"
                :key="index"
                :class="[column.tdClass, { 'position-relative': linked }, {'rounded-l-lg': index === 0}, {'rounded-r-lg': columns.length === index + 1}]"
                :data-column-name="column.name"
                class="py-2 lg:py-3 px-3  border-gray-300 dark:border-gray-600"
            >
              <slot
                  :column="column"
                  :index="key"
                  :row="row"
                  :valFrom="getValFrom"
              >
                {{ getValFrom(row, column, index) }}
              </slot>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
      <div
          :class="{ 'pe-none': spinner }"
          class="block lg:hidden text-[#757575] dark:text-darkText dark:bg-darkElBg text-xs"
      >
        <div
            v-if="spinner"
            class="position-absolute d-flex align-items-baseline h-100 w-100 top-0 bg-white bg-opacity-50"
            style="z-index: 2"
        >
          <div class="position-sticky top-50 start-50 translate-middle">
            <span class="spinner-border text-primary"/>
          </div>
        </div>
        <div>
          <div v-if="!spinner && !source?.length">
            <div
                :colspan="columns.length"
                class="text-center py-4 font-medium"
            >
              Нет данных
            </div>
          </div>
          <template v-else>
            <div class="">
              <div
                  v-for="(row, key) in source"
                  :key="key"
                  :class="{ '!h-full !text-clip': openedTab[key] }"
                  class="text-xs h-48 border-b py-3 pb-10 truncate relative"
              >
                <div
                    class="absolute w-full bottom-0 py-2 text-center bg-gray-50 dark:bg-darkInp"
                    @click="openTab(key)"
                >
                  <IconChevronDown
                      :class="{ 'rotate-180': openedTab[key] }"
                      :icon="['fas', 'chevron-down']"
                  />
                </div>
                <div>
                  <div
                      v-for="(column, index) in columns"
                      :key="index"
                      :class="[column.tdClass, { 'position-relative': linked }]"
                      :data-column-name="column.name"
                      class="py-2 lg:py-3 px-3 text-xs border-gray-300 dark:border-gray-600 text-left"
                  >
                    <p class="font-semibold text-xs mb-1">
                      {{ column.name }}
                    </p>
                    <slot
                        :column="column"
                        :index="key"
                        :row="row"
                        :valFrom="getValFrom"
                    >
                      {{ getValFrom(row, column, index) }}
                    </slot>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div
        v-if="pagination && typeof pagination !== 'undefined'"
        class="block mt-4"
    >
      <NewPagination
          :pagesData="pagination"
          @navigate="navigateLink"
      />
    </div>
  </div>
</template>

<style scoped>
table {
  table-layout: fixed;
  width: 100%;
}

td {
  width: 5%;
}
</style>
