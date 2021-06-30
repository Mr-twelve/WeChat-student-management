const db = wx.cloud.database()
const _ = db.command
Page({
  data: {

  },
  onLoad: function (options) {
    var that=this
    const db = wx.cloud.database()
    db.collection('chaqin').doc('e2297d935eb35e11002acb8f535ef713').get().then(res => {
      console.log(res.data)
      that.setData({
        resdata:res.data.people,
        name:res.data.banji+'_'+res.data.starttime+'_text.xlsx'
      }, () => {
        that.savaExcel()
        })
      
    })
    /* const $ = db.command.aggregate
    db.collection('student').aggregate()
      .group({
        _id: '$banji',
        num: $.sum(1)
      })
      .limit(9999)
      .end({
        success: function (mathb) {
          console.log(mathb)
        }
      }) */
  },

  savaExcel() {
    wx.showLoading({
      title: '导出中...',
    })
    let that = this
    var resdata = that.data.resdata
    var name = that.data.name
    console.log(resdata)
    wx.cloud.callFunction({
      name: "text_excle",
      data: {
        people: resdata,
        name:name,
      },
      success(res) {
        console.log("保存成功", res)
        that.getFileUrl(res.result.fileID)
      },
      fail(res) {
        wx.hideLoading()
        wx.showToast({
          title: '失败',
          icon: 'none',
          duration: 2000
        })
        console.log("保存失败", res)
      }
    })
  },
  //获取云存储文件下载地址，这个地址有效期一天
  getFileUrl(fileID) {
    let that = this;
    wx.cloud.getTempFileURL({
      fileList: [fileID],
      success: res => {
        console.log("文件下载链接", res.fileList[0].tempFileURL)
        that.setData({
          fileUrl: res.fileList[0].tempFileURL
        })
        wx.hideLoading()
      },
      fail: err => {
        wx.hideLoading()
        self.setData({
          temp: res.fileList[0].tempFileURL
        })
      }
    })
  },

})