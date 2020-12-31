<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">任务类型</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'禁止换行，超出容器部分会以 ... 方式截断'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group ">
				<view class="title">支持设备</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'禁止换行，超出容器部分会以 ... 方式截断'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">任务标题</view>
				<input placeholder="项目名+关键要点,20字以内"   >
			</view>
			<view class="cu-form-group ">
				<view class="title">项目关键词</view>
				<input placeholder="项目简称,8字以内"   >
			</view>
			<view class="cu-form-group align-start">
				<view class="title">任务说明</view>
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaBInput" placeholder="100字以内"></textarea>
			</view>
			<view class="cu-form-group starttime" @click="selectDatePicker('date1')">
					<view class="title">开始时间</view>
					<input placeholder="请选择任务开始时间"  disabled=true :value="dateString1">
			</view>
			<date-time-picker  ref='date1' :indicatorStyle='indicatorStyle' type='datetime' :datestring='dateString1' @change="dateTimeChange($event,'date1')"></date-time-picker>
			<view class="cu-form-group starttime" @click="selectDatePicker('date2')">
					<view class="title">结束时间</view>
					<input placeholder="请选择任务结束时间"  disabled=true :value="dateString2">
			</view>
			<date-time-picker  ref='date2' :indicatorStyle='indicatorStyle' type='datetime' :datestring='dateString2' @change="dateTimeChange($event,'date2')"></date-time-picker>
			<view class="cu-form-group">
				<view class="title">完成限时</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'禁止换行，超出容器部分会以 ... 方式截断'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">审核时间</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'禁止换行，超出容器部分会以 ... 方式截断'}}
					</view>
				</picker>
			</view>
			 <view class="cu-form-group margin-top">
				<view class="title">悬赏单价</view>
				<input placeholder="单次任务赏金,不低于0.2元"   >
			 </view>
			 <view class="cu-form-group ">
				<view class="title">项目关键词</view>
				<input placeholder="项目简称,8字以内"   >
			 </view>
 
			<view class="cu-form-group margin-top">
				<view class="title">开关选择</view>
				<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
			</view>
			<view class="cu-form-group">
				<view class="title">定义颜色</view>
				<!-- #ifdef MP-ALIPAY -->
				<switch class='red' @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false" color="#e54d42"></switch>
				<!-- #endif -->

				<!-- #ifndef MP-ALIPAY -->
				<switch class='red' @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false"></switch>
				<!-- #endif -->
			</view>
			<view class="cu-form-group">
				<view class="title">定义图标</view>
				<switch class='switch-sex' @change="SwitchC" :class="switchC?'checked':''" :checked="switchC?true:false"></switch>
			</view>
			<!-- #ifndef MP-ALIPAY -->
			<view class="cu-form-group">
				<view class="title">方形开关</view>
				<switch class='orange radius' @change="SwitchD" :class="switchD?'checked':''" :checked="switchD?true:false"></switch>
			</view>
			<!-- #endif -->
			<radio-group class="block" @change="RadioChange">
				<view class="cu-form-group margin-top">
					<view class="title">单选操作(radio)</view>
					<radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio>
				</view>
				<!-- #ifndef MP-ALIPAY -->
				<view class="cu-form-group">
					<view class="title">定义样式</view>
					<radio class='radio' :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B"></radio>
				</view>
				<view class="cu-form-group">
					<view class="title">定义颜色</view>
					<view>
						<radio class='blue radio' :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C"></radio>
						<radio class='red margin-left-sm' :class="radio=='D'?'checked':''" :checked="radio=='D'?true:false" value="D"></radio>
					</view>
				</view>
				<!-- #endif -->
			</radio-group>
			<checkbox-group class="block" @change="CheckboxChange">
				<view class="cu-form-group margin-top">
					<view class="title">复选选操作(checkbox)</view>
					<checkbox :class="checkbox[0].checked?'checked':''" :checked="checkbox[0].checked?true:false" value="A"></checkbox>
				</view>
				<!-- #ifndef MP-ALIPAY -->
				<view class="cu-form-group">
					<view class="title">定义形状</view>
					<checkbox class='round' :class="checkbox[1].checked?'checked':''" :checked="checkbox[1].checked?true:false" value="B"></checkbox>
				</view>
				<view class="cu-form-group">
					<view class="title">定义颜色</view>
					<checkbox class='round blue' :class="checkbox[2].checked?'checked':''" :checked="checkbox[2].checked?true:false"
					 value="C"></checkbox>
				</view>
				<!-- #endif -->
			</checkbox-group>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					图片上传
				</view>
				<view class="action">
					{{imgList.length}}/5
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<5">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>

		 
		</form>
	</view>
</template>

<script>
	import DateTimePicker from '@/components/bory-dateTimePicker/bory-dateTimePicker.vue'
	export default {
		components: {
		    DateTimePicker
		},
		computed: {
		    indicatorStyle() {
		        return {
		            background: 'rgba(85, 170, 255, 0.2)',
		            height: '40px',
		        };
		    }
		},
		data() {
			return {
				dateString1: '',
				dateString2:'',
				index: -1,
				picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
				multiArray: [
					['无脊柱动物', '脊柱动物'],
					['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
					['猪肉绦虫', '吸血虫']
				],
				objectMultiArray: [
					[{
							id: 0,
							name: '无脊柱动物'
						},
						{
							id: 1,
							name: '脊柱动物'
						}
					],
					[{
							id: 0,
							name: '扁性动物'
						},
						{
							id: 1,
							name: '线形动物'
						},
						{
							id: 2,
							name: '环节动物'
						},
						{
							id: 3,
							name: '软体动物'
						},
						{
							id: 3,
							name: '节肢动物'
						}
					],
					[{
							id: 0,
							name: '猪肉绦虫'
						},
						{
							id: 1,
							name: '吸血虫'
						}
					]
				],
				multiIndex: [0, 0, 0],
				time: '12:01',
				date: '2018-12-25',
				region: ['广东省', '广州市', '海珠区'],
				switchA: false,
				switchB: true,
				switchC: false,
				switchD: false,
				radio: 'A',
				checkbox: [{
					value: 'A',
					checked: true
				}, {
					value: 'B',
					checked: true
				}, {
					value: 'C',
					checked: false
				}],
				imgList: [],
				modalName: null,
				textareaAValue: '',
				textareaBValue: ''
			};
		},
		onLoad(){
	 
		},
		methods: {
			selectDatePicker(val) {
				this.$refs[val].show();
			},
				dateTimeChange(val,date) {
						if(date=='date1'){
							this.dateString1=val
						}else{
							this.dateString2=val
						}
				},

			PickerChange(e) {
				this.index = e.detail.value
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			MultiColumnChange(e) {
				let data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};
				data.multiIndex[e.detail.column] = e.detail.value;
				switch (e.detail.column) {
					case 0:
						switch (data.multiIndex[0]) {
							case 0:
								data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
								data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
								break;
							case 1:
								data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
								data.multiArray[2] = ['鲫鱼', '带鱼'];
								break;
						}
						data.multiIndex[1] = 0;
						data.multiIndex[2] = 0;
						break;
					case 1:
						switch (data.multiIndex[0]) {
							case 0:
								switch (data.multiIndex[1]) {
									case 0:
										data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
										break;
									case 1:
										data.multiArray[2] = ['蛔虫'];
										break;
									case 2:
										data.multiArray[2] = ['蚂蚁', '蚂蟥'];
										break;
									case 3:
										data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
										break;
									case 4:
										data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
										break;
								}
								break;
							case 1:
								switch (data.multiIndex[1]) {
									case 0:
										data.multiArray[2] = ['鲫鱼', '带鱼'];
										break;
									case 1:
										data.multiArray[2] = ['青蛙', '娃娃鱼'];
										break;
									case 2:
										data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
										break;
								}
								break;
						}
						data.multiIndex[2] = 0;
						break;
				}
				this.multiArray = data.multiArray;
				this.multiIndex = data.multiIndex;
			},
			TimeChange(e) {
				this.time = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			RegionChange(e) {
				this.region = e.detail.value
			},
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			SwitchB(e) {
				this.switchB = e.detail.value
			},
			SwitchC(e) {
				this.switchC = e.detail.value
			},
			SwitchD(e) {
				this.switchD = e.detail.value
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			CheckboxChange(e) {
				var items = this.checkbox,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			textareaBInput(e) {
				this.textareaBValue = e.detail.value
			}
		}
	}
</script>

<style>
	.starttime{
		position: relative;
	}
	.starttime::after{
		font-family: cuIcon;
		    display: block;
		    content: "\e6a3";
		    position: absolute;
		    font-size:34rpx;
		    color: #8799a3;
		    line-height: 100rpx;
		    width: 60rpx;
		    text-align: center;
		    top: 0;
		    bottom: 0;
		    right: 15rpx;
		    margin: auto;
	}
 
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
