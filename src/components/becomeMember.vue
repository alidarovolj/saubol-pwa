<script setup></script>

<template>
  <div class="container mx-auto px-4 lg:px-0 mt-10 lg:mt-[100px] relative z-20 pb-24">
    <div>
      <div class="flex justify-end">
        <h2 class="text-6xl font-semibold text-mainColor mb-5 hidden lg:block">
          Стать специалистом
        </h2>
      </div>
      <div
          class="flex items-end lg:items-start bg-mainColor relative justify-end rounded-lg lg:rounded-[43px] px-4 lg:px-0 pt-4 lg:pt-0"
          style="box-shadow: 0px 3.624px 2.214px 0px rgba(6, 85, 220, 0.07), 0px 8.892px 5.32px 0px rgba(6, 85, 220, 0.09), 0px 16.955px 10.017px 0px rgba(6, 85, 220, 0.10), 0px 30.201px 17.869px 0px rgba(6, 85, 220, 0.10), 0px 54.343px 33.422px 0px rgba(6, 85, 220, 0.09), 0px 104px 80px 0px rgba(6, 85, 220, 0.07);"
      >
        <div class="w-1/2 lg:w-[30%] mr-2 lg:mr-0">
          <div class="w-full lg:w-[30%] h-full static lg:absolute left-5 bottom-0 flex items-end">
            <img
                src="~/assets/img/member/doctor.png"
                alt="Doctor"
                class="w-full h-full lg:h-auto"/>
          </div>
        </div>
        <div class="w-1/2 lg:w-[60%] py-0 lg:py-14 pr-0 lg:pr-10 pb-4">
          <h2 class="text-sm font-semibold text-white block lg:hidden">
            Стать специалистом
          </h2>
          <p class="text-white text-2xs lg:text-3xl mb-2 lg:mb-7 mt-2 lg:mt-4">
            "Станьте частью нашей медицинской команды! Мы
            приглашаем талантливых врачей, готовых к профессиональному
            росту и совместной работе. Присоединяйтесь к нам для создания инновационных решений в заботе о
            здоровье."
          </p>
          <router-link
              to="/become-member"
              class="w-full lg:w-max block text-sm lg:text-2xl text-mainColor font-medium bg-white py-2 lg:py-3 px-5 lg:px-10 rounded-lg lg:rounded-2xl">
            Присоединится
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>