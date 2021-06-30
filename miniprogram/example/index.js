const db = wx.cloud.database()
Page({

   onLoad(e) {
    var self = this
    wx.showLoading({
      title: '请稍后...',
    })
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        self.setData({
          openid: res.result.openid
        })
        db.collection('student').where({
          _openid: res.result.openid
        }).get({
          success: function (take) {
            if (take.data.length != 0) {
              wx.setStorage({
                key: "student",
                data: take.data[0],
                success(e) {
                  wx.redirectTo({
                    url: '../pages/student/student?',
                  })
                  wx.hideLoading()
                }
              })
            } else {
              db.collection('worker').where({
                _openid: res.result.openid
              }).get({
                success: function (workertake) {
                  if (workertake.data.length != 0) {
                    wx.redirectTo({
                      url: '../pages/guanli/guanli?',
                    })
                    wx.hideLoading()
                  } else {
                    wx.hideLoading()
                  }
                }
              })
            }
          }
        })
      },
    })
  }, 
  tiaokuan: function () {
    wx.navigateTo({
      url: '../pages/tiaokuan/tiaokuan',
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },
  login: function (e) {
    var openid = this.data.openid
    console.log(e.detail.value)
    if (e.detail.value.xuehao.length == 11) {
      if (e.detail.value.mima.length != 0) {
        wx.showLoading({
          title: '登陆中...',
        })
        db.collection('worker').where({
          zhanghao: e.detail.value.xuehao,
          mima: e.detail.value.mima
        }).get({
          success: function (res) {
            if (res.data.length != 0) {
              wx.cloud.callFunction({
                // 要调用的云函数名称
                name: 'addopenid',
                // 传递给云函数的参数
                data: {
                  name: 'worker',
                  id: res.data[0]._id,
                  openid: openid
                },
                success: res => {
                  wx.hideLoading()
                  wx.navigateTo({
                    url: '../pages/guanli/guanli?',
                  })
                },
              })
            } else {
              db.collection('student').where({
                xuehao: e.detail.value.xuehao,
                mima: e.detail.value.mima
              }).get({
                success: function (take) {
                  console.log(take.data)
                  if (take.data.length != 0) {
                    wx.cloud.callFunction({
                      // 要调用的云函数名称
                      name: 'addopenid',
                      // 传递给云函数的参数
                      data: {
                        name: 'student',
                        id: take.data[0]._id,
                        openid: openid
                      },
                      success: res => {
                        wx.setStorage({
                          key: "student",
                          data: take.data[0],
                          success(e) {
                            wx.hideLoading()
                            wx.navigateTo({
                              url: '../pages/student/student?',
                            })
                          }
                        })
                      },
                    })
                  } else {
                    wx.hideLoading()
                    wx.showToast({
                      title: '请检查学号与密码',
                      icon: 'none'
                    })
                  }
                }
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '请输入密码',
          icon: 'none'
        })
      }
    } else {
      wx.showToast({
        title: '请输入正确学号',
        icon: 'none'
      })
    }

  }

});