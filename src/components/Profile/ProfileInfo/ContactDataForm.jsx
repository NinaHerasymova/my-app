import React from "react";
import {reduxForm} from "redux-form";
import style from '../../common/FormsControl/FormsControl.module.css';
import s from './ProfileInfo.module.css';
import {createField, Input, Textarea} from "../../common/FormsControl/FormsControls";


const ContactDataForm = ({handleSubmit, profile, error}) => {
  return <form onSubmit={handleSubmit}>
    <button>SAVE</button>
    {error && <div className={style.formSummaryError}>{error}</div>}
    <div><b>Full name:</b>{createField("fullName", "full name", Input, [], {type: "text"})}</div>
    <div><b>About me:</b>{createField("aboutMe", "about me", Input, [], {type: "text"})}</div>
    <div><b>Looking for a job:</b>
      {createField("lookingForAJob", "looking for a job", Input, [], {type: "checkbox"})}
    </div>
    <div><b>Skills:</b> {profile.lookingForAJobDescription}
      {createField("lookingForAJobDescription", "skills", Textarea)}
    </div>
    <div><b>Contacts:</b>
      {Object.keys(profile.contacts).map(key => {
        return <div key={key} className={s.contact}>
          <div>
            <b>{key}:</b>{createField("contacts."+key, key, Input, [], {type: "text"})}
          </div>
        </div>
      })}
    </div>
  </form>
}

export const ContactDataFormReduxForm = reduxForm({
  form: 'contacts'
})(ContactDataForm)
