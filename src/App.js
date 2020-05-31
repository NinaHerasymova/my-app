import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Music from './components/Music/Music';
import News from './components/News/News';
import DialogsContainer from "./components/Dialogs/DialogsContainer";



const App = (props) => {
  return (
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/profile'
            render={() => <Profile store={props.store} />} />
          <Route path='/dialogs'
            render={() => <DialogsContainer store={props.store} />} />
          <Route path='/music' component={Music} />
          <Route path='/news' component={News} />
        </div>
      </div>
  );
}

export default App;
