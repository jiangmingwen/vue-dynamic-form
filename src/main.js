import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less';

Vue.use(Antd)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
