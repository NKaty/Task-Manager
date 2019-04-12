import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducer'
import thunk from 'redux-thunk'
import history from '../history'
import { routerMiddleware } from 'connected-react-router'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))

const store = createStore(reducer(history), enhancer)

export default store
