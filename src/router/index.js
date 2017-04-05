import Vue from 'vue'
import Router from 'vue-router'
import App from '@/components/App'
import Index from '@/components/Index'
import About from '@/pages/About'
import Form from '@/pages/Form'
import DynamicRoute from '@/pages/DynamicRoute'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/form',
      name: 'Form',
      component: Form
    },
    {
      path: '/dynamicRoute/blog/:blogId/post/:postId/',
      name: 'DynamicRoute',
      component:DynamicRoute 
    }
  ]
})
