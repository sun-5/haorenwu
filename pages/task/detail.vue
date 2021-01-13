<template>
	<view>
		<cu-custom bgColor="bg2-blue" :isBack="true"
			><block slot="backText">返回</block
			><block slot="content">{{task.title?task.title:'任务详情页'}}</block>
		</cu-custom>
		<view class="container">
			
		</view>
		<view class="cu-bar bg-white tabbar border shop" v-if="isLogin">
			<button class="action" open-type="contact">
				<view class="cuIcon-service text-green">
					<!-- <view class="cu-tag badge"></view> -->
				</view>
				客服
			</button>
			<view class="action " :class="isStar?'text-orange':''">
				<view class="cuIcon-favorfill"></view> 收藏
			</view>

			<view class="bg-red submit">立即接单</view>
		</view>
		<view class="cu-bar bg-white tabbar border shop" v-else>
			<view class="bg-gradual-blue3 submit" @tap="gologin"
				>登录后立即获取任务</view
			>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from "vuex";
	let _this;
	export default {
		onLoad: function(option) {
			//option为object类型，会序列化上个页面传递的参数
			//  console.log(option.id); //打印出上个页面传递的参数。
			this.tid = option.tid;
		},
		data() {
			return {
				tid: "",
				isStar: false,
				task: { }
			};
		},
		computed: {
			//组件中使用computed获取store里的数据
			...mapState(["hasLogin", "userinfo"]), //获取vuex状态管理中的数据
			isLogin() {
				return this.hasLogin;
			}
		},
		onLoad(e) {
			_this.tid = e.tid;
			_this.getDetail();
		},
		mounted() {
			_this = this;
		},
		methods: {
			gologin() {
				uni.navigateTo({
					url: "/pages/login/login"
				});
			},
			getDetail() {
				uni.request({
					url: _this.$host + "getdetail/" + _this.tid,
					method: "GET",
					success: res => {
						console.log(res.data);
						_this.task = res.data;
					}
				});
			}
		}
	};
</script>

<style>
	.tabbar {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		right: 0;
	}
</style>
