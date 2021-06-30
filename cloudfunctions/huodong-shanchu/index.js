const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
exports.main = async (event, context) => {
  console.log(event)
  try {
    return await db.collection('huodong').doc(event.id).remove()
  } catch (e) {
    console.error(e)
  }
}