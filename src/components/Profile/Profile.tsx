import React from 'react'
import {ProfileInfo} from './ProfileInfo/ProfileInfo'
import MyPostsContainer from "./MyPosts/MyPostsContainer"
import {ProfileType} from "../../types/types"

type PropsType = {
    profile: ProfileType|null
    isOwner: boolean
    status: string
    updateStatus:(status:string)=>void
    savePhoto:(file: File)=>void
    saveProfile: (profile:ProfileType)=>Promise<any>
}
const Profile: React.FC<PropsType> = (props) => {

    return (
        <div>
            <ProfileInfo profile={props.profile}
                         isOwner={props.isOwner}
                         savePhoto={props.savePhoto}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         saveProfile={props.saveProfile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile
