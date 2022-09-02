import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav/index.vue'
import '@/mock/mock'
import elementUI from 'element-plus'
createApp(App).use(store).use(router).use(elementUI).component('TypeNav',TypeNav).mount('#app')
