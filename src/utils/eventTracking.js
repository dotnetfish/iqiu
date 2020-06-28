// import Qs from 'querystring'
// import store from '@/store'

// 爱球pc埋点
export function reportData (params) {
  console.log(params);
  // console.log('工具-埋点', store)
  // console.log('埋点uid', uid)
  // let timeStamp = Date.parse(new Date())
  // let constParams = {
  //   platform: 'mifan_pc',
  //   ctime: timeStamp // 时间戳
  // }
  // let uid = ''
  // if (store.state.userStatus.userInfo.uid !== '') {
  //   uid = store.state.userStatus.userInfo.uid
  //   constParams = {
  //     user_id: uid, // 用户ID
  //     platform: 'mifan_pc',
  //     ctime: timeStamp // 时间戳
  //   }
  // }
  // // page_id
  // let resultParams = {
  //   ...params,
  //   ...constParams
  // }
  // var url = 'https://log-collection.laitiyu.com/report.gif?' + Qs.stringify(resultParams)
  // var img = new Image()
  // img.src = url
}
