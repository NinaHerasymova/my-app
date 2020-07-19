import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/user.png";

type PropsType = {
    photo: string | null
    isAuth: boolean
    logOut: () => void
    login: string | null
}

const Header: React.FC<PropsType> = (props) => {
    return (
        <header className={s.header}>
            <img alt='logo'
                 src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Gion_Mamori.svg/1200px-Gion_Mamori.svg.png'/>
            <div className={s.loginBlock}>{props.isAuth
                ? <div className={s.authTitle}><img alt="ava"
                                                    src={props.photo !== null ? props.photo : userPhoto}/>{props.login}
                    <button className={s.logoutButton} onClick={props.logOut}>Log out</button>
                </div>
                : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header

