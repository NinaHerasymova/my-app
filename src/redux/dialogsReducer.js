const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND_MESSAGE'

let initialState = {
  dialogs: [
    {id: 1, name: 'Nina'},
    {id: 2, name: 'Denys'},
    {id: 3, name: 'Svetka'},
    {id: 4, name: 'Murat'},
  ],
  messages: [
    {id: 1, message: 'Hello'},
    {id: 2, message: 'There were a lot of fine things happened here without you!!!!'},
    {id: 3, message: 'Merhaba'},
    {id: 4, message: 'Nice to meet you)))'},
    {id: 5, message: 'So cute'}
  ],
  newMessageText: ""
}

export const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      return {
        ...state,
        newMessageBody: action.body
      };
    case SEND_MESSAGE: {
      let body = state.newMessageBody;
      return {
        ...state,
        newMessageBody: '',
        messages: [...state.messages, {id: 6, message: body}]
      }
    }
    default:
      return state;
  }
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageBodyCreator = (body) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: body
})
