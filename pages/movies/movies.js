const util = require('../../utils/util.js')
let app = getApp(); 
Page({
	data:{
		inTheaters: {},
		comingSoon: {},
		searchResult: {},
		top250: {},
		containerShow: true,
		searchPanelShow: false

	},
	onLoad: function (event) {
		let inTheatersUrl = app.globalData.doubanBase +"/v2/movie/in_theaters" + "?start=0&count=3";
    	let comingSoonUrl = app.globalData.doubanBase +"/v2/movie/coming_soon" + "?start=0&count=3";
		let top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";
		this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
		this.getMovieListData(comingSoonUrl,"comingSoon","即将上映");
		this.getMovieListData(top250Url, "top250","豆瓣Topic250");
		
		
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
				that.handleData(res.data,settedKey,Title);
			},
			fail: function(error){

			}


		})
	},
	handleData(data,key,titleName){
		let list = data.subjects;
		let movies = [];
		let title = '';
		for(let item of list){
			if(item.title.length>=6){
				title = item.title.substring(0,6)+"...";
			}else{
				title = item.title;
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
			movies: movies,
			titleName: titleName
		};
		this.setData(readyData);
	},
	onMoreTap(event){
		var titleName = event.currentTarget.dataset.titlename;
		wx.navigateTo({
			url: "more-movie/more-movie?titleName=" + titleName
		})
	},
	onBindFocus(event){
		this.setData({
			containerShow: false,
			searchPanelShow: true,
		})
	},
	onBindConfirm(event){

		let  text = event.detail.value;
		let  searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
		this.getMovieListData(searchUrl,"searchResult","");
	},
	cancelSearch(event){
		this.setData({
			containerShow: true,
			searchPanelShow: false,
		})
	},
	onMovieTap(event){
		var movieId= event.currentTarget.dataset.movieid;
		wx.navigateTo({
			url: "movie-detail/movie-detail?id=" + movieId
		})
	},

	
})