import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import { createPinia, defineStore } from 'pinia'

export default mitt();
createApp(App).use(createPinia()).mount('#app')
