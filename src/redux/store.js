import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";

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
    this._state.profilePage = profileReducer(this._state.profilePage,action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage,action);

    this._callSubscriber(this._state);
  }
}
export default store;
window.store = store;