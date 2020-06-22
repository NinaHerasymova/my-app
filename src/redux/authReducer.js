import {authAPI, securityApi as securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const SET_USER_PHOTO = 'samurai-network/auth/SET_USER_PHOTO';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';


let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  photo: null,
  isFetching: false,
  captchaUrl: null
}

export const authReducer = (state = initialState, action) => {

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

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: {userId, email, login, isAuth}
})

export const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: {captchaUrl}
})

export const setAuthUserPhoto = (photo) => ({type: SET_USER_PHOTO, photo})

export const getAuthUserData = () => async (dispatch) => {
  const response = await authAPI.me()
  if (response.data.resultCode === 0) {
    const {id, email, login} = response.data.data;
    dispatch(setAuthUserData(id, email, login, true))
    const responsePhoto = await authAPI.getAuthUserPhoto(id)
    dispatch(setAuthUserPhoto(responsePhoto.data.photos.small))
  }
}

export const logIn = (email, password, rememberMe, captcha) => async (dispatch) => {
  const response = await authAPI.logIn(email, password, rememberMe, captcha)
  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData())
  } else {
    if(response.data.resultCode === 10){
      dispatch(getCaptchaUrl())
    }
    const message = response.data.messages.length > 0 ? response.data.messages[0] : "Email or password is wrong!!!"
    dispatch(stopSubmit("login", {_error: message}))
  }
}

export const logOut = () => async (dispatch) => {
  const response = await authAPI.logOut()
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}

export const getCaptchaUrl = () => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl()
  const captchaUrl = response.data.url
  dispatch(getCaptchaUrlSuccess(captchaUrl))
}
