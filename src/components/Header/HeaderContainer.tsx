import React from 'react';
import {connect} from "react-redux";

import Header from "./Header";
import {logOut} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reduxStore";

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
    photo: string | null
}

type DispatchPropsType = {
    logOut: () => void
}

type PropsType = MapStatePropsType & DispatchPropsType

class HeaderContainer extends React.Component<PropsType> {
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    photo: state.auth.photo
})

export default connect<MapStatePropsType, DispatchPropsType,{}, AppStateType>(mapStateToProps, {logOut})(HeaderContainer)
