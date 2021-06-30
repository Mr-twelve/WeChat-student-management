// miniprogram/pages/dwbg/golook/golook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    people:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this
    console.log(options.day)
    self.setData({
      day:options.day
    })
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'get-dingweiyc',
      // 传递给云函数的event参数
      data: {
       day:options.day
      }
    }).then(res => {
     console.log(res)
     self.setData({
       people:res.result.data,
     })
    }).catch(err => {
      // handle error
    })
  },

  
})