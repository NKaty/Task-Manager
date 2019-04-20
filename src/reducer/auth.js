import { Record } from 'immutable'
import { LOGIN_AS_ADMIN, LOGOUT, START, SUCCESS, FAIL } from '../constants'

const AuthRecord = Record({
  userId: null,
  adminAccess: false,
  loading: false
})

export default (state = AuthRecord(), action) => {
  const { type, payload } = action

  switch (type) {
    case LOGIN_AS_ADMIN + START:
      return state
        .set('userId', null)
        .set('adminAccess', false)
        .set('loading', true)

    case LOGIN_AS_ADMIN + SUCCESS:
      return state
        .set('userId', payload.userId)
        .set('adminAccess', payload.adminAccess)
        .set('loading', false)

    case LOGIN_AS_ADMIN + FAIL:
      return state
        .set('userId', null)
        .set('adminAccess', false)
        .set('loading', false)

    case LOGOUT:
      return state
        .set('userId', null)
        .set('adminAccess', false)
        .set('loading', false)

    default:
      return state
  }
}
