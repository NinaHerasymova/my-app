import {FormAction, stopSubmit} from "redux-form"
import {authAPI} from "../api/authApi"
import {securityAPI} from "../api/securityApi"
import {BaseThunkType, InferActionsTypes} from "./reduxStore";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    photo: null as string | null,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType | FormAction>

export const authReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'samurai-network/auth/SET_USER_DATA':
        case 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            };
        case 'samurai-network/auth/SET_USER_PHOTO':
            return {
                ...state,
                photo: action.photo
            };
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'samurai-network/auth/SET_USER_DATA',
        payload: {userId, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS',
        payload: {captchaUrl}
    } as const),
    getAuthUserPhoto: (photo: string | null) => ({type: 'samurai-network/auth/SET_USER_PHOTO', photo} as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const data = await authAPI.me()
    if (data.resultCode === 0) {
        const {id, email, login} = data.data;
        dispatch(actions.setAuthUserData(id, email, login, true))
        const dataPhoto = await authAPI.getAuthUserPhoto(id)
        dispatch(actions.getAuthUserPhoto(dataPhoto.data.photos.small))
    }
}

export const logIn = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    const data = await authAPI.logIn(email, password, rememberMe, captcha)
    if (data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        const message = data.messages.length > 0 ? data.messages[0] : "Email or password is wrong!!!"
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const logOut = (): ThunkType => async (dispatch) => {
    const data = await authAPI.logOut()
    if (data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}
