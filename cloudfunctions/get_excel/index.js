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
    let { userdata } = event
    console.log('123')
    //1,定义excel表格名
    let dataCVS = event.school + '.xlsx'
    //2，定义存储数据的
    let alldata = [];
    let row = ['_id', '学校', '学校编号', '班级编号', '学籍号', '姓名', '民族', '性别', '家庭住址', '出生日期', '联系方式', '裸眼视力左', '裸眼视力右', '戴镜视力左', '戴镜视力右', '球镜度数左', '球镜度数右', '柱镜度数左', '柱镜度数右', '轴镜度数左', '轴镜度数右', '屈光不正左', '屈光不正右', '串镜左', '串镜右',]; //表属性
    alldata.push(row);
    for (let key in userdata) {
      let arr = [];
      arr.push(userdata[key]._id);
      arr.push(userdata[key].school);
      arr.push(userdata[key].schoole);
      arr.push(userdata[key].banji);
      arr.push(userdata[key].xuehao);
      arr.push(userdata[key].name);
      arr.push(userdata[key].民族代码);
      arr.push(userdata[key].xinbie);
      arr.push(userdata[key].location);
      arr.push(userdata[key].出生日期);
      arr.push(userdata[key].tell);
      arr.push(userdata[key].ll);
      arr.push(userdata[key].lr);
      arr.push(userdata[key].dl);
      arr.push(userdata[key].dr);
      arr.push(userdata[key].ql);
      arr.push(userdata[key].qr);
      arr.push(userdata[key].zl);
      arr.push(userdata[key].zr);
      arr.push(userdata[key].zoul);
      arr.push(userdata[key].zour);
      arr.push(userdata[key].qul);
      arr.push(userdata[key].qur);
      arr.push(userdata[key].cl);
      arr.push(userdata[key].cr);
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