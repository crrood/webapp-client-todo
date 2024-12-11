import axios, { type AxiosInstance } from 'axios'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router.ts'
import './styles.css'

import TIinput from './components/TInput.vue'
import TSelect from './components/TSelect.vue'

const app = createApp(App)

// Vuejs router
app.use(router)

// global variables
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_HOST + ":" + import.meta.env.VITE_SERVER_PORT + '/api/',
});
app.provide('axios', axiosInstance);

// dynamic components
// required because the Vue VSCode extension forcibly removes any "unused" imports
app
  .component('TInput', TIinput)
  .component('TSelect', TSelect)

// mount app to index.html
app.mount('#app')
