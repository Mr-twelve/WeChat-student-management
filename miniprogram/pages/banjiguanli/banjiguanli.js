const db = wx.cloud.database()
Page({

  data: {
  },
  onLoad(res){
    this.setData({
      banji: res.banji
    })
    var self = this
    db.collection('ggao').doc('68829601-b37c-402d-8391-f48494dd4b03').get({
      success: function (res) {
        console.log(res)
        self.setData({
          ggao: res.data.ggao,
          noticeList:res.data.noticeList
        })
      }
    })
  },
  huodong(res){
    wx.navigateTo({
      url: 'huodong/huodong?banji=' + this.data.banji,
    })
  },
  dingwei(res) {
    wx.navigateTo({
      url: 'dingwei/dingwei?banji=' + this.data.banji,
    })
  },
  dingweijilu(res) {
    wx.navigateTo({
      url: 'dingweijilu/dingweijilu?banji=' + this.data.banji,
    })
  },
})