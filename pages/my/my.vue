<template>
	<view>
		<view class="header" v-bind:class="{ status: isH5Plus }">
			<view class="userinfo">
				<view class="face"><image :src="userinfo.face"></image></view>
				<view class="info">
					<view class="username">{{ userinfo.username }}</view>
					<view class="integral">等级:V{{ userinfo.level }}</view>
					<view class="integral reputation">信誉分:{{ userinfo.reputation }}</view>
				</view>
				<view class="setting">
					<view class="qiandao" v-if="qiandao">签到</view>
					<view class="yiqian" v-else>已签到</view>
				</view>
			</view>
		</view>
		<view class="orders2">
			<view class="box">
				<view class="label" v-for="(row, index) in orderTypeLise2" :key="row.name" hover-class="hover" @tap="toOrderType(index)">
					<view class="label2">
						<view class="icon" :style="index!==1?'':'color:red'" :class="index==0?'jin':''">
							<view >{{ row.icon }}</view>
						</view>
						<text>{{ row.name }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="orders">
			<view class="box">
				<view class="label" v-for="(row, index) in orderTypeLise" :key="row.name" hover-class="hover" @tap="toOrderType(index)">
					<view class="label2">
						<view class="icon">
							<view class="badge" v-if="row.badge > 0">{{ row.badge }}</view>
							<image :src="'/static/PersonalCenter/' + row.icon"></image>
						</view>
						<text>{{ row.name }}</text>
					</view>
				</view>
			</view>
		</view>
 

		<view class="list" v-for="(list, list_i) in severList" :key="list_i">
			<view class="li" v-for="(li, li_i) in list" @tap="toPage(list_i, li_i)" v-bind:class="{ noborder: li_i == list.length - 1 }" hover-class="hover" :key="li.name">
				<view class="icon"><image :src="'/static/PersonalCenter/sever/' + li.icon"></image></view>
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
.header {
	&.status {
		padding-top: var(--status-bar-height);
	}
	background-color: #4080ff;
	width: 92%;
	height: 32vw;
	padding: 0 4%;
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	flex-wrap: wrap;
	.userinfo {
		width: 100%;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		padding: 5vw 0;
		.face {
			flex-shrink: 0;
			width: 20vw;
			height: 20vw;
			image {
				width: 100%;
				height: 100%;
				border-radius: 100%;
			}
		}
		.info {
			display: flex;
			flex-flow: wrap;
			padding-left: 30upx;
			.username {
				width: 100%;
				color: #fff;
				font-size: 36upx;
				margin: 20rpx 0;
				font-weight: bold;
			}
			.integral {
				display: flex;
				align-items: center;
				padding: 0 20upx;
				height: 40upx;
				color: #fff;
				background-color: rgba(0, 0, 0, 0.1);
				border-radius: 20upx;
				font-size: 24upx;
			}
			.reputation {
				margin-left: 20rpx;
			}
		}
		.setting {
			text-align: center;
			line-height: 80rpx;
			.qiandao {
				border-radius: 40rpx;
				width: 180rpx;
				height: 80rpx;
				color: #fff;
				background-color: #e7aa30;
			}
			.yiqian {
				border-radius: 40rpx;
				width: 180rpx;
				height: 80rpx;
				color: #eee;
				background-color: #7999a8;
			}
		}
	}
}
.hover {
	background-color: #eee;
}
.orders {
	// background-color: #4080ff;
	width: 92%;
	height: 11vw;
	padding: 0 4%;
	margin-bottom: calc(11vw + 60upx);
	display: flex;
	align-items: flex-start;
	border-radius: 0 0 100% 100%;
	margin-top: -1upx;
	.box {
		width: 98%;
		padding: 2% 1%;
		height: 22vw;
		background-color: #fefefe;
		border-radius: 24upx;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
		.label {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-flow: wrap;
			width: 100%;
			height: 16vw;
			color: #555555;
			font-size: 28upx;
			.label2 {
				text-align: center;
				text {
					line-height: 50rpx;
				}
			}
			.icon {
				text-align: center;
				position: relative;
				width: 10vw;
				height: 10vw;
				margin: 0 0.8vw 0.5vw 1vw;
				.badge {
					position: absolute;
					width: 4vw;
					height: 4vw;
					background-color: #ec6d2c;
					top: -1vw;
					right: -1vw;
					border-radius: 100%;
					font-size: 20upx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					z-index: 10;
				}
				image {
					width: 10vw;
					height: 10vw;
					z-index: 9;
				}
			}
		}
	}
}
.orders2 {
	background-color: #4080ff;
	width: 92%;
	height: 11vw;
	padding: 0 4%;
	margin-bottom: calc(11vw + 60upx);
	display: flex;
	align-items: flex-start;
	border-radius: 0 0 100% 100%;
	margin-top: -1upx;
	.box {
		width: 98%;
		padding: 2% 1%;
		height: 22vw;
		background-color: #fefefe;
		border-radius: 24upx;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
		.label {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-flow: wrap;
			width: 100%;
			height: 16vw;
			color: #555555;
			font-size: 30upx;
			font-weight: bold;
			.label2 {
				text-align: center;
				text {
					line-height: 50rpx;
				}
			}
			.jin{color:#e7aa30}
			.icon {
				text-align: center;
				position: relative;
				width: 10vw;
				height: 10vw;
				margin: 0 0.8vw 0.5vw 1vw;
				view{
					line-height: 80rpx;
				}
				
				.badge {
					position: absolute;
					width: 4vw;
					height: 4vw;
					background-color: #ec6d2c;
					top: -1vw;
					right: -1vw;
					border-radius: 100%;
					font-size: 20upx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					z-index: 10;
				}
				image {
					width: 10vw;
					height: 10vw;
					z-index: 9;
				}
			}
		}
	}
}

.list {
	width: 100%;
	border-bottom: solid 26upx #f1f1f1;
	.li {
		background-color: #fff;
		width: 92%;
		height: 100upx;
		padding: 0 4%;
		border-bottom: solid 1upx #e7e7e7;
		display: flex;
		align-items: center;
		&.noborder {
			border-bottom: 0;
		}
		.icon {
			flex-shrink: 0;
			width: 70upx;
			height: 70upx;
			image {
				width: 70upx;
				height: 70upx;
			}
		}
		.text {
			padding-left: 20upx;
			width: 100%;
			color: #666;
		}
		.to {
			flex-shrink: 0;
			width: 40upx;
			height: 40upx;
		}
	}
}
</style>
