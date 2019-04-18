import md5 from 'blueimp-md5'
import { TOKEN } from '../constants/common'

const encodeURIComponentRFC3986 = str =>
  encodeURIComponent(str).replace(/[!'()*]/g, char => `%${char.charCodeAt(0).toString(16)}`)

export default form => {
  const params = `${Object.keys(form)
    .sort((a, b) => {
      if (a > b) return 1
      return -1
    })
    .reduce((acc, field, idx) => {
      if (idx === 0) {
        acc += `${encodeURIComponentRFC3986(field)}=${encodeURIComponentRFC3986(form[field])}`
      } else {
        acc += `&${encodeURIComponentRFC3986(field)}=${encodeURIComponentRFC3986(form[field])}`
      }
      return acc
    }, '')}&${encodeURIComponentRFC3986('token')}=${encodeURIComponentRFC3986(TOKEN)}`

  return {
    ...form,
    token: TOKEN,
    signature: md5(params)
  }
}
