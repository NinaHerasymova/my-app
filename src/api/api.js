import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "ace1d355-37f3-41f1-9e1d-9be3c2554ce8"
  }
})

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    .then(response => {
      return response.data
    })
  },
  follow(userId) {
    return instance.post(`follow/${userId}`)
  },
  unfollow(userId) {
    return instance.delete(`follow/${userId}`)
  },
  getProfile(userId) {
    console.warn("Use profileApi")
    return profileAPI.getProfile(userId)
  }
}

export const authAPI = {
  me() {
    return instance.get(`auth/me`)
  },
  logIn(email, password, rememberMe = false, captcha = null) {
    return instance.post(`auth/login`, {email, password, rememberMe, captcha})
  },
  logOut() {
    return instance.delete(`auth/login`)
  },
  getAuthUserPhoto(userId) {
    return instance.get(`profile/${userId}`)
  }
}

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`)
  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`)
  },
  updateStatus(status) {
    return instance.put(`profile/status`, {status: status})
  },
  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append("image", photoFile)
    return instance.put(`profile/photo`, formData, {
        headers: {'Content-type': 'multipart/form-data'}
      }
    )
  },
  saveProfile(profile) {
    return instance.put(`profile`, profile)
  }
}

export const securityApi = {
  getCaptchaUrl() {
    return instance.get('security/get-captcha-url')
  }
}

