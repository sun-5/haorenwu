<template>
	<view>
		<cu-custom bgColor="bg2-blue" :isBack="false"
			><block slot="backText">返回</block
			><block slot="content">任务发布</block>
		</cu-custom>
		<form>
			<view
				class="cu-form-group margin-top"
				style="min-height: 70rpx;padding-top:20rpx ;"
			>
				<view class="title">任务类型</view>
				<view class="tips"> 请选择类型 </view>
			</view>
			<view class="row checkbox">
				<view
					class="list-item "
					id="tasktype"
					v-for="(item, index) in tasktype"
					:key="index"
					@click="itemChange($event,index)"
					:class="{active:aindex==index }"
				>
					{{ item.catname }}
				</view>
			</view>

			<view class="cu-form-group" style="border-top: 1rpx solid #eee;">
				<view class="title">支持设备</view>
				<view class="row checkbox2">
					<view
						class="list-item "
						id="phonelist"
						v-for="(item, index) in phonelist"
						:key="index"
						@click="itemChange($event,index)"
						:class="{active:bindex==index }"
					>
						{{ item }}
					</view>
				</view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">任务标题</view>
				<input
					placeholder="项目名+关键要点,20字以内"
					maxlength="20"
					v-model="taskallinfo.title"
				/>
			</view>
			<view class="cu-form-group ">
				<view class="title">项目关键词</view>
				<input
					placeholder="如:APP拉新,5字以内"
					v-model="taskallinfo.keyword"
					maxlength="5"
				/>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">任务说明</view>
				<textarea
					maxlength="100"
					v-model="taskallinfo.explain"
					placeholder="项目信息务必真实填写,否则审核不通过"
				></textarea>
			</view>
			<view
				class="cu-form-group starttime"
				@click="selectDatePicker('date1')"
			>
				<view class="title">开始时间</view>
				<input
					placeholder="请选择任务开始时间"
					disabled="true"
					:value="dateString1"
				/>
			</view>
			<date-time-picker
				ref="date1"
				:indicatorStyle="indicatorStyle"
				type="datetime"
				:datestring="dateString1"
				@change="dateTimeChange($event,'date1')"
			></date-time-picker>
			<view
				class="cu-form-group starttime"
				@click="selectDatePicker('date2')"
			>
				<view class="title">结束时间</view>
				<input
					placeholder="请选择任务结束时间"
					disabled="true"
					:value="dateString2"
				/>
			</view>
			<date-time-picker
				ref="date2"
				:indicatorStyle="indicatorStyle"
				type="datetime"
				:datestring="dateString2"
				@change="dateTimeChange($event,'date2')"
			></date-time-picker>
			<view class="cu-form-group">
				<view class="title">任务限时</view>
				<picker
					@change="PickerChange"
					:value="cindex"
					:range="ttimelist"
					id="ttime"
					range-key="time"
				>
					<view class="picker">
						{{cindex>-1?ttimelist[cindex].time:'任务接单后限时完成'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">审核时间</view>
				<picker
					@change="PickerChange"
					:value="dindex"
					:range="etimelist"
					id="etime"
					range-key="time"
				>
					<view class="picker">
						{{dindex>-1?etimelist[dindex].time:'任务完成后审核时间'}}
					</view>
				</picker>
			</view>
			<!-- #ifndef MP-ALIPAY -->
			<view class="cu-form-group margin-top">
				<view class="title">是否允许重复接单</view>
				<switch
					id="switchD"
					class="orange radius"
					@change="SwitchBtn"
					:class="switchD?'checked':''"
					:checked="switchD?true:false"
				></switch>
			</view>
			<!-- #endif -->

			<view class="cu-form-group ">
				<view class="title">悬赏单价</view>
				<input
					placeholder="单次任务赏金,不低于0.2元"
					type="number"
					@input="check"
					v-model="price"
				/>
			</view>
			<view class="cu-form-group ">
				<view class="title">任务数量</view>
				<input placeholder="至少一次" type="number" v-model="num" />
			</view>
			<view class="cu-form-group ">
				<view class="title">预付赏金</view>
				<input
					placeholder="总赏金+服务费8%"
					disabled
					:value="taskmoney"
				/>
			</view>
			<view
				class="cu-bar bg-white margin-top"
				style="border-bottom: 1rpx solid #eee;"
			>
				<view class="action"> 任务完成步骤 </view>
				<view class="action">请确保步骤简略明了</view>
			</view>
			<view class="cu-bar bg-white">
				<view class="action addbtn">
					<text> 添加步骤 </text>
					<view class="textimg">
						<button
							class="cu-btn bg-green shadow"
							@tap="showModal"
							data-target="DialogModal1"
						>
							文字描述
						</button>
						<button
							class="cu-btn bg-green shadow margin-left"
							@tap="ChooseImage"
						>
							图片上传
						</button>
					</view>
				</view>
			</view>
			<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">步骤说明文字</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						<textarea
							v-model="textinfo"
							placeholder="请用文字描述添加一个步骤,不得超过50字"
						/>
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button
								class="cu-btn line-green text-green"
								@tap="hideModal"
							>
								取消
							</button>
							<button
								class="cu-btn bg-green margin-left"
								@tap="submitinfo('textinfo');hideModal()"
							>
								确定
							</button>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="cu-timeline">
					<view
						class="cu-item text-grey"
						v-for="(item,index) in dolist"
						:class="'cu-item'+(index+1)"
						:key="index"
					>
						<!-- 删除步骤按钮 -->
						<view
							class="cu-tag bg-red "
							@tap.stop="DelImg"
							:data-index="index"
						>
							<text class="cuIcon-close"></text>
						</view>
						<view class="content shadow-blur" v-if="item.type=='0'">
							{{item.content}}
						</view>
						<view
							class="content shadow-blur "
							v-else-if="item.type=='1'"
						>
							<image
								@tap="ViewImage"
								:src="$siteroot + item.content"
								mode="aspectFit"
								class="dolistimg"
								:data-url="$siteroot + item.content"
							></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 发布规则 注意事项 -->
			<radio-group class="block" @change="RadioChange">
				<view class="cu-form-group bg-gray">
					<radio
						:class="radio=='A'?'checked':''"
						:checked="radio=='A'?true:false"
						value="A"
					></radio>
					<text class="title"
						>我已阅读并同意遵守
						<text
							data-url="/pages/add/rule"
							@tap="ruleTo"
							class="text-blue2"
							hover-class="none"
							><<发布规则>></text
						>
						的全部内容</text
					>
				</view>
			</radio-group>
			<view class="cu-form-group addtip  bg-gray">
				<span class="text-red"
					>发布提示:<br />
					1.本平台禁止发布黄、赌、毒及政策等一切法律禁止内容,详细请参考，如有违反将查封账户，不退还账户余额，敬请周知；<br />
					2.悬赏主对自己发布的任务全权负责，禁止发布虚假、诱导性内容，如有违反后果自负</span
				>
			</view>

			<!-- 申请发布 -->
			<view class="cu-bar bg-white tabbar border shop">
				<button class="action" open-type="contact">
					<view class="cuIcon-explorefill text-gray"></view>
					<text class=" text-gray">预览</text>
				</button>
				<view class="bg-orange submit">加入仓库</view>
				<view
					class="bg-red submit"
					@tap.stop="addform"
					data-target="wxpayModal"
					>申请发布</view
				>
			</view>
			<view class="cu-modal" :class="modalName=='wxpayModal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">确认发布</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl"
						>是否确认发布并预付赏金<text class="text-red"
							>{{taskmoney}}</text
						>元？</view
					>
					<view class="cu-bar bg-white">
						<view
							class="action margin-0 flex-sub  "
							@tap="hideModal"
							>取消</view
						>
						<view
							class="action margin-0 flex-sub text-green solid-left"
							@tap="hideModal();wxPay()"
						>
							<text class="cuIcon-moneybag"></text>确认支付</view
						>
					</view>
				</view>
			</view>
			<view class="cu-load load-modal" v-show="loadModal">
				<!-- <view class="cuIcon-emojifill text-orange"></view> -->
				<image src="/static/logo.png" mode="aspectFit"></image>
				<view class="gray-text">支付中...</view>
			</view>
		</form>
		<tips :tipsinfo="ptipsinfo" :modaltips="pmodaltips"></tips>
	</view>
</template>

<script>
	import DateTimePicker from "@/components/bory-dateTimePicker/bory-dateTimePicker.vue";
	import SOtime from "@/utils/SOtime.js";
	import { mapState, mapMutations } from "vuex";
	let _this;
	export default {
		components: {
			DateTimePicker
		},
		computed: {
			//组件中使用computed获取store里的数据
			...mapState(["hasLogin", "userinfo"]), //获取vuex状态管理中的数据

			indicatorStyle() {
				return {
					background: "rgba(85, 170, 255, 0.2)",
					height: "40px"
				};
			},
			taskmoney() {
				if (this.num && this.price) {
					return (
						this.num *
						this.price *
						(1 + this.svpercent)
					).toFixed(2);
				} else {
					return "总赏金+服务费" + this.svpercent * 100 + "%";
				}
			},
			imgList() {
				var arr = [];
				this.dolist.forEach((item, index) => {
					if (item.type == "1") {
						//加上根域名
						arr.push(_this.$siteroot + item.content);
					}
				});
				//console.log(arr)
				return arr;
			}
		},
		watch: {
			taskmoney(val) {
				this.taskallinfo.num = this.num;
				this.taskallinfo.price = this.price;
				this.taskallinfo.totalmoney = this.taskmoney;
				//console.log( this.taskallinfo) 监听赏金 数据赋值
			}
		},
		mounted() {
			_this = this;
		},
		onShow:function(){
			if (!this.hasLogin) {
				//false 未登录
				setTimeout(() => {
					uni.showModal({
						title: "发布提示",
						content: "登录后方可发布任务，是否前往登陆？",
						cancelText: "否",
						confirmText: "是",
						success: res => {
							if (res.confirm) {
								uni.navigateTo({
									url: "/pages/login/login"
								});
							} else if (res.cancel) {
								uni.switchTab({
									url: "/pages/index/index"
								});
							}
						}
					});
				}, 1000);
			}
		},
		onLoad: function() {
			uni.request({
				url: this.$host + "getTtime",
				method: "GET",
				success: e => {
					_this.ttimelist = e.data;
					//console.log(_this.ttimelist);
				}
			});
			uni.request({
				url: this.$host + "getEtime",
				method: "GET",
				success: e => {
					_this.etimelist = e.data;
					//console.log(_this.etimelist);
				}
			});
			uni.request({
				url: this.$host + "getCate",
				method: "GET",
				success: e => {
					_this.tasktype = e.data;
					//console.log(e.data);
				}
			});
		},
		data() {
			return {
				svpercent: 0.08,
				radio: null,
				ptipsinfo: null,
				pmodaltips: null,
				textinfo: "",
				imginfo: "",
				dolist: [],
				dateString1: "",
				dateString2: "",
				aindex: -1,
				bindex: -1,
				cindex: -1,
				dindex: -1,
				eindex: -1,
				tasktype: [],
				phonelist: ["全部", "苹果", "安卓"],
				ttimelist: [{ id: 0, time: "30分钟" }],
				etimelist: [{ id: 0, time: "自动通过" }],
				switchD: false,
				num: null,
				price: null,
				modalName: null,
				taskallinfo: {},
				next: true,
				con: "",
				loadModal: false
			};
		},
		methods: {
			LoadModal(res) {
				this.loadModal = true;
				setTimeout(() => {
					this.loadModal = false;
					if (!res.data) {
						this.showtips(res.msg);
					}
				}, 2000);
			},
			check(e) {
				//正则表达式
				//console.log(e.detail.value)
				e.detail.value >= 0.2 ? e.detail.value : null;
				e.detail.value =
					e.detail.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
				//重新赋值给input
				this.$nextTick(() => {
					this.price = e.detail.value;
				});
			},
			validate(val) {
				//console.log(val)
				/*taskallinfo:type,phone,title,keyword,explain,start_time,end_time,limit_time,check_time,isrepeat,price,num,totalmoney,dolist,agree
				 */
				//遍历数据对象
				var arr1 = [],
					arr2 = [];
				Object.keys(val).forEach(function(key) {
					arr1.push(key);
					arr2.push(val[key]);
				});
				var rules = [
					{
						val: "catid",
						msg: "请选择任务类型！"
					},
					{
						val: "phone",
						msg: "请选择支持设备！"
					},
					{
						val: "title",
						msg: "请输入任务标题！"
					},
					{
						val: "keyword",
						msg: "请输入项目关键词！"
					},
					{
						val: "explain",
						msg: "请输入任务说明！"
					},
					{
						val: "start_time",
						msg: "请选择开始时间！"
					},
					{
						val: "end_time",
						msg: "请选择结束时间！"
					},
					{
						val: "ttimeid",
						msg: "请选择任务限时！"
					},
					{
						val: "etimeid",
						msg: "请选择审核时间！"
					},
					{
						val: "price",
						msg: "请输入悬赏单价！"
					},
					{
						val: "num",
						msg: "请输入悬赏数量！"
					},
					{
						val: "radio",
						msg: "请阅读规则并确认同意！"
					}
				];
				for (var i = 0; i < rules.length; i++) {
					if (
						arr1.indexOf(rules[i].val) == -1 &&
						this.next !== false
					) {
						//开关打开
						this.showtips(rules[i].msg);
						this.next = false; //开关关闭 不往下执行
					} else {
						this.con = i; //信息全部正确
						//	console.log(this.con)
					}
					if (this.next == false) {
						this.next = true; //打开开关 并终止循环 下一次重新循环验证
						break;
					} else {
						continue;
					}
				}
			},
			ruleTo(e) {
				//console.log(e.currentTarget.dataset.url)
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				});
			},
			addform(e) {
				//console.log(this.taskallinfo);
				this.taskallinfo.dolist = JSON.stringify(this.dolist); //对象数组 转为json格式 后台再转为数组格式
				var _this = this;
				uni.getStorage({
					key: "userinfo",
					success: function(res) {
						_this.taskallinfo.uid = res.data.uid;
						_this.taskallinfo.titleimg = res.data.avator;
					}
				});
				this.validate(this.taskallinfo); //验证数据对象的内容
				if (this.con == "11") {
					this.showModal(e); //验证完毕 无误 打开支付窗口
				} else {
					console.log("验证有误");
				}
			},
			wxPay() {
				// var res = {data:false,msg:'赏金余额不足!请先充值赏金'};
				// setTimeout(()=>{
				// 	this.LoadModal(res);
				// },500)
				uni.request({
					header: {
						"content-type": "application/x-www-form-urlencoded"
					},
					url: this.$host + "add",
					method: "POST",
					data: this.taskallinfo,
					success: e => {
						if (e.data.code == 1) {
							this.showtips("发布成功");
						} else {
							// uni.showModal({
							// 	content: e.data.msg,
							// 	showCancel: false
							// });
						}
					},
					fail: e => {
						uni.showModal({
							content: JSON.stringify(e),
							showCancel: false
						});
					}
				});
			},
			RadioChange(e) {
				this.radio = e.detail.value;
				this.taskallinfo.radio = this.radio; //需要验证是否同意
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null;
			},
			submitinfo(val) {
				if (this.dolist.length < 9) {
					if (val == "textinfo") {
						//console.log(this.textinfo);
						if (this.textinfo.length < 1) {
							uni.showToast({
								icon: "none",
								title: "步骤不能为空！"
							});
						} else {
							this.dolist.push({
								type: "0",
								content: this.textinfo
							});
							this.textinfo = "";
						}
					} else {
						this.dolist.push({
							type: "1",
							content: this.imginfo
						});
					}
				} else {
					this.showtips("任务步骤不得超过9条！");
				}
			},
			showtips(val) {
				this.pmodaltips = "tips";
				this.ptipsinfo = val;
				setTimeout(() => {
					this.pmodaltips = null;
				}, 1000);
			},
			itemChange(e, index) {
				//当前选择项是否激活
				switch (e.currentTarget.id) {
					case "tasktype":
						//console.log(index) 在任务类型中的索引
						this.aindex = index;
						//this.taskallinfo.type = this.tasktype[index]; //选项存到数据对象中
						this.taskallinfo.catid = this.tasktype[index].catid;
						//console.log(this.taskallinfo);
						break;
					case "phonelist":
						this.bindex = index;
						this.taskallinfo.phone = this.phonelist[index]; //选项存到数据对象中
						//console.log(this.taskallinfo);
						break;
				}
			},
			selectDatePicker(val) {
				this.$refs[val].show();
			},
			dateTimeChange(val, date) {
				if (date == "date1") {
					this.dateString1 = val; //这是日期时间  需要获取时间戳
					this.taskallinfo.start_time = SOtime.time4(val) / 1000; //换算为10位
				} else {
					this.dateString2 = val;
					this.taskallinfo.end_time = SOtime.time4(val) / 1000;
					//console.log(SOtime.time4(val)) // 1593790157203 number
				}
			},
			PickerChange(e) {
				switch (e.currentTarget.id) {
					case "ttime":
						this.cindex = e.detail.value;
						this.taskallinfo.ttimeid = this.ttimelist[
							e.detail.value
						].id;
						break;
					case "etime":
						this.dindex = e.detail.value;
						this.taskallinfo.etimeid = this.etimelist[
							e.detail.value
						].id;
						break;
				}
			},
			SwitchBtn(e) {
				this.switchD = e.detail.value;
				this.taskallinfo.isrepeat = e.detail.value;
			},
			ChooseImage() {
				var that = this;
				uni.chooseImage({
					count: 1, //默认9  每次一张
					sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album"], //从相册选择
					success: res => {
						that.imginfo = res.tempFilePaths[0];
						// 上传图片
						// 做成一个上传对象
						var uper = uni.uploadFile({
							// 需要上传的地址
							url: that.$host + "upimg",
							// filePath  需要上传的文件
							filePath: that.imginfo,
							name: "file",
							success: res1 => {
								// 显示上传信息
								that.imginfo = res1.data; //在数据库中 content字段的 字符串
								//console.log(that.imginfo)
								that.showtips("上传成功，已加入步骤流程！");
								that.submitinfo("imginfo"); //执行步骤添加
							},
							fail: e => {}
						});
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
					title: "发布者大人",
					content: "确定要删除该步骤吗？",
					cancelText: "取消",
					confirmText: "确定",
					success: res => {
						if (res.confirm) {
							var i = e.currentTarget.dataset.index;
							if (_this.dolist[i].type == "1") {
								uni.request({
									url: _this.$host + "delimg",
									method: "POST",
									data: JSON.stringify(
										_this.dolist[i].content
									),
									success: res => {
										console.log(res.data);
										this.dolist.splice(i, 1); //从数组中删除一位
									},
									fail: res => {
										console.log(res.data);
									}
								});
							}
						}
					}
				});
			}
		}
	};
</script>

<style>
	@import url("./add.css");
</style>
