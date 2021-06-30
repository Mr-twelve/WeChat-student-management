const cloud = require('wx-server-sdk')
//这里最好也初始化一下你的云开发环境
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
//操作excel用的类库
const xlsx = require('node-xlsx');

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  try {
    let  userdata  = event.people
    console.log('123')
    //1,定义excel表格名
    let dataCVS =  event.name
    //2，定义存储数据的
    let alldata = [];
    let row = ['班级', '学号', '姓名', '位置']
    alldata.push(row);
    for (let key in userdata) {
      console.log(userdata[key])
      console.log(userdata[key].banji)
      let arr = [];
      arr.push(userdata[key].banji);
      arr.push(userdata[key].xuehao);
      arr.push(userdata[key].name);
      arr.push(userdata[key].getlocat);
      alldata.push(arr)
    }
    console.log(alldata)
    //3，把数据保存到excel里
    var buffer = await xlsx.build([{
      name: "mySheetName",
      data: alldata
    }]);
    //4，把excel文件保存到云存储里
    return await cloud.uploadFile({
      cloudPath: dataCVS,
      fileContent: buffer, //excel二进制文件
    })

  } catch (e) {
    console.error(e)
    return e
  }
}