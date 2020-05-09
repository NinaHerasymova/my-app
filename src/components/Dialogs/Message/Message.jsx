import React from 'react';
import s from './Message.module.css';

const Message = (props) => {
  return (
    <div className={s.message}>
      {props.message}
      <div className={s.ava}></div>
    </div>
  )
}

export default Message;