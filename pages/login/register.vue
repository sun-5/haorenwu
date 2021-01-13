<template>
	<view class="register">
		<cu-custom bgColor="bg-none" :isBack="true"
			><block slot="backText">返回</block
			><block slot="content">账号注册</block>
		</cu-custom>
		<view class="content">
			<!-- 头部logo -->
			<view class="header"> <image :src="logoImage"></image> </view>
			<!-- 主体 -->
			<view class="main">
				<wInput
					v-model="username"
					type="text"
					minlength="3"
					maxlength="11"
					placeholder="用户名"
				></wInput>
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					placeholder="手机号"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="11"
					placeholder="登录密码"
					isShowPass
				></wInput>
				<wInput
					v-model="verCode"
					type="number"
					maxlength="4"
					placeholder="验证码"
					isShowCode
					ref="runCode"
					@setCode="getVerCode()"
				></wInput>
			</view>

			<wButton
				class="wbutton"
				text="注 册"
				:rotate="isRotate"
				@click.native="startReg()"
			></wButton>

			<!-- 底部信息 -->
			<view class="footer">
				<text
					@tap="isShowAgree"
					class="cuIcon"
					:class="showAgree?'cuIcon-radiobox':'cuIcon-round'"
				>
					同意</text
				>
				<!-- 协议地址 -->
				<navigator url="" open-type="navigate">《协议》</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	let _this;
	import wInput from "../../components/watch-login/watch-input.vue"; //input
	import wButton from "../../components/watch-login/watch-button.vue"; //button
	import { mapState, mapMutations } from "vuex";
	export default {
		data() {
			return {
				//logo图片 base64
				logoImage: "/static/images/nav/noimg.jpg",
				username: "", //用户名
				phoneData: "", // 用户/电话
				passData: "", //密码
				verCode: "", //验证码
				showAgree: true, //协议是否选择
				isRotate: false, //是否加载旋转
				smsCode: ""
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
			isShowAgree() {
				//是否选择协议
				_this.showAgree = !_this.showAgree;
			},
			getVerCode() {
				//获取验证码
				if (_this.username.length < 3) {
					uni.showToast({
						icon: "none",
						position: "bottom",
						title: "用户名不得少于3个字符"
					});
					return false;
				}
				if (_this.phoneData.length != 11) {
					uni.showToast({
						icon: "none",
						position: "bottom",
						title: "手机号不正确"
					});
					return false;
				}
				if (_this.passData.length < 6) {
					uni.showToast({
						icon: "none",
						position: "bottom",
						title: "密码至少6位"
					});
					return false;
				}
				// console.log("获取验证码");
				uni.request({
					url: _this.$host + "smsCode",
					method: "POST",
					data: {
						phoneData: _this.phoneData
					},
					success: res => {
						console.log(res.data);
						if (res.data.result == 0) {
							uni.showToast({
								title: "发送成功",
								icon: "none"
							});
							_this.smsCode = res.data.smsCode + "";
							//console.log(_this.smsCode);
						} else {
							uni.showToast({
								title: res.data.errmsg,
								icon: "none"
							});
						}
					},
					fail: e => {
						uni.showModal({
							content: JSON.stringify(e),
							showCancel: false
						});
					}
				});
				this.$refs.runCode.$emit("runCode"); //触发倒计时（一般用于请求成功验证码后调用）
				setTimeout(function() {
					_this.$refs.runCode.$emit("runCode", 0); //假装模拟下需要 终止倒计时
				}, 60000);
			},
			startReg() {
				//注册
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.showAgree == false) {
					uni.showToast({
						icon: "none",
						position: "bottom",
						title: "请先同意《协议》"
					});
					return false;
				}
				if (_this.username.length < 3) {
					uni.showToast({
						icon: "none",
						position: "bottom",
						title: "用户名不得少于3个字符"
					});
					return false;
				}
				if (this.phoneData.length != 11) {
					uni.showToast({
						icon: "none",
						position: "bottom",
						title: "手机号不正确"
					});
					return false;
				}
				if (this.passData.length < 6) {
					uni.showToast({
						icon: "none",
						position: "bottom",
						title: "密码至少6位"
					});
					return false;
				}
				//验证码校验
				//console.log(typeof(this.verCode))//字符串
				//console.log(typeof(_this.smsCode))
				if (this.verCode !== _this.smsCode) {
					uni.showToast({
						icon: "none",
						position: "bottom",
						title: "验证码不正确"
					});
					return false;
				}
				//验证码正确，开始注册步骤  用户注册信息传到后台
				_this.isRotate = true;
				uni.request({
					header: {
						"content-type": "application/x-www-form-urlencoded"
					},
					url: _this.$host+ "register",
					method: "POST",
					data: {
						uname: _this.username,
						tel: _this.phoneData,
						pwd: _this.passData
					},
					success: e => {
						//console.log("注册成功");
						console.log(e.data);
						if(e.data.code == 0){
							setTimeout(function() {
								_this.isRotate = false;
								uni.showToast({
									icon: "none",
									title: e.data.msg
								});
								_this.login(e.data); //登陆信息存入状态和缓存 uname avator uid
								setTimeout(() => {
									uni.switchTab({
										url: "/pages/my/my"
									});
								}, 1000);
							}, 3000);
						}else{
							_this.isRotate = false;
							uni.showToast({
								icon: "none",
								title: e.data.msg
							});
						}
					},
					fail: e => {
						_this.isRotate = false;
						uni.showModal({
							content: JSON.stringify(e),
							showCancel: false
						});
					}
				});
			}
		}
	};
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>
