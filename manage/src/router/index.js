import Vue from 'vue'
import VueRouter from 'vue-router'
// /* webpackChunkName: "Cate_Params" */ 路由分组，相同会打包在一起，请求时一起请求

// ?????????????import Router from 'vue-router'
const Home = () => import(/* webpackChunkName: "home-login-welcome" */ '../components/Home.vue')
const Login = () => import(/* webpackChunkName: "home-login-welcome" */ '../components/Login.vue')
const Welcome = () => import(/* webpackChunkName: "home-login-welcome" */ '../components/Welcome.vue')

const Users = () => import(/* webpackChunkName: "users-rights-roles" */ '../components/user/Users.vue')
const Rights = () => import(/* webpackChunkName: "users-rights-roles" */ '../components/power/Rights.vue')
const Roles = () => import(/* webpackChunkName: "users-rights-roles" */ '../components/power/Roles.vue')

const Cate = () => import(/* webpackChunkName: "cate-params" */ '../components/goods/Cate.vue')
const Params = () => import(/* webpackChunkName: "cate-params" */ '../components/goods/Params.vue')

const GoodsList = () => import(/* webpackChunkName: "goodsList_add" */ '../components/goods/List.vue')
const Add = () => import(/* webpackChunkName: "goodsList_add" */ '../components/goods/Add.vue')

const Order = () => import(/* webpackChunkName: "order-report" */ '../components/order/Order.vue')
const Report = () => import(/* webpackChunkName: "order-report" */ '../components/report/Report.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/categories', component: Cate },
        { path: '/params', component: Params },
        { path: '/goods', component: GoodsList },
        { path: '/goods/add', component: Add },
        { path: '/orders', component: Order },
        { path: '/reports', component: Report }
      ]
    }
  ]
})

// 添加路由守卫
// 如果用户没有登录，不能访问/home,如果用户通过url地址直接访问，则强制跳转到登录页面
router.beforeEach((to, from, next) => {
  // to 将要访问的路径// from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  // 如果用户访问的登录页，直接放行
  if (to.path === '/login') return next()
  // 从 sessonstorage中获取到保存的 token值
  const tokenStr = window.sessionStorage.getItem('token')
  // 没 有 token,强制跳转到登录页
  if (!tokenStr) return next('./login')
  next()
})

export default router
