import {applyMiddleware, combineReducers, compose, createStore} from "redux"
import thunkMiddleWare  from "redux-thunk"
import { reducer as formReducer } from 'redux-form'

import {profileReducer} from "./profileReducer"
import {dialogsReducer} from "./dialogsReducer"
import {usersReducer} from "./usersReducer"
import {authReducer} from "./authReducer"
import {appReducer} from "./appReducer"

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)))
