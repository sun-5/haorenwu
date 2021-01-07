import Vue from 'vue'
import App from './App'

// 注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
import cuCustom from '@/components/cu-custom/cu-custom.vue'

Vue.component('cu-custom', cuCustom)
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)


Vue.config.productionTip = false
Vue.prototype.$host = 'http://task.com/api/';

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
