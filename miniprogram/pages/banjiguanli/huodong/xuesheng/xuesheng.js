const db = wx.cloud.database()
Page({
  data: {
    countpeople:0
  },
  onLoad(e) {
    console.log(e)
    wx.showLoading({
      title: '查询中...',
    })
    var self = this
    db.collection('huodong').doc(e.id).get({
      success: function (res) {
        self.setData({
          banji:e.banji,
          name: res.data.name,
          people: res.data.havepeople
        })
        self.countpeople()
        console.log(res.data)
      }
    })
  },
  countpeople(e){
    var countpeople=0
    var banji=this.data.banji
    var self=this
    var people = this.data.people
    people.forEach(function (item, index) {
      if (item.banji == banji){
        countpeople++
      }
      if (index == people.length - 1) {
        wx.hideLoading()
        self.setData({
          countpeople: countpeople
        })
      }
    })
  }
})