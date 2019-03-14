import { LOAD_TASKS_FOR_PAGE, SUCCESS, FAIL, START } from '../constants'

export function loadTasksForPage(page, sortBy, sortOrder) {
  return (dispatch, getState) => {
    const {
      tasks: { pagination, sortBy: sortByFromStore, sortOrder: sortOrderFromStore }
    } = getState()
    if (
      pagination.getIn([page, 'loading']) ||
      (pagination.getIn([page, 'ids']) &&
        sortBy === sortByFromStore &&
        sortOrder === sortOrderFromStore)
    )
      return

    let params = `developer=Test&page=${page}`
    params = sortBy === 'none' ? params : `${params}&sort_field=${sortBy}`
    params =
      sortOrder === 'none'
        ? `${params}&sort_direction='asc'`
        : `${params}&sort_direction=${sortOrder}`

    dispatch({
      type: LOAD_TASKS_FOR_PAGE + START,
      payload: { page, sortBy, sortOrder }
    })

    fetch(`https://uxcandy.com/~shapoval/test-task-backend/?${params}`)
      .then(res => res.json())
      .then(response =>
        dispatch({
          type: LOAD_TASKS_FOR_PAGE + SUCCESS,
          payload: { page, sortBy, sortOrder },
          response
        })
      )
      .catch(error =>
        dispatch({
          type: LOAD_TASKS_FOR_PAGE + FAIL,
          payload: { page, sortBy, sortOrder },
          error
        })
      )
  }
}
