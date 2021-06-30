const db = wx.cloud.database()
Page({
  data: {
    caozuosousuo: false,
  },

  onLoad: function(options) {
    /* console.log(options) */
    wx.showLoading({
      title: '查询中...',
    })
    var self = this
    db.collection('chaqin').doc(options.id).get({
      success: function(res) {
        /* console.log(res) */
        self.setData({
          banji: res.data.banji,
          starttime: res.data.starttime,
          endtime: res.data.endtime,
          people: res.data.people,
          caozuo: res.data.caozuo
        })
        db.collection('util').where({
          banji: res.data.banji
        }).get({
          success: function(res) {
            /* console.log(res) */
            self.setData({
              huambiao: res.data[0].people
            }, () => {
              self.countpeople()
              /* console.log(res.data) */
            })
          }
        })
      }
    })

  },
  countpeople(res) {
    var nopeople = 0
    var people = this.data.people
    var huambiao = this.data.huambiao
    var self = this
    var nohavepeople = []
    /* console.log(huambiao) */
    people.forEach(function(item, index) {
      if (item.fiinschool == false) {
        nopeople = nopeople + 1
        /* console.log(nopeople) */
      }
      var x = huambiao.indexOf(item.name)
      if (x >= 0) {
        huambiao.splice(x, 1);
      }
      if (index = people.length - 1) {
        /* console.log(nopeople) */
        wx.hideLoading()
        /* console.log(huambiao) */
        self.setData({
          huambiao: huambiao,
          nopeople: nopeople
        })
      }
    })
    wx.hideLoading()
    /* console.log(huambiao) */
    self.setData({
      huambiao: huambiao,
      nopeople: nopeople
    })
  },
  chakandinwei(e) {
    var index = parseInt(e.currentTarget.id)
    var student = this.data.people[index]
    if (student.latitude) {
      wx.navigateTo({
        url: 'map/map?name=' + student.name + '&latitude=' + student.latitude + '&longitude=' + student.longitude + "&lationname=" + student.getlocat,
      })
      /* console.log(student) */
    }else{
      wx.showModal({
        title: '',
        content: '该同学为手动更改，无位置信息',
      })
    }
  },
  zhankaicaozuo(e) {
    this.setData({
      caozuosousuo: true
    })
  },
  hidecaozuo(e) {
    this.setData({
      caozuosousuo: false
    })
  },
})