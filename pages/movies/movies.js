const util = require('../../utils/util.js')
let app = getApp(); 
Page({
	data:{
		inTheaters: {},
		comingSoon: {},
		top250: {}
	},
	onLoad: function (event) {
		let inTheatersUrl = app.globalData.doubanBase +"/v2/movie/in_theaters" + "?start=0&count=3";
    	let comingSoonUrl = app.globalData.doubanBase +"/v2/movie/coming_soon" + "?start=0&count=3";
		let top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";
		this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
		this.getMovieListData(comingSoonUrl,"comingSoon","即将上映");
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
				console.log(res);
				that.handleData(res.data,settedKey);
			},
			fail: function(error){

			}


		})
	},
	handleData(data,key){
		let list = data.subjects;
		let movies = [];
		let title;
		for(let item of list){
			if(item.title.length>=6){
				title = item.title.substring(0,6)+"...";
			}
			let obj = {
				stars: util.changeStar(item.rating.stars),
				title: title,
				img: item.images.large,
				score: item.rating.average,
				movieId: item.id
			}
			movies.push(obj);			
		}
		console.log('movies',movies);
		let readyData ={};
		readyData[key] = {
			movies: movies
		};
		this.setData(readyData);
	}

	
})