import { LOAD_TASKS_FOR_PAGE, SUCCESS, FAIL, START } from '../constants'

export function loadTasksForPage(page) {
  return (dispatch, getState) => {
    const {
      tasks: { pagination }
    } = getState()
    if (pagination.getIn([page, 'loading']) || pagination.getIn([page, 'ids'])) return

    dispatch({
      type: LOAD_TASKS_FOR_PAGE + START,
      payload: { page }
    })

    fetch(`https://uxcandy.com/~shapoval/test-task-backend/?developer=Test&page=${page}`)
      .then(res => res.json())
      .then(response =>
        dispatch({
          type: LOAD_TASKS_FOR_PAGE + SUCCESS,
          payload: { page },
          response
        })
      )
      .catch(error =>
        dispatch({
          type: LOAD_TASKS_FOR_PAGE + FAIL,
          payload: { page },
          error
        })
      )
  }
}
