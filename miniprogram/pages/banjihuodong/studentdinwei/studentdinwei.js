var QQMapWX = require('../../util/map/qqmap-wx-jssdk.js');
const dayjs = require('dayjs');
const db = wx.cloud.database()
const _ = db.command
var qqmapsdk;
Page({
  data: {
    ok: 0,
    latitude: "37.424069",
    longitude: "112.582397",
    scale: 14,
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '拾取定位中...',
    })
    var self = this
    wx.getStorage({
      key: 'student',
      success(res) {
        console.log(dayjs().format('YYYY-MM-DD'))

        var student = [{
          name: res.data.name,
          xuehao: res.data.xuehao,
          banji: res.data.banji,
          id: res.data._id,
          endgetlocat:res.data.endgetlocat,
          endtime:res.data.endtime
        }]
        wx.getSystemInfo({
          success(wz) {
            wx.getLocation({
              type: 'gcj02',
              isHighAccuracy: true,
              highAccuracyExpireTime: 4000,
              success: function (location) {
                //坐标转换
                var qqmapsdk = new QQMapWX({
                  key: 'NBUBZ-MGBC4-2DAUN-D7HIP-MMPXS-HMBUL' // 必填
                });
                qqmapsdk.reverseGeocoder({
                  location: location,
                  success: function (res) { //成功后的回调
                    var getlocat = res.result.address_component.province + res.result.address_component.city + res.result.address_component.district
                    console.log(getlocat);
                    self.setData({
                      /* getlocat: getlocat, 
                      model: wz.model,
                      phone: wz.brand,
                      student: student,
                      id: options.id,
                      latitude: location.latitude,
                      longitude: location.longitude,
                      ok: 1, */
                     getlocat: '山西省朔州市朔城区', 
                      model: wz.model,
                      phone: wz.brand,
                      student: student,
                      id: options.id,
                      latitude: '39.3542640516493',
                      longitude: '112.45176812065972',
                      ok: 1, 
                    }, () => {
                      self.ifinschool()
                    })
                  },
                  fail: function (error) {
                    console.error(error);
                  },
                  complete: function (res) {
                    console.log(res);
                  }
                })
                console.log(location)
              },
              fail: function () {
                wx.hideLoading();
                wx.getSetting({
                  success: function (res) {
                    if (!res.authSetting['scope.userLocation']) {
                      wx.hideLoading()
                      wx.showModal({
                        title: '',
                        content: '请允许获取您的定位',
                        confirmText: '授权',
                        success: function (res) {
                          wx.navigateBack({
                            url: '../../banjihuodong/banjihuodong',
                          })
                        }
                      })
                    } else {
                      wx.hideLoading()
                      //用户已授权，但是获取地理位置失败，提示用户去系统设置中打开定位
                      wx.showModal({
                        title: '',
                        content: '请在系统设置中打开定位服务',
                        confirmText: '确定',
                        success: function (res) {
                          wx.navigateBack({
                            url: '../../banjihuodong/banjihuodong',
                          })
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        })
      }
    })
    console.log(options)
  },
  ifinschool(e) {
    var latitude = this.data.latitude
    var longitude = this.data.longitude
    if (longitude < 112.59149013671875 && longitude > 112.5895043359375 && latitude > 37.42039444444444 && latitude < 37.423328721788195) {
      this.setData({
        fiinschool: true
      })
      wx.hideLoading()
    } else {
      this.setData({
        fiinschool: false
      })
      wx.hideLoading()
    }
  },
  go(e) {
    this.setData({
      ok: 2
    })
    wx.showLoading({
      mask: true,
      title: '数据传输中...',
    })
    var getlocat = this.data.getlocat
    var phone = this.data.phone
    var model = this.data.model
    var latitude = this.data.latitude
    var longitude = this.data.longitude
    var id = this.data.id
    var student = this.data.student
    var endgetlocat = student[0].endgetlocat
    if (endgetlocat == getlocat || endgetlocat == '') {
      var YC = false
    } else {
      var YC = true
    }
    console.log(student)
    var fiinschool = this.data.fiinschool
    db.collection('student').doc(student[0].id).update({
      data: {
        endtime:dayjs().format('YYYY-MM-DD'),
        endgetlocat: getlocat
      },
      success: updateres => {
        var addstudent = [{
          YC: YC,
          endtime:student[0].endtime,
          endlocat: student[0].endgetlocat,
          getlocat: getlocat,
          phone: phone,
          model: model,
          latitude: latitude,
          longitude: longitude,
          name: student[0].name,
          xuehao: student[0].xuehao,
          banji: student[0].banji,
          id: student[0].id,
          fiinschool: fiinschool
        }]
        console.log(addstudent)
        wx.cloud.callFunction({
          // 要调用的云函数名称
          name: 'dingwei-add',
          // 传递给云函数的参数
          data: {
            id: id,
            student: addstudent
          },
          success: res => {
            if (YC) {
              db.collection('chaqinYC').add({
                  // data 字段表示需新增的 JSON 数据
                  data: {
                    YC: YC,
                    time:dayjs().format('YYYY-MM-DD'),
                    getlocat: getlocat,
                    latitude: latitude,
                    longitude: longitude,
                    name: student[0].name,
                    xuehao: student[0].xuehao,
                    banji: student[0].banji,
                    id: student[0].id,
                    endtime:student[0].endtime,
                    endlocat: student[0].endgetlocat,
                  }
                })
                .then(res => {
                  wx.hideLoading()
                  wx.showModal({
                    content: '参与成功',
                    showCancel: false,
                    success(res) {
                      wx.navigateBack({
                        url: '../../banjihuodong/banjihuodong',
                      })
                      wx.hideLoading()
                    }
                  })
                })
                .catch(console.error)
            } else {
              wx.hideLoading()
              wx.showModal({
                content: '参与成功',
                showCancel: false,
                success(res) {
                  wx.navigateBack({
                    url: '../../banjihuodong/banjihuodong',
                  })
                  wx.hideLoading()
                }
              })
            }
          },
        })
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '数据传输失败',
          icon: 'none',
          duration: 2000
        })
      },
    })

  }
})