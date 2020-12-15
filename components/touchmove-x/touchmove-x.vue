<template>
	<view @touchend="utils.touchend" @touchmove="utils.touchmove" @touchstart="utils.touchstart" class="touchmove-x"
	 :data-identifier="identifier" :data-stop-move-left="stopMoveLeft" :data-stop-move-right="stopMoveRight"
	 :data-threshold="threshold" :data-touchable="touchable">
		<slot></slot>
	</view>
</template>

<script module="utils" lang="wxs" src="./utils.wxs"></script>

<script>
	export default {
		props: {
			threshold: {
				type: Number,
				value: 150
			},
			touchable: {
				type: Boolean,
				value: true
			},
			stopMoveLeft: {
				type: Boolean,
				value: 1
			},
			stopMoveRight: {
				type: Boolean,
				value: 1
			}
		},
		data() {
			return {

			};
		},
		methods: {
			emitMoveXEvent: function(e) {
				this.$emit("moveX", e);
			}
		}
	}
</script>

<style lang="scss">
	.touchmove-x {
		width: 100%;
		height: 100%;
	}
</style>
