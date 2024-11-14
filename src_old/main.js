import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';//全局引入
// import {Row,Button} from 'element-ui';//按需引入
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
// import axios from 'axios'
import drag from '@/config/drag';//弹窗可以拖拽

Vue.config.productionTip = false
Vue.use(ElementUI);//全局引入
// axios.defaults.baseURL = 'http://61.240.140.173:8000/proxy_url'

//  Vue.use(Row)//按需引入
//  Vue.use(Button)//按需引入

// 5以上的echarts不用引入，4要引入
// import * as echarts from 'echarts'

import   *  as echarts from "echarts";
Vue.prototype.$echarts = echarts;


// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


