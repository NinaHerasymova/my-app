const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND_MESSAGE'

let store = {
  _state: {
    profilePage: {
      posts: [
        {id: 0, message: 'How are you?', likesCount: 102},
        {id: 1, message: 'It\'s my first post', likesCount: 65},
        {id: 2, message: 'WTF', likesCount: 215},
        {id: 3, message: 'Olala', likesCount: 25},
      ]
    },
    dialogsPage: {
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
  },
  _callSubscriber() {
    console.log('State is chnged!!!!')
  },
  getState() {
    return this._state
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    if (action.type === ADD_POST) {
      let newPost = {
        id: 5,
        message: this._state.profilePage.newPostText,
        likesCount: 0
      };
      this._state.profilePage.posts.push(newPost);
      this._state.profilePage.newPostText = '';
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
      this._state.profilePage.newPostText = action.newText;
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_MESSAGE_BODY){
      this._state.dialogsPage.newMessageBody = action.body;
      this._callSubscriber(this._state);
    }else if (action.type === SEND_MESSAGE){
      let body = this._state.dialogsPage.newMessageBody;
      this._state.dialogsPage.newMessageBody = '';
      this._state.dialogsPage.messages.push({id: 6, message: body});
      this._callSubscriber(this._state);
    }
  }
}

export const addPostActionCreator = () => ({type: ADD_POST})
export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text
})
export const sendMessageCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageBodyCreator = (body) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: body
})

export default store;
window.store = store;