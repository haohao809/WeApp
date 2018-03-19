// pages/movies/more-movie/more-movie.js
let app = getApp()
let util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle: "",
    movies: [],
    totalCount: 0,
    flag : true,
    reqUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let name = options.titleName;
    this.data.navigateTitle = name;
    console.log(name);
    let url = "";
    switch(name){
      case "正在热映":
      url = app.globalData.doubanBase + '/v2/movie/in_theaters';
      break;
      case "即将上映":
      url = app.globalData.doubanBase + '/v2/movie/coming_soon';
      break;
      case "豆瓣Topic250":
      url = app.globalData.doubanBase + '/v2/movie/top250'
      break;
    }
    this.data.reqUrl = url;
    util.http(url,this.callback)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (event) {
      wx.setNavigationBarTitle({
        title:  this.data.navigateTitle,
        success: function(res) {

        }
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  callback(res){
    console.log(res);
    let list = res.data.subjects;
    console.log(list);
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
    let totalMovies = [];
    if(!this.data.flag){
    	 totalMovies = this.data.movies.concat(movies);
    }else{
    	 totalMovies = movies;
    	 this.data.flag = false;
    }
    this.setData({movies:totalMovies});
    this.data.totalCount += 20;
    console.log(this.data.totalCount);
    
  },
  onScroll(event){
  	 console.log('scroll');
  	 let nextUrl =  this.data.reqUrl + '?start=' + this.data.totalCount + '&count=20';
  	 util.http(nextUrl,this.callback)
  }
})