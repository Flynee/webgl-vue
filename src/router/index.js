import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/BVH_Raycast',
    name: 'Index',
    component: ()=> import('../views/BVH_Raycast')
  },
  {
    path: '/Home',
    name: 'Home',
    component: ()=> import('../views/Home')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
