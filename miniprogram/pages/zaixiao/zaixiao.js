const dayjs = require('dayjs');

Page({
  data: {
    showTopTips: false,
    zaixiao: ['正常在校', '离校请假', '在校请假'],
    zaixiaoindex: null,
    date1: "2019-09-01",
    date2: "2019-09-02",
    time: "12:01",
    isAgree: false
  },
  onLoad: function(e) {
    var self = this
    wx.getStorage({
      key: 'student',
      success(res) {
        /*  */
         console.log(res.data)
        
        /*  */
        if (res.data.ifinschool == false) {
          var zaixiaoindex=0
        }else{
          var zaixiaoindex=1
        }
        self.setData({
          zaixiaoindex: zaixiaoindex,
          student: res.data,
          time: dayjs().format('HH:mm'),
          date1: dayjs().format('YYYY-MM-DD'),
          date2: dayjs(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate() + 1)).format('YYYY-MM-DD')
        })
      }
    })
  },
  showTopTips: function() {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function() {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  radioChange: function(e) {
    if(this.data.student.ifinschool==false){
      wx.showModal({
        title: '提示',
        content: '当前处于请假状态，请先联系辅导员确认销假',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      this.setData({
        zaixiaoindex: e.detail.value
      });
    }
  },
  bindDateChange1: function(e) {
    console.log(e)
    this.setData({
      date1: e.detail.value
    })
  },
  bindDateChange2: function(e) {
    this.setData({
      date2: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindCountryCodeChange: function(e) {
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);
    this.setData({
      countryCodeIndex: e.detail.value
    })
  },
  bindCountryChange: function(e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      countryIndex: e.detail.value
    })
  },
  bindAccountChange: function(e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);
    this.setData({
      accountIndex: e.detail.value
    })
  },
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  ok: function(e) {
    var id = this.data.student._id
    var oldqinjia=this.data.student.qinjia
    var time = this.data.time
    var ifinschool = this.data.zaixiaoindex
    var zhuangtai = this.data.zaixiao[ifinschool]
    var tell1 = e.detail.value.tell1
    var tell2 = e.detail.value.tell2
    var date1 = this.data.date1
    var date2 = this.data.date2
    var isAgree = this.data.isAgree
    if (ifinschool == 0) {
      
    } else {
      if (tell1.length == 11) {
        if (tell2.length == 11) {
          if (e.detail.value.lixiaoyuanyin.length != 0) {
            if (isAgree == true) {
              wx.showLoading({
                title: '上传中...',
              })
              var qinjia = [{
                zhuangtai: zhuangtai,
                fanxiaotime: null,
                tell1: tell1,
                tell2: tell2,
                date1: date1,
                date2: date2,
                lixiaoyuanyin: e.detail.value.lixiaoyuanyin
              }]
              var newnewqinjia = [{
                zhuangtai: zhuangtai,
                fanxiaotime: null,
                tell1: tell1,
                tell2: tell2,
                date1: date1,
                date2: date2,
                lixiaoyuanyin: e.detail.value.lixiaoyuanyin
              }]
              console.log(oldqinjia)
              var newqinjia=[...oldqinjia,...qinjia]
              console.log(newqinjia)
              console.log(id)
              wx.cloud.callFunction({
                // 要调用的云函数名称
                name: 'qinjia-lixiao',
                // 传递给云函数的参数
                data: {
                  newnewqinjia: newnewqinjia,
                  ifinschool:false,
                  id:id,
                  newqinjia: newqinjia
                },
                success: res => {
                  wx.hideLoading()
                  wx.redirectTo({
                    url: '../ok/ok',
                  })
                },
                fail: err => {
                },
                complete: () => {
                }
              }) 
            } else {
              wx.showToast({
                title: '请阅读《相关条款》并同意',
                icon: 'none'
              })
            }
          } else {
            wx.showToast({
              title: '请输入离校原因',
              icon: 'none'
            })
          }
        } else {
          wx.showToast({
            title: '请正确输入家中手机号',
            icon: 'none'
          })
        }
      } else {
        wx.showToast({
          title: '请正确输入本人手机号',
          icon: 'none'
        })
      }
    }
  }
});