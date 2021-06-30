// miniprogram/pages/txlu/txlu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

 
  onLoad: function (options) {
    var self=this
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'get-txlu',
      // 传递给云函数的参数
      data: {
        banji: options.banji
      },
      success: res => {
        self.setData({
          banji: options.banji,
          txlu: res.result.data
        })
        console.log(res.result.data)
      },
      fail: err => {
       
      },
      complete: () => {
        
      }
    })
  },
  tell(e){
    var txlu = this.data.txlu[e.currentTarget.id]
    wx.showModal({
      title: '提示',
      content: '是否拨打'+txlu.name+'电话',
      success(res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: txlu.tell
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    }) 
  }

})