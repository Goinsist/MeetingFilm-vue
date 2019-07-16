import Vue from 'vue'
import Router from 'vue-router'

const Recommend = () => import('views/Recommend')
const Category = () => import('views/Category')
const Rank = () => import('views/Rank')
const Search = () => import('views/Search')
const User = () => import('views/User')

const Login = () => import('views/Login')
const List = () => import('views/List')
const ErrorPage = () => import('views/Error')
const CinemaDetail = () => import('views/CinemaDetail')
const MovieDetail = () => import('views/MovieDetail')
const HallSeat = () => import('views/hallseat/HallSeat')
const ConfirmOrder = () => import('views/ConfirmOrder')
const MyOrder = () => import('views/MyOrder')
const PaySuccess = () => import('views/PaySuccess')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/user',
      name: 'user',
      component: User

    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: MovieDetail
    },
    {
      path: '/cinemadetail/:cinemaId', // 单个影片详情
      name: 'cinemadetail',
      component: CinemaDetail
    },
    {
      path: '/selectseat',
      name: 'hallSeat',
      component: HallSeat
    },
    {
      path: '/confirmorder',
      name: 'confirmOrder',
      component: ConfirmOrder
    },
    {
      path: '/myorder',
      name: 'myOrder',
      component: MyOrder

    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/list/:type',
      name: 'list',
      component: List
    },
    {
      path: '/paysuccess',
      name: 'paysuccess',
      component: PaySuccess
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorPage
    }
  ]
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/paysuccess' || to.path.indexOf('/cinemadetail') !== -1 || to.path.indexOf('/movie') !== -1 || to.path === '/recommend' || to.path === '/list' || to.path === '/' || to.path === '/category' || to.path === '/rank' || to.path === '/search' || to.path === '/error') {
    next()
  } else {
    let token = localStorage.getItem('Authorization')

    if (token === 'null' || token === '') {
      next('/login')
    } else {
      next()
    }
  }
})
export default router
