const db = wx.cloud.database()
const dayjs = require('dayjs');
Page({
  data: {
    date1: "2019-10-01",
    date2: "2019-10-01",
    time1: "12:00",
    time2: "12:00",
  },
  onLoad: function (options) {
    this.setData({
      date1: dayjs().format('YYYY-MM-DD'),
      date2: dayjs().format('YYYY-MM-DD'),
      banji: options.banji
    })
  },
  bindTimeChange1: function (e) {
    this.setData({
      time1: e.detail.value
    })
  },
  bindTimeChange2: function (e) {
    this.setData({
      time2: e.detail.value
    })
  },
  bindDateChange1: function (e) {
    this.setData({
      date1: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    this.setData({
      date2: e.detail.value
    })
  },
  go(res){
    console.log(res)
    wx.showLoading({
      title: '发布中...',
    })
    var that=this
    var starttime = that.data.date1 + ' ' + that.data.time1
    var endtime = that.data.date2 + ' ' + that.data.time2
    db.collection('chaqin').add({
      data: {
        caozuo:[],
        banji: that.data.banji,
        starttime: dayjs(starttime).format('YYYY-MM-DD HH:mm'),
        endtime: dayjs(endtime).format('YYYY-MM-DD HH:mm'),
        people:[]
      },
      success: function (res) {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '发布成功',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                url: '../../banjiguanli/banjiguanli',
              })
            }
          }
        })
        console.log(res)
      },
      fail: console.error
    })  
  },
})