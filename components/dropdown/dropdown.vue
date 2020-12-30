<template>
	<view class="dropdown">
		<view class="listtab">
			<view class="topMod">
				<view @click="showType(item, i)" :class="{ clicked: item.isUp }" v-for="(item, i) in ordermethod" :key="i">{{ item.type }}</view>
			</view>
		</view>

		<!-- 选择列表-类型 -->
		<view class="list-container" :style="switchcheck ? '	background: rgba(0, 0, 0, 0.3);' : '	background: rgba(0, 0, 0, 0);'">
			<view class="typelist" v-if="listindex === 0" :style="changeUp ? 'transform: translateY(-100%);' : 'transform: translateY(0);'">
				<view class="row tips"><text>请选择任务类型(可多选)</text></view>
				<view class="row checkbox">
					<view class="list-item" v-for="(item, index) in typelist" :key="index" @click="itemChange(item, index)" :class="{ active: item.isChecked }">
						{{ item.type }}
					</view>
				</view>
				<view class="row button">
					<view class="reset" @click="resetItem"><text>重置</text></view>
					<view class="submit" @click="refreshlist"><text>确定</text></view>
				</view>
			</view>
			<view class="typelist list2" v-else-if="listindex === 1" :style="changeUp ? 'transform: translateY(-100%);' : 'transform: translateY(0);'">
				<view class="item" v-for="(item, index) in pricelist" :key="index" @click="itemChange(item, index)" :class="{ active: isBctive == index }">{{ item }}</view>
			</view>
			<view class="typelist list2" v-else-if="listindex === 2" :style="changeUp ? 'transform: translateY(-100%);' : 'transform: translateY(0);'">
				<view class="item" v-for="(item, index) in orderlist" :key="index" @click="itemChange(item, index)" :class="{ active: isCctive == index }">{{ item }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'dropdown',
	data() {
		return {
			datalist: '',
			ordermethod: [{ type: '类型', isUp: false }, { type: '价格', isUp: false }, { type: '排序', isUp: false }],
			typelist: [
				{ type: '注册', isChecked: false },
				{ type: '投票', isChecked: false },
				{ type: '注册', isChecked: false },
				{ type: '投票', isChecked: false },
				{ type: '注册', isChecked: false },
				{ type: '投票', isChecked: false },
				{ type: '注册', isChecked: false },
				{ type: '投票', isChecked: false },
				{ type: '注册', isChecked: false },
				{ type: '投票', isChecked: false },
				{ type: '注册', isChecked: false },
				{ type: '投票', isChecked: false }
			],
			pricelist: ['不限', '0-1', '1-2', '2-3', '3-4', '4-5', '5-30', '30以上'],
			orderlist: ['综合', '人气', '最新', '价格'],
			switchcheck: false, //默认背景关闭颜色
			listindex: 0, //确定当前显示哪个列表
			lastIndex: -1, //上一次点击
			changeUp: true, //默认true表示 默认收起 transform: translateY(-100%)
			checkedArray: {
				typeitems: [],
				priceitems: '',
				orderitems: ''
			}, //被选中的所有元素
			isActive: -1,
			isBctive: -1,
			isCctive: -1,
			currentIndex: -1
		};
	},
	computed: {},
	methods: {
		showType(item, i) {
			this.listindex = i; //显示对应索引的列表
			if (this.lastIndex == -1) {
				//最开始，第一次点击
				this.changeUp = false; //最开始第一次点击 设置当前list框动态展开
				this.switchcheck = true; //把最外层带背景的加色
				this.ordermethod[i].isUp = true; //当前箭头向上
			} else if (this.lastIndex !== -1 && this.lastIndex !== i) {
				//非最开始，上一次不等于索引 首次点击当前项
				this.ordermethod[this.lastIndex].isUp = false; //上一次箭头还原默认值
				this.ordermethod[i].isUp = !this.ordermethod[i].isUp; //当前箭头取反
				this.changeUp = false;
				this.switchcheck = true;
			} else if (this.lastIndex !== -1 && this.lastIndex == i) {
				//非最开始，上一次是当前索引 重复点击当前项
				this.ordermethod[i].isUp = !this.ordermethod[i].isUp; //当前项取反
				if (this.ordermethod[i].isUp == false) {
					this.changeUp = true; //重复点击当前项，箭头默认向下时，列表收起
					setTimeout(() => {
						this.switchcheck = false; //把最外层带背景的延迟去色（让列表动画得以发挥）
					}, 300);
				} else {
					//箭头向上时，列表展开，背景加色
					this.changeUp = false;
					this.switchcheck = true;
				}
			}
			this.lastIndex = i; //下一次点击前 赋值为当前索引
		},
		itemChange(item, index) {
			//当前选择项是否激活
			if (this.lastIndex == 0) {//只改变样式//根据最后一次点击判断当前列表选择框是哪个
				item.isChecked = !item.isChecked; //改变选中元素的样式
				var arr = this.typelist;//从原数组取出属性为选中样式的元素 组合为新数组
				this.checkedArray.typeitems = [];//每次点击变动 需要重置新数组，否则重复push
				for(var i=0;i<arr.length;i++){
					if(arr[i].isChecked === true){
						this.checkedArray.typeitems.push(arr[i].type)
					} 
				} 
				//console.log(this.checkedArray.typeitems);
			} else if (this.lastIndex == 1) {
				// console.log('price',index)
				this.checkedArray.priceitems = item;
				this.isBctive = index;
				//执行数据请求
			} else {
				// console.log('sort',index)
				this.checkedArray.orderitems = item;
				this.isCctive = index;
				//执行数据请求
			}
		},
		refreshlist() {
			console.log(this.checkedArray.typeitems);
			//this.checkedArray.typeitems 拼接字符串 请求url
		},
		resetItem(){//重置选项 选中状态初始化
			this.checkedArray.typeitems=[];
			for(var i =0;i<this.typelist.length;i++){
				this.typelist[i].isChecked = false;
			}
		}
	}
};
</script>

<style>
@import url('./dropdown.css');
</style>
