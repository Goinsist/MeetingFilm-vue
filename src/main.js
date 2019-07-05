import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'common/js/axios'
import globalComponents from 'common/js/components'
import VueLazyload from 'vue-lazyload'
import Mint from 'mint-ui'
import 'common/styles/reset.styl'
import 'mint-ui/lib/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper' // 轮播

import 'amfe-flexible'
// require styles

import 'swiper/dist/css/swiper.css'
import vueAwesomeCountdown from 'vue-awesome-countdown'
import { Card, Tag, Panel, Cell, CellGroup, SubmitBar, Dialog, Image, NavBar, NoticeBar, Icon } from 'vant'
import 'vant/lib/index.css'
import './assets/icon/index.css'
Vue.use(Icon)

Vue.use(NoticeBar)
Vue.use(NavBar)
Vue.use(Image)
// 全局注册
Vue.use(Dialog)

Vue.use(Cell).use(CellGroup)

Vue.use(SubmitBar)

Vue.use(Panel)

Vue.use(Tag)
Vue.use(Card)
Vue.use(vueAwesomeCountdown, 'vac')

var VueTouch = require('vue-touch')
Vue.use(VueTouch, { name: 'v-touch' })
Vue.use(Mint)
Vue.use(axios)
Vue.use(globalComponents) // 初始化全局组件
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload, {
  loading: require('common/images/loading.png')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
