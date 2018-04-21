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
    {//默认跳转
      path: '/',
      redirect: '/index'
    },
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


//钩子函数，对路由进行判断
vueRouter.beforeEach((to, from, next) => {
  const token = sessionStorage.token;
  if (to.matched.length ===0) {
    next({
      path: '/',
    })
  }
  if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
    if (token) {  // 判断当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});

// console.log(vueRouter)
export default vueRouter;
