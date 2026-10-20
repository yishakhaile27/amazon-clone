import React from 'react';
import style from "./Header.module.css"
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';

const LowerHeader = () => {
    return (
        <div className={style.lower_container}>
            <ul>
                <li><Link to="/"><GiHamburgerMenu /> All</Link></li>
                <li><Link to="/search?deal=true">Today's Deals</Link></li>
                <li><Link to="/category/electronics">Electronics</Link></li>
                <li><Link to="/category/women%27s%20clothing">Women's Clothing</Link></li>
                <li><Link to="/category/men%27s%20clothing">Men's Clothing</Link></li>
                <li><Link to="/category/jewelery">Jewelry</Link></li>
                <li><Link to="/auth">Account</Link></li>
                <li><Link to="/orders">Orders</Link></li>
                <li><Link to="/customer-preferences">Preferences</Link></li>
            </ul>
        </div>
    );
}

export default LowerHeader;
