import {authAPI, securityApi as securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const SET_USER_PHOTO = 'samurai-network/auth/SET_USER_PHOTO';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';


export type InitialStateType2 = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    photo: string | null,
    captchaUrl: string | null
}

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    photo: null as string | null,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: any): InitialStateType2 => {

    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case SET_USER_PHOTO:
            return {
                ...state,
                photo: action.photo
            };
        default:
            return state;
    }
}

export type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

export type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})

export type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl: string | null }
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
})

export const setAuthUserPhoto = (photo: string | null) => ({type: SET_USER_PHOTO, photo})

export const getAuthUserData = () => async (dispatch: any) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        const {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true))
        const responsePhoto = await authAPI.getAuthUserPhoto(id)
        dispatch(setAuthUserPhoto(responsePhoto.data.photos.small))
    }
}

export const logIn = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    const response = await authAPI.logIn(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        const message = response.data.messages.length > 0 ? response.data.messages[0] : "Email or password is wrong!!!"
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const logOut = () => async (dispatch: any) => {
    const response = await authAPI.logOut()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}
