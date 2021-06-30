const db = wx.cloud.database()
const _ = db.command
Page({

  data: {
    inputShowed: false,
    inputVal: "",
    aaindex: '软件1901',
    array: ['软件1901', '软件1902', '软件1903', '软件1904', '软件1905', '软件1906', '软件1907', '软件1908', '软件1909', '软件1910', '软件1911', '软件1912', '软件1913', '软件1914', '软件1915', '软件1916', '软件1917', '软件1918', '软件1919', '智能1901', '数媒1901', '数媒1902', '大数据1901', '软件1801',
      '软件1802',
      '软件1803',
      '软件1804班',
      '软件1805',
      '软件1806',
      '软件1807',
      '软件1808',
      '软件1809',
      '软件1810',
      '软件1811',
      '软件1812',
      '软件1813',
      '软件1814',
      '数媒1801',
      '数媒1802',
      '数媒1803',
      '数媒1804班',
      '软件1701',
      '软件1702',
      '软件1703',
      '软件1704',
      '软件1705',
      '软件1706',
      '软件1707',
      '软件1708',
      '软件1709',
      '软件1710',
      '软件1711',
      '软件1712',
      '软件1713',
      '软件1714',
      '软件1715',
      '数媒1701',
      '数媒1704',
      '数媒1702',
      '数媒1703',
      '软件研1901',
      '软件研1701',
      '软件研1801',
      '软件1601',
      '软件1602',
      '软件1603',
      '软件1604',
      '软件1605班',
      '软件1606班',
      '软件1607',
      '软件1608',
      '软件1609',
      '软件1610',
      '软件1611',
      '软件1612',
      '软件1613',
      '软件1614',
      '数媒1601班',
      '数媒1602',
      '数媒1603',
      '数媒1604',
      '软件1815',
    ],
  },

  onLoad: function (options) {
    var self = this
    wx.cloud.callFunction({
      name: 'get-txlu',
      data: {
        banji: '软件1901'
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
  bindPickerChange(e) {
    var self = this
    var aaindex = this.data.array[e.detail.value]
    this.setData({
      aaindex: aaindex
    })
    wx.cloud.callFunction({
      name: 'get-txlu',
      data: {
        banji: aaindex
      },
      success: res => {
        self.setData({
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
  inputTyping: function (e) {
    console.log(e.detail.value)
    this.setData({
      inputVal: e.detail.value
    });
  },
  sousuo(e) {
    var value = e.detail.value
    var self = this
    console.log(value)
    db.collection('txlu').where({
      name: value
    }).get({
      success: function (res) {
        console.log(res.data)
        if (res.data.length == 0) {
          db.collection('txlu').where({
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
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      student: [],
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  telltxl(e) {
    var txlu = this.data.txlu[e.currentTarget.id]
    wx.showModal({
      title: '提示',
      content: '是否拨打' + txlu.name + '电话',
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
  },
  tell(e) {
    var txlu = this.data.student[e.currentTarget.id]
    wx.showModal({
      title: '提示',
      content: '是否拨打' + txlu.name + '电话',
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