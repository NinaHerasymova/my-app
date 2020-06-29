import {getAuthUserData} from "./authReducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
  initialized: boolean
}

let initialState:InitialStateType = {
  initialized: false
}

export const appReducer = (state = initialState, action: any):InitialStateType => {

  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      };
    default:
      return state;
  }
}

export type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => async(dispatch:any) => {
  let promise = dispatch(getAuthUserData());
  await Promise.all([promise])
    dispatch(initializedSuccess())
}
