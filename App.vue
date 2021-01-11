<script>
	import Vue from "vue";
	import { mapState, mapMutations } from "vuex";
	export default {
		methods: {
			...mapMutations(["login"])
		},
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == "android") {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					}
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar =
						custom.bottom + custom.top - e.statusBarHeight;
					// #endif

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar =
						e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			});
			//判断缓存中是否登录过，直接同步信息
			let userinfo = uni.getStorageSync("userinfo"); //同步获取本地数据
			//判断本地缓存是否存在数据 存在就肯定登录过
			if (userinfo !== "") {
				//传到vuex里面储存起来,同时改变了登录状态 true
				this.login(userinfo);
			}
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	};
</script>

<style>
	/*每个页面公共css */
	@import url("/static/colorui/main.css");
	@import url("/static/colorui/icon.css");
	@import url("/static/colorui/animation.css");
	page {
		background: #f7f7f7;
		color: #555555;
		font-size: 28rpx;
	}
	input {
		font-size: 28rpx;
	}
	uni-toast .uni-simple-toast__text {
		font-size: 28rpx;
	}
</style>
