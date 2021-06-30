const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    inputShowed: false,
    inputVal: ""
  },
  onLoad(e){
    var self=this
    db.collection('student').where({
    }).count({
      success: function (res) {
        console.log(res.total)
        db.collection('student').where({
          ifinschool:false
        }).count({
          success: function (take) {
            db.collection('student').where({
              ifinschool: false,
              newqinjia: _.elemMatch({
                zhuangtai: _.eq('离校请假'),
              })
            }).count({
              success: function (option) {
                self.setData({
                  lixiao:option.total,
                  total: res.total,
                  qinjia: take.total
                })
              }
            })
          }
        })
      }
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    console.log(e.detail.value)
    this.setData({
      inputVal: e.detail.value
    });
  },
  sousuo(e){
    var value = this.data.inputVal
    var self=this
    console.log(value)
    db.collection('student').where({
      name: value
    }).get({
      success: function (res) {
        console.log(res.data)
        if (res.data.length == 0) {
          db.collection('student').where({
            xuehao: value
          }).get({
            success: function (res) {
              console.log(res.data)
              if (res.data.length == 0) {
                wx.showToast({
                  title: '查无此人',
                  icon: 'none'
                })
                self.setData({
                  student: []
                })
              } else {
                self.setData({
                  student: res.data
                })

              }
            }
          })
        } else {
          self.setData({
            student: res.data
          })
        }
      }
    })
  },
  chakan:function(){
    console.log(this.data.total)
    console.log(this.data.qinjia)
    console.log(this.data.lixiao)
    wx.navigateTo({
      url: '../chakan/chakan?total=' + this.data.total + '&qinjia=' + this.data.qinjia + '&lixiao=' + this.data.lixiao,
    })
  },
  yulan(e) {
    console.log(e)
    wx.previewImage({
      current: e.currentTarget.id,
      urls: [e.currentTarget.id]
    })
  },
  yuanyin: function (e) {
    wx.navigateTo({
      url: '../yuanyin/yuanyin?id=' + e.currentTarget.id,
    })
  },
  faqi:function(){
    wx.navigateTo({
      url: '../faqi/faqi',
    })
  },
  jilu:function(){
    wx.navigateTo({
      url: '../jilu/jilu',
    })
  },
  txlu: function () {
    wx.navigateTo({
      url: '../txlu2/txlu2',
    })
  },
  kaoqin: function () {
    wx.navigateTo({
      url: '../kaoqin/kaoqin',
    })
  },
  chaqin: function () {
    wx.navigateTo({
      url: '../chaqin/chaqin',
    })
  },
  dwbg: function () {
    wx.navigateTo({
      url: '../dwbg/dwbg',
    })
  },
});