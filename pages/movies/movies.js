
let app = getApp(); 
Page({
	onLoad: function (event) {
		let top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";
		this.getMovieListData(top250Url, "top250","豆瓣Topic50");
	},
	getMovieListData: function(url,settedKey, Title){
		let that = this;
		wx.request({
			url: url,
			method: "GET",
			header:{
				"Content-Type":"json"
			},
			success: function(res){
				console.log(res)
			},
			fail: function(error){

			}


		})
	}

	
})