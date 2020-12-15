<template>
	<touchmove-x @moveX="onTouchmoveX">
		<view class="bg-gradual-purple container">
			<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
				<cu-custom bgColor="bg-gradual-red shadow-blur" :isHead="true" @onHeadClick="showModal('viewModal')">
					<block slot="backText">返回</block>
					<block slot="content">优惠</block>
				</cu-custom>

				<view>
					<swiper v-if="banner.length" class="screen-swiper round-dot" indicator-active-color="#f37b1d" :indicator-dots="true"
					 :circular="true" :autoplay="true" interval="5000" duration="500">
						<swiper-item v-for="(item,index) in banner" :key="item._id" :data-link="item.url" @click="bannerEvent($event,item)">
							<image :src="item.icon" mode="aspectFill" :alt="item.name"></image>
						</swiper-item>
					</swiper>
					<view v-if="list.length" class="VerticalBox">
						<scroll-view class="VerticalNav nav bg-white" scroll-y scroll-with-animation :scroll-top="verticalNavTop" :style="verticalStyle">
							<view class="cu-item" :class="item._id==tabCur?'text-green cur':'text-black'" v-for="(item,index) in list" :key="index"
							 @tap="TabSelect" :data-id="item._id">
								{{item.name}}
							</view>
						</scroll-view>
						<scroll-view class="VerticalMain" scroll-y scroll-with-animation :style="verticalStyle" :scroll-into-view="'main-'+mainCur"
						 @scroll="VerticalMain">
							<view class="padding-top padding-lr" v-for="(item,index) in list" :key="item._id" :id="'main-'+item._id">
								<view class="cu-bar solid-bottom bg-white">
									<view class="action cp-title">
										<image class="cu-avatar margin-tb-xs margin-right-sm bg-white" style="margin-left: 0;" :src="item.icon" mode="aspectFit"></image>
										<view class="text-cut">{{item.name}}</view>
									</view>
								</view>
								<view class="cu-list menu-avatar">
									<view class="cu-card case" v-for="v in item.list" :key="v._id" @click="toCoupon(v)">
										<view class="cu-item shadow" style="margin: 10rpx 0;">
											<view v-if="!v.isNameMask" class="padding-sm flex flex-direction text-black">{{v.name || "无名"}}</view>
											<view class="image padding-sm">
												<image :src="v.banner" mode="widthFix"></image>
												<view v-if="v.isTipMask" class="cu-tag bg-yellow">{{v.tip || "天天可领"}}</view>
												<view v-if="v.isNameMask" class="cu-bar bg-shadeBottom"> <text class="text-cut">{{v.name || "无名"}}</text></view>
											</view>
											<view class="cu-list menu-avatar">
												<view v-if="!v.isTipMask" class="padding-sm text-black">
													<view class="cu-tag bg-yellow round">{{v.tip || "天天可领"}}</view>
												</view>
												<view class="padding-lr flex flex-direction">
													<button class="cu-btn bg-red margin-tb-sm lg">{{v.btn-text || "免费领取"}}</button>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<view v-else-if="poetry.origin" class="text-black text-center">
						<view class="text-bold padding text-xxl">「{{poetry.origin.title}}」</view>
						<view class="text-gray padding-sm">{{poetry.origin.author}}({{poetry.origin.dynasty}})</view>
						<view class="text-xl text-center padding-lg" v-html="poetry.decodeContent"></view>
						<button class="cu-btn bg-green margin-tb-xs lg" open-type="share">分享给好友</button>
					</view>
					<view v-else class="load-progress" :class="loadProgress!=0?'show':'hide'" :style="[{top:CustomBar+'px'}]">
						<view class="load-progress-bar bg-yellow" :style="[{transform: 'translate3d(-' + (100-loadProgress) + '%, 0px, 0px)'}]"></view>
						<view class="load-progress-spinner text-yellow"></view>
					</view>
				</view>

			</scroll-view>
			<view class="DrawerClose" :class="modalName=='viewModal'?'show':''" @tap="hideModal">
				<text class="cuIcon-pullright"></text>
			</view>
			<scroll-view scroll-y class="DrawerWindow" :class="modalName=='viewModal'?'show':''">
				<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
					<scroll-view scroll-y class="scrollPage">
						<view class="UCenter-bg" :style="bing.url ? 'background-image: url(https://www.bing.com'+bing.url+');' : ''">
							<view class="cu-avatar xl round margin-bottom-xl" style="overflow: hidden;">
								<open-data type="userAvatarUrl"></open-data>
							</view>
							<view>
								<open-data type="userNickName"></open-data>&nbsp;（<open-data type="userGender" lang="zh_CN"></open-data>）
							</view>
							<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-mgi5jebkjggoc97760/3f3d8200-36dd-11eb-bd01-97bc1429a9ff.gif"
							 mode="scaleToFill" class="gif-wave"></image>
						</view>
						<view class="padding flex text-center text-grey bg-white shadow-warp">
							<view>{{bing.copyright}}</view>
						</view>
						<view class="cu-list menu">
							<view class="cu-item arrow">
								<navigator class="content" url="/pages/about/moon/moon" hover-class="none">
									<text class="cuIcon-likefill text-red"></text>
									<text class="text-grey">中国探月工程</text>
								</navigator>
							</view>
							<view v-if="open.wallpaper" class="cu-item arrow">
								<navigator class="content" url="/pages/about/wallpaper/wallpaper" hover-class="none">
									<text class="cuIcon-picfill text-blue"></text>
									<text class="text-grey">壁纸</text>
								</navigator>
							</view>
							<view class="cu-item arrow">
								<view class="content" @tap="CopyLink" data-link="https://github.com/delfws/coupons-pro">
									<text class="cuIcon-github text-grey"></text>
									<text class="text-grey">GitHub</text>
								</view>
							</view>
							<view class="cu-item arrow">
								<navigator class="content" url="/pages/about/log/log" hover-class="none">
									<text class="cuIcon-formfill text-green"></text>
									<text class="text-grey">日志</text>
								</navigator>
							</view>
							<view class="cu-item arrow">
								<view class="content" @tap="showQrcode">
									<text class="cuIcon-appreciatefill text-red"></text>
									<text class="text-grey">赞赏支持</text>
								</view>
							</view>
							<view class="cu-item arrow">
								<button class="cu-btn content" open-type="feedback">
									<text class="cuIcon-writefill text-cyan"></text>
									<text class="text-grey">意见反馈</text>
								</button>
							</view>
						</view>
					</scroll-view>
				</view>
			</scroll-view>
			<image v-if="showAddImage" class="fixed-image" src="../../static/tianjiawode.jpg" mode="aspectFit" @click="showAddImage = false"></image>
		</view>
		<view class="music" :style="musicRight ? 'right: '+musicRight+'rpx;':'right: 0;'" @click="toggleMusic">
			<image :src="music[musicIndex].url" mode="aspectFill" :style="musicPlayState ? 'animation: load-progress-spinner 4s linear infinite;' : ''"></image>
			<view class="music-box">
				<view class="text-cut">{{music[musicIndex].name}}</view>
				<view class="text-cut text-gray">{{music[musicIndex].author}}</view>
			</view>
			<text v-if="musicPlayState" class="text-xxl text-white cuIcon-stop"></text>
			<text v-else class="text-xxl text-white cuIcon-playfill"></text>
		</view>
	</touchmove-x>
</template>

<script>
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				modalName: null,
				banner: [],
				list: [],
				bing: {},
				message: [],
				music: [],
				musicIndex: 0,
				musicPlayState: false,
				musicRight: -300,
				innerAudioContext: null,
				timer: null,
				open: {},
				poetry: {},
				tabCur: 1,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				starCount: 0,
				forksCount: 0,
				visitTotal: 0,
				showAddImage: false,
				loadProgress: 0
			};
		},
		computed: {
			verticalStyle() {
				return 'height:calc(100vh' + (this.banner.length == 0 ? '' : ' - 375rpx') + ' - ' + this.CustomBar +
					'px);'
			}
		},
		onLoad() {
			this.LoadProgress();
			const showAddImageTime = uni.getStorageSync("showAddImageTime");
			if (!showAddImageTime) {
				this.showAddImage = true;
				setTimeout(() => {
					this.showAddImage = false;
				}, 10000)
				uni.setStorageSync("showAddImageTime", new Date().getTime())
			}
			this.getOpen();
			this.getPaper();
		},
		onHide() {
			this.stopMusic();
			this.musicPlayState = false;
			this.musicRight = -200;
			if (this.innerAudioContext) this.innerAudioContext.destroy();
			this.innerAudioContext = null;
		},
		onShareAppMessage(res) {
			const message = this.message[Math.floor(Math.random() * this.message.length)];
			return Object.assign({}, message, {
				imageUrl: message.imageUrl
			});
		},
		methods: {
			LoadProgress() {
				this.loadProgress = this.loadProgress + 3;
				if (this.loadProgress < 100) {
					setTimeout(() => {
						this.LoadProgress();
					}, 100)
				} else {
					if (this.open._id)
						this.loadProgress = 0;
				}
			},
			getOpen() {
				uniCloud.callFunction({
						name: 'getopen'
					})
					.then(res => {
						this.open = res.result;
						if (res.result.banner) this.getBanner();
						if (res.result.music) this.getMusic();
						if (res.result.coupons) {
							this.getIndex();
						} else {
							this.getPoetry();
						}
						if (res.result.message) this.getMessage();
					});
			},
			getMusic() {
				uniCloud.callFunction({
						name: 'music'
					})
					.then(res => {
						this.music = res.result.data;
						if (this.music.length) this.playMusic();
					});
			},
			playMusic() {
				if (!this.innerAudioContext) {
					const that = this;
					if (that.timer) {
						clearTimeout(that.timer);
						that.timer = null;
					}
					this.innerAudioContext = uni.createInnerAudioContext();
					this.innerAudioContext.autoplay = true;
					this.innerAudioContext.src = this.music[this.musicIndex].musicUrl;
					this.innerAudioContext.onPlay(() => {
						console.log('开始播放');
						that.musicPlayState = true;
						that.musicRight = 0;
						that.timer = setTimeout(() => {
							that.musicRight = -200;
						}, 3000)
					});
					this.innerAudioContext.onEnded(() => {
						console.log('播放结束');
						if (that.timer) {
							clearTimeout(that.timer);
							that.timer = null;
						}
						console.log('播放销毁');
						that.musicPlayState = false;
						that.musicRight = -200;
						if (that.innerAudioContext) that.innerAudioContext.destroy();
						that.innerAudioContext = null;
						if (that.music.length && that.musicIndex + 1 < that.music.length) {
							that.musicIndex++;
							that.playMusic();
						}
					});
					this.innerAudioContext.onStop(() => {
						console.log('播放销毁');
						that.musicPlayState = false;
						that.musicRight = -200;
						if (that.innerAudioContext) that.innerAudioContext.destroy();
						that.innerAudioContext = null;
					});
					this.innerAudioContext.onError((res) => {
						console.log(res.errMsg);
						console.log(res.errCode);
					});
				} else {
					uni.showToast({
						icon: "none",
						title: "正在准备音乐中..."
					})
				}
			},
			stopMusic() {
				if (this.innerAudioContext) {
					this.innerAudioContext.stop();
				}
			},
			toggleMusic() {
				if (this.musicPlayState) {
					this.stopMusic();
				} else {
					this.playMusic();
				}
			},
			getMessage() {
				uniCloud.callFunction({
						name: 'message'
					})
					.then(res => {

						this.message = res.result.data;
					});
			},
			getPaper() {
				uni.request({
					method: "get",
					url: "https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=5&mkt=zh-CN",
					data: {}
				}).then(([err, res]) => {
					this.bing = res.data.images[Math.floor(Math.random() * res.data.images.length)]
				})
			},
			getBanner() {
				uniCloud.callFunction({
						name: 'banner'
					})
					.then(res => {
						this.banner = res.result.data;
					});
			},
			getIndex() {
				uniCloud.callFunction({
						name: 'index'
					})
					.then(res => {
						this.list = res.result.data;
						if (res.result.data.length) {
							this.tabCur = res.result.data[0]._id
						} else {
							this.getPoetry();
						}
					});
			},
			getPoetry() {
				uni.request({
					method: "get",
					url: "https://v2.jinrishici.com/one.json?client=npm-sdk/1.0&X-User-Token=pZwoGLUwG37WdTgxkCPSJRzb16%2Blk5Sf"
				}).then(([err, res]) => {
					if (err) return
					const content = res.data.data.origin.content.join("<br>");
					const recommendContent = res.data.data.content;
					const index = content.indexOf(res.data.data.content);
					let decodeContent = content;
					if (index > -1) {
						decodeContent =
							content.substring(0, index) +
							"<span style='font-weight: bold;'>" +
							content.substring(index, index + recommendContent.length) +
							"</span>" +
							content.substring(index + recommendContent.length, content.length);
					}
					this.poetry = Object.assign({}, res.data.data, {
						decodeContent
					});
				})
			},
			onTouchmoveX(e) {
				if (e.status == 1) {
					this.showModal('viewModal');
				} else {
					this.hideModal();
				}
			},
			bannerEvent(e, v) {
				if (v.appid) {
					this.toCoupon(v)
				} else {
					this.CopyLink(e)
				}
			},
			CopyLink(e) {
				uni.setClipboardData({
					data: e.currentTarget.dataset.link,
					success: res => {
						uni.showToast({
							title: '已复制',
							duration: 1000,
						})
					}
				})
			},
			showQrcode() {
				uni.previewImage({
					urls: [
						'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-mgi5jebkjggoc97760/c9e023a0-3790-11eb-8a36-ebb87efcf8c0.jpg'
					],
					current: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-mgi5jebkjggoc97760/c9e023a0-3790-11eb-8a36-ebb87efcf8c0.jpg' // 当前显示图片的http链接
				})
			},
			toCoupon(v) {
				if (v.appid) {
					wx.navigateToMiniProgram({
						appId: v.appid,
						path: v.url,
						success(res) {
							// 打开成功
						}
					})
				}
			},
			showModal(e) {
				this.modalName = e
			},
			hideModal(e) {
				this.modalName = null
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				return false //支付宝小程序暂时不支持双向联动
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i]._id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i]._id - 1) * 50
						this.tabCur = this.list[i]._id
						return false
					}
				}
			}
		},
	}
</script>

<style>
	page {
		background-image: var(--gradualBlue);
		width: 100vw;
		overflow: hidden;
	}

	page,
	.container {
		height: 100%;
	}

	.DrawerPage {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0vw;
		background-color: #f1f1f1;
		transition: all 0.4s;
	}

	.DrawerPage.show {
		transform: scale(0.9, 0.9);
		left: 85vw;
		box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
	}

	.DrawerWindow {
		position: absolute;
		width: 85vw;
		height: 100vh;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
		padding: 100upx 0;
	}

	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
	}

	.DrawerClose {
		position: absolute;
		width: 40vw;
		height: 100vh;
		right: 0;
		top: 0;
		color: transparent;
		padding-bottom: 30upx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
		letter-spacing: 5px;
		font-size: 50upx;
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}

	.DrawerClose.show {
		opacity: 1;
		pointer-events: all;
		width: 15vw;
		color: #fff;
	}

	.DrawerPage .cu-bar.tabbar .action button.cuIcon {
		width: 64upx;
		height: 64upx;
		line-height: 64upx;
		margin: 0;
		display: inline-block;
	}

	.DrawerPage .cu-bar.tabbar .action .cu-avatar {
		margin: 0;
	}

	/* .DrawerPage .nav {
		flex: 1;
	} */

	.DrawerPage .nav .cu-item.cur {
		border-bottom: 0;
		position: relative;
	}

	/* .DrawerPage .nav .cu-item.cur::after {
		content: "";
		width: 10upx;
		height: 10upx;
		background-color: currentColor;
		position: absolute;
		bottom: 10upx;
		border-radius: 10upx;
		left: 0;
		right: 0;
		margin: auto;
	} */

	.DrawerPage .cu-bar.tabbar .action {
		flex: initial;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}

	.VerticalMain .cp-title {
		width: 100%;
		justify-content: left;
	}

	.VerticalMain .cp-title image,
	.VerticalMain .cp-title view {
		display: inline-block;
		vertical-align: middle;
	}

	.VerticalMain .cp-title view {
		width: calc(100% - 134rpx);
	}

	.UCenter-bg {
		background-color: #fbbd08;
		background-size: cover;
		height: 550rpx;
		display: flex;
		justify-content: center;
		padding-top: 40rpx;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	}

	.UCenter-bg text {
		opacity: 0.8;
	}

	.UCenter-bg image {
		width: 200rpx;
		height: 200rpx;
	}

	.UCenter-bg .gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	map,
	.mapBox {
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	map,
	.mapBox {
		width: 750rpx;
		height: 300rpx;
	}

	.fixed-image {
		width: 334rpx;
		height: 406rpx;
		position: fixed;
		top: 118rpx;
		right: 48rpx;
		z-index: 2000;
	}

	.music {
		width: 300rpx;
		height: 100rpx;
		padding: 5rpx;
		border-top-left-radius: 50rpx;
		border-bottom-left-radius: 50rpx;
		background-color: #fff;
		box-shadow: 1px 2px 6px #999;
		position: fixed;
		top: 260rpx;
		right: -300rpx;
		z-index: 999;
		transition: right 0.3s;
	}

	.music image,
	.music-box {
		display: inline-block;
		vertical-align: middle;
	}

	.music image {
		width: 90rpx;
		height: 90rpx;
		background-color: #ccc;
		border-radius: 50%;
	}

	.music-box {
		width: 190rpx;
		margin-left: 10rpx;
		line-height: 46rpx;
		overflow: hidden;
	}

	.music text {
		font-size: 44upx;
		position: absolute;
		top: 50%;
		left: 50rpx;
		transform: translate(-50%, -50%);
	}
</style>
