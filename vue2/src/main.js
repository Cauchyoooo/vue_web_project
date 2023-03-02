import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api' // 导入api接口
import VueAwesomeSwiper from 'vue-awesome-swiper' 
import 'swiper/css/swiper.css'
import "./assets/iconfont/iconfont.css"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueAwesomeSwiper) 
Vue.use(ElementUI);
Vue.prototype.$api = api // 将api挂载到vue的原型上
Vue.config.productionTip = false // 关闭生产模式下给出的提示

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
