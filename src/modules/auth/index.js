import cookie from '../utils/cookie'

export function isLoged() {
  const user = getUser('user')
  if (user && user.userId && user.token) {
    return true
  } else {
    return false
  }
}

export function getUser() {
  const str = cookie.getItem('user')
  let user = null
  if (str) {
    try {
      user = JSON.parse(str)
    } catch (err) {
      console.error('getUser() 解析失败 :', str, err)
    }
  }
  return user
}

export function setUser(user) {
  const oldUser = getUser() || {}
  const newUser = {
    ...oldUser, ...user,
  }
  cookie.setItem('user', JSON.stringify(newUser))
}

export function removeUser() {
  cookie.removeItem('user')
}

export function logout(path) {
  cookie.removeItem('user')
  window.location.href = path || '/'
}

export function gotoLogin() {
  window.location.href = '/auth/login'
}

export function gotoRegister() {
  window.location.href = '/auth/register'
}