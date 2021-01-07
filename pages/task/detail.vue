<template>
	<view>
		<cu-custom bgColor="bg2-blue" :isBack="true"
			><block slot="backText">返回</block
			><block slot="content">{{title}}</block>
			</cu-custom>
			
			<view class="cu-bar bg-white tabbar border shop">
				<button class="action" open-type="contact">
					<view class="cuIcon-service text-green">
						<!-- <view class="cu-tag badge"></view> -->
					</view>
					客服
				</button>
				<view class="action " :class="isStar?'text-orange':''">
					<view class="cuIcon-favorfill"></view> 已收藏
				</view>
 
				<view class="bg-red submit">立即接单</view>
			</view>
	</view>
</template>

<script>
	export default {
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		     //  console.log(option.id); //打印出上个页面传递的参数。
			   this.id = option.id;
		},
		data() {
			return {
				id:'',
				title:'',
				isStar:false
			}
		},
		onLoad(e) {
			this.title = e.id + '号任务详情';
		},
		computed:{
		},
		methods: {
			
		}
	}
</script>

<style>
	.tabbar{
		position: fixed;
		bottom:0 ;
		left: 0;
		width: 100%;
		right: 0;
	}

</style>
