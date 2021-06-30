const db = wx.cloud.database()
Page({
  data: {

  },
  onLoad(e){
    wx.showLoading({
      title: '查询中...',
    })
    this.gethuodong()
  },
  gethuodong(e){
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
  xuesheng:function(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../xuesheng/xusheng?id=' + e.currentTarget.id,
    })
  },
  shancu(e){
    var self=this
    wx.showModal({
      title: '提示',
      content: '确定删除该活动？',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'huodong-shanchu',
            data: {
              id: e.currentTarget.id
            },
            success: res => {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
              wx.showLoading({
                title: '活动更新中...',
              })
            },
            fail: err => {
            },
            complete: () => {
              self.gethuodong()
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})