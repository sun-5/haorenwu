import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: { //存放状态
		hasLogin: false,
		userinfo: {} 
	},
	mutations: {
		login(state, provider) { 
			uni.setStorage({ //用户信息存入缓存
				key: 'userinfo',
				data: provider
			})
			state.hasLogin = true;//先存缓存 再修改状态 因为状态是从缓存获取数据的
			state.userinfo.uname = provider.uname;
			state.userinfo.avator = provider.avator;
			state.userinfo.uid = provider.uid;
		},
		logout(state) {
			uni.removeStorage({ //退出登陆删除缓存
				key: 'userinfo'
			})
			state.hasLogin = false;
			state.userinfo = {}
		}
	}
})
export default store
