import {
  LOAD_TASKS_FOR_PAGE,
  ADD_TASK,
  EDIT_TASK,
  RESET_ERROR_MESSAGE,
  OPEN_MODAL,
  CLOSE_MODAL,
  ENTER_EDIT_MODE,
  CANCEL_EDIT_MODE,
  LOGIN_AS_ADMIN,
  LOGOUT,
  SUCCESS,
  FAIL,
  START
} from '../constants'
import { URL } from '../constants/common'
import callAPI from '../utils/callAPI'
import convertErrorFields from '../utils/convertErrorFields'
import getPostParamsWithSignature from '../utils/getPostParamsWithSignature'
import loginSimulation from '../utils/loginSimulation'

export function loadTasksForPage(page, sortBy, sortOrder) {
  return (dispatch, getState) => {
    const {
      tasks: {
        pagination,
        sortBy: sortByFromStore,
        sortOrder: sortOrderFromStore,
        newTasks,
        editingTaskId
      }
    } = getState()
    if (
      pagination.getIn([page, 'loading']) ||
      (pagination.getIn([page, 'ids']) &&
        sortBy === sortByFromStore &&
        sortOrder === sortOrderFromStore &&
        !newTasks.get('ids').size &&
        editingTaskId === null)
    ) {
      console.log('break')
      return
    }

    let params = `developer=Test&page=${encodeURIComponent(page)}`
    params = sortBy === 'none' ? params : `${params}&sort_field=${encodeURIComponent(sortBy)}`
    params =
      sortOrder === 'none'
        ? sortBy === 'none'
          ? params
          : `${params}&sort_direction='asc'`
        : `${params}&sort_direction=${encodeURIComponent(sortOrder)}`

    dispatch({
      type: LOAD_TASKS_FOR_PAGE + START,
      payload: { page, sortBy, sortOrder }
    })

    callAPI(`${URL}?${params}`)
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

  return dispatch => {
    dispatch({
      type: ADD_TASK + START
    })

    callAPI(`${URL}create?developer=Test`, {
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
  }
}

export function editTask(form, id) {
  const signedForm = getPostParamsWithSignature(form)
  const body = new FormData()
  Object.keys(signedForm).forEach(field => body.append(field, signedForm[field]))

  return (dispatch, getState) => {
    const {
      tasks: { sortBy, sortOrder },
      router: {
        location: { pathname }
      }
    } = getState()

    const page = isNaN(parseInt(pathname.replace(/^\//, ''), 10))
      ? 1
      : parseInt(pathname.replace(/^\//, ''), 10)

    dispatch({
      type: EDIT_TASK + START
    })

    callAPI(`${URL}edit/${id}?developer=Test`, {
      method: 'POST',
      mode: 'cors',
      body
    })
      .then(response => {
        dispatch({
          type: EDIT_TASK + SUCCESS,
          response
        })

        dispatch(loadTasksForPage(page, sortBy, sortOrder))
      })
      .catch(error => {
        console.log(error.message)
        dispatch({
          type: EDIT_TASK + FAIL,
          error: {
            title: 'Изменения не удалось сохранить.',
            errors:
              typeof error.message === 'object' ? convertErrorFields(error.message) : error.message
          }
        })
      })
  }
}

export function loginAsAdmin(username, password) {
  return dispatch => {
    dispatch({
      type: LOGIN_AS_ADMIN + START
    })

    loginSimulation(username, password)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + response.expiresIn)
        // for login process simulation purpose only
        localStorage.setItem('userId', response.userId)
        localStorage.setItem('adminAccess', response.adminAccess)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch({
          type: LOGIN_AS_ADMIN + SUCCESS,
          payload: { userId: response.userId, adminAccess: response.adminAccess }
        })

        setTimeout(() => dispatch(logout()), response.expiresIn)
      })
      .catch(error => {
        dispatch({
          type: LOGIN_AS_ADMIN + FAIL,
          error: {
            title: 'При входе в приложение под правами администратора произошла ошибка.',
            errors:
              typeof error.message === 'object' ? convertErrorFields(error.message) : error.message
          }
        })
      })
  }
}

export function logout() {
  localStorage.removeItem('userId')
  localStorage.removeItem('adminAccess')
  localStorage.removeItem('expirationDate')
  return {
    type: LOGOUT
  }
}

export function isAdminCheck() {
  return dispatch => {
    const userId = localStorage.getItem('userId')
    if (!userId) return dispatch(logout())

    const expirationDate = new Date(localStorage.getItem('expirationDate'))
    if (expirationDate <= new Date()) {
      return dispatch(logout())
    }

    const adminAccess = localStorage.getItem('adminAccess') === 'true'

    dispatch({
      type: LOGIN_AS_ADMIN + SUCCESS,
      payload: { userId, adminAccess }
    })

    setTimeout(() => dispatch(logout()), expirationDate.getTime() - new Date().getTime())
  }
}

export function enterEditMode(taskId) {
  return {
    type: ENTER_EDIT_MODE,
    payload: { taskId }
  }
}

export function cancelEditMode() {
  return {
    type: CANCEL_EDIT_MODE
  }
}

export function openModal(modalId, modelMode) {
  return {
    type: OPEN_MODAL,
    payload: { modalId, modelMode }
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}

export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}
