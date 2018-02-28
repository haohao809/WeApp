var Data = require('../../data/article-data.js')
Page({
  data:{
  	 postId: 0,
  },
	onLoad: function () {
		this.setData({
			postList:Data.postList
		});
		var articleReadNum = wx.getStorageSync('article_num')
		if(articleReadNum){
			for(var j=0; j<Data.postList.length;j++){
				for(var o in articleReadNum){
					if(parseInt(o) === Data.postList[j].postId){
						this.data.postList[o].reading = articleReadNum[o]
						this.setData({
							postList:this.data.postList
						});	
					  // console.log('this.data.postList[o].reading',this.data.postList[o].reading) 					
					}
				}
			}	
			console.log(this.data.postList);
		}else{
			var articleReadNum = {}
			var list = Data.postList;
			console.log(list);
			for (var i = list.length - 1; i >= 0; i--) {
				articleReadNum[list[i].postId] = list[i].reading;
			}
			console.log(articleReadNum);
			wx.setStorageSync('article_num',articleReadNum);
		}
	},
	//页面跳转 
	onShow: function() {
		var articleReadNum = wx.getStorageSync('article_num')
		if(articleReadNum){
			for(var j=0; j<Data.postList.length;j++){
				for(var o in articleReadNum){
					if(parseInt(o) === Data.postList[j].postId){
						this.data.postList[o].reading = articleReadNum[o]
						this.setData({
							postList:this.data.postList
						});	
					  // console.log('this.data.postList[o].reading',this.data.postList[o].reading) 					
					}
				}
			}
		}	
	},
	itemDetail: function(event){
		console.log(this.postId);
		this.postId = event.currentTarget.dataset.postid;
		this.setData({
			postId : this.postId
		})
		this.saveStorage(this.postId);
		wx.navigateTo({
			url: "article-detail/article-detail?id=" + this.postId
		})
	},
	onSwiperTap: function(event){
		this.postId = event.target.dataset.postid;
		this.setData({
			postId : this.postId
		})
		this.saveStorage(this.postId);
		wx.navigateTo({
			url: "article-detail/article-detail?id=" + this.postId
		})
	},
	saveStorage: function(id){
		var articleReadNum = wx.getStorageSync('article_num');
		articleReadNum[id]++;
		wx.setStorageSync('article_num',articleReadNum);
	}
}) 