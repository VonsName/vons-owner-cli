import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Global from '../components/Global'

//将全局变量挂载到vue的原型链上
Vue.prototype.GLOBAL=Global;
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/success',
      name: 'Index',
      component: Index
    }
  ]
})
