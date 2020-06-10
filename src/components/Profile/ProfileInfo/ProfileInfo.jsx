import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader";
import ProfileStatus from './ProfileStatus'
import userPhoto from "../../../assets/images/user.png";

const ProfileInfo = (props) => {

  if (!props.profile) {
    return <Preloader/>
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img alt='avatar' src={props.profile.photos.large!== null ? props.profile.photos.large : userPhoto}/>
        <div className={s.personInform}>
          <span className={s.fullName}>{props.profile.fullName}</span>
          <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
          <p>{props.profile.aboutMe}</p>
        </div>
      </div>
    </div>
  )
}
export default ProfileInfo;
