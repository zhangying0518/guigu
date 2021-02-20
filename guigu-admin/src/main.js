// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import { Button } from 'mint-ui'
import './mock/mockServer' //加载mockServer
import './fiters/index' //加载moment

import loading from '../src/common/imgs/loading.gif'
//  注册全局组件标签
Vue.component(Button.name, Button);

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用vuex
  components: { App },
  template: '<App/>'
})
