import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import tasks from './tasks'
import error from './error'

export default history =>
  combineReducers({
    router: connectRouter(history),
    tasks,
    error
  })
