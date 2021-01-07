<template>
	<view class="tasklist">
		<view class="list">
			<navigator
				:url="'/pages/task/detail?id=' + item.id"
				hover-class="none"
				v-for="(item, index) in taskdata"
				:key="index"
			>
				<image
					class="titleImg"
					v-if="item.titleImg"
					:src="item.titleImg "
					mode="aspectFill"
				></image>
				<image
					class="titleImg"
					src="/static/images/nav/noimg.jpg"
					v-else
					mode="aspectFill"
				></image>
				<view class="taskInfo">
					<text class="tasktitle">{{ item.title }}</text>
					<view class="middle">
						<view class="m2">
							<view class="taskCate">{{ item.cate }}</view>
							<view class="sTitle">{{ item.stitle }}</view>
						</view>
						<text class="taskMoney">{{ item.money }}元</text>
					</view>
					<text class="taskNum"
						>{{ item.already }}人已赚/剩余数量:{{ item.resnum
						}}</text
					>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tasklist",
		props: ["taskdata"],

		data() {
			return {};
		},
		methods: {
	
		},
		onLoad() {}
	};
</script>

<style>
	.tasklist {
		/* margin-bottom: 50rpx; */
	}

	.list {
		padding: 20rpx;
		background-color: #f7f7f7;
	}
	.list navigator {
		background-color: #fff;
		border-radius: 30rpx;
		box-shadow: 0px 4rpx 14rpx 0px rgba(218, 227, 238, 0.6);
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		padding: 20rpx;
		margin-bottom: 20rpx;
	}
	.titleImg {
		width: 150rpx;
		height: 150rpx;
		min-width: 150rpx;
		border-radius: 50%;
		box-sizing: border-box;
		margin-right: 20rpx;
		/* border: 1px solid #cef0ff; */
	}
	.tasktitle {
		font-size: 32rpx;
		color: #333333;
	}
	.taskInfo {
		display: flex;
		flex-flow: column;
		flex-wrap: wrap;
		max-width: 480rpx;
	}
	.taskInfo .middle {
		display: flex;
		justify-content: space-between;
		padding: 10rpx 0;
	}
	.taskInfo .middle .m2 {
		display: flex;
		justify-content: space-between;
	}
	.tasktitle {
		max-width: 480rpx;
		overflow: hidden; /*内容超出后隐藏*/
		white-space: nowrap; /*  让内容只显示为一行 */
		text-overflow: ellipsis; /*  内容超出后显示为省略号 */
	}
	.taskMoney {
		color: #ff0000;
		font-size: 32rpx;
		vertical-align: middle;
	}
	.taskCate,
	.sTitle {
		background-color: #eeeeee;
		padding: 5rpx 10rpx;
	}
	.sTitle {
		margin-left: 10rpx;
	}
</style>
