const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

exports.main = async (event, context) => {
  const countResult = await db.collection('chaqin').count()
  const getlimit=countResult.total-60
  console.log(countResult)
  console.log(getlimit)
  console.log(event)
  return await db.collection('chaqin')
    .where({
      
    })
    .skip(getlimit)
    .limit(60)
    .get()
}