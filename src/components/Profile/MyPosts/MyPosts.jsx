import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, minLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControl/FormsControls";

const maxLengthCreator15 = maxLengthCreator(15);
const minLengthCreator2 = minLengthCreator(2)

const MyPostForm = (props)=>{
  return <form onSubmit={props.handleSubmit}>
    <Field name="MyNewPost" component={Textarea} type="text" placeholder={"New post..."}
           validate={[required, maxLengthCreator15, minLengthCreator2]}/>
    <div>
      <button>Add post</button>
    </div>
  </form>
}

const MyPostReduxForm = reduxForm({
  form: 'newPost'
})(MyPostForm)

function MyPosts(props) {
  console.log('render')
  let postsElements = props.posts.map(p => <Post message={p.message} key={p.id} likesCount={p.likesCount}/>);

  const addNewPost = (values) => {
    props.addPost(values.MyNewPost)
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
}

export default MyPosts;
