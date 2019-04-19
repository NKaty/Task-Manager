const USERNAME = 'admin'
const PASSWORD = '123'

export default (username, password) => {
  return new Promise((resolve, reject) => {
    if (username === USERNAME && password === PASSWORD)
      resolve({ status: 'ok', userId: '11111', expiresIn: 4 * 60 * 60 * 1000 })
    else reject({ status: 'error', message: 'Не правильный пароль или имя пользователя.' })
  })
}
