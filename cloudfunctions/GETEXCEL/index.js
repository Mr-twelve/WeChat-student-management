// 云函数入口文件 
const cloud = require('wx-server-sdk')
const nodeExcel = require('excel-export')
const path = require('path');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
// 云函数入口函数 
exports.main = async (event, context) => {
var tableHead = ["班级", "姓名", "学号"];
var tableMap = {
  styleXmlFile: path.join(__dirname, "styles.xml"),
  name: Date.now() + "-export",
  cols: [],
  rows: [],
}
//添加表头
for (var i = 0; i < tableHead.length; i++) {
  tableMap.cols[tableMap.cols.length] = {
    caption: tableHead[i],
    type: 'string'
  }
}
//伪数据
const Output = event.userdata
//添加每一行数据
console.log(Output)
for (var i = 0; i < Output.length; i++) {
  tableMap.rows[tableMap.rows.length] = [
    Output[i].banji,
    Output[i].name,
    Output[i].xuehao
  ]
}
//保存excelResult到相应位置
var excelResult = nodeExcel.execute(tableMap);
var filePath = "outputExcels";
  var fileName = event.school + '.xlsx';
console.log(excelResult);
//上传文件到云端
return await cloud.uploadFile({
  cloudPath: path.join(filePath, fileName),
  fileContent: new Buffer(excelResult, 'binary')
});   
}  

