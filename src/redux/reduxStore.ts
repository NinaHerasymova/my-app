import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux"
import thunkMiddleWare, {ThunkAction} from "redux-thunk"
import {reducer as formReducer} from 'redux-form'

import {profileReducer} from "./profileReducer"
import {dialogsReducer} from "./dialogsReducer"
import {ActionsTypes, usersReducer} from "./usersReducer"
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

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)))
