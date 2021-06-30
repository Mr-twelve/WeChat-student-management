const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
exports.main = async (event, context) => {
  console.log(event)
  return await db.collection('txlu')
    .where({
      banji: event.banji
    })
    .limit(99)
    .get()
}