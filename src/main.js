import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import SlideVerify from 'vue-monoplasty-slide-verify';
import './assets/css/iconfont.css'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(SlideVerify)
Vue.use(VueLazyload,{
  error:'http://qdu17zs.com/error.jpg',
  loading:'http://qdu17zs.com/loading.gif'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
