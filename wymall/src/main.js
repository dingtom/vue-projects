import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import Vant from 'vant';
import 'vant/lib/index.css';
import api from '@/assets/config/api.js'
// 引入了vue、app、store、router，当然我们也可以在此引入更多的东西或做一些全局的处理工作。
Vue.use(Vant);

Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')


new Vue({
  router,
  store,
  render: h => h(App),
  data:{
    api:api
  }
}).$mount('#app')
