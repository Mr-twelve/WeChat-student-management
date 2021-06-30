const db = wx.cloud.database()
const _ = db.command
const dayjs = require('dayjs');
Page({
  data: {
    showDialog: false,
  },
  onShow(e) {
    wx.showLoading({
      mask:true,
      title: '活动查询中...',
    })
    this.gethuodong()
  },
  gethuodong(e) {
    var self = this
    self.setData({
      date: dayjs().format('YYYY-MM-DD HH:mm'),
    })
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
        db.collection('chaqin').where({
          banji: res.data.banji
        }).count().then(tores => {
          console.log(tores.total)
          if (tores.total>=20){
            db.collection('chaqin').where({
              banji: res.data.banji
            })
              .skip(tores.total-20) // 跳过结果集中的前 10 条，从第 11 条开始返回
              .limit(20) // 限制返回数量为 10 条
              .get({
                success: function (open) {
                  wx.hideLoading()
                  console.log(open)
                  self.setData({
                    student: student,
                    myid: res.data._id,
                    huodong: open.data.reverse()
                  })
                }
              })
          }else{
            db.collection('chaqin').where({
              banji: res.data.banji
            }).get({
                success: function (open) {
                  wx.hideLoading()
                  console.log(open)
                  self.setData({
                    student: student,
                    myid: res.data._id,
                    huodong: open.data.reverse()
                  })
                }
              })
          }
        })
      }
    })
  },
  okk(res){
    console.log(res)
     wx.navigateTo({
       url: 'studentdinwei/studentdinwei?id='+res.currentTarget.id,
    })
  }
});