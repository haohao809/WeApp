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
			url: "arcitle-detail/arcitle-detail?id=" + postId
		})
	}
})