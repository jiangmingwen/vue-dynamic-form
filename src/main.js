import '@/core/app-start';
import {
  pubsub
} from '@/utils/commonUtils.js';

import Vue from 'vue'
import antd from 'ant-design-vue'

import '@/assets/styles/reset.css';
import 'ant-design-vue/dist/antd.less';
import '@/assets/styles/theme.less';
// import 'nprogress/nprogress.css' //这个样式必须引入

import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import store from '@/store'
import {
  local,
  session
} from '@/utils/storageUtils.js';
import {
  APP_STORAGE_KEY
} from '@/constant/storage-key';
import http from '@/utils/httpUtils.js'

//ui框架
Vue.use(antd);

// 挂载local
Vue.use(local, {
  namespace: APP_STORAGE_KEY, //存储前缀
  name: 'ls', //Vue.ls  this.$ls
  expire: 1000000 //过期时间： 单位秒
});

// 挂载session
Vue.use(session, {
  namespace: APP_STORAGE_KEY, //存储前缀
  name: 'ss', //Vue.ss  this.$ss
}); //与local样的配置

//挂载http
Vue.use(http); //this.$http

Vue.config.productionTip = false

pubsub.subscribe("app-start", data => {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
})