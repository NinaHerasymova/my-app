import React from 'react'
import {connect} from "react-redux";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {compose} from "redux";

import {getStatus, getUserProfile, updateStatus, savePhoto, saveProfile} from "../../redux/profileReducer";
import Profile from "./Profile";
import {AppStateType} from "../../redux/reduxStore";
import {ProfileType} from "../../types/types";

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile:ProfileType)=>Promise<any>
}
type PathParamsType = {
    userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number|null  = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.loggedUserId
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        if (!userId) {
            console.error("ID should exists in URI params or in state ('authorizedUserId')");
        } else {
            this.props.getUserProfile(userId)
            this.props.getStatus(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState:PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }

    }

    render() {

        return <Profile {...this.props}
                        isOwner={!this.props.match.params.userId}
                        savePhoto={this.props.savePhoto}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}
                        saveProfile={this.props.saveProfile}/>
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    loggedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    // withAuthRedirect
)(ProfileContainer)
