let rerenderEntireTree = () => {
    console.log('State is chnged!!!!')
}

let state = {
    profilePage:{
        posts: [
        { id: 0, message: 'How are you?', likesCount: 102 },
        { id: 1, message: 'It\'s my first post', likesCount: 65 },
        { id: 2, message: 'WTF', likesCount: 215 }]
        
    },
    messagesPage:{
        dialogs: [
            { id: 1, name: 'Nina' },
            { id: 2, name: 'Denys' },
            { id: 3, name: 'Svetka' },
            { id: 4, name: 'Murat' },
        ],
        messages: [
            { id: 1, message: 'Hello' },
            { id: 2, message: 'How are you?There were a lot of fine things happened here without you!!!! How is your education? What about another things?????????' },
            { id: 3, message: 'Merhaba' },
            { id: 4, message: 'Nice to meet you)))' },
            { id: 5, message: 'Very nice to meet you tooo)))' }
        ]
    }
    
}

export const addPost = () => {
    let newPost = {
        id:5,
        message: state.profilePage.newPostText,
        likesCount: 0
    };
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = '';
    rerenderEntireTree(state);
}
export const updateNewPostText = (newPostText) => {
    state.profilePage.newPostText = newPostText;
    rerenderEntireTree(state);
}
export const subscribe = (observer) =>{
    rerenderEntireTree = observer;
}
export default state