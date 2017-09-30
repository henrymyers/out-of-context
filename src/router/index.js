import Vue from 'vue'
import Router from 'vue-router'
import Slideshow from '@/components/Slideshow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Slideshow',
      component: Slideshow
    }
  ]
})
