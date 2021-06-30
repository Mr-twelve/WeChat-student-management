/* eslint-disable */
const request = require('request');
const cloud = require('wx-server-sdk');

// 环境变量
const env = 'test-98bk9';

cloud.init({
  env
});

// 换取 access_token
async function getAccessToken(appid, secret) {
  return new Promise((resolve, reject) => {
    request.get(
      `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,
      (err, res, body) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(JSON.parse(body));
      }
    );
  });
}

// 创建导出任务
async function createExportJob(accessToken, collection) {
  const date = new Date().toISOString();

  return new Promise((resolve, reject) => {
    request.post(
      `https://api.weixin.qq.com/tcb/databasemigrateexport?access_token=${accessToken}`,
      {
        body: JSON.stringify({
          env,
          file_path: `${date}.json`,
          file_type: '1',
          query: `db.collection("${collection}").get()`
        })
      },
      (err, res, body) => {
        if (err) {
          reject(err);
        }

        resolve(JSON.parse(body));
      }
    );
  });
}

// 查询导出任务状态
async function waitJobFinished(accessToken, jobId) {
  return new Promise((resolve, reject) => {
    // 轮训任务状态
    const timer = setInterval(() => {
      request.post(
        `https://api.weixin.qq.com/tcb/databasemigratequeryinfo?access_token=${accessToken}`,
        {
          body: JSON.stringify({
            env,
            job_id: jobId
          })
        },
        (err, res, body) => {
          if (err) {
            reject(err);
          }

          const { status, file_url } = JSON.parse(body);

          console.log('查询');

          if (status === 'success') {
            clearInterval(timer);
            resolve(file_url);
          }
        }
      );
    }, 500);
  });
}
exports.main = async (event, context) => {
  // 从云函数环境变量中读取 appid 和 secret 以及数据集合
  const secret ='1b642d89dbd5af2a5645fbd4fa4861f6'
  const appid = 'wxdb3d4c714b835b22'
  const backupColl = 'student'
  const backupInfoColl = 'db_back_info'
  const db = cloud.database();

  try {
    // 获取 access_token
    const { errmsg, access_token } = await getAccessToken(appid, secret);

    if (errmsg && errcode !== 0) {
      throw new Error(`获取 access_token 失败：${errmsg}` || '获取 access_token 为空');
    }

    // 导出数据库
    const { errmsg: jobErrMsg, errcode: jobErrCode, job_id } = await createExportJob(access_token, backupColl);

    // 打印到日志中
    console.log(job_id);

    if (jobErrCode !== 0) {
      throw new Error(`创建数据库备份任务失败：${jobErrMsg}`);
    }

    // 将任务数据存入数据库
    const res = await db.collection('db_back_info').add({
      data: {
        date: new Date(),
        jobId: job_id
      }
    });

    // 等待任务完成
    const fileUrl = await waitJobFinished(access_token, job_id);

    console.log('导出成功', fileUrl);

    // 存储到数据库
    await db
      .collection(backupInfoColl)
      .doc(res._id)
      .update({
        data: {
          fileUrl
        }
      });
  } catch (e) {
    throw new Error(`导出数据库异常：${e.message}`);
  }
};