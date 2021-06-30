const db = wx.cloud.database()
Page({
  data: {
    caozuosousuo: false,
    array: ["在宿舍", "不在宿舍"]
  },

  onLoad: function (options) {
    console.log(options)
    wx.showLoading({
      title: "查询中...",
    })
    var self = this
    db.collection("chaqin").doc(options.id).get({
      success: function (res) {
        console.log(res)
        self.setData({
          name: options.name,
          id: options.id,
          banji: res.data.banji,
          starttime: res.data.starttime,
          endtime: res.data.endtime,
          people: res.data.people,
          caozuo: res.data.caozuo
        })
        db.collection("util").where({
          banji: res.data.banji
        }).get({
          success: function (respeo) {
            if (respeo.data.length == 0) {
              console.log('0')
              const $ = db.command.aggregate
              db
                .collection('student')
                .aggregate()
                .match({
                  banji: res.data.banji
                })
                .group({
                  _id: null,
                  people: $.addToSet('$name')
                })
                .end({
                  success: function (math) {
                    console.log(math)
                    db.collection('util').add({
                        // data 字段表示需新增的 JSON 数据
                        data: {
                          banji: res.data.banji,
                          people: math.list[0].people
                        }
                      })
                      .then(res => {
                        console.log(respeo)
                        self.setData({
                          huambiao: math.list[0].people
                        }, () => {
                          self.countpeople()
                        })
                      })
                      .catch(console.error)
                  }
                })
            } else {
              console.log(respeo)
              self.setData({
                huambiao: respeo.data[0].people
              }, () => {
                self.countpeople()
                console.log(respeo.data)
              })
            }
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
    console.log(people)
    console.log(huambiao)
    people.forEach(function (item, index) {
      console.log(item)
      if (item.fiinschool == false) {
        nopeople = nopeople + 1

      }
      var x = huambiao.indexOf(item.name)
      if (x >= 0) {
        huambiao.splice(x, 1);
      }
      console.log(index)
      console.log(people.length)
      if (index = (people.length - 1)) {
        console.log(nopeople)
        wx.hideLoading()
        console.log(huambiao)
        self.setData({
          huambiao: huambiao,
          nopeople: nopeople
        })
      }
    })
    wx.hideLoading()
    console.log(huambiao)
    self.setData({
      huambiao: huambiao,
      nopeople: nopeople
    })
  },
  chakandinwei(e) {
    var index = parseInt(e.currentTarget.id)
    var student = this.data.people[index]
    console.log(student.latitude)
    if (student.latitude) {
      console.log(student.name)
      wx.navigateTo({
        url: "map/map?name=" + student.name + "&latitude=" + student.latitude + "&longitude=" + student.longitude + "&lationname=" + student.getlocat,
      })
      console.log(student)
    } else {
      wx.showModal({
        title: '',
        content: '该同学为手动更改，无位置信息',
      })
    }
  },
  bindPickerChange(e) {
    var self = this
    wx.showLoading({
      title: "更新中...",
    })
    var name = this.data.name
    var index = parseInt(e.target.id)
    if (e.detail.value == 0) {
      var ifinschool = true
    } else {
      var ifinschool = false
    }
    var people = this.data.people
    var newpeople = "people.[" + index + "].fiinschool"
    console.log(newpeople)
    var studetname = this.data.people[index].name
    console.log(studetname)
    var caozuo = name + "更改" + studetname + "为" + ifinschool
    console.log(caozuo)
    this.setData({
      caozuo: [...[caozuo], ...this.data.caozuo],
      [newpeople]: ifinschool
    }, () => {
      self.upnewpeople()
    })
  },
  bindPickerChange1(e) {
    var self = this
    wx.showLoading({
      title: "更新中...",
    })
    var name = this.data.name
    var huambiao = this.data.huambiao
    var index = parseInt(e.target.id)
    if (e.detail.value == 0) {
      var ifinschool = true
    } else {
      var ifinschool = false
    }
    var newpeople = [{
      name: huambiao[index],
      fiinschool: ifinschool,
    }]
    var studentname = huambiao[index]
    console.log(studentname)
    var caozuo = name + "更改" + studentname + "为" + ifinschool
    huambiao.splice(index, 1);
    console.log(caozuo)
    this.setData({
      caozuo: [...[caozuo], ...this.data.caozuo],
      huambiao: huambiao,
      people: [...this.data.people, ...newpeople]
    }, () => {
      self.upnewpeople()
    })

  },
  upnewpeople(e) {
    var caozuo = this.data.caozuo
    var people = this.data.people
    var id = this.data.id
    console.log(caozuo)
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: "dingwei-gengai",
      // 传递给云函数的参数
      data: {
        id: id,
        caozuo: caozuo,
        student: people
      },
      success: res => {
        console.log(res)
        wx.hideLoading()
      },
    })
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