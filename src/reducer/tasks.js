import { Record, OrderedMap, Map } from 'immutable'
import { arrToMap } from './utils'
import { LOAD_TASKS_FOR_PAGE, START, SUCCESS } from '../constants'

const TaskRecord = Record({
  id: null,
  username: null,
  email: null,
  text: null,
  status: null
})

const ReducerRecord = Record({
  entities: OrderedMap({}),
  pagination: Map({}),
  sortBy: 'none',
  sortOrder: 'none',
  total: null
})

export default (state = ReducerRecord(), action) => {
  const { type, payload, response } = action

  switch (type) {
    case LOAD_TASKS_FOR_PAGE + START:
      if (state.get('sortBy') !== payload.sortBy || state.get('sortOrder') !== payload.sortOrder) {
        return state
          .set('entities', OrderedMap({}))
          .set('pagination', Map({}))
          .set('sortBy', payload.sortBy)
          .set('sortOrder', payload.sortOrder)
          .setIn(['pagination', payload.page, 'loading'], true)
      }
      return state.setIn(['pagination', payload.page, 'loading'], true)

    case LOAD_TASKS_FOR_PAGE + SUCCESS:
      return state
        .set('total', response.message.total_task_count)
        .mergeIn(['entities'], arrToMap(response.message.tasks, TaskRecord))
        .setIn(['pagination', payload.page, 'ids'], response.message.tasks.map(task => task.id))
        .setIn(['pagination', payload.page, 'loading'], false)

    default:
      return state
  }
}
