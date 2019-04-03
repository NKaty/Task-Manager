import { LOAD_TASKS_FOR_PAGE, ADD_TASK, SUCCESS, FAIL, START } from '../constants'
// let id = 1

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

export function addTask(form) {
  const body = new FormData()
  Object.keys(form).forEach(field => body.append(field, form[field]))

  return (dispatch, getState) => {
    dispatch({
      type: ADD_TASK + START
    })

    // fetch('https://uxcandy.com/~shapoval/test-task-backend/create?developer=Test', {
    //   method: 'POST',
    //   mode: 'cors',
    //   body
    // })
    //   .then(res => {
    //     console.log(res)
    //     // console.log(res.json())
    //     return res.json()
    //   })
    //   .then(response => {
    //     console.log('success')
    //     dispatch({
    //       type: ADD_TASK + SUCCESS,
    //       response
    //     })
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     dispatch({
    //       type: ADD_TASK + FAIL,
    //       error
    //     })
    //   })

    setTimeout(
      () =>
        dispatch({
          type: ADD_TASK + FAIL,
          error: {
            username: 'Поле является обязательным для заполнения',
            email: 'Неверный email',
            text: 'Поле является обязательным для заполнения'
          }
        }),
      // dispatch({
      //   type: ADD_TASK + SUCCESS,
      //   response: {
      //     message: {
      //       id: id++,
      //       username: form.username,
      //       email: form.email,
      //       text: form.text,
      //       status: 0
      //     }
      //   }
      // }),
      3000
    )
  }
}
