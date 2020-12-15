<template>
	<view class="container" :style="'padding-top: ' + CustomBar + 'px;'">
		<cu-custom bgColor="bg-gradual-red shadow-blur" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">优惠</block>
		</cu-custom>
		<view v-for="v in wallpaper" :key="v._id">
			<image class="bg-grey" :src="v.image_url" mode="aspectFill" @click="previewImg(v.image_url)"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				wallpaper: [],
			}
		},
		onLoad() {
			this.getWallpaper();
		},
		methods: {
			getWallpaper() {
				uniCloud.callFunction({
						name: 'getwallpaper'
					})
					.then(res => {
						this.wallpaper = res.result.data;
					});
			},
			previewImg(current) {
				uni.previewImage({
					current,
					urls: this.wallpaper.map(item => item.image_url),
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
		}
	}
</script>

<style>
	.container {
		overflow: hidden;
	}

	.container view {
		float: left;
	}

	.container image {
		width: 230upx;
		height: 472rpx;
		margin: 10rpx;
	}
</style>
