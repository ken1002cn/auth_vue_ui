import { createRouter, createWebHashHistory } from 'vue-router'
import Carousel from '@/views/Carousel .vue'
import User from '@/views/User.vue'
import Travel from '@/views/Travel.vue'
import Register from '@/views/Register.vue'
import TrabelDetail from '@/views/TravelDetailed.vue'
import IntelligentSearch from '@/views/IntelligentSearch.vue'
const routes  = [
  {
    path: '/',
    name: 'home',
    component: () => import('../layout/index.vue'),
    children: [
      {
        path: '', // 默认显示首页
        name: 'main',
        component: Carousel
      },

      {
        path: 'user',
        name: 'user',
        component: User
      },

      {
        path: 'travel',
        name: 'travel',
        component: Travel
      },

      {
        path: 'travel/detail/:id',
        name: 'travelDetail',
        component: TrabelDetail
      },

      {
        path: 'travel/search',
        name: 'intelligentSearch',
        component: IntelligentSearch
      },
    ]
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes 
})

export default router
