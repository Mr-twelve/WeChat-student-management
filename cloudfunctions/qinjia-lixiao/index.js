const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
exports.main = async (event, context) => {
  console.log(event)
  try {
    return await db.collection('student').doc(event.id).update({
      data: {
        newqinjia: event.newnewqinjia,
        ifinschool: event.ifinschool,
        qinjia: event.newqinjia
      }
    })
  } catch (e) {
    console.error(e)
  }
}