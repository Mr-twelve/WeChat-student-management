const db = wx.cloud.database()
Page({
  data: {

  },
  onLoad(e) {
    console.log(e)
    this.setData({
      banji:e.banji
    })
    wx.showLoading({
      title: '查询中...',
    })
    this.gethuodong()
  },
  gethuodong(e) {
    var self = this
    db.collection('huodong').where({
    }).get({
      success: function (res) {
        console.log(res)
        self.setData({
          huodong: res.data.reverse()
        })
        wx.hideLoading()
      }
    })
  },
  xuesheng: function (e) {
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: 'xuesheng/xuesheng?id=' + e.currentTarget.id + '&banji=' + this.data.banji,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  
})