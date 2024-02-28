<script setup>
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Navigation, Slide} from "vue3-carousel";
import {IconArrowRight, IconChevronRight} from "@tabler/icons-vue";
import {useNewsStore} from "~/store/news.js";

const news = useNewsStore()
const {result} = storeToRefs(news)

const settings = {
  itemsToShow: 1,
  snapAlign: 'center',
};

const breakpoints = {
  700: {
    itemsToShow: 3,
    snapAlign: 'center',
  },
  1024: {
    itemsToShow: 3,
    snapAlign: 'start',
  },
};

onMounted(async () => {
  await nextTick()
  await news.newsList()
})
</script>

<template>
  <section class="mb-28 relative z-20">
    <div class="container mx-auto px-4 lg:px-0">
      <div class="flex items-center justify-between text-mainColor">
        <h2 class="text-3xl font-bold">
          Новости
        </h2>
        <router-link
            to="/news"
            class="flex items-center bg-white p-3 rounded-lg shadow">
          <p class="text-mainColor font-semibold">
            Все новости
          </p>
          <IconChevronRight class="w-max ml-2" size="20"/>
        </router-link>
      </div>
      <div v-if="result">
        <div class="hidden lg:block">
          <client-only>
            <Carousel
                :breakpoints="breakpoints"
                :itemsToShow="settings.itemsToShow"
                class="mt-9 py-0">
              <Slide
                  v-for="(item, index) in result.data"
                  :key="index"
                  class=""
              >
                <nuxt-link
                    :to="'/news/' + item.slug"
                    class="flex flex-col justify-between w-[95%] text-base hover:shadow-custom transition-all rounded-lg p-4 !text-black shrink-0 bg-white shadow-lg border-negative-300 snap-center"
                >
                  <div>
                    <img
                        :src="item.img"
                        alt=""
                        class="block w-full h-36 object-cover rounded-lg mb-2"
                    >
                    <div class="flex items-center justify-between font-semibold mb-2">
                      <p>
                        {{ item.name }}
                      </p>
                      <IconArrowRight
                          class="w-max mr-0"
                          size="20"
                      />
                    </div>
                    <p class="text-sm text-start line-clamp-4 mb-2 h-20 max-h-20">
                      {{ item.content.slice(0, 100) }}...
                    </p>
                  </div>
                  <p class="text-sm text-start !text-[#9A9BA4]">
                    {{ item.created_at }}
                  </p>
                </nuxt-link>
              </Slide>
              <template #addons>
                <Navigation/>
              </template>
            </Carousel>
          </client-only>
        </div>
        <div class="block lg:hidden">
          <div class="mt-9 py-0 flex overflow-x-auto">
            <nuxt-link
                v-for="(item, index) in result.data"
                :key="index"
                to="/"
                class="text-base w-full mr-4 hover:shadow-custom transition-all rounded-lg p-4 !text-black shrink-0 bg-white shadow-lg border-negative-300 snap-center"
            >
              <img
                  :src="item.img"
                  alt=""
                  class="w-full h-36 object-cover rounded-lg"
              >
              <div class="flex items-center justify-between font-semibold my-2">
                <p>
                  {{ item.title }}
                </p>
                <IconArrowRight
                    class="w-max mr-0"
                    size="20"
                />
              </div>
              <p class="text-sm text-start line-clamp-4 mb-2">
                {{ item.content }}
              </p>
              <p class="text-sm text-start !text-[#9A9BA4]">
                {{ item.created_at }}
              </p>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
@media only screen and (min-width: 1024px) {
  .carousel__track {
    justify-content: space-between;
  }

  .carousel__prev {
    left: -24px;
    transform: translateX(-100%);
  }

  .carousel__next {
    right: -24px;
    transform: translateX(100%);
  }

  .carousel__prev,
  .carousel__next {
    background: #3e46ff;
    color: #fff;
    top: 50%;
    border-radius: 100%;
    width: 36px;
    height: 36px;
  }

  .carousel__prev:hover,
  .carousel__next:hover {
    color: #fff;
  }
}
</style>
