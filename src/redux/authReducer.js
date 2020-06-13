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
export const getAuthUserData = () => (dispatch) => {
  return authAPI.me()
  .then(response => {
    if (response.data.resultCode === 0) {
      let {id, email, login} = response.data.data;
      dispatch(setAuthUserData(id, email, login, true))
      authAPI.getAuthUserPhoto(id).then(response => {
        dispatch(setAuthUserPhoto(response.data.photos.small))
      })
    }
  })
}

export const logIn = (email, password, rememberMe) => (dispatch) => {
  authAPI.logIn(email, password, rememberMe).then(response => {
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData())
    } else {
      let message = response.data.messages.length > 0 ? response.data.messages[0] : "Email or password is wrong!!!"
      dispatch(stopSubmit("login", {_error: message}))
    }
  })
}
export const logOut = () => (dispatch) => {
  authAPI.logOut().then(response => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false))
    }
  })
}
