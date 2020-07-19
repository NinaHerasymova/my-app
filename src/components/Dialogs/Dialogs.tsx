import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { InjectedFormProps, reduxForm} from "redux-form"
import {createField, Textarea} from "../common/FormsControl/FormsControls"
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators/validators"
import {InitialStateType} from "../../redux/dialogsReducer";

const maxLengthCreator15 = maxLengthCreator(15)
const minLengthCreator1 = minLengthCreator(1)

type PropsType = {
  dialogsPage: InitialStateType
  sendMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
  newMessage: string
}

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
type AddMessageFormType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, AddMessageFormType> & AddMessageFormType>= (props)=>{
  return  <form onSubmit={props.handleSubmit}>
    <div>
      {createField<NewMessageFormValuesKeysType>("newMessage","Enter your message...",Textarea, [required, maxLengthCreator15, minLengthCreator1])}
    </div>
    <div>
      <button>SEND</button>
    </div>
  </form>
}

const AddMessageReduxForm = reduxForm<NewMessageFormValuesType>({
  form: 'dialogAddMessageForm'
})(AddMessageForm)

const Dialogs: React.FC<PropsType> = (props) => {

  let state = props.dialogsPage

  let dialogElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
  // @ts-ignore
  let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} id={m.id}/>)

  let addNewMessage = (values: NewMessageFormValuesType) => {
    props.sendMessage(values.newMessage);
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

export default Dialogs
