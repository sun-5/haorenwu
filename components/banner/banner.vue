<template>
	<view class="banner">
		<swiper indicator-dots autoplay=true	>
			<swiper-item><image src="/static/images/banner/banner1.jpg" mode=""></image></swiper-item>
			<swiper-item><image src="/static/images/banner/banner2.jpg" mode=""></image></swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default{
		name:"banner",
	}
	
</script>

<style>
.banner swiper {
	width: 100%;
	height: 300rpx;
	padding: 0 4%;
	box-sizing: border-box;
}

.banner image {
	width: 100%;
	height: 300rpx;
	border-radius: 20rpx;
}

 
</style>
