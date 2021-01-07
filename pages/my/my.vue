<template>
	<view>
		<cu-custom bgColor="bg2-blue" :isBack="false"
			><block slot="backText">返回</block
			><block slot="content">个人中心</block>
		</cu-custom>
		<view class="header" v-bind:class="{ status: isH5Plus }">
			<view class="userinfo">
				<view class="logined" v-if="islogin">
					<view class="face"
						><image :src="userinfo.face"></image
					></view>
					<view class="info">
						<view class="username">{{ userinfo.username }}</view>
						<view class="integral">等级:V{{ userinfo.level }}</view>
						<view class="integral reputation"
							>信誉分:{{ userinfo.reputation }}</view
						>
					</view>
				</view>
				<view class="nologin" v-else @click="goLogin">
					<view class="face"
						><image src="/static/images/avatar/nologin.jpg"></image
					></view>
					<view class="info">
						<view class="username">当前尚未登录哦~</view>
						<view class="integral">点击登录</view>
					</view>
				</view>
				<view class="setting">
					<view class="qiandao" v-if="qiandao" @click="singIn"
						>签到</view
					>
					<view class="yiqian" v-else>已签到</view>
				</view>
			</view>
		</view>
		<view class="orders2">
			<view class="box">
				<view
					class="label"
					v-for="(row, index) in orderTypeLise2"
					:key="row.name"
					hover-class="none"
					@tap="toOrderType(index)"
				>
					<view class="label2">
						<view
							class="icon"
							:style="index!==1?'':'color:red'"
							:class="index==0?'jin':''"
						>
							<view>{{ row.icon }}</view>
						</view>
						<text>{{ row.name }}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="orders">
			<view class="box">
				<view
					class="label"
					v-for="(row, index) in orderTypeLise"
					:key="row.name"
					hover-class="none"
					@tap="toOrderType(index)"
				>
					<view class="label2">
						<view class="icon">
							<view class="badge" v-if="row.badge > 0"
								>{{ row.badge }}</view
							>
							<image
								:src="'/static/PersonalCenter/' + row.icon"
							></image>
						</view>
						<text>{{ row.name }}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="list" v-for="(list, list_i) in severList" :key="list_i">
			<view
				class="li"
				v-for="(li, li_i) in list"
				@tap="toPage(list_i, li_i)"
				v-bind:class="{ noborder: li_i == list.length - 1 }"
				hover-class="hover"
				:key="li.name"
			>
				<view class="icon"
					><image
						:src="'/static/PersonalCenter/sever/' + li.icon"
					></image
				></view>
				<view class="text">{{ li.name }}</view>
				<image class="to" src="/static/PersonalCenter/to.png"></image>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				islogin:false,
				PageCur: "my",
				qiandao: true,
				//#ifdef APP-PLUS
				isH5Plus: true,
				//#endif
				//#ifndef APP-PLUS
				isH5Plus: false,
				//#endif
				userinfo: {},
				orderTypeLise: [
					//name-标题 icon-图标 badge-角标
					{ name: '待提交', icon: 'task_ti.png', badge: 5},
					{ name: '审核中', icon: 'task_shen.png', badge: 2 },
					{ name: '不合格', icon: 'task_no.png', badge: 3 },
					{ name: '已完成', icon: 'task_end.png', badge: 0 }
				],
				orderTypeLise2:[
					{ name: '金币', icon: '1104' },
					{ name: '余额', icon: '120.20'},
					{ name: '总收益', icon: '300.50' },
					{ name: '总完成', icon: '20' }
				],

				severList: [
					[{ name: '我的发布', icon: 'renw.png' },{ name: '金币兑换', icon: 'mingxi.png' },{ name: '我的收藏', icon: 'point.png' }, { name: '优惠券', icon: 'quan.png' }, { name: '红包', icon: 'momey.png' }],
					[
						{ name: '抽奖', icon: 'choujiang.png' },
						{ name: '收货地址', icon: 'addr.png' },
						{ name: '银行卡', icon: 'bank.png' },
						{ name: '安全中心', icon: 'security.png' },
						{ name: '在线客服', icon: 'kefu.png' }
					]
				]
			};
		},
		onLoad() {
			//加载
			this.init();
		},
		methods: {
			goLogin(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			singIn(){
				if(!this.islogin){
					uni.showToast({
					title:'请先登录！',
					icon: 'none'
					})
				}
			},
			init() {
				//用户信息
				this.userinfo = {
					face: '/static/PersonalCenter/face.jpeg',
					username: 'VIP会员10240',
					level: '2',
					reputation: '115'
				};
			},
			//用户点击订单类型
			toOrderType(index) {
				uni.showToast({ title: this.orderTypeLise[index].name });
			},
			//用户点击列表项
			toPage(list_i, li_i) {
				uni.showToast({ title: this.severList[list_i][li_i].name });
			}
		}
	};
</script>

<style lang="scss">
	@import "./my.scss"
</style>
