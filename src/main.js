import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/icon/iconfont.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import api from './utils/urlconfig'
const app = createApp(App);
app.config.globalProperties.$api=api;
app.use(store).use(router).use(ElementPlus).use(VueAxios, axios).mount('#app')
