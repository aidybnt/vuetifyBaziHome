import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import GetImg from "@/utilis/getimg";
import Message from "@/utilis/message";

Vue.use(GetImg)
Vue.use(Message)

const {Solar, Lunar, SolarMonth} = require('lunar-javascript')
Object.defineProperty(Vue.prototype, 'Solar', {value: Solar});
Object.defineProperty(Vue.prototype, 'Lunar', {value: Lunar});
Object.defineProperty(Vue.prototype, 'SolarMonth', {value: SolarMonth});

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    next()
  }

  if (to.path === '/add') {
    next()
  } else {
    if (to.meta.requireAuth && !localStorage.getItem('access_token')) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
