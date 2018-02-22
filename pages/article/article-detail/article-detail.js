var postsData = require('../../../data/article-data.js')
Page({
	onLoad: function(option){
		let postId = option.id;
		this.data.currentPostId = postId;
		let postData =  postsData.postList[postId];
		this.setData({
			postData: postData
		})
	}


})