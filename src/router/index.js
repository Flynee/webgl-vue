import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RayCaster from '../views/RayCaster.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/RayCaster',
    name: 'RayCaster',
    component: RayCaster
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
