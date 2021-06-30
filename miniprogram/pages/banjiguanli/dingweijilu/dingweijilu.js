const db = wx.cloud.database()
const _ = db.command
const dayjs = require('dayjs');
Page({
  data: {
    showDialog: false,
  },
  onShow(e) {
    this.gethuodong()
  },
  gethuodong(e) {
    wx.showLoading({
      title: '加载中...',
    })
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
        db.collection('chaqin').where({
          banji: res.data.banji
        }).count().then(tores => {
          console.log(tores.total)
          if (tores.total >= 20) {
            db.collection('chaqin').where({
                banji: res.data.banji
              })
              .skip(tores.total - 20) // 跳过结果集中的前 10 条，从第 11 条开始返回
              .limit(20) // 限制返回数量为 10 条
              .get({
                success: function(open) {
                  self.setData({
                    date: dayjs().format('YYYY-MM-DD HH:mm'),
                    student: student,
                    myid: res.data._id,
                    huodong: open.data.reverse(),
                  })
                  wx.hideLoading()
                }
              })
          } else {
            db.collection('chaqin').where({
              banji: res.data.banji
            }).get({
              success: function(open) {
                self.setData({
                  date: dayjs().format('YYYY-MM-DD HH:mm'),
                  student: student,
                  myid: res.data._id,
                  huodong: open.data.reverse(),
                })
                wx.hideLoading()
              }
            })
          }
        })
      }
    })
  },
  okk(res) {
    wx.navigateTo({
      url: 'studentdinwei/studentdinwei?id=' + res.currentTarget.id,
    })
  },
  look(res) {
    var self = this
    wx.navigateTo({
      url: 'lookstudentdinwei/lookstudentdinwei?id=' + res.currentTarget.id + '&name=' + self.data.student[0].name,
    })
  },
  shanchu(e) {
    var index = parseInt(e.currentTarget.id)
    var huodong = this.data.huodong
    var id = huodong[index]._id
    var self = this
    wx.showModal({
      title: '提示',
      content: '确定删除该记录？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中...',
            mask: true
          })
          wx.cloud.callFunction({
            name: 'dingwei-shanchu',
            data: {
              id: id
            },
            success: res => {
              wx.hideLoading()
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
              self.gethuodong()
            },
            fail: err => {},
            complete: () => {}
          })
        } else if (res.cancel) {}
      }
    })
  }
});