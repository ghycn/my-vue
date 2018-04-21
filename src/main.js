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



//添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  console.log("============")
  if (sessionStorage.token) {
    config.headers.Authorization = sessionStorage.token;
  }
  return config;
}, function (err) {
  return Promise.reject(err);
});

//添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  console.log("++++++++++++")
  console.log(response)
  if(response.status=='401'){
    router.replace({
      path: '/login',
      query: {redirect: router.currentRoute.fullPath}
    })
  }
  return response;
}, function (error) {
  // Do something with response error
  console.log("++++++++++++")
  console.log(error)
  if(error.response.status==401){//认证失败，自动跳转登录页面
    router.replace({
      path: '/login',
      query: {redirect: router.currentRoute.fullPath}
    })
  }
  return Promise.reject(error);
});





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
