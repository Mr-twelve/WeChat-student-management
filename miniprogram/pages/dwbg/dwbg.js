const db = wx.cloud.database()
const _ = db.command
const dayjs = require('dayjs');
Page({

  data: {

  },
  onShow: function () {
    day:[]
  },


  onLoad: function(options) {
    var self = this
    var day=[]
    var today=dayjs().format('YYYY-MM-DD')
    var cha=dayjs(today).diff(dayjs('2020-05-09'),'day')
    for(var i=0;i<cha;i++){
      day.push(dayjs().subtract(i, 'day').format('YYYY-MM-DD'))
    }
    self.setData({
      day:day
    })
    console.log(day)
  },
  golook(e) {
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: 'golook/golook?day=' + e.currentTarget.id,
    })
  },

})