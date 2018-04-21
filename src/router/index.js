import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/vue/user_model/user_list'
import edit from '@/vue/user_model/user_edit'
import index from '@/vue/index'
import login from '@/vue/login/login'

Vue.use(Router)

const router = {
  mode:'history',
  routes: [
    {//首页
      path: '/index',
      name: 'index',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      },
      component: index,
      children: [
        {
          path: '/',
          component:Home
        },
      ]
    },
    {//测试页面
      path: '/test',
      name: 'test',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      },
      component: index,
      children: [
        {
          path: '/',
          component:login
        }
      ]
    },

    {
      path: '/editUser',
      name: 'edit',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      },
      title:"用户编辑页面",
      component: edit
    },
    {
      path: '/login',
      name: 'login',
      title:"登录页面",
      component: login
    }
  ]
}
const vueRouter = new Router(router);

export default vueRouter;
