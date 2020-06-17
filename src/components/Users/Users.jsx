import React from "react";

import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";


const Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props}) => {
  return (<div>
    <Paginator totalUsersCount={totalUsersCount}
               pageSize={pageSize}
               currentPage={currentPage}
               onPageChanged={onPageChanged}/>
    {users.map(u => <User user={u}
                          key={u.id}
                          followingInProgress={props.followingInProgress}
                          unfollow={props.unfollow}
                          follow={props.follow}/>
    )}
  </div>)
}

export default Users

