import React from 'react';

import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader";
import userPhoto from "../../../assets/images/user.png";
import {ProfileStatusWithHooks} from "./ProfileStatusHooks";

const ProfileInfo = ({profile, isOwner, status, updateStatus, savePhoto}) => {

  if (!profile) {
    return <Preloader/>
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <div className={s.avatar}>
          <img alt='avatar' src={profile.photos.large !== null ? profile.photos.large : userPhoto}/>
          {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
        </div>
        <div className={s.personInform}>
          <span className={s.fullName}>{profile.fullName}</span>
          <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
          <p>About me: {profile.aboutMe}</p>
        </div>
      </div>
    </div>
  )
}
export default ProfileInfo;
