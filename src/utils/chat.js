// import AV from 'leancloud-storage'  // 存储服务
const AV = require('leanengine')
import { realTime, Message } from '@/utils/leancloud.js'
import { leanCloudSign } from '@/api/api.js'

console.log(AV.Cloud, 'AV.CloudAV.CloudAV.Cloud');
let currentConversation = null

export async function getChatRoom(clientId, chatRoomInfo) {
  console.log('process.env.VUE_APP_CONFIG_ENV',process.env.VUE_APP_CONFIG_ENV)
  // 统一添加 tag TODO 互踢
  // return realTime.createIMClient(clientId, { tag: 'PC' })
  console.log(chatRoomInfo, 'chatRoomInfo');
  console.log(clientId, 'clientId');

  // AV.Cloud.define('signLogin', async request => {
  //   const {clientId} = request.params
  //   // 这里可以执行一些检验，例如您的用户系统里面是否有匹配这个 clientId 的用户，或者该用户存在于自定义的黑名单中，
  //   // 你可以在此抛出异常来中断签名的过程：
  //   // throw new AV.Cloud.Error('clientId blocked')
  //   return [f1.appid, clientId, '', f1.utcTimeStamp, f1.randomNum]
  // })
  // var signatureFactory = function (clientId) {
  //   // appid:clientid:sorted_member_ids:timestamp:nonce
  //   return AV.Cloud.rpc('signLogin', {
  //     // appid: f1.appid,
  //     clientId: clientId,
  //     // timestamp: f1.utcTimeStamp,
  //     // nonce: f1.randomNum,
  //     // sign: f1.sign
  //   }); // AV.Cloud.rpc 返回一个 Promise
  // };
  // AV.Cloud.define('signLogin', async request => {
  //   const {clientId} = request.params
  //   // 这里可以执行一些检验，例如您的用户系统里面是否有匹配这个 clientId 的用户，或者该用户存在于自定义的黑名单中，
  //   // 你可以在此抛出异常来中断签名的过程：
  //   // throw new AV.Cloud.Error('clientId blocked')
  //   return sign( (timestamp, nonce) => [f1.appid, clientId, '', timestamp, nonce])
  //   // return {timestamp:f1.utcTimeStamp, nonce:f1.randomNum,signature:f1.sign}
  // })

  // test meng
  let mac = clientId
  var signatureFactory = function (clientId) {
    if(clientId.slice(5,6) === 'V'){
      mac = clientId.substr(13)
    }
    return leanCloudSign(chatRoomInfo, mac).then((res) => {
      if (res.code === 0) {
        console.log('弹幕签名接口0',res)
        const timestamp = parseInt(res.data[0].utcTimeStamp)
        const nonce = res.data[0].randomNum
        const signature = res.data[0].sign
        return {timestamp, nonce, signature}
      } else {
        console.log('失败')
      }
    })
  };
  var conversationSignatureFactory = function(chatRoomInfo) {

    return leanCloudSign(chatRoomInfo, mac).then((res) => {
      if (res.code === 0) {
        console.log('弹幕签名接口1',res)
        const timestamp = parseInt(res.data[1].utcTimeStamp)
        const nonce = res.data[1].randomNum
        const signature = res.data[1].sign
        return {timestamp, nonce, signature}
      } else {
        console.log('失败')
      }
    })
  };

  return realTime.createIMClient(clientId, {
    signatureFactory: signatureFactory,
    conversationSignatureFactory: conversationSignatureFactory,
  }).then(function (currentClient) {
    console.log('currentClient',currentClient)
    return currentClient.getConversation(
      chatRoomInfo
    )
  })
    .then(function (conversation) {
      return conversation.join()
    })
    .then(function (conversation) {
      currentConversation = conversation
      return conversation
    })
    .catch(function (err) {
      console.log('连接直播间失败', err)
    })
}

export function sendMsg(userInput, userInfo) {
  let newMessage = new Message(userInput)
  newMessage.setAttributes(userInfo)
  return currentConversation.send(newMessage)
    .then(function (message) {
      return message
    })
    .catch(function (error) {
      throw (error)
    })
}
