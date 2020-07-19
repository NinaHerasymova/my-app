import {InferActionsTypes} from "./reduxStore";

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

type ActionsType = InferActionsTypes<typeof actions>

export const dialogsReducer = (state = initialState, action:ActionsType):InitialStateType => {
  switch (action.type) {
    case 'samurai-network/dialogs/SEND_MESSAGE': {
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

export const actions = {
  sendMessageCreator: (newMessageBody:string) => ({type: 'samurai-network/dialogs/SEND_MESSAGE', newMessageBody} as const)
}
