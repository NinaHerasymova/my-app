import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
  return (
    <div>
      <div className={s.wallpaper}>
        <img alt='wallpaper' src='https://www.w3schools.com/w3css/img_lights.jpg'/>
      </div>
      <div className={s.descriptionBlock}>
        <img alt='avatar' src='https://yt3.ggpht.com/a/AGF-l7_CAKbMT2_4_eXS_J5IXUHdOMFuxBIIIhTruA=s900-c-k-c0xffffffff-no-rj-mo'/>
      </div>
    </div>
  )
}
export default ProfileInfo;