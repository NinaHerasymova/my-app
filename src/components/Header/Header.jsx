import React from 'react';
import s from './Header.module.css';

const Header = () => {
    return (
        <header className={s.header}>
            <img alt='logo' src='https://www.freelogodesign.org/Content/img/logo-samples/bobbygrill.png' />
        </header>
    )
}

export default Header;