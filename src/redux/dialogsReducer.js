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
    {
      id: 2,
      message: 'How are you?There were a lot of fine things happened here without you!!!! How is your education? What about another things?????????'
    },
    {id: 3, message: 'Merhaba'},
    {id: 4, message: 'Nice to meet you)))'},
    {id: 5, message: 'So cute'}
  ],
  newMessageText: ""
}

export const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      state.newMessageBody = action.body;
      return state;
    case SEND_MESSAGE:
      let body = state.newMessageBody;
      state.newMessageBody = '';
      state.messages.push({id: 6, message: body});
      return state;
    default:return state;
  }
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageBodyCreator = (body) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: body
})