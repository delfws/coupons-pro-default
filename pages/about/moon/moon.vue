<template>
	<view class="container">
		<image class="bg" src="../../../static/moon/backgorund.jpg" mode="aspectFill"></image>
		<image class="moon animation" src="../../../static/moon/pall.png" mode="aspectFit"></image>
		<image class="satellite animation" src="../../../static/moon/satellite.png" mode="aspectFit"></image>
		<!-- <image class="logo animation" src="../../../static/moon/logo.png" mode="aspectFit"></image> -->
		<image class="vehicle animation" src="../../../static/moon/vehicle.png" mode="aspectFit"></image>
		<button class="cu-btn block line-white sm" @click="back"> ·µ»ØµØÇò </button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	[class*=animation] {
		animation-duration: 0.5s;
		animation-timing-function: ease-out;
		animation-fill-mode: both
	}

	.container {
		width: 100%;
		height: 100%;
		position: relative;

		image {
			animation-delay: 1s;
		}

		.bg {
			display: block;
			width: 100%;
			height: 100%;
		}

		.moon {
			width: 260rpx;
			height: 260rpx;
			position: absolute;
			top: 20rpx;
			left: 30rpx;
			animation-name: scale-up;
		}

		.satellite {
			width: 160rpx;
			height: 160rpx;
			position: absolute;
			top: 40rpx;
			right: 30rpx;
			animation-name: slide-left;
		}

		.logo {
			width: 450rpx;
			height: 80rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -80%);
			animation-name: slide-down;
		}

		.vehicle {
			width: 160rpx;
			height: 160rpx;
			position: absolute;
			top: 180rpx;
			left: 30rpx;
			animation-name: slide-right;
		}

		button {
			position: absolute;
			bottom: 20rpx;
			left: 20rpx;
		}
	}

	@keyframes scale-up {
		0% {
			opacity: 0;
			transform: scale(.2)
		}

		100% {
			opacity: 1;
			transform: scale(1)
		}
	}

	@keyframes slide-left {
		0% {
			right: -190rpx;
			top: -200rpx;
			transform: scale(.2)
		}

		100% {
			right: 30rpx;
			top: 40rpx;
			transform: scale(1)
		}
	}

	@keyframes slide-down {
		0% {
			top: 0;
			transform: scale(.2) translate(-50%, -80%)
		}

		100% {
			top: 50%;
			transform: scale(1) translate(-50%, -80%)
		}
	}

	@keyframes slide-right {
		0% {
			top: 180rpx;
			left: 30rpx;
			transform: scale(.2)
		}

		100% {
			top: 280rpx;
			left: 530rpx;
			transform: scale(1)
		}
	}
</style>
