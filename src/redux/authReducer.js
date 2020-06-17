import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_USER_PHOTO = 'SET_USER_PHOTO';

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  photo: null,
  isFetching: false
}

export const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_USER_DATA:
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

export const setAuthUserPhoto = (photo) => ({type: SET_USER_PHOTO, photo})

export const getAuthUserData = () => async (dispatch) => {
  let response = await authAPI.me()
  if (response.data.resultCode === 0) {
    let {id, email, login} = response.data.data;
    dispatch(setAuthUserData(id, email, login, true))
    let responsePhoto = await authAPI.getAuthUserPhoto(id)
    dispatch(setAuthUserPhoto(responsePhoto.data.photos.small))
  }
}

export const logIn = (email, password, rememberMe) => async (dispatch) => {
  let response = await authAPI.logIn(email, password, rememberMe)
  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData())
  } else {
    let message = response.data.messages.length > 0 ? response.data.messages[0] : "Email or password is wrong!!!"
    dispatch(stopSubmit("login", {_error: message}))
  }
}

export const logOut = () => async (dispatch) => {
  let response = await authAPI.logOut()
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}
