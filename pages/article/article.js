var Data = require('../../data/article-data.js')
Page({
  data:{

  },
	onLoad: function () {
		this.setData({
			postList:Data.postList
		});
	},
	itemDetail: function(event){
		let postId = event.currentTarget.dataset.postid;
		wx.navigateTo({
			url: "article-detail/article-detail?id=" + postId
		})
	},
	onSwiperTap: function(event){
		let postId = event.target.dataset.postid;
		wx.navigateTo({
			url: "article-detail/article-detail?id=" + postId
		})
	}
}) 