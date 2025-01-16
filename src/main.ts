import { createApp } from 'vue'

import App from './App.vue'
import router from './router.ts'
import './styles.css'

import TCheckbox from './components/TodoListEntry/TCheckbox.vue'
import TDatePicker from './components/TodoListEntry/TDatePicker.vue'
import TIinput from './components/TodoListEntry/TInput.vue'
import TSelect from './components/TodoListEntry/TSelect.vue'

const app = createApp(App)

// Vuejs router
app.use(router)

// dynamic components
// required because the Vue VSCode extension forcibly removes any "unused" imports
app
  .component('TInput', TIinput)
  .component('TSelect', TSelect)
  .component('TCheckbox', TCheckbox)
  .component('TDatePicker', TDatePicker)

// mount app to index.html
app.mount('#app')
