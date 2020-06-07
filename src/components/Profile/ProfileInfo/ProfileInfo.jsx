import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader";
import userPhoto from "../../../assets/images/user.png";

const ProfileInfo = (props) => {

  if (!props.profile) {
    return <Preloader/>
  }

  return (
    <div>
      <div className={s.wallpaper}>
        <img alt='wallpaper' src='https://www.w3schools.com/w3css/img_lights.jpg'/>
      </div>
      <div className={s.descriptionBlock}>
        <img alt='avatar' src={props.profile.photos.large!== null ? props.profile.photos.large : userPhoto}/>
        <div className={s.personInform}>
          <span className={s.fullName}>{props.profile.fullName}</span>
          <p className={s.status}>{props.profile.aboutMe}</p>
        </div>
      </div>
    </div>
  )
}
export default ProfileInfo;
