import { Record, OrderedMap, Map, List } from 'immutable'
import { arrToMap } from '../utils/arrToMap'
import {
  LOAD_TASKS_FOR_PAGE,
  ADD_TASK,
  EDIT_TASK,
  ENTER_EDIT_MODE,
  CANCEL_EDIT_MODE,
  START,
  SUCCESS,
  FAIL
} from '../constants'

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
  editingTaskId: null,
  editedTaskLoading: false,
  total: null
})

export default (state = ReducerRecord(), action) => {
  const { type, payload, response } = action

  switch (type) {
    case LOAD_TASKS_FOR_PAGE + START:
      if (
        state.get('sortBy') !== payload.sortBy ||
        state.get('sortOrder') !== payload.sortOrder ||
        state.getIn(['newTasks', 'ids']).size ||
        state.get('editingTaskId') !== null
      ) {
        return state
          .set('entities', OrderedMap({}))
          .set('pagination', Map({}))
          .set('sortBy', payload.sortBy)
          .set('sortOrder', payload.sortOrder)
          .set('newTasks', Map({ ids: List() }))
          .set('editingTaskId', null)
          .setIn(['pagination', payload.page, 'loading'], true)
          .setIn(['pagination', payload.page, 'loaded'], false)
      }
      return state
        .setIn(['pagination', payload.page, 'loading'], true)
        .setIn(['pagination', payload.page, 'loaded'], false)

    case LOAD_TASKS_FOR_PAGE + SUCCESS:
      return state
        .set('total', response.message.total_task_count)
        .mergeIn(['entities'], arrToMap(response.message.tasks, TaskRecord))
        .setIn(['pagination', payload.page, 'ids'], response.message.tasks.map(task => task.id))
        .setIn(['pagination', payload.page, 'loading'], false)
        .setIn(['pagination', payload.page, 'loaded'], true)

    case LOAD_TASKS_FOR_PAGE + FAIL:
      return state
        .setIn(['pagination', payload.page, 'loading'], false)
        .setIn(['pagination', payload.page, 'loaded'], false)

    case ADD_TASK + START:
      return state.setIn(['newTasks', 'loading'], true).setIn(['newTasks', 'loaded'], false)

    case ADD_TASK + SUCCESS:
      return state
        .mergeIn(['entities'], arrToMap([response.message], TaskRecord))
        .mergeIn(['newTasks', 'ids'], response.message.id)
        .setIn(['newTasks', 'loading'], false)
        .setIn(['newTasks', 'loaded'], true)

    case ADD_TASK + FAIL:
      return state.setIn(['newTasks', 'loading'], false).setIn(['newTasks', 'loaded'], false)

    case EDIT_TASK + START:
      return state.set('editedTaskLoading', true)

    case EDIT_TASK + SUCCESS:
      return state.set('editedTaskLoading', false)

    case EDIT_TASK + FAIL:
      return state.set('editingTaskId', null).set('editedTaskLoading', false)

    case ENTER_EDIT_MODE:
      return state.set('editingTaskId', payload.taskId)

    case CANCEL_EDIT_MODE:
      return state.set('editingTaskId', null)

    default:
      return state
  }
}
