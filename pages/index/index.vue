<template>
	<view class="container">
		<cu-custom bgColor="bg2-blue" :isBack="false"
			><block slot="backText">返回</block
			><block slot="content">首页</block>
		</cu-custom>
		<mescroll-body
			ref="mescrollRef"
			@init="mescrollInit"
			@down="downCallback"
			@up="upCallback"
			:down="downOption"
			:up="upOption"
		>
			<!-- 搜索框 -->
			<view class="bg">
				<view class="searchBox"><search></search></view>
				<!-- banner -->
				<view class="bannerBox"><banner></banner></view>
			</view>
			<!-- 导航图标 -->
			<view class="navBox"><navBox></navBox></view>
			<!-- 推荐任务 -->
			<view class="reTask">
				<view class="topMod">
					<view class="commend">推荐任务</view>
					<navigator
						class="more"
						open-type="switchTab"
						url="/pages/task/task"
						hover-class="light"
						>更多任务></navigator
					>
				</view>
				<tasklist :taskdata="dataList" v-if="dataList!==''"></tasklist>
			</view>
		</mescroll-body>
	 
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin

		data() {
			return {
				PageCur: "index",
				// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				downOption: {},
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
				upOption: {
					page: {
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: "暂无相关数据"
					}
				},
				dataList: []
			};
		},
		onLoad() {
			var _this = this;
			uni.request({
				url:_this.$host+'getTask',
				method:"GET",
				success:res=>{
					_this.dataList = res.data;
				}
			})
		},
		onHide() {},
		methods: {
		
			// 下拉刷新回调函数
			downCallback() {
				// console.log('下拉刷新');
				// 第2种: 下拉刷新和上拉加载调同样的接口, 则不用第1种, 直接mescroll.resetUpScroll()即可
				this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			},
			upCallback(page) {
				//console.log(page);
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				uni.request({
					url: "?pageNum=" + pageNum + "&pageSize=" + pageSize,
					success: data => {
						// 接口返回的当前页数据列表 (数组)
						let curPageData = data.xxx;
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						// let curPageLen = curPageData.length;
						let curPageLen = 20;
						// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
						let totalPage = data.xxx;
						// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = data.xxx;
						// 接口返回的是否有下一页 (true/false)
						let hasNext = data.xxx;

						//设置列表数据
						//if (page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
						//	this.dataList = this.dataList.concat(curPageData); //追加新数据

						// 请求成功,隐藏加载状态
						//方法一(推荐): 后台接口有返回列表的总页数 totalPage
						this.mescroll.endByPage(curPageLen, totalPage);

						//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
						//this.mescroll.endBySize(curPageLen, totalSize);

						// 如果数据较复杂,可等到渲染完成之后再隐藏下拉加载状态: 如
						// 建议使用setTimeout,因为this.$nextTick某些情况某些机型不触发
						setTimeout(() => {
							this.mescroll.endSuccess(curPageLen);
						}, 20);

						// 上拉加载的 curPageLen 必传, 否则会一直显示'加载中...':~~~~~~~~~~~~~~~~~~
						// 1. 使配置的noMoreSize 和 empty生效
						// 2. 判断是否有下一页的首要依据:
						//    当传的值小于page.size时(说明不满页了),则一定会认为无更多数据;
						//    比传入的totalPage, totalSize, hasNext具有更高的判断优先级;
						// 3. 当传的值等于page.size时(满页),才取totalPage, totalSize, hasNext判断是否有下一页
						// 传totalPage, totalSize, hasNext目的是避免方法四描述的小问题

						// 提示: 您无需额外维护页码和判断显示空布局,mescroll已自动处理好.
						// 当您发现结果和预期不一样时, 建议再认真检查以上参数是否传正确
					},
					fail: () => {
						//  请求失败,隐藏加载状态
						this.mescroll.endErr();
					}
				});
			}
		}
	};
</script>

<style>
	.container {
		height: 100%;
		overflow: hidden;
		padding: 0;
	}
	.container .bg {
		background-image: url(/static/images/bg.png);
		background-position: center;
		background-size: 100%;
		background-repeat: no-repeat;
		padding-bottom: 20rpx;
	}
	.bannerBox {
		/* background-color: #0081FF; */
	}
	.topMod {
		display: flex;
		justify-content: space-between;
		padding: 30rpx;
		background-color: #fff;
	}
	.topMod .light {
		color: #4080ff;
		background-color: none;
	}
	.more {
		color: #999;
	}

</style>
