import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControl/FormsControls";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators/validators";

const maxLengthCreator15 = maxLengthCreator(15);
const minLengthCreator1 = minLengthCreator(1)

const AddMessageForm = (props)=>{
  return  <form onSubmit={props.handleSubmit}>
    <div>
      <Field name="NewMessage" component={Textarea} type="text" placeholder="Enter your message..."
             validate={[required, maxLengthCreator15, minLengthCreator1]}/>
    </div>
    <div>
      <button>SEND</button>
    </div>
  </form>
}

const AddMessageReduxForm = reduxForm({
  form: 'dialogAddMessageForm'
})(AddMessageForm)

const Dialogs = (props) => {

  let state = props.dialogsPage;

  let dialogElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
  let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} id={m.id}/>);

  let addNewMessage = (values)=>{
    props.sendMessage(values.NewMessage);
  }

  if (!props.isAuth) {
    return <Redirect to={"/login"}/>
  }

  return (

    <div className={s.dialogs}>
      <div className={s.dialogItems}>
        {dialogElements}
      </div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <AddMessageReduxForm onSubmit={addNewMessage}/>
      </div>
    </div>
  )
}

export default Dialogs;
