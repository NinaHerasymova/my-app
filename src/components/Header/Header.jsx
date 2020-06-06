import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/user.png";

const Header = (props) => {
  console.log(props)
    return (
        <header className={s.header}>
            <img alt='logo' src='https://www.freelogodesign.org/Content/img/logo-samples/bobbygrill.png' />
            <div className={s.loginBlock}>
              {props.isAuth ? <div className={s.authTitle}><img alt="ava" src={props.photo!== null?props.photo:userPhoto }/>{props.login}</div> :  <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;

