var postsData = require('../../../data/article-data.js')
Page({
	onLoad: function(option){
		let postId = option.id;
		this.data.currentPostId = postId;
		let postData =  postsData.postList[postId];
		this.setData({
			postData: postData
		})

		var postsCollected = wx.getStorageSync('posts_collected')
		if(postsCollected){
			var postCollected = postsCollected[postId];
			this.setData({
				collected: postCollected
			})
		} else {
			var postsCollected = {};
			postsCollected[postId] = false;
			wx.setStorageSync('posts_collected',postsCollected);
		}
	},
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
})