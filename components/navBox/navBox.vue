<template>
	<view class="btn-area">
		<navigator class="item" :url="item.url" hover-class="none" v-for="(item,index) in btnArray" :key="index">
			<image class="navImg" :src="item.image"></image>
			<view class="navName">{{ item.name }}</view>
		</navigator>
	</view>
</template>

<script>
export default {
	name:"navBox",
	data() {
		return {
			btnArray: [
				{
					image: '/static/images/nav/qian.png',
					name: '每日签到',
					url: ''
				},
				{
					image: '/static/images/nav/jiedan.png',
					name: '我的接单',
					url: ''
				},
				{
					image: '/static/images/nav/fabu.png',
					name: '我的发布',
					url: ''
				},
				{
					image: '/static/images/nav/daili.png',
					name: '代理加盟',
					url: ''
				}
			]
		};
	}
};
</script>

<style>
.btn-area {
	margin: 20rpx 0;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	background-color: #fff;
}

.btn-area .item {
	padding: 10rpx;
	box-sizing: border-box;
	width: 25%;
	text-align: center;
}

.btn-area .item .navImg {
	width: 120rpx;
	height: 120rpx;
	display: block;
	margin: 0 auto;
}

.btn-area .item .navName {
	margin: 10rpx 0;
}
</style>
