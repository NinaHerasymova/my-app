import React from "react";
import s from './Users.module.css';

import userPhoto from "../../assets/images/user.png"
import {NavLink} from "react-router-dom";

let Users = (props) => {

  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (<div>
    <div>
      {pages.map(p => {
        return <span className={props.currentPage === p ? s.selectedPage : s.page} onClick={(e) => {
          props.onPageChanged(p)
        }}>{p}</span>
      })}
    </div>
    {props.users.map(u => <div key={u.id}>
      <span>
        <div>
          <NavLink to={'./profile/'+u.id}>
          <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={s.userPhoto}
               alt="avatar"/>
          </NavLink>
          </div>

        <div>
          {u.isFollowed
            ? <button onClick={() => {
              props.unfollow(u.id)
            }}>UNFOLLOW</button>
            : <button onClick={() => {
              props.follow(u.id)
            }}>FOLLOW</button>}
        </div>
      </span>
      <span>
        <div>{u.name}</div>
        <div>{u.status}</div>
      </span>
      <span>
        <div>{'u.location.country'}</div>
        <div>{'u.location.city'}</div>
      </span>
    </div>)
    }
  </div>)
}

export default Users

