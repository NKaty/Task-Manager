const USERNAME = 'admin'
const PASSWORD = '123'

export default (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === USERNAME && password === PASSWORD)
        resolve({ status: 'ok', userId: 'admin', adminAccess: true, expiresIn: 4 * 60 * 60 * 1000 })
      else reject({ status: 'error', message: 'Не правильный пароль или имя пользователя.' })
    }, 5000)
  })
}
