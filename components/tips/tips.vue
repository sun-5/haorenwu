<template>
	<view>
		<view class="cu-modal" :class="modaltips=='tips'?'show':''">
			<view class="cu-dialog">

				<view class="padding-xl">
					{{tipsinfo}}
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props:['tipsinfo','modaltips'],
		data() {
			return {

			};
		},
		computed:{
 
		},
		methods:{
 
		}
	}
</script>

<style scoped>
.cu-dialog{
	 max-width: 80%;
 }
</style>
