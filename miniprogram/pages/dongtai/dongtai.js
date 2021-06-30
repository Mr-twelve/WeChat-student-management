const dayjs = require('dayjs');
Page({
  data: {
    family:true,
    radioItemsindex: 1,
    radioItems: ['假期留校', '假期回家', '假期外出'],
    date1: "2016-09-01",
    date2: "2016-09-01",
    isAgree: false
  },
  onLoad(e){
    var self = this
    wx.getStorage({
      key: 'student',
      success(res) {
        self.setData({
          date1: dayjs().format('YYYY-MM-DD'),
          date2: dayjs(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate() + 1)).format('YYYY-MM-DD'),
          myid: res.data._id
        })
      }
    })
  },
  radioChange: function(e) {
    this.setData({
      radioItemsindex: e.detail.value
    });
  },

  bindDateChange1: function(e) {
    this.setData({
      date1: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    this.setData({
      date2: e.detail.value
    })
  },
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  switchChange(e){
    this.setData({
      family: e.detail.value
    });
  },

  ok: function(e) {
    var quxiang = this.data.radioItems[parseInt(this.data.radioItemsindex)]
    var waichudizhi = e.detail.value.waichudidian
    var tell = e.detail.value.tell
    var date1=this.data.date1
    var date2 = this.data.date2
    var family = this.data.family
    var isAgree = this.data.isAgree
    if (parseInt(this.data.radioItemsindex)==2){
      if (waichudizhi.length!=0){
        if (tell.length == 11){
          if (isAgree) {
            /*  */

            /*  */
          } else {
            wx.showToast({
              title: '请阅读相关条款并同意',
              icon: 'none'
            })
          }
        }else{
          wx.showToast({
            title: '请输入正确的联系方式',
            icon: 'none'
          })
        }
      }else{
        wx.showToast({
          title: '请输入外出地址',
          icon: 'none'
        })
      }
    }else{
      if (tell.length == 11) {
        if (isAgree) {
            /*  */

            /*  */
        } else {
          wx.showToast({
            title: '请阅读相关条款并同意',
            icon: 'none'
          })
        }
      } else {
        wx.showToast({
          title: '请输入正确的联系方式',
          icon: 'none'
        })
      }
    }
    /* wx.redirectTo({
      url: '../ok/ok',
    }) */
  }
});