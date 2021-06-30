 const db = wx.cloud.database()
 Page({
   data: {
     tongji: true,
     countpeople: [{
         name: '软件1901',
         people: 0,
         zhankai: false
       },
       {
         name: '软件1902',
         people: 0,
         zhankai: false
       },
       {
         name: '软件1903',
         people: 0,
         zhankai: false
       },
       {
         name: '软件1904',
         people: 0,
         zhankai: false
       },
       {
         name: '软件1905',
         people: 0,
         zhankai: false
       },
       {
         name: '软件1906',
         people: 0,
         zhankai: false
       },
       {
         name: '软件1907',
         people: 0,
         zhankai: false
       },
       {
         name: '软件1908',
         people: 0,
         zhankai: false
       },
       {
         name: '软件1909',
         people: 0,
         zhankai: false
       },
       {
         name: '软件1910',
         people: 0,
         zhankai: false
       },
       {
         name: '软件1911',
         people: 0,
         zhankai: false
       },
       {
         name: '软件1912',
         people: 0,
         zhankai: false
       },
       {
         name: '软件1913',
         people: 0,
         zhankai: false
       },
       {
         name: '软件1914',
         people: 0,
         zhankai: false
       },
       {
         name: '软件1915',
         people: 0,
         zhankai: false
       },
       {
         name: '软件1916',
         people: 0,
         zhankai: false
       },
       {
         name: '软件1917',
         people: 0,
         zhankai: false
       },
       {
         name: '软件1918',
         people: 0,
         zhankai: false
       },
       {
         name: '软件1919',
         people: 0,
         zhankai: false
       },
       {
         name: '数媒1901',
         people: 0,
         zhankai: false
       },
       {
         name: '数媒1902',
         people: 0,
         zhankai: false
       },
       {
         name: '智能1901',
         people: 0,
         zhankai: false
       },
       {
         name: '大数据1901',
         people: 0,
         zhankai: false
       },
     ],
     index: 0,
     banji:null,
   },
   onLoad(e) {
     wx.showLoading({
       title: '查询中...',
     })
     var self = this
     db.collection('huodong').doc(e.id).get({
       success: function(res) {
         self.setData({
           name: res.data.name,
           people: res.data.havepeople
         })
         self.countpeople()
         console.log(res.data)
       }
     })
   },
   countpeople(res) {
     var self = this
     var people = this.data.people
     var countpeople = this.data.countpeople
     people.forEach(function(item, index) {
       switch (item.banji) {
         case "软件1901":
           countpeople[0].people++
             break;
         case "软件1902":
           countpeople[1].people++
             break;
         case "软件1903":
           countpeople[2].people++
             break;
         case "软件1904":
           countpeople[3].people++
             break;
         case "软件1905":
           countpeople[4].people++
             break;
         case "软件1906":
           countpeople[5].people++
             break;
         case "软件1907":
           countpeople[6].people++
             break;
         case "软件1908":
           countpeople[7].people++
             break;
         case "软件1909":
           countpeople[8].people++
             break;
         case "软件1910":
           countpeople[9].people++
             break;
         case "软件1911":
           countpeople[10].people++
             break;
         case "软件1912":
           countpeople[11].people++
             break;
         case "软件1913":
           countpeople[12].people++
             break;
         case "软件1914":
           countpeople[13].people++
             break;
         case "软件1915":
           countpeople[14].people++
             break;
         case "软件1916":
           countpeople[15].people++
             break;
         case "软件1917":
           countpeople[16].people++
             break;
         case "软件1918":
           countpeople[17].people++
             break;
         case "软件1919":
           countpeople[18].people++
             break;
         case "数媒1901":
           countpeople[19].people++
             break;
         case "数媒1902":
           countpeople[20].people++
             break;
         case "智能1901":
           countpeople[21].people++
             break;
         case "大数据1901":
           countpeople[22].people++
             break;
         default:
           console.log("default");
       }
       if (index == people.length - 1) {
         console.log(countpeople)
         wx.hideLoading()
         self.setData({
           countpeople: countpeople
         })
       }
     })
   },
   //把数据保存到excel里，并把excel保存到云存储
   savaExcel() {
     wx.showLoading({
       title: '导出中...',
     })
     let that = this
     var name = that.data.name
     var people = that.data.people
     console.log(name)
     console.log(people)
     wx.cloud.callFunction({
       name: "GETEXCEL",
       data: {
         school: name,
         userdata: people
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
   //复制excel文件下载链接
   copyFileUrl() {
     let that = this
     wx.setClipboardData({
       data: that.data.fileUrl,
       success(res) {
         wx.getClipboardData({
           success(res) {
             console.log("复制成功", res.data) // data
           }
         })
       }
     })
   },
   zhankai(res) {
     var index = this.data.index
     var banji = this.data.banji
     var olddatacountpeople = 'countpeople[' + index + '].zhankai'
     var newdatacountpeople = 'countpeople[' + res.currentTarget.id +'].zhankai'
     this.setData({
       [olddatacountpeople]:false,
       [newdatacountpeople] : !this.data.countpeople[res.currentTarget.id].zhankai,
       index: res.currentTarget.id,
       banji: this.data.countpeople[res.currentTarget.id].name
     })
     
   },
 })