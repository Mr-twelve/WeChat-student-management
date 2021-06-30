const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  console.log(event)
  try {
    return await db.collection('chaqin').doc(event.id).update({
      // data 传入需要局部更新的数据
      data: {
        caozuo:event.caozuo,
        people:event.student
      }
    })
  } catch (e) {
    console.error(e)
  }
}