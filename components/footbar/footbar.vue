<template>
	<view>
		<view class="cu-bar tabbar bg-white shadow foot footbar">
			<view class="action" @click="NavChange" data-cur="index">
				<view class="cuIcon-cu-image">
					<image
						:src="'/static/images/tabbar/index' + [footCur=='index'?'_s':''] + '.png'"
					></image>
				</view>
				<view :class="footCur=='index'?'text-blue2':'text-gray2'"
					>首页</view
				>
			</view>
			<view class="action" @click="NavChange" data-cur="task">
				<view class="cuIcon-cu-image">
					<image
						:src="'/static/images/tabbar/task' + [footCur == 'task'?'_s':''] + '.png'"
					></image>
				</view>
				<view :class="footCur=='task'?'text-blue2':'text-gray2'"
					>任务大厅</view
				>
			</view>
			<view class="action" @click="NavChange" data-cur="add">
				<view class="cuIcon-cu-image">
					<image
						:src="'/static/images/tabbar/add' + [footCur == 'add'?'_s':''] + '.png'"
					></image>
				</view>
				<view :class="footCur=='add'?'text-blue2':'text-gray2'"
					>任务发布</view
				>
			</view>
			<view class="action" @click="NavChange" data-cur="my">
				<view class="cuIcon-cu-image">
					<image
						:src="'/static/images/tabbar/my' + [footCur == 'my'?'_s':''] + '.png'"
					></image>
				</view>
				<view :class="footCur=='my'?'text-blue2':'text-gray2'"
					>个人中心</view
				>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['PageCur'],
		name:'footbar',
		data() {
			return {
			footCur:this.PageCur
			};
		},
		methods:{
			NavChange(e) {
				console.log(e)
				this.footCur = e.currentTarget.dataset.cur;
				uni.navigateTo({
					url:'/pages/'+ this.footCur +'/'+ this.footCur
				})
			}
		}
	}
</script>

<style>

</style>
