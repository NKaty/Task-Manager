import { createSelector } from 'reselect'

export const paginationSelector = state => state.tasks.pagination

export const totalTasksSelector = state => {
  const total = state.tasks.total
  return total === null ? null : isNaN(parseInt(total, 10)) ? null : parseInt(total, 10)
}

export const pageSelector = (_, props) => props.page

export const tasksPageSelector = createSelector(
  paginationSelector,
  pageSelector,
  (pagination, page) => pagination.getIn([page, 'ids'])
)

export const tasksPageLoadingSelector = createSelector(
  paginationSelector,
  pageSelector,
  (pagination, page) => pagination.getIn([page, 'loading'])
)

export const tasksPageLoadedSelector = createSelector(
  paginationSelector,
  pageSelector,
  (pagination, page) => pagination.getIn([page, 'loaded'])
)

export const newTasksMapSelector = state => state.tasks.newTasks
export const newTaskLoadingSelector = state => state.tasks.newTasks.get('loading')
export const newTaskLoadedSelector = state => state.tasks.newTasks.get('loaded')

export const newTasksSelector = createSelector(
  newTasksMapSelector,
  newTasksMap => newTasksMap.get('ids').toArray()
)

export const tasksSelector = state => state.tasks.entities
export const taskIdSelector = (_, props) => props.id

export const taskSelector = createSelector(
  tasksSelector,
  taskIdSelector,
  (tasks, id) => tasks.get(id)
)

export const editingTaskIdSelector = state => state.tasks.editingTaskId
export const editedTaskLoadingSelector = state => state.tasks.editedTaskLoading

export const editingTaskSelector = createSelector(
  tasksSelector,
  editingTaskIdSelector,
  (tasks, id) => tasks.get(id)
)

export const sortBySelector = state => state.tasks.sortBy
export const sortOrderSelector = state => state.tasks.sortOrder

export const isModalOpenSelector = state => state.modal.isModalOpen
export const componentIdSelector = state => state.modal.openModalId
export const componentModeSelector = state => state.modal.openModalMode

export const errorSelector = state => state.error
