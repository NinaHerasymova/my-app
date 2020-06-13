import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {compose} from "redux";

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Music from './components/Music/Music';
import News from './components/News/News';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader";

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer/>
        <Navbar/>
        <div className='app-wrapper-content'>
          <Route path='/profile/:userId?'
                 render={() => <ProfileContainer/>}/>
          <Route path='/dialogs'
                 render={() => <DialogsContainer/>}/>
          <Route path='/users'
                 render={() => <UsersContainer/>}/>
          <Route path='/login'
                 render={() => <Login/>}/>
          <Route path='/music' component={Music}/>
          <Route path='/news' component={News}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App);

