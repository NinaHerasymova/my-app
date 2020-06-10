import {authAPI} from "../api/api";

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
        ...action.data,
        isAuth: true
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

export const setAuthUserData = (userId, email, login) => ({type: SET_USER_DATA, data: {userId, email, login}})
export const setAuthUserPhoto = (photo) => ({type: SET_USER_PHOTO, photo})
export const getAuthUserData = () => (dispatch)=>{
  authAPI.me().then(response => {
       if (response.data.resultCode === 0) {
         let {id, email, login} = response.data.data;
         dispatch(setAuthUserData(id, email, login))
        authAPI.getAuthUserPhoto(id).then(response => {
          dispatch(setAuthUserPhoto(response.data.photos.small))
         })
       }
     })
}
