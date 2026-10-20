import React from 'react';
import { Link } from 'react-router-dom';
import style from './NotFound.module.css';
import logo from '../Material/Header/logo.png';

const NotFound = () => (
    <div className={style.notfound_container}>
        <nav>
            <Link to="/" aria-label="Amazon home">
                <img src={logo} alt="Amazon" />
            </Link>
        </nav>
        <main className={style.img}>
            <h1>Sorry, we couldn't find that page.</h1>
            <p>The address may be incorrect, or the page may have moved.</p>
            <Link to="/">Go to the home page</Link>
        </main>
    </div>
);

export default NotFound;
