import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import Music from './components/Music/Music';
import News from './components/News/News';



const App = (props) => {
  return (    
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/profile'
            render={() => <Profile profilePage={props.state.profilePage} addPost={props.addPost} updateNewPostText={props.updateNewPostText}/>} />
          <Route path='/dialogs'
            render={() => <Dialogs messagesPage={props.state.messagesPage} />} />
          <Route path='/music' component={Music} />
          <Route path='/news' component={News} />
        </div>
      </div>
  );
}

export default App;
