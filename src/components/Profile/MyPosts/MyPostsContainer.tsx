import {connect} from "react-redux";

import {actions} from "../../../redux/profileReducer";
import MyPosts, {DispatchPropsPostsType, MapPropsPostsType} from "./MyPosts";
import {AppStateType} from "../../../redux/reduxStore";


let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
    }
}

const MyPostsContainer = connect<MapPropsPostsType, DispatchPropsPostsType, {}, AppStateType>(mapStateToProps, {addPost: actions.addPostActionCreator})(MyPosts)

export default MyPostsContainer
