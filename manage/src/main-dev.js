/*
 * @Author: your name
 * @Date: 2021-08-23 18:27:06
 * @LastEditTime: 2021-08-23 21:16:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \manage\src\main-dev.js
 */
// 开发环境导入了element.js quill和nprogress的样式
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import axios from 'axios'

import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 刷新网页的进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 配置请求的跟路径
axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'
// axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'
// 'http://127.0.0.1:8888/api/private/v1/'
// 需要授权的API,必须在请求头中使用 Authorization字段提供 token令牌
// 通过 axios请求拦截器添加 token,对请求进行预处理，保证拥有获取数据的权限。
axios.interceptors.request.use(config => {
  // 在 request 拦截器中，展示进度条 NProgress.start()
  NProgress.start()
  // config请求对象  headers请求头  为请求头对象添加 Token验证的 Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后必须return 固定写法
  return config
})
axios.interceptors.response.use(config => {
  // 在 response 拦截器中，隐藏进度条 NProgress.done()
  NProgress.done()
  return config
})

// 把axios挂载到vue原型对象上，每个vue组件都可以通过this访问$http从而发起axios请求
Vue.prototype.$http = axios

Vue.component('tree-table', TreeTable)
// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)

// 阻止启动生产消息
Vue.config.productionTip = false

Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDay() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
