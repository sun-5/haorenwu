<template>
	<view class="login">
		<cu-custom bgColor="bg-none" :isBack="true"
			><block slot="backText">返回</block
			><block slot="content">欢迎登录</block>
		</cu-custom>
		<view class="content">
			<!-- 头部logo -->
			<view class="header"> <image :src="logoImage"></image> </view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					placeholder="用户名/手机号"
					:focus="isFocus"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="11"
					placeholder="密码"
				></wInput>
			</view>
			<wButton
				class="wbutton"
				text="登 录"
				:rotate="isRotate"
				@click="startLogin"
			></wButton>

			<!-- 其他登录 -->
			<view class="other_login cuIcon">
				<view class="login_icon">
					<view class="cuIcon-weixin text-green" @tap="login_weixin"></view>
				</view>
				<!-- 	<view class="login_icon">
					<view class="cuIcon-weibo" @tap="login_weibo"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-github" @tap="login_github"></view>
				</view> -->
			</view>

			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="forget" open-type="navigate"
					>找回密码</navigator
				>
				<text>|</text>
				<navigator url="register" open-type="navigate"
					>注册账号</navigator
				>
			</view>
		</view>
	</view>
</template>

<script>
	import wInput from "@/components/watch-login/watch-input.vue"; //input
	import wButton from "@/components/watch-login/watch-button.vue"; //button
	import { mapState, mapMutations } from "vuex";
	let _this;
	export default {
		data() {
			return {
				//logo图片 base64
				logoImage: "/static/images/nav/noimg.jpg",
				phoneData: "", //用户/电话
				passData: "", //密码
				isRotate: false, //是否加载旋转
				isFocus: true  // 是否聚焦
	 
			};
		},
		components: {
			wInput,
			wButton
		},
		mounted() {
			_this = this;
			
		},
		methods: {
			...mapMutations(["login"]),

				// try {
				// 	const value = uni.getStorageSync("setUserData");
				// 	if (value) {
				// 		//有登录信息
				// 		console.log("已登录用户：", value);
				// 		_this.$store.dispatch("setUserData", value); //存入状态
				// 		uni.reLaunch({
				// 			url: "/pages/index/index"
				// 		});
				// 	}
				// } catch (e) {
				// 	// error
				// }
		 
			getLogin() {
				//console.log("denglu....");
				uni.request({
					header: {
						"content-type": "application/x-www-form-urlencoded"
					},
					url: this.$host + "login",
					method: "POST",
					data: {
						username: this.phoneData,
						password: this.passData
					},
					success: e => {
						//console.log("login success", e.data);
							uni.hideLoading();
						if (e.data.code == 1) {
							_this.login(e.data);//获取信息存入状态和缓存
							// uni.navigateBack();
							history.back();
						} else {
							uni.showModal({
								content: e.data.msg,
								showCancel: false
							});
						}
					},
					fail: e => {
						uni.hideLoading();
						uni.showModal({
							content: JSON.stringify(e),
							showCancel: false
						});
					}
				});
			},
			startLogin(e) {
				//console.log('开始登陆');
				//登录
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length == "") {
					uni.showToast({
						icon: "none",
						position: "bottom",
						title: "用户名不能为空"
					});
					return;
				}
				if (this.passData.length < 6) {
					uni.showToast({
						icon: "none",
						position: "bottom",
						title: "密码最少6位"
					});
					return;
				}
				//console.log("登录中")
				_this.isRotate = true;
				setTimeout(function() {
					_this.isRotate = false;
				}, 3000);
				uni.showLoading({
					title: "登录中"
				});
				_this.getLogin();
				// Promise.all([_this.getLogin()])
				// 	.then(res => {
				// 		//console.log(res)
				// 		//简单验证下登录（不安全）
				// 		if (
				// 			_this.phoneData == res.data.username &&
				// 			_this.passData == res.data.password
				// 		) {
				// 			let userdata = {
				// 				username: res.data.username,
				// 				nickname: res.data.nickname,
				// 				accesstoken: res.data.accesstoken
				// 			}; //保存用户信息和accesstoken
				// 			_this.$store.dispatch("setUserData", userdata); //存入状态
				// 			try {
				// 				uni.setStorageSync("setUserData", userdata); //存入缓存
				// 			} catch (e) {
				// 				// error
				// 			}
				// 			uni.showToast({
				// 				icon: "success",
				// 				position: "bottom",
				// 				title: "登录成功"
				// 			});
				// 			// uni.reLaunch({
				// 			// 	url: "/pages/index/index"
				// 			// });
				// 			history.back();
				// 		} else {
				// 			_this.passData = "";
				// 			uni.showToast({
				// 				icon: "error",
				// 				position: "bottom",
				// 				title: "账号或密码错误，账号admin密码admin"
				// 			});
				// 		}
				// 		uni.hideLoading();
				// 	})
				// 	.catch(err => {
				// 		uni.hideLoading();
				// 	});
			},
			login_weixin() {
				//微信登录
				uni.showToast({
					icon: "none",
					position: "bottom",
					title: "..."
				});
			},
			login_weibo() {
				//微博登录
				uni.showToast({
					icon: "none",
					position: "bottom",
					title: "..."
				});
			},
			login_github() {
				//github登录
				uni.showToast({
					icon: "none",
					position: "bottom",
					title: "..."
				});
			}
		}
	};
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>
