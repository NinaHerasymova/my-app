import React from "react";
import * as axios from "axios";
import {connect} from "react-redux";

import Users from "./Users";
import Preloader from "../common/Preloader";
import {follow, setCurrentPage, setFetching, setTotalUsersCount, setUsers, unfollow} from "../../redux/usersReducer";



class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.setFetching (true)
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize} `)
    .then(response => {
      this.props.setFetching (false)
      this.props.setUsers(response.data.items)
      this.props.setTotalUsersCount(response.data.totalCount);
    })
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.setFetching (true)
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize} `)
    .then(response => {
      this.props.setFetching (false)
      this.props.setUsers(response.data.items);
    })
  }

  render() {

    let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return <>
      {this.props.isFetching ? <Preloader /> : null}
      <Users totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}/>
    </>
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching
  }
}

export default UsersContainer = connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    setFetching
  })(UsersContainer)
