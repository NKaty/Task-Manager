import { createSelector } from 'reselect'

export const paginationSelector = state => state.tasks.pagination
export const totalTasksSelector = state => state.tasks.total
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

export const newTasksMapSelector = state => state.tasks.newTasks
export const newTaskLoadingSelector = state => state.tasks.newTasks.get('loading')

export const newTasksSelector = createSelector(
  newTasksMapSelector,
  newTasksMap => newTasksMap.get('ids').toArray()
)

export const sortBySelector = state => state.tasks.sortBy
export const sortOrderSelector = state => state.tasks.sortOrder

export const errorSelector = state => state.error
