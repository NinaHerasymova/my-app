import React, {useEffect, useState} from 'react';
import s from './ProfileInfo.module.css';

export const ProfileStatusWithHooks = (props) => {

  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(props.status)

  useEffect(()=>{
    setStatus(props.status)
  }, [props.status])

  const activateMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status)
  }


  const onStatusChange=(e)=>{
    setStatus(e.currentTarget.value);
  }


  return <div>
    {!editMode &&
    <div className={s.status}>
      <span onDoubleClick={activateMode}>"{props.status || "---"}"</span>
    </div>
    }
    {editMode &&
    <div>'
      <input onChange={onStatusChange} autoFocus={true} value={status}
             onBlur={deactivateEditMode}/>
    </div>
    }
  </div>
}

