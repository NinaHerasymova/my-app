import React from "react"
import {InjectedFormProps, reduxForm} from "redux-form"
import style from '../../common/FormsControl/FormsControl.module.css'
import s from './ProfileInfo.module.css'
import {createField, GetStringKeys, Input, Textarea} from "../../common/FormsControl/FormsControls"
import {ProfileType} from "../../../types/types"

type PropsType = {
  // handleSubmit:()=>void
   profile: ProfileType
  // error: number
}

type ProfileTypeKeys = GetStringKeys<ProfileType>


const ContactDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
  return <form onSubmit={handleSubmit}>
    <button>SAVE</button>
    {error && <div className={style.formSummaryError}>{error}</div>}
    <div><b>Full name:</b>{createField<ProfileTypeKeys>("fullName", "full name", Input, [], {type: "text"})}</div>
    <div><b>About me:</b>{createField<ProfileTypeKeys>("aboutMe", "about me", Input, [], {type: "text"})}</div>
    <div><b>Looking for a job:</b>
      {createField<ProfileTypeKeys>("lookingForAJob", "looking for a job", Input, [], {type: "checkbox"})}
    </div>
    <div><b>Skills:</b>
      {createField<ProfileTypeKeys>("lookingForAJobDescription", "skills", Textarea, [])}
    </div>
    <div><b>Contacts:</b>
      {Object.keys(profile.contacts).map(key => {
        return <div key={key} className={s.contact}>
          <div>
            // todo:create some solution for embedded object
            <b>{key}:</b>{createField("contacts."+key, key, Input, [], {type: "text"})}
          </div>
        </div>
      })}
    </div>
  </form>
}

export const ContactDataFormReduxForm = reduxForm<ProfileType, PropsType>({
  form: 'contacts'
})(ContactDataForm)
