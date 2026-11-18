import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles.css'
import {createPinia} from "pinia";
import 'bootstrap/dist/css/bootstrap.min.css'


createApp(App)
    .use(router).use(createPinia())
    .mount('#app')