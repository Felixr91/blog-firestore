import Vue from 'vue'
import Router from 'vue-router'
// import Dashboard from '@/components/Dashboard'
//@ts-ignore
import Register from '../components/Register'
// import Login from '@/components/Login'
//@ts-ignore
import Login from '../components/Login'
//@ts-ignore
import Dashboard from '../components/Dashboard'
//@ts-ignore
import Blog from '../components/Blog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/blogs/:blogId',
      name: 'Blog',
      component: Blog
    }
  ]
})
