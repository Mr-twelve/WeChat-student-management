const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    aaindex: '全部班级',
    array: ['全部班级', '软件1901', '软件1902', '软件1903', '软件1904', '软件1905', '软件1906', '软件1907', '软件1908', '软件1909', '软件1910', '软件1911', '软件1912', '软件1913', '软件1914', '软件1915', '软件1916', '软件1917', '软件1918', '软件1919', '智能1901', '数媒1901', '数媒1902', '大数据1901'],
    index2: '请假状态',
    array2: ['在校状态', '请假状态', '离校请假', '在校请假']
  },
  onLoad: function(options) {
    wx.showLoading({
      title: '数据查询中...',
    })
    var self = this
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getstudent',
      // 传递给云函数的参数
      data: {

      },
      success: studeres => {
        var self = this
        db.collection('student').where({
        }).count({
          success: function (res) {
            console.log(res.total)
            db.collection('student').where({
              ifinschool: false
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
                      aaindex: '全部班级',
                      index2: '请假状态',
                      student: studeres.result.data,
                      lixiao: option.total,
                      total: res.total,
                      qinjia: take.total
                    })
                    wx.hideLoading()
                  }
                })
              }
            })
          }
        })
      },
      fail: err => {
      },
      complete: () => {
      }
    })
  },
  yulan(e) {
    console.log(e)
    wx.previewImage({
      current: e.currentTarget.id,
      urls: [e.currentTarget.id]
    })
  },
  bindPickerChange(e) {
    wx.showLoading({
      title: '数据查询中...',
    })
    const _ = db.command
    var self = this
    this.setData({
      aaindex: this.data.array[e.detail.value]
    })
    var zhuangtai = this.data.index2
     var banji = this.data.array[e.detail.value]
    if (e.detail.value == 0) {
      db.collection('student').where({}).count({
        success: function(res) {
          console.log(res.total)
          db.collection('student').where({
            ifinschool: false
          }).count({
            success: function(take) {
              db.collection('student').where({
                ifinschool: false,
                newqinjia: _.elemMatch({
                  zhuangtai: _.eq('离校请假'),
                })
              }).count({
                success: function (option) {
                  console.log(option)
                  self.setData({
                    lixiao: option.total,
                    total: res.total,
                    qinjia: take.total,
                  })
                  wx.hideLoading()
                }
              })
            }
          })
        }
      })
    } else {
      db.collection('student').where({
        banji: banji,
      }).count({
        success: function(res) {
          console.log(res.total)
          db.collection('student').where({
            banji: banji,
            ifinschool: false
          }).count({
            success: function(take) {
              db.collection('student').where({
                banji: banji,
                ifinschool: false,
                newqinjia: _.elemMatch({
                  zhuangtai: _.eq('离校请假'),
                })
              }).count({
                success: function (option) {
                  console.log(option)
                  self.setData({
                    lixiao: option.total,
                    total: res.total,
                    qinjia: take.total,
                  })
                  wx.hideLoading()
                }
              })
            }
          })
        }
      })
    } 
  },
  bindPickerChange2(e) {
    var self = this
    this.setData({
      index2: this.data.array2[e.detail.value]
    })
  },
  yuanyin: function(e) {
    wx.navigateTo({
      url: '../yuanyin/yuanyin?id=' + e.currentTarget.id,
    })
  }
})