import React from "react";
import {NavLink} from "react-router-dom";

import s from './Users.module.css';
import userPhoto from "../../assets/images/user.png"
import {UserType} from "../../types/types";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export const User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
  return (<div>
      <div>
        <div>
          <NavLink to={'./profile/' + user.id}>
          <img src={user.photos.small !== null ? user.photos.small : userPhoto} className={s.userPhoto}
               alt="avatar"/>
          </NavLink>
          </div>
        <div className={s.button}>
          {user.followed
            ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
              unfollow(user.id)
            }}>Unfollow</button>
            : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
              follow(user.id)
            }}>Follow</button>}
        </div>
      </div>
      <div>
        <div>{user.name}</div>
        <div>{user.status}</div>
      </div>
      <div>
        <div>{'u.location.country'}</div>
        <div>{'u.location.city'}</div>
      </div>
  </div>)
}


