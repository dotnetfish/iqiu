import MD5 from 'blueimp-md5'

const secretKey = 'CbvNgT8Emliuwn2x'

export function md5Secret(lcText) {
  console.log(lcText, 'lcText');
  if (lcText === '') {
    return 'false'
  }
  let firstMd5 = MD5(lcText).toUpperCase()
  if (firstMd5 === '') {
    return 'false'
  }
  let tempStr = firstMd5.substring(0, 9) + secretKey
  let secondMd5 = MD5(tempStr).toUpperCase()
  return secondMd5
}

export function md5SecretPay(qs) {
  if (qs === '') {
    return 'false'
  }
  let firstMd5 = MD5(qs + '&key=' + secretKey).toUpperCase()
  return firstMd5
}
