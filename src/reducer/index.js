import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import tasks from './tasks'
import modal from './modal'
import auth from './auth'
import error from './error'

export default history =>
  combineReducers({
    router: connectRouter(history),
    tasks,
    modal,
    auth,
    error
  })
