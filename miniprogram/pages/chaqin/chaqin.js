const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    aaindex: '全部班级',
    array: ['全部班级', '软件1901', '软件1902', '软件1903', '软件1904', '软件1905', '软件1906', '软件1907', '软件1908', '软件1909', '软件1910', '软件1911', '软件1912', '软件1913', '软件1914', '软件1915', '软件1916', '软件1917', '软件1918', '软件1919', '智能1901', '数媒1901', '数媒1902', '大数据1901', '软件1801',
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
      '软件1815',
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
    ],
    huodong: [],
    a: 0,
    showDialog: false,
  },
  onLoad(e) {
    this.gethuodong()
  },
  gethuodong(e) {
    wx.showLoading({
      title: '加载中...',
    })
    var huodong = this.data.huodong
    var aa = this.data.a
    var self = this
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'get-dingwei',
      // 传递给云函数的参数
      data: {

      },
      success: studeres => {
        console.log(studeres)
        self.setData({
          huodong: [...studeres.result.data.reverse(), ...huodong]
        })
        wx.hideLoading()
      }
    })
  },
  look(res) {
    wx.navigateTo({
      url: 'lookstudentdinwei/lookstudentdinwei?id=' + res.currentTarget.id,
    })
  },
  bindPickerChange(e) {
    wx.showLoading({
      title: '加载中...',
    })
    console.log(e.detail.value)
    var self = this
    var aaindex = this.data.array[parseInt(e.detail.value)]
    if (aaindex == '全部班级') {
      this.setData({
        huodong: [],
        aaindex: aaindex,
      }, () => {
        this.gethuodong()
      })
    } else {
      console.log(aaindex)
      db.collection('chaqin').where({
          banji: aaindex
        })
        .get({
          success: function (open) {
            self.setData({
              aaindex: aaindex,
              huodong: open.data.reverse()
            })
            wx.hideLoading()
          }
        })
    }
  }

});