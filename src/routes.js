export default [
  {
      path: '/about/',
      component: require('./pages/about.vue')
  },
  {
      path: '/form/',
      component: require('./pages/form.vue')
  },
  {
      path: '/dynamicRoute/blog/:blogId/post/:postId/',
      component: require('./pages/dynamicRoute.vue')
  },
  {
      path: '/search/',
      component: require('./pages/Search.vue')
  },
  {
      path: '/home/',
      component: require('./pages/Home.vue')
  },
  {
      path: '/detail/',
      component: require('./pages/Detail.vue')
  },
  {
      path: '/cart/',
      component: require('./pages/Cart.vue')
  }
]