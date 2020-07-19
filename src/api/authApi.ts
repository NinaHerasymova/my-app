import {instance, APIResponseType, ResultCodeForCaptchaEnum, ResultCodesEnum} from "./api";
import {PhotosType, ProfileType} from "../types/types";

type MeResponseDataType = {
    id: number
    email: string
    login: string
}

type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    logIn(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post <APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        })
            .then(res => res.data)
    },
    logOut() {
        return instance.delete(`auth/login`).then(res => res.data)
    },
    getAuthUserPhoto(userId: number) {
        return instance.get<APIResponseType<ProfileType>>(`profile/${userId}`).then(res => res.data)
    }
}
