import { Record, OrderedMap, Map, List } from 'immutable'
import { arrToMap } from './utils'
import { LOAD_TASKS_FOR_PAGE, ADD_TASK, START, SUCCESS, FAIL } from '../constants'

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
  newTasks: Map({ ids: List() }),
  sortBy: 'none',
  sortOrder: 'none',
  total: null
})

export default (state = ReducerRecord(), action) => {
  const { type, payload, response, error } = action

  switch (type) {
    case LOAD_TASKS_FOR_PAGE + START:
      if (
        state.get('sortBy') !== payload.sortBy ||
        state.get('sortOrder') !== payload.sortOrder ||
        state.getIn(['newTasks', 'ids']).size
      ) {
        return state
          .set('entities', OrderedMap({}))
          .set('pagination', Map({}))
          .set('sortBy', payload.sortBy)
          .set('sortOrder', payload.sortOrder)
          .set('newTasks', Map({ ids: List() }))
          .setIn(['pagination', payload.page, 'loading'], true)
      }
      return state.setIn(['pagination', payload.page, 'loading'], true)

    case LOAD_TASKS_FOR_PAGE + SUCCESS:
      return state
        .set('total', response.message.total_task_count)
        .mergeIn(['entities'], arrToMap(response.message.tasks, TaskRecord))
        .setIn(['pagination', payload.page, 'ids'], response.message.tasks.map(task => task.id))
        .setIn(['pagination', payload.page, 'loading'], false)

    case ADD_TASK + START:
      return state.setIn(['newTasks', 'loading'], true).setIn(['newTasks', 'error'], null)

    case ADD_TASK + SUCCESS:
      return state
        .mergeIn(['entities'], arrToMap([response.message], TaskRecord))
        .mergeIn(['newTasks', 'ids'], response.message.id)
        .setIn(['newTasks', 'loading'], false)

    case ADD_TASK + FAIL:
      return state.setIn(['newTasks', 'error'], error).setIn(['newTasks', 'loading'], false)

    default:
      return state
  }
}
