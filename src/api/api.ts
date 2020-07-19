import axios from "axios";
import {PhotosType, UserType} from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "ace1d355-37f3-41f1-9e1d-9be3c2554ce8"
    }
})

type UserItemType = {
    id: number
    name: string
    uniqueUrlName: null|string
    status: string|null,
    followed: boolean
    photos: PhotosType
}

type UsersResponseType = {
    error: number|null
    items: Array<UserItemType>
    totalCount:number
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export type APIResponseType<D = {}, RC = number> = {
    data: D
    messages: Array<string>
    resultCode: RC
}
