const db = wx.cloud.database()
const dayjs = require('dayjs');

Page({
  data: {
    showTopTips: false,
    date1: "2019-10-01",
    date2: "2019-10-01",
    time1: "12:00",
    time2: "12:00",
    isAgree: false
  },
  onLoad(e) {
    this.setData({
      date1: dayjs().format('YYYY-MM-DD'),
      date2: dayjs().format('YYYY-MM-DD'),
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
  bindDateChange1: function(e) {
    this.setData({
      date1: e.detail.value
    })
  },
  bindDateChange2: function(e) {
    this.setData({
      date2: e.detail.value
    })
  },
  formSubmit(e) {
    var date1 = this.data.date1 + ' ' + this.data.time1
    var date2 = this.data.date2 + ' ' + this.data.time2
    if (e.detail.value.bumeng.length != 0) {
      if (e.detail.value.name != 0) {
        if (e.detail.value.people != 0) {
          if (e.detail.value.neirun != 0) {
            wx.showLoading({
              title: '发布中...',
            })
            db.collection('huodong').add({
              data: {
                bumen: e.detail.value.bumeng,
                name: e.detail.value.name,
                maxpeople: e.detail.value.people,
                havepeople: [],
                neirun: e.detail.value.neirun,
                date1: date1,
                date2: date2,
              },
              success: function (res) {
                wx.hideLoading()
                wx.showModal({
                  title: '提示',
                  content: '活动发布成功',
                  showCancel:false,
                  success(res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: '../guanli/guanli',
                      })
                    } 
                  }
                })
                console.log(res)
              },
              fail: console.error
            }) 
          } else {
            wx.showToast({
              title: '请输入活动内容',
              icon: 'none'
            })
          }
        } else {
          wx.showToast({
            title: '请输入活动人数',
            icon: 'none'
          })
        }
      } else {
        wx.showToast({
          title: '请输入活动名称',
          icon: 'none'
        })
      }
    } else {
      wx.showToast({
        title: '请输入举办部门',
        icon: 'none'
      })
    }
  }
});