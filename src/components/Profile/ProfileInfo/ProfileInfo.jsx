import React from 'react';

import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader";
import userPhoto from "../../../assets/images/user.png";
import {ProfileStatusWithHooks} from "./ProfileStatusHooks";

const ProfileInfo = ({profile, status, updateStatus}) => {

  if (!profile) {
    return <Preloader/>
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img alt='avatar' src={profile.photos.large!== null ? profile.photos.large : userPhoto}/>
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
