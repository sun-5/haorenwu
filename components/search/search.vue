<template>
	<view class="search">
		<image :src="imgSrc" v-show="showImg"></image>
		<input type="text"v-model='keyword'@confirm='subSearch' @blur='recover' confirm-type="search" :placeholder="placeholder" @focus="clearPlace"  placeholder-class="place" />
	</view>
</template>

<script>
export default {
	name:'search',
	data() {
		return {
			placeholder: '输入标题或任务关键词',
			imgSrc: '/static/images/nav/search.png',
			showImg: true,
			keyword:''
		};
	},
	methods: {
		clearPlace() {
			this.placeholder = '';
			this.showImg = false;
		},
		recover() {
			this.placeholder = '输入标题或任务关键词';
			 
			if(this.keyword!==''){
				this.showImg = false;
			}else{
				this.showImg = true;
			}
			
		},
		subSearch(event){
			var keyword = event.detail.value;
			console.log(keyword)
			//uni.request(){
			//	请求数据并跳转页面
		//	}
		}
	}
};
</script>

<style>
.search {
	padding: 20rpx 30rpx;
	line-height: 80rpx;
	box-sizing: border-box;
	position: relative;
 
}

.search image {
	width: 50rpx;
	height: 50rpx;
	opacity: 0.4;
	position: absolute;
	top: 35rpx;
	right: 50rpx;
}

.search input {
	width: 100%;
	vertical-align: middle;
	padding: 10rpx 20rpx;
	height: 80rpx;
	/* line-height: 1px; */
	box-sizing: border-box;
	border: 1px solid #ccc;
	border-radius: 50rpx;
	background-color: #fff;
}

.place {
	color: #aaa;
}
</style>
