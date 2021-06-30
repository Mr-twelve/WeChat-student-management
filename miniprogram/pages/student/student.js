var QQMapWX = require('../util/map/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    student:null,
  },
  onLoad: function(options) {
    var self=this
    wx.getStorage({
      key: 'student',
      success(res) {
        console.log(res)
        self.setData({
          student: res.data
        })
      }
    })  
  },
  zaixiao: function() {
    wx.navigateTo({
      url: '../zaixiao/zaixiao',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  jiangcheng: function() {
    wx.navigateTo({
      url: '../jiangcheng/jiangcheng',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  dongtai:function(){
    wx.navigateTo({
      url: '../dongtai/dongtai',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  fankui:function(){
    wx.navigateTo({
      url: '../fankui/fankui',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  baoming:function(){
    wx.navigateTo({
      url: '../baoming/baoming',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  txlu: function () {
    var banji = this.data.student.banji
    wx.navigateTo({
      url: '../txlu/txlu?banji='+banji,
    })
  },
  wocanjia:function(){
    wx.navigateTo({
      url: '../wocanjia/wocanjia',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  banjiguanli: function () {
    wx.navigateTo({
      url: '../banjiguanli/banjiguanli?banji=' + this.data.student.banji,
    })
  },
  banjihuodong: function () {
    wx.navigateTo({
      url: '../banjihuodong/banjihuodong?banji=' + this.data.student.banji,
    })
  },
})