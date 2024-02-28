<script setup>
import {
  IconArrowRight,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandInstagram
} from "@tabler/icons-vue"
</script>

<template>
  <div class="bg-mainColor pt-24 pb-16">
    <img
        class="absolute left-0 top-0 w-full h-full object-cover"
        src="@/assets/img/footer/footer-with-circle.png"
        alt="">
    <div class="container mx-auto px-4 lg:px-0 relative z-20">
      <div class="block lg:flex items-top justify-between text-white border-b border-bColor pb-10">
        <div class="w-full lg:w-1/4 mb-10 lg:mb-0">
          <p class="text-lg lg:text-xl font-bold mb-6">
            Услуги
          </p>
          <div>
            <router-link
                class="block text-sm lg:text-base opacity-75 mb-2 !text-white"
                to="/"
            >
              Врач
            </router-link>
            <router-link
                class="block text-sm lg:text-base opacity-75 mb-2 !text-white"
                to="/"
            >
              Мед-услуги
            </router-link>
            <router-link
                class="block text-sm lg:text-base opacity-75 mb-2 !text-white"
                to="/"
            >
              Детокс
            </router-link>
            <router-link
                class="block text-sm lg:text-base opacity-75 mb-2 !text-white"
                to="/"
            >
              Анализы
            </router-link>
            <router-link
                class="block text-sm lg:text-base opacity-75 !text-white"
                to="/"
            >
              Аренда инвентаря
            </router-link>
          </div>
        </div>
        <div class="w-full lg:w-1/4 mb-10 lg:mb-0">
          <p class="text-lg lg:text-xl font-bold mb-6">
            Информация
          </p>
          <div>
            <router-link
                class="block text-sm lg:text-base opacity-75 mb-2 !text-white"
                to="/"
            >
              FAQ
            </router-link>
            <router-link
                class="block text-sm lg:text-base opacity-75 mb-2 !text-white"
                to="/"
            >
              Новости
            </router-link>
            <router-link
                class="block text-sm lg:text-base opacity-75 mb-2 !text-white"
                to="/"
            >
              О нас
            </router-link>
          </div>
        </div>
        <div class="w-full lg:w-1/4 mb-10 lg:mb-0">
          <p class="text-lg lg:text-xl font-bold mb-6">
            Контакты
          </p>
          <div>
            <a
                class="block text-sm lg:text-base opacity-75 mb-2 !text-white"
                href="tel:+87777777777"
            >
              +8 (777) 777-77-77
            </a>
            <a
                class="block text-sm lg:text-base opacity-75 mb-2 !text-white"
                href="mailto:saubolmed@gmail.com"
            >
              Saubolmed@gmail.com
            </a>
            <router-link
                class="block text-sm lg:text-base opacity-75 mb-2 !text-white"
                href="/"
            >
              Контакты
            </router-link>
          </div>
        </div>
        <div class="w-full lg:w-1/4 bg-white bg-opacity-10 px-10 py-8 rounded-lg">
          <p class="text-base">
            Подписаться на новости
          </p>
          <div class="flex justify-between my-4">
            <input
                type="text"
                placeholder="Введите почту"
                class="text-sm py-3 px-4 rounded-l-md w-full"
            >
            <button class="rounded-r-md bg-[#478EFF] text-white px-3">
              <IconArrowRight size="16"/>
            </button>
          </div>
          <p class="text-xs">
            SaubolMed предлагает пользователям регулярные обновления и новости от компании, занимающейся медицинскими
            услугами. Подписчики могут ожидать полезных советов, актуальных новостей о здоровье и эксклюзивных
            предложений от
            SaubolMed.
          </p>
        </div>
      </div>
      <div class="block lg:flex items-center justify-center lg:justify-between mt-11">
        <div class="flex items-center gap-2 text-white text-lg">
          <img src="@/assets/img/footer-logo.png" alt="">
        </div>
        <div class="text-white text-sm flex items-center gap-5 my-5 lg:my-0">
          <router-link class="!text-white" to="/">
            Условия
          </router-link>
          <router-link class="!text-white" to="/">
            Конфиденциальность
          </router-link>
          <router-link class="!text-white" to="/">
            Cookies
          </router-link>
        </div>
        <div class="flex gap-4">
          <a href="#">
            <IconBrandLinkedin class="w-9 h-9 p-2 border border-bColor rounded-full text-white"/>
          </a>
          <a href="#">
            <IconBrandFacebook class="w-9 h-9 p-2 border border-bColor rounded-full text-white"/>
          </a>
          <a href="#">
            <IconBrandTwitter class="w-9 h-9 p-2 border border-bColor rounded-full text-white"/>
          </a>
          <a href="#">
            <IconBrandInstagram class="w-9 h-9 p-2 border border-bColor rounded-full text-white"/>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>