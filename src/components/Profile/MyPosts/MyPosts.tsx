import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, minLengthCreator, required} from "../../../utils/validators/validators";
import {createField, GetStringKeys, Input, Textarea} from "../../common/FormsControl/FormsControls";
import {PostType} from "../../../types/types";

const maxLengthCreator15 = maxLengthCreator(15);
const minLengthCreator2 = minLengthCreator(2)

type PropsFormType = {

}

export type AddPostFormValuesType ={
    newPostText: string
}

export type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>
//AddPostForm//
const MyPostForm:React.FC<InjectedFormProps<AddPostFormValuesType, PropsFormType> & PropsFormType> = (props)=>{
  return <form onSubmit={props.handleSubmit}>
      {createField<AddPostFormValuesTypeKeys>("newPostText", "New post...", Textarea, [required, maxLengthCreator15, minLengthCreator2])}
    <div>
      <button>Add post</button>
    </div>
  </form>
}

const MyPostReduxForm = reduxForm<AddPostFormValuesType, PropsFormType>({
  form: 'newPost'
})(MyPostForm)
//AddPOstForm end//

export type MapPropsPostsType = {
    posts: Array<PostType>
}

export type DispatchPropsPostsType = {
    addPost: (newPostText:string)=> void
}
const MyPosts: React.FC<MapPropsPostsType&DispatchPropsPostsType> = props => {
  let postsElements = props.posts.map(p => <Post message={p.message} key={p.id} likesCount={p.likesCount}/>);

  const addNewPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText)
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <MyPostReduxForm onSubmit={addNewPost}/>
      </div>
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  )
};

const MyPostMemorized = React.memo(MyPosts)

export default MyPostMemorized
