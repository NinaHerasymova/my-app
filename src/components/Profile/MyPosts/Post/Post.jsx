import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
  return (
    <div className={s.item}>
      <img alt='friend' src='https://glavcom.ua/img/article/6252/49_main.jpeg'></img>
      {props.message}
      <div>
        <span>like</span> { props.likesCount }
      </div>
    </div>
  )
}

export default Post;