import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {usersAPI} from "../api/usersApi";
import {profileAPI} from "../api/profileApi";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";

let initialState = {
    posts: [
        {id: 0, message: 'How are you?', likesCount: 102},
        {id: 1, message: 'It\'s my first post', likesCount: 65},
        {id: 2, message: 'WTF', likesCount: 215},
        {id: 3, message: 'Olala', likesCount: 25},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ""
}

export type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType|FormAction>

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'samurai-network/profile/ADD-POST': {
            let newPost = {
                id: 5,
                message: action.newPostBody,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        }
        case
        'samurai-network/profile/SET_USER_PROFILE' : {
            return {
                ...state,
                profile: action.profile
            }
        }
        case
        'samurai-network/profile/SET_STATUS' : {
            return {
                ...state,
                status: action.status
            }
        }
        case
        'samurai-network/profile/SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state;
    }

}

export const actions = {
    addPostActionCreator: (newPostBody: string) => ({
        type: 'samurai-network/profile/ADD-POST',
        newPostBody
    } as const),
    setUserProfile: (profile: ProfileType) => ({type: 'samurai-network/profile/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'samurai-network/profile/SET_STATUS', status} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'samurai-network/profile/SAVE_PHOTO_SUCCESS', photos} as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status)

        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
    } catch (error) {
        alert(error.message)
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if(userId!==null){
            dispatch(getUserProfile(userId))
        }else{
            throw new Error ("id can`t be null")
        }
    } else {
        dispatch(stopSubmit('contacts', {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}
