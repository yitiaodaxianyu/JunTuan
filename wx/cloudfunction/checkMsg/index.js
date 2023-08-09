


// 云函数入口函数
// 云函数入口文件
const cloud = require('wx-server-sdk')
 
cloud.init()
 
//index.js中
//openid为用户的唯一标识，我是通过参数传递过来的。当然你也可以这样获取，更方便cloud.getWXContext().OPENID
//text为要检测的值
exports.main = async (event, context) => {
  const {  text } = event;
  try {
    const result = await cloud.openapi.security.msgSecCheck({
      openid:cloud.getWXContext().OPENID,
      scene: 1,
      version: 2,
      content: text,
    });
    return result;
  } catch (err) {
    return err;
  }
};