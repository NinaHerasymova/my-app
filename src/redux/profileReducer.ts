import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

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

export const profileReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case ADD_POST: {
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
        SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case
        SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case
        SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state;
    }

}

type AddPostActionCreatorActionType = {
    type: typeof ADD_POST,
    newPostBody: string
}

export const addPostActionCreator = (newPostBody: string): AddPostActionCreatorActionType => ({
    type: ADD_POST,
    newPostBody
})

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}

export const setUserProfile = (profile:ProfileType):SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})

type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}

export const setStatus = (status: string):SetStatusActionType => ({type: SET_STATUS, status})

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}

export const savePhotoSuccess = (photos:PhotosType):SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId:number) => async (dispatch:any) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatus = (userId:number) => async (dispatch:any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status:string) => async (dispatch:any) => {
    try {
        let response = await profileAPI.updateStatus(status)

        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (error) {
        alert(error.message)
    }
}

export const savePhoto = (file:any) => async (dispatch:any) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile:ProfileType) => async (dispatch:any, getState:any) => {
    const userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit('contacts', {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}
