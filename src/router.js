import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './components/LandingPage.vue'
import TodoDetail from './components/TodoDetail.vue'
import TodoList from './components/TodoList.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/todo/:id',
    name: 'Todo',
    component: TodoDetail
  },
  {
    path: '/todo',
    name: 'TodoList',
    component: TodoList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
