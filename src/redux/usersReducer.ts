import {updateObjectInArray} from "../utils/objectsHelper";
import {UserType} from "../types/types";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./reduxStore";
import {Dispatch} from "redux";
import {usersAPI} from "../api/usersApi";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>
}

export type InitialState = typeof initialState;

export type ActionsTypes = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsTypes>


export const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {

    switch (action.type) {
        case 'samurai-network/users/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            };
        case 'samurai-network/users/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };
        case 'samurai-network/users/SET_USERS':
            return {
                ...state, users: action.users
            }
        case 'samurai-network/users/SET_CURRENT_PAGE':
            return {
                ...state, currentPage: action.currentPage
            }
        case 'samurai-network/users/SET_TOTAL_USERS_COUNT':
            return {
                ...state, totalUsersCount: action.totalCount
            }
        case 'samurai-network/users/TOGGLE_IS_FETCHING':
            return {
                ...state, isFetching: action.isFetching
            }
        case 'samurai-network/users/TOGGLE_IS_FOLLOWING_PROGRESS':
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

export const actions = {
    followSuccess: (userId: number) => ({type: 'samurai-network/users/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'samurai-network/users/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'samurai-network/users/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'samurai-network/users/SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalCount: number) => ({
        type: 'samurai-network/users/SET_TOTAL_USERS_COUNT',
        totalCount
    } as const),
    setFetching: (isFetching: boolean) => ({type: 'samurai-network/users/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (followingInProgress: boolean, userId: number) => ({
        type: 'samurai-network/users/TOGGLE_IS_FOLLOWING_PROGRESS',
        followingInProgress,
        userId
    } as const)
}

type CurrentDispatchType = Dispatch<ActionsTypes>


export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.setCurrentPage(page))
        dispatch(actions.setFetching(true))

        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(actions.setFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}

export const _followUnfollowFlow = async (dispatch: CurrentDispatchType,
                                          userId: number,
                                          apiMethod: any,
                                          actionCreator: (userID: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId))

    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
    }
};
