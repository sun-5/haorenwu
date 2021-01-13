<template>
	<view class="forget">
		<cu-custom bgColor="bg-none" :isBack="true"
			><block slot="backText">返回</block
			><block slot="content">忘记密码</block>
		</cu-custom>
		<view class="content">
			<!-- 主体 -->
			<view class="main">
				<view class="tips">若你忘记了密码，可在此重置新密码。</view>
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					placeholder="请输入手机号码"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="11"
					placeholder="请输入新密码"
					isShowPass
				></wInput>
				
				<wInput
					v-model="verCode"
					type="number"
					maxlength="4"
					placeholder="验证码"
					
					isShowCode
					codeText="获取重置码"
					setTime="60"
					ref="runCode"
					@setCode="getVerCode()"
				></wInput>
			</view>
			
			<wButton 
				class="wbutton"
				text="重置密码"
				:rotate="isRotate" 
				@click.native="startRePass()"
			></wButton>

		</view>
	</view>
</template>

<script>
	let _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	export default {
		data() {
			return {
				phoneData: "", //电话
				passData: "", //密码
				verCode:"", //验证码
				isRotate: false, //是否加载旋转
				smsCode:''
			}
		},
		components:{
			wInput,
			wButton
		},
		mounted() {
			_this= this;
		},
		methods: {
			getVerCode(){
				//获取验证码
				if (_this.phoneData.length != 11) {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
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
				url: _this.$host + "repCode",
				method: "POST",
				data: {
					tel: _this.phoneData
				},
				success: res => {
					console.log(res.data);
					if (res.data.result == 0) {
						uni.showToast({
							title: "发送成功",
							icon: "none"
						});
						_this.smsCode = res.data.smsCode + "";
					//	console.log(_this.smsCode);
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
			startRePass() {
				//重置密码
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length != 11) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
			    if (this.passData.length < 6) {
			        uni.showToast({
			            icon: 'none',
						position: 'bottom',
			            title: '密码至少六位'
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
				//验证码正确，开始重置步骤  用户密码 手机信息传到后台
				_this.isRotate = true;
				uni.request({
					header: {
						"content-type": "application/x-www-form-urlencoded"
					},
					url: _this.$host+ "repwd",
					method: "POST",
					data: {
						tel: _this.phoneData,
						pwd: _this.passData
					},
					success: e => {
						//console.log("重置成功");
						console.log(e.data);
						if(e.data.code == 0){
							setTimeout(function() {
								_this.isRotate = false;
								uni.showToast({
									icon: "none",
									title: e.data.msg + ',即将跳转登陆...',
									duration:2000
								});
									//重置 跳到登陆
								setTimeout(() => {
									uni.navigateTo({
										url: "/pages/login/login"
									});
								}, 2000);
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
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>

