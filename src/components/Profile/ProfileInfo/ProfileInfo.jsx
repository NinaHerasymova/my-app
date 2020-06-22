import React, {useState} from 'react';

import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader";
import userPhoto from "../../../assets/images/user.png";
import {ProfileStatusWithHooks} from "./ProfileStatusHooks";
import {ContactDataFormReduxForm} from "./ContactDataForm";

export const ProfileInfo = ({profile, status, isOwner, updateStatus, savePhoto, saveProfile}) => {

  let [editMode, setEditMode] = useState(false)

  if (!profile) {
    return <Preloader/>
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
    saveProfile(formData).then(
      () => {
        setEditMode(false)
      }
    )
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <div className={s.avatar}>
          <img alt='avatar' src={profile.photos.large !== null ? profile.photos.large : userPhoto}/>
          {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
        </div>
        <div className={s.profileInform}>
          <span className={s.fullName}>{profile.fullName}</span>
          <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
          {editMode
            ? <ContactDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
            : <ContactData goToEditMode={() => {
              setEditMode(true)
            }} profile={profile} isOwner={isOwner}/>}
        </div>
      </div>
    </div>
  )
}


const ContactData = ({profile, isOwner, goToEditMode}) => {
  return <div className={s.personInform}>
    {isOwner && <button onClick={goToEditMode}>EDIT</button>}
    <p><b>About me:</b> {profile.aboutMe}</p>
    <p><b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}</p>
    <p><b>Skills:</b> {profile.lookingForAJobDescription}</p>
    <div><b>Contacts:</b>
      {Object.keys(profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
      })}
    </div>
  </div>
}

const Contact = ({contactTitle, contactValue}) => {
  return <p className={s.contactTitle}><b>{contactTitle}:</b> {contactValue}</p>
}
