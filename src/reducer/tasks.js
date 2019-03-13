import { Record, OrderedMap, Map } from 'immutable'
import { arrToMap } from './utils'
import { LOAD_TASKS_FOR_PAGE, START, SUCCESS } from '../constants'

const CommentRecord = Record({
  id: null,
  username: null,
  email: null,
  text: null,
  status: null
})

const ReducerRecord = Record({
  entities: new OrderedMap({}),
  pagination: new Map({}),
  total: null
})

export default (state = new ReducerRecord(), action) => {
  const { type, payload, response } = action

  switch (type) {
    case LOAD_TASKS_FOR_PAGE + START:
      return state.setIn(['pagination', payload.page, 'loading'], true)

    case LOAD_TASKS_FOR_PAGE + SUCCESS:
      return state
        .set('total', response.message.total_task_count)
        .mergeIn(['entities'], arrToMap(response.message.tasks, CommentRecord))
        .setIn(['pagination', payload.page, 'ids'], response.message.tasks.map(task => task.id))
        .setIn(['pagination', payload.page, 'loading'], false)

    default:
      return state
  }
}
