<template>
	<view>
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">日志</view>
		</cu-custom>
		<view class="cu-timeline">
			<view class="cu-item text-red" v-for="v in log" :key="v._id">
				<view class="bg-gradual-red content shadow">
					<view class="cu-capsule radius">
						<view class="cu-tag bg-white text-red">{{v.badge}}</view>
						<view class="cu-tag line-white">{{v.badgeText}}</view>
					</view>
					<view class="margin-top-sm text-content">{{v.content}}</view>
					<view class="margin-top-sm text-content flex justify-around">
						<view class="text-xxl" @click="clickEvent(v._id,'good')" hover-class="icon-hover-small">
							<text class="lg text-gray cuIcon-appreciate"></text>
						</view>
						<view class="text-xxl rotate-180" @click="clickEvent(v._id,'bad')" hover-class="icon-hover-small-rotate">
							<text class="lg text-gray cuIcon-appreciate"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				ColorList: this.ColorList,
				log: []
			}
		},
		onLoad() {
			this.getLog();
		},
		methods: {
			getLog() {
				uniCloud.callFunction({
						name: 'log'
					})
					.then(res => {
						this.log = res.result.data;
					});
			},
			clickEvent(logId, opera) {
				uni.showLoading({
					title: "正在连接服务器",
					mask: true
				})
				const user = uni.getStorageSync("token");
				if (user) {
					uniCloud.callFunction({
							name: 'evaluation',
							data: {
								logId,
								opera,
								user
							}
						})
						.then(res => {
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: res.result.msg
							})
						}).catch(() => {
							uni.hideLoading();
							uni.showToast({
								icon: '状态不佳，请稍后再试~',
								title: res.result.msg
							})
						})
				} else {
					uni.showToast({
						icon: 'none',
						title: '状态不佳，请稍后再试~'
					})
				}
			},
			pageBack() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>
	page {
		background: #fff;
	}

	.rotate-180 {
		transform: rotate(180deg);
	}

	.icon-hover-small {
		transform: scale(0.8);
		transition: all .2s;
	}

	.icon-hover-small-rotate {
		transform: rotate(180deg) scale(0.8);
		transition: all .2s;
	}
</style>
