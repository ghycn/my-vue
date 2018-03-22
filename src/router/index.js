import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/vue/user_model/user_list'
import edit from '@/vue/user_model/user_edit'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {//首页
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/editUser',
      name: 'edit',
      component: edit
    }
  ]
})
