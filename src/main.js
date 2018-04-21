// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)



//全局拦截器，每次请求都加上Authorization
axios.interceptors.request.use(function (config) {
  console.log("============")
  if (sessionStorage.token) {
    config.headers.Authorization = sessionStorage.token;
  }
  return config;
}, function (err) {
  return Promise.reject(err);
});


// //默认导航到登录页
// router.push('/login')

router.beforeEach((to, from, next) => {
  const token = sessionStorage.token;
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


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
