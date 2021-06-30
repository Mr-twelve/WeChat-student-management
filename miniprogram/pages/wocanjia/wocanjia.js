const db = wx.cloud.database()
const _ = db.command
Page({

  data: {

  },

  onLoad: function(options) {
    wx.showLoading({
      mask: true,
      title: '查询中...',
    })
    var self = this
    wx.getStorage({
      key: 'student',
      success(res) {
        console.log(res.data._id)
        db.collection('student').doc(res.data._id).get({
          success: function (res) {
            db.collection('huodong').where({
              _id: _.in(res.data.huodong)
            })
              .get({
                success(res) {
                  console.log(res.data)
                  self.setData({
                    huodong:res.data
                  })
                  wx.hideLoading()
                },
                fail: console.error
              })
          }
        })
        console.log(res.data)
      }
    })
    /*  */
  },

})