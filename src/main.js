import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { IonicVue } from '@ionic/vue';

import App from './App.vue'
import router from './router'

import '@/assets/css/style.css'
import '@/assets/css/fonts.css'

import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(IonicVue);

app.mount('#app')
