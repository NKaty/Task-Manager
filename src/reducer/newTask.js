import { Record } from 'immutable'
import { ADD_TASK, START, SUCCESS, FAIL } from '../constants'

const TaskRecord = Record({
  id: null,
  username: null,
  email: null,
  text: null,
  status: null,
  loading: false,
  error: null
})

export default (state = TaskRecord(), action) => {
  const { type, response } = action

  switch (type) {
    case ADD_TASK + START:
      return state.set('loading', true)

    case ADD_TASK + SUCCESS:
      return state
        .set('id', response.message.id)
        .set('username', response.message.username)
        .set('email', response.message.email)
        .set('status', response.message.status)
        .set('loading', false)

    case ADD_TASK + FAIL:
      return state.set('error', response.message).set('loading', false)

    default:
      return state
  }
}
