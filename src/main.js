import Vue from 'vue'
import App from './App.vue'
// 导包
import VueRouter from 'vue-router'
//Carousel组件导包
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
//引入组件
import Slider from './components/Slider.vue'
import SongList from './components/SongList.vue'
import PlayMusic from './components/Player.vue'
import Video from './components/Video.vue'
import Comment from './components/Comment.vue'
Vue.config.productionTip = false

//把axios设置给Vue原型 方便其他地址使用 Vue.$axios
Vue.prototype.$axios = axios
//设置基本域
axios.defaults.baseURL = 'https://autumnfish.cn'

// 用包
Vue.use(VueRouter)
Vue.use(ElementUI)

//创建路由规则
const routes = [
  {
    //路由重定向: 默认是'/'  指定默认主页为'/slider'
    path: '/',
    redirect: '/slider'
  },
  {
    path: '/slider',
    component: Slider
  },
  {
    path: '/search/:keywords',
    component: SongList
  },
  {
    path: '/player/:id',
    component: PlayMusic
  },
  {
    path: '/video/:mvid',
    component: Video
  },
  {
    path: '/comment/:id',
    component: Comment
  }
]

//实例化路由
const router = new VueRouter({
  routes
})

//引入样式
import './assets/css/index.css'
import './assets/css/iconfont.css'

//传递router到根实例Vue
new Vue({
  render: h => h(App),
  //挂在到Vue实例上  其他地方可以Vue.$router访问到
  router
}).$mount('#app')
