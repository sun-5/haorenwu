import Vue from 'vue'
import App from './App'
import store from './store'
// 注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
import cuCustom from '@/components/cu-custom/cu-custom.vue'

Vue.component('cu-custom', cuCustom)
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)


Vue.config.productionTip = false
Vue.prototype.$host = 'http://task.com/api/';
Vue.prototype.$siteroot = 'http://task.com/';
Vue.prototype.$store = store;

App.mpType = 'app'

const app = new Vue({
	...App,
	store //挂载到全局
})
app.$mount()
