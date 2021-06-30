const db = wx.cloud.database()
Page({

  data: {

  },

  onLoad: function (options) {
    wx.getStorage({
      key: 'student',
      success(res) {
        db.collection('student').doc(res.data._id).get({
          success: function (res) {
            wx.setStorage({
              key: "student",
              data: res.data,
            })
            console.log(res.data)
          }
        })
      }
    })
  },

  onReady: function () {

  },

  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },

  back:function(){
    wx.redirectTo({
      url: '../student/student',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})