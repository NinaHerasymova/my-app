const SEND_MESSAGE = 'SEND_MESSAGE'

type DialogType = {
  id: number
  name: string
}

type MessageType = {
  id: number
  message: string
}

let initialState = {
  dialogs: [
    {id: 1, name: 'Nina'},
    {id: 2, name: 'Denys'},
    {id: 3, name: 'Svetka'},
    {id: 4, name: 'Murat'},
  ] as Array<DialogType>,
  messages: [
    {id: 1, message: 'Hello'},
    {id: 2, message: 'There were a lot of fine things happened here without you!!!!'},
    {id: 3, message: 'Merhaba'},
    {id: 4, message: 'Nice to meet you)))'},
    {id: 5, message: 'So cute'}
  ] as Array<MessageType>
}

export type InitialStateType= typeof initialState

export const dialogsReducer = (state = initialState, action:any):InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE: {
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, {id: 6, message: body}]
      }
    }
    default:
      return state
  }
}

type SendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE,
  newMessageBody: string
}

export const sendMessageCreator = (newMessageBody:string):SendMessageCreatorActionType => ({type: SEND_MESSAGE, newMessageBody})

