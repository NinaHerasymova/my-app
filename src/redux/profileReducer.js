const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
  posts: [
    {id: 0, message: 'How are you?', likesCount: 102},
    {id: 1, message: 'It\'s my first post', likesCount: 65},
    {id: 2, message: 'WTF', likesCount: 215},
    {id: 3, message: 'Olala', likesCount: 25},
  ],
  newPostText: ""
}

export const profileReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: state.newPostText,
        likesCount: 0
      };
      return {
        ...state,
        newPostText: '',
        posts: [...state.posts, newPost]
      }
    }
    case
    UPDATE_NEW_POST_TEXT: {
      return {
        ...state,
        newPostText: action.newText
      }
    }
    default:
      return state;
  }

}

export const addPostActionCreator = () => ({type: ADD_POST})
export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text
})
