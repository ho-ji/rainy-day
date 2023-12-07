import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../pages/Home'

export default createRouter({
  history: createWebHashHistory(),

  routes: [
    {
      path: '/',
      name: Home,
      component: Home,
    },
  ],
})
