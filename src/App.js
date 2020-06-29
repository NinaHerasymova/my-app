import React, {Suspense} from 'react';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {store} from "./redux/reduxStore";

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Music from './components/Music/Music';
import News from './components/News/News';
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

class App extends React.Component {
  catchAllUnhandledErrors = (reason, promise) => {
    alert("Error")
    //disptch error
  }

  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
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
          <Switch>
            <Route exact path='/'
                   render={() => <Redirect to={"/profile"}/>}/>
            <Route path='/profile/:userId?'
                   render={withSuspense(ProfileContainer)}/>
            <Route path='/dialogs'
                   render={withSuspense(DialogsContainer)}/>
            <Route path='/users'
                   render={() => <UsersContainer pageTitle = "Samurai"/>}/>
            <Route path='/login'
                   render={() => <Login/>}/>
            <Route path='/music' component={Music}/>
            <Route path='/news' component={News}/>
            <Route path='*'
                   render={() => <div>404 NOT FOUND</div>}/>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App);

export const SamuraiJSApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  </BrowserRouter>
}
