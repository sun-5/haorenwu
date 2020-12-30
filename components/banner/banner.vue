<template>
	<view class="banner">
		<swiper indicator-dots>
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
	height: 300rpx;
	box-sizing: border-box;
}

.banner image {
	width: 100%;
	height: 300rpx;
}

 
</style>
