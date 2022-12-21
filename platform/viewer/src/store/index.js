import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as oidcReducer } from 'redux-oidc'
import { redux } from '@ohif/core'

const { reducers, localStorage, sessionStorage } = redux
const middleware = [thunkMiddleware]// ?
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

reducers.oidc = oidcReducer

const rootReducer = combineReducers(reducers)

// local storage和session storage中取到之前存的旧数据
const preloadedState = {
  ...localStorage.loadState(),
  ...sessionStorage.loadState()
}

if(window.config && window.config.disableServersCache === true) {
  delete preloadedState.servers
}

const store = createStore({
  rootReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(...middleware))
})

// 订阅 store的state的preferences变动
store.subscribe(() => {
  localStorage.saveState({
    preferences: store.getState().preferences
  })
  sessionStorage.saveState({
    servers: store.getState().servers
  })
})

export default store