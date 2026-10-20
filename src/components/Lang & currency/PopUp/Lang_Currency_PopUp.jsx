import React, { useEffect } from 'react';
import style from './Lang_Currency_PopUp.module.css'
import { US } from 'country-flag-icons/react/3x2'
import { Link } from 'react-router-dom';

const LangCurrencyPopUp = ({
    isOpen,
    onClose,
    language,
    currency,
    onLanguageChange,
    onCurrencyChange,
}) => {
    useEffect(() => {
        if (!isOpen) return undefined;
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={style.langcurrency} onClick={onClose}>
            <div className={style.langcurrency_container} onClick={(event) => event.stopPropagation()}>
                <div className={style.triangle_up}></div>
                <div className={style.langcurrencypopup} role="dialog" aria-modal="true" aria-labelledby="language-dialog-title">
                    <p id="language-dialog-title">Change language</p>
                    <form
                        className={style.language_form}
                        id="languageForm"
                    >

                        <input type="radio" id="EN" name="lang" value="EN" checked={language === 'EN'} onChange={() => onLanguageChange('EN')} />
                        <label htmlFor="EN">English - EN</label>

                        <div className={style.br}></div>

                        <input type="radio" id="ES" name="lang" value="ES" checked={language === 'ES'} onChange={() => onLanguageChange('ES')} />
                        <label htmlFor="ES">español - ES</label>
                        <input type="radio" id="AR" name="lang" value="AR" checked={language === 'AR'} onChange={() => onLanguageChange('AR')} />
                        <label htmlFor="AR">العربية - AR</label>
                        <input type="radio" id="DE" name="lang" value="DE" checked={language === 'DE'} onChange={() => onLanguageChange('DE')} />
                        <label htmlFor="DE">Deutsch - DE</label>
                        <input type="radio" id="HE" name="lang" value="HE" checked={language === 'HE'} onChange={() => onLanguageChange('HE')} />
                        <label htmlFor="HE">עברית - HE</label>
                        <input type="radio" id="KO" name="lang" value="KO" checked={language === 'KO'} onChange={() => onLanguageChange('KO')} />
                        <label htmlFor="KO">한국어 - KO</label>
                        <input type="radio" id="PT" name="lang" value="PT" checked={language === 'PT'} onChange={() => onLanguageChange('PT')} />
                        <label htmlFor="PT">português - PT</label>
                        <input type="radio" id="ZH_Simple" name="lang" value="ZH" checked={language === 'ZH'} onChange={() => onLanguageChange('ZH')} />
                        <label htmlFor="ZH_Simple">中文 (简体) - ZH</label>
                        <input type="radio" id="ZH_Traditional" name="lang" value="ZH" checked={false} onChange={() => onLanguageChange('ZH')} />
                        <label htmlFor="ZH_Traditional">中文 (繁體) - ZH</label>
                    </form>
                    <div className={style.br}></div>

                    <div className={style.currency}>
                        <label htmlFor="popup-currency">Currency</label>
                        <div>
                            <select
                                id="popup-currency"
                                value={currency}
                                onChange={(event) => onCurrencyChange(event.target.value)}
                            >
                                <option value="USD">USD - US Dollar</option>
                                <option value="EUR">EUR - Euro</option>
                                <option value="GBP">GBP - Pound Sterling</option>
                                <option value="CAD">CAD - Canadian Dollar</option>
                            </select>
                        </div>
                    </div>

                    <div className={style.br}></div>

                    <div className={style.other_web}>
                        <p><US/> You are shopping on Amazon.com</p>
                    </div>
                    <div className={style.region}>
                        <Link to="/customer-preferences" onClick={onClose}>Manage preferences</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LangCurrencyPopUp;
