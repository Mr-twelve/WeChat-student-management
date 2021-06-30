const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    tabbar:0,
  },

  onLoad: function (options) {
    var self=this
    wx.getStorage({
      key: 'lsjl',
      success(res) {
        console.log(res.data)
        var qinjia = res.data.qinjia.reverse()
        console.log(qinjia)
        self.setData({
          qinjia: qinjia,
          student: res.data
        })
        var huodong = res.data.huodong
        db.collection('huodong').where({
          _id: _.in(huodong)
        })
          .get({
            success(res) {
              console.log(res.data)
              self.setData({
                huodong: res.data
              })
            },
            fail: console.error
          })
      }
    })
  },
  qinjia(e){
    this.setData({
      tabbar:0
    })
  },
  huodong(e) {
    this.setData({
      tabbar: 1
    })
  },

})