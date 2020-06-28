const crypto = require('crypto')
// const assert = require('assert')

const param = {
  alg: 'des-ede3-cbc',
  autoPad: true,
  key: 'w14OE9H8Q7qV0hisOGl0ZpNX',
  iv: 'CqMfe4eo'
}

console.log(param, 'cryptocryptocryptocrypto');

// 加密
export function encrypt(type, text) {
  if (type === 'message') {
    param.key = '1IvFcjTxtXyD8Ki1nPbm1Ipf'
  }
  console.log('执行加密', param.key, param.key.length)
  let key = Buffer.from(param.key)
  let iv = Buffer.from(param.iv ? param.iv : 0)
  let plaintext = text
  let alg = param.alg
  let autoPad = param.autoPad
  let cipher = crypto.createCipheriv(alg, key, iv)
  cipher.setAutoPadding(autoPad)
  let ciph = cipher.update(plaintext, 'utf8', 'base64')
  ciph += cipher.final('base64')
  console.log('加密:' + ciph)
  return ciph
}

// 解密
export function decrypt(text) {
  let key = Buffer.from(param.key)
  let iv = Buffer.from(param.iv ? param.iv : 0)
  let ciph = text
  let alg = param.alg
  let autoPad = param.autoPad

  let decipher = crypto.createDecipheriv(alg, key, iv)
  decipher.setAutoPadding(autoPad)
  let txt = decipher.update(ciph, 'base64', 'utf8')
  txt += decipher.final('utf8')
  // console.log('解密:' + txt)
  return txt
  // assert.strictEqual(txt, '123', 'fail')
}

