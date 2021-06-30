const db = wx.cloud.database()
const _ = db.command
const dayjs = require('dayjs');
Page({
  data: {
    showDialog: false,
  },
  onLoad(e) {
    this.gethuodong()
  },
  gethuodong(e) {
    var self = this
    wx.getStorage({
      key: 'student',
      success(res) {
        var student = [{
          name: res.data.name,
          xuehao: res.data.xuehao,
          banji: res.data.banji,
          id: res.data._id
        }]
        console.log(res.data)
        self.setData({
          date: dayjs().format('YYYY-MM-DD HH:mm'),
          student: student,
          myid: res.data._id
        })
      }
    })
    db.collection('huodong').where({}).get({
      success: function(res) {
        self.setData({
          huodong: res.data.reverse()
        })
      }
    })
  },
  closeDialog: function() {
    this.setData({
      istrue: false
    })
  },
  okk: function(e) {
    wx.showLoading({
      mask:true,
      title: '报名中...',
    })
    var student = this.data.student
    var self = this
    var myid = this.data.myid
    var id = this.data.huodong[e.currentTarget.id]._id
    var maxpeople = parseInt(this.data.huodong[e.currentTarget.id].maxpeople)
    db.collection('huodong').doc(id).get({
      success: function(res) {
        if (parseInt(res.data.maxpeople) <= res.data.havepeople.length) {
          wx.hideLoading()
          wx.showModal({
            mask: true,
            title: '失败',
            content: '报名人数已满',
          })
        } else {
          wx.cloud.callFunction({
            // 要调用的云函数名称
            name: 'huodong-add',
            // 传递给云函数的参数
            data: {
              id: id,
              student: student
            },
            success: res => {
              wx.cloud.callFunction({
                // 要调用的云函数名称
                name: 'huodong-my-add',
                // 传递给云函数的参数
                data: {
                  id: myid,
                  huodongid: id
                },
                success: res => {
                  wx.hideLoading()
                  wx.showModal({
                    content: '报名成功',
                    showCancel: false,
                    success(res) {
                      if (res.confirm) {
                        self.gethuodong()
                      }
                    }
                  })
                },
              })
            },
          })
        }
      }
    })
  },
  quxiao(e) {
    wx.showLoading({
      mask: true,
      title: '取消中...',
    })
    const _ = db.command
    var student = this.data.student
    var myid = this.data.myid
    var self = this
    var id = this.data.huodong[e.currentTarget.id]._id
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'huodong-quxiao',
      // 传递给云函数的参数
      data: {
        myid: myid,
        id: id
      },
      success: res => {
        wx.cloud.callFunction({
          // 要调用的云函数名称
          name: 'huodong-my-quxiao',
          // 传递给云函数的参数
          data: {
            myid: myid,
            id: id
          },
          success: res => {
            wx.hideLoading()
            wx.showModal({
              content: '取消成功',
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  self.gethuodong()
                }
              }
            })
          },
        })
      },
    })
  }
});