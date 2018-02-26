var postsData = require('../../../data/article-data.js')
var app = getApp();
Page({
	data: {
		isPlayingMusic: false
	},
	onLoad: function(option){
		var postId = option.id;
		this.data.currentPostId = postId;
		let postData =  postsData.postList[postId];
		console.log(app.globalData);
		
		this.setData({
			postData: postData
		})

		var postsCollected = wx.getStorageSync('posts_collected')
		if(postsCollected){
			var postCollected = postsCollected[postId];
			if(postCollected){
				this.setData({
				collected: postCollected
			})
		} 
		} else {
			var postsCollected = {};
			postsCollected[postId] = false;
			wx.setStorageSync('posts_collected',postsCollected);
		}
		if(app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId){
			this.setData({
					isPlayingMusic: true
				})
		}
		this.setMusicMonitor();
	},
	setMusicMonitor: function () {
		var that = this;
		wx.onBackgroundAudioPlay(function (event) {
				that.setData({
					isPlayingMusic: true
				})

			app.globalData.g_isPlayingMusic = true;
			app.globalData.g_currentMusicPostId = that.data.currentPostId;
		});
		wx.onBackgroundAudioPause(function(){
			that.setData({
					isPlayingMusic: false
			})
			app.globalData.g_isPlayingMusic = false;
			app.globalData.g_currentMusicPostId = null;
		})
	},

  	//收藏、分享
	onColletionTap: function (event){
		this.getPostsCollectedAsy();
	},
	getPostsCollectedAsy: function(){
		var that = this;
		wx.getStorage({
			key: "posts_collected",
			success: function (res) {
				var postsCollected = res.data;
				var postCollected = postsCollected[that.data.currentPostId];

				postCollected = !postCollected;
				postsCollected[that.data.currentPostId] = postCollected;

				that.showToast(postsCollected,postCollected);
			}

		})

	},
	showToast:function(postsCollected,postCollected){
		wx.setStorageSync('posts_collected', postsCollected);

		this.setData({
			collected: postCollected
		}) 

		wx.showToast({
			title: postCollected ? "收藏成功" : "取消成功",
			duration: 1000,
			icon: "success"
		})
	},
	onShareTap: function(event){
		var list = [
			"分享到微信好友",
			"分享到朋友圈", 
			"分享到QQ",
			"分享到微博"
		];
		wx.showActionSheet({
			itemList: list,
			itemColor: "#405f80",
			success: function(res) {
				wx.showModal({
					title: "用户 " + list[res.tapIndex],
					content: "用户是否取消？"
				})
			}
		})
	},
  //音乐播放
  onMusicTap: function(){
  	var currentPostId = this.data.currentPostId;
  	var data = postsData.postList[currentPostId];
  	var isplayingMusic = this.data.isplayingMusic;
  	if(isplayingMusic){
  		wx.pauseBackgroundAudio();
  		this.setData({
  			isPlayingMusic: false
  		})
  		app.globalData.g_isPlayingMusic = false;
  	}
  	else{
  		wx.playBackgroundAudio({
  			dataUrl:data.music.url,
  			title: data.music.title,
  			coverImgUrl: data.music.coverImg,
  		})
  		this.setData({
  			isPlayingMusic: true
  		})
  		app.globalData.g_isPlayingMusic = true;
  		app.globalData.g_currentMusicPostId = this.data.currentPostId;
  	}
  }

})