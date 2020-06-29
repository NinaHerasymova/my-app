import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objectsHelper";
import {UserType} from "../types/types";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>
}

export type InitialStateType = typeof initialState;

export const usersReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };
        case SET_USERS:
            return {
                ...state, users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.totalCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
};

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}

export const followSuccess = (userId: number):FollowSuccessActionType => ({type: FOLLOW, userId})

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}

export const unfollowSuccess = (userId: number):UnfollowSuccessActionType => ({type: UNFOLLOW, userId})

type SetUsersActionType = {
    type: typeof SET_USERS
    users: UserType
}

export const setUsers = (users: UserType):SetUsersActionType => ({type: SET_USERS, users})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export const setCurrentPage = (currentPage: number):SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalCount: number
}

export const setTotalUsersCount = (totalCount: number):SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, totalCount})

type SetFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

export const setFetching = (isFetching: boolean):SetFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching})

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    followingInProgress: boolean
    userId: number
}

export const toggleFollowingProgress = (followingInProgress: boolean, userId: number):ToggleFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    followingInProgress,
    userId
})

export const requestUsers = (page: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(setCurrentPage(page))
        dispatch(setFetching(true))

        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(setFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

export const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod:any, actionCreator:any) => {
    dispatch(toggleFollowingProgress(true, userId))

    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}

export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    }
};
