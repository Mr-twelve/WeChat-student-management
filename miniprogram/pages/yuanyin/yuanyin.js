const db = wx.cloud.database()
const dayjs = require('dayjs');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function (options) {
    var self=this
    console.log(options)
    db.collection('student').doc(options.id).get({
      success: function (res) {
        self.setData({
          id: options.id,
          newqinjia: res.data.qinjia,
          student: res.data
        })
        console.log(res.data)
      }
    })
  },


  back:function(){
    var id = this.data.id
    var time = dayjs().format('YYYY-MM-DD HH:mm')
    var oldqinjia = this.data.newqinjia
    console.log(oldqinjia)
    var length = parseInt(oldqinjia.length)
    console.log(length)
    var newlength = parseInt(length - 1)
    console.log(newlength)
    var zuihouqinjia = oldqinjia[newlength]
    console.log(zuihouqinjia)
    console.log(oldqinjia)
    zuihouqinjia.fanxiaotime =time
    console.log(zuihouqinjia)
    oldqinjia.splice(newlength, 1, zuihouqinjia)
    console.log(oldqinjia)
     wx.showModal({
      title: '提示',
      content: '是否确认改同学已经返校',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            // 要调用的云函数名称
            name: 'qinjia-lixiao',
            // 传递给云函数的参数
            data: {
              newnewqinjia: [],
              ifinschool: true,
              id: id,
              newqinjia: oldqinjia
            },
            success: res => {
              wx.hideLoading()
              wx.navigateBack({
                delta: 1,
              })
            },
            fail: err => {
            },
            complete: () => {
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    }) 
  },
  lsjl(e){
    var student = this.data.student
    wx.setStorage({
      key: "lsjl",
      data: student,
      success(e) {
        wx.navigateTo({
          url: 'lsjl/lsjl',
        })
      }
    }) 
  },
  noback(e){
    wx.showToast({
      title: '该同学尚未请假',
      icon: 'none',
    })
  }
})