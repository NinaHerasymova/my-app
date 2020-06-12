import React from 'react';
import {connect} from "react-redux";

import Header from "./Header";
import {getAuthUserData, logOut} from "../../redux/authReducer";

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.getAuthUserData()
  }

  render() {
    return <Header {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  photo: state.auth.photo
})

export default connect(mapStateToProps, {getAuthUserData, logOut})(HeaderContainer);
