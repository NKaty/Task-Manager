import {
  LOAD_TASKS_FOR_PAGE,
  ADD_TASK,
  RESET_ERROR_MESSAGE,
  SUCCESS,
  FAIL,
  START
} from '../constants'
import callAPI from '../utils/callAPI'
import convertErrorFields from '../utils/convertErrorFields'

export function loadTasksForPage(page, sortBy, sortOrder) {
  return (dispatch, getState) => {
    const {
      tasks: { pagination, sortBy: sortByFromStore, sortOrder: sortOrderFromStore, newTasks }
    } = getState()
    if (
      pagination.getIn([page, 'loading']) ||
      (pagination.getIn([page, 'ids']) &&
        sortBy === sortByFromStore &&
        sortOrder === sortOrderFromStore &&
        !newTasks.get('ids').size)
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

    callAPI(`https://uxcandy.com/~shapoval/test-task-backend/?${params}`)
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
          error: {
            title: 'Не удалось получить список заданий',
            errors:
              typeof error.message === 'object' ? convertErrorFields(error.message) : error.message
          }
        })
      )
  }
}

export function addTask(form) {
  const body = new FormData()
  Object.keys(form).forEach(field => body.append(field, form[field]))

  return (dispatch, getState) => {
    dispatch({
      type: ADD_TASK + START
    })

    callAPI('https://uxcandy.com/~shapoval/test-task-backend/create?developer=Test', {
      method: 'POST',
      mode: 'cors',
      body
    })
      .then(response => {
        dispatch({
          type: ADD_TASK + SUCCESS,
          response
        })
      })
      .catch(error => {
        console.log(error.message)
        dispatch({
          type: ADD_TASK + FAIL,
          error: {
            title: 'Новое задание не удалось создать.',
            errors:
              typeof error.message === 'object' ? convertErrorFields(error.message) : error.message
          }
        })
      })

    let id = 1
    setTimeout(
      () =>
        //     dispatch({
        //       type: ADD_TASK + FAIL,
        //       error: {
        //         username: 'Поле является обязательным для заполнения',
        //         email: 'Неверный email',
        //         text: 'Поле является обязательным для заполнения'
        //       }
        //     }),
        dispatch({
          type: ADD_TASK + SUCCESS,
          response: {
            message: {
              id: id++,
              username: form.username,
              email: form.email,
              text: form.text,
              status: 0
            }
          }
        }),
      1000
    )
  }
}

export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}
