import React, { useState } from 'react';
import Layout from '../../components/LayOut/Layout';
import { useStore } from '../../StoreContext';
import styles from '../pages.module.css';

const LangCurrencyPage = () => {
    const { preferences, setPreferences, delivery, setDelivery } = useStore();
    const [language, setLanguage] = useState(preferences.language);
    const [currency, setCurrency] = useState(preferences.currency);
    const [countryCode, setCountryCode] = useState(delivery.countryCode);
    const [zipCode, setZipCode] = useState(delivery.zipCode);
    const [error, setError] = useState('');
    const [saved, setSaved] = useState(false);

    const savePreferences = (event) => {
        event.preventDefault();
        if (countryCode === 'US' && zipCode && !/^\d{5}(-\d{4})?$/.test(zipCode)) {
            setError('Enter a valid 5-digit US ZIP code (or ZIP+4).');
            setSaved(false);
            return;
        }
        setError('');
        setPreferences({ language, currency });
        setDelivery({ countryCode, zipCode });
        setSaved(true);
    };

    return (
        <Layout>
            <main className="page-shell">
                <h1>Language and regional preferences</h1>
                <form className={styles.preferences} onSubmit={savePreferences}>
                    <label htmlFor="language">Preferred language
                        <select id="language" value={language} onChange={(event) => setLanguage(event.target.value)}>
                            <option value="EN">English</option>
                            <option value="ES">Español</option>
                            <option value="AR">العربية</option>
                            <option value="DE">Deutsch</option>
                            <option value="HE">עברית</option>
                            <option value="KO">한국어</option>
                            <option value="PT">Português</option>
                            <option value="ZH">中文</option>
                        </select>
                    </label>
                    <p className={styles.demoNotice}>
                        This demo saves your language preference and displays prices in the selected currency.
                        Storefront wording remains in English. Currency conversion uses sample rates, not live exchange data.
                    </p>
                    <label htmlFor="currency">Currency
                        <select id="currency" value={currency} onChange={(event) => setCurrency(event.target.value)}>
                            <option value="USD">USD — US Dollar</option>
                            <option value="EUR">EUR — Euro</option>
                            <option value="GBP">GBP — Pound Sterling</option>
                            <option value="CAD">CAD — Canadian Dollar</option>
                        </select>
                    </label>
                    <label htmlFor="country">Delivery country
                        <select id="country" value={countryCode} onChange={(event) => setCountryCode(event.target.value)}>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="GB">United Kingdom</option>
                            <option value="AU">Australia</option>
                            <option value="ET">Ethiopia</option>
                            <option value="DE">Germany</option>
                            <option value="JP">Japan</option>
                            <option value="IN">India</option>
                        </select>
                    </label>
                    <label htmlFor="postal-code">ZIP / postal code
                        <input
                            id="postal-code"
                            autoComplete="postal-code"
                            value={zipCode}
                            onChange={(event) => setZipCode(event.target.value)}
                        />
                    </label>
                    {error && <p role="alert">{error}</p>}
                    {saved && <p role="status">Your preferences have been saved in this browser.</p>}
                    <button className={styles.primaryButton} type="submit">Save preferences</button>
                </form>
            </main>
        </Layout>
    );
};

export default LangCurrencyPage;
