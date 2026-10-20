import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/LayOut/Layout';
import { useStore } from '../../StoreContext';
import styles from '../pages.module.css';

const AuthPage = () => {
    const { user, setUser } = useStore();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const signIn = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = String(formData.get('name')).trim();
        const email = String(formData.get('email')).trim();
        if (!name || !email) {
            setError('Enter your name and a valid email address.');
            return;
        }
        setUser({ name, email });
        navigate('/orders');
    };

    return (
        <Layout>
            <main className="page-shell">
                <section className={styles.accountPanel}>
                    <h1>{user ? 'Your account' : 'Sign in'}</h1>
                    <p className={styles.demoNotice}>
                        This sample storefront keeps a demo profile in this browser only. It does not authenticate with Amazon.
                    </p>
                    {user ? (
                        <>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <button
                                className={styles.primaryButton}
                                type="button"
                                onClick={() => setUser(null)}
                            >
                                Sign out
                            </button>
                        </>
                    ) : (
                        <form className={styles.checkoutForm} onSubmit={signIn}>
                            <label>Your name
                                <input name="name" autoComplete="name" required />
                            </label>
                            <label>Email address
                                <input name="email" type="email" autoComplete="email" required />
                            </label>
                            {error && <p role="alert">{error}</p>}
                            <button className={styles.primaryButton} type="submit">Continue</button>
                        </form>
                    )}
                </section>
            </main>
        </Layout>
    );
};

export default AuthPage;
