import React, { useEffect, useState } from 'react';
import style from "./Header.module.css"
import { IoMdArrowDropdown } from "react-icons/io";
import { GrSearch } from "react-icons/gr";
import logo from "../Material/Header/logo.png"
import location from "../Material/Header/location.png"
import us_flag from "../Material/Header/us-flag.png"
import cart from "../Material/Header/cart.png"
import DeliveryPopup from './Delivery Popup/Delivery_PopUp'
import Lang from '../Lang & currency/PopUp/Lang_Currency_PopUp'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '../../StoreContext';

const countryNames = {
    US: 'United States',
    CA: 'Canada',
    GB: 'United Kingdom',
    AU: 'Australia',
    ET: 'Ethiopia',
    DE: 'Germany',
    JP: 'Japan',
    IN: 'India',
};

function Header() {
    const [isDeliveryPopupOpen, setDeliveryPopupOpen] = useState(false);
    const [langCurrPopupIsOpen, setLangCurrPopupOpen] = useState(false)
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(() => searchParams.get('q') || '');
    const [category, setCategory] = useState(() => searchParams.get('category') || '');
    const navigate = useNavigate();
    const { cartCount, user, preferences, delivery, setPreferences, setDelivery } = useStore();

    useEffect(() => {
        setQuery(searchParams.get('q') || '');
        setCategory(searchParams.get('category') || '');
    }, [searchParams]);

    const submitSearch = (event) => {
        event.preventDefault();
        const searchParams = new URLSearchParams();
        if (query.trim()) searchParams.set('q', query.trim());
        if (category) searchParams.set('category', category);
        const search = searchParams.toString();
        navigate(`/search${search ? `?${search}` : ''}`);
    };

    return (
        <header className={style.header_container}>
            <section>

                <Link className={style.logo} to="/">
                    <img src={logo} alt="Amazon home" />
                </Link>


                <button
                    type="button"
                    className={style.location}
                    onClick={() => setDeliveryPopupOpen(true)}
                    aria-label="Choose delivery location"
                >
                    <div className={style.location_icon}>
                        <img src={location} alt="" />
                        <div>
                            <p>Deliver to</p>
                            <span>{delivery.zipCode || countryNames[delivery.countryCode] || delivery.countryCode}</span>
                        </div>

                    </div>
                </button>
            </section>
            <DeliveryPopup
                isOpen={isDeliveryPopupOpen}
                onClose={() => setDeliveryPopupOpen(false)}
                initialDelivery={delivery}
                onSave={setDelivery}
            />

            <section className={style.search}>
                <form className={style.search_option} onSubmit={submitSearch}>
                    <select
                        id="producttype"
                        className={style.search_producttype}
                        aria-label="Search category"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                    >
                        <option value="">All</option>
                        <option value="electronics">Electronics</option>
                        <option value="jewelery">Jewelry</option>
                        <option value="men's clothing">Men's clothing</option>
                        <option value="women's clothing">Women's clothing</option>
                    </select>
                    <input
                        type="search"
                        placeholder="Search Amazon"
                        aria-label="Search Amazon"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <button type="submit" aria-label="Submit search"><GrSearch /></button>
                </form>
            </section>

            <section>
                <button
                    type="button"
                    className={style.language}
                    aria-expanded={langCurrPopupIsOpen}
                    onClick={() => setLangCurrPopupOpen((open) => !open)}
                >
                    <div>
                        <div className={style.language_auto}>
                            <img src={us_flag} alt="" />
                            <p className={style.language_choose}>{preferences.language}</p><IoMdArrowDropdown />
                        </div>
                    </div>
                </button>
                <Lang
                    isOpen={langCurrPopupIsOpen}
                    onClose={() => setLangCurrPopupOpen(false)}
                    language={preferences.language}
                    currency={preferences.currency}
                    onLanguageChange={(language) => setPreferences((current) => ({ ...current, language }))}
                    onCurrencyChange={(currency) => setPreferences((current) => ({ ...current, currency }))}
                />

                <Link className={style.account} to="/auth">
                    <div>
                        <p>{user ? `Hello, ${user.name}` : 'Hello, sign in'}</p>
                        <span>{user ? 'Account' : 'Account & Lists'}<IoMdArrowDropdown /></span>
                    </div>
                </Link>

                <Link className={style.order} to="/orders">
                    <div>
                        <p>Returns</p>
                        <span>& Orders</span>
                    </div>
                </Link>

                <Link className={style.cart} to="/cart">
                    <div>
                        <span>{cartCount}</span>
                        <div>
                            <img src={cart} alt="" />
                            <p>Cart</p>
                        </div>
                    </div>
                </Link>
            </section>
        </header>
    );
}

export default Header;
