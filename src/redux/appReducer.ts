import {getAuthUserData} from "./authReducer"
import {InferActionsTypes} from "./reduxStore";

let initialState = {
    initialized: false
}

export type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

export const appReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'samurai-network/app/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}

export const actions  ={
    initializedSuccess:()=>({type: 'samurai-network/app/INITIALIZED_SUCCESS' as const})
}

export const initializeApp = () => (dispatch:any) => {
    let promise = dispatch(getAuthUserData());

    Promise.all([promise])
    dispatch(actions.initializedSuccess())
}
