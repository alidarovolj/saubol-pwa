<script setup>
import {ref, onMounted} from 'vue';

const installPromptEvent = ref(null);

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Предотвратить немедленный запуск всплывающего окна установки
    e.preventDefault();
    // Сохранить событие, чтобы запустить его позже
    installPromptEvent.value = e;
    // Отобразить кнопку установки
    showInstallButton.value = true;
  });
});

const showInstallButton = ref(false);

function installPWA() {
  if (installPromptEvent.value) {
    // Показать всплывающее окно установки
    installPromptEvent.value.prompt();
    installPromptEvent.value.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Пользователь принял установку PWA');
      } else {
        console.log('Пользователь отклонил установку PWA');
      }
      installPromptEvent.value = null;
      showInstallButton.value = false;
    });
  }
}
</script>

<template>
  <div>
    <!-- Отобразить кнопку, если PWA может быть установлено -->
    <button
        v-if="showInstallButton"
        class="text-xs pulse-button text-center fixed bottom-24 right-4 z-[100] bg-blue-500 text-white px-4 py-2 rounded-lg"
        @click="installPWA">
      Установить приложение
    </button>
  </div>
</template>

<style scoped>
.pulse-button {
  box-shadow: 0 0 0 0 rgba(#5a99d4, .5);
  -webkit-animation: pulse 1.5s infinite;
}

.pulse-button:hover {
  -webkit-animation: none;
}

@-webkit-keyframes pulse {
  0% {
    @include transform(scale(.9));
  }
  70% {
    @include transform(scale(1));
    box-shadow: 0 0 0 50px rgba(#5a99d4, 0);
  }
  100% {
    @include transform(scale(.9));
    box-shadow: 0 0 0 0 rgba(#5a99d4, 0);
  }
}
</style>