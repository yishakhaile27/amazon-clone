import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Layout from '../../components/LayOut/Layout';
import { useStore } from '../../StoreContext';
import styles from '../pages.module.css';

const PaymentPage = () => {
    const { cart, cartTotal, formatPrice, placeOrder, user, delivery } = useStore();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const tax = cartTotal * 0.08;
    const total = cartTotal + tax;

    if (cart.length === 0) {
        return <Navigate to="/cart" replace />;
    }

    const submitOrder = (event) => {
        event.preventDefault();
        if (isSubmitting) return;
        setError('');
        setIsSubmitting(true);
        const formData = new FormData(event.currentTarget);
        try {
            const order = placeOrder({
                customer: {
                    name: formData.get('name'),
                    email: formData.get('email'),
                },
                address: {
                    street: formData.get('street'),
                    city: formData.get('city'),
                    region: formData.get('region'),
                    postalCode: formData.get('postalCode'),
                    country: formData.get('country'),
                },
                paymentMethod: formData.get('paymentMethod'),
                tax,
                total,
            });
            navigate('/orders', { state: { placedOrderId: order.id } });
        } catch (orderError) {
            setError(orderError.message);
            setIsSubmitting(false);
        }
    };

    return (
        <Layout>
            <main className="page-shell">
                <h1>Checkout</h1>
                <p className={styles.demoNotice}>
                    Demo checkout only: no real payment is collected or order sent to a retailer.
                </p>
                <div className={styles.checkoutLayout}>
                    <form className={styles.checkoutForm} onSubmit={submitOrder}>
                        <fieldset>
                            <legend>Delivery address</legend>
                            <label>Full name
                                <input name="name" autoComplete="name" defaultValue={user?.name || ''} required />
                            </label>
                            <label>Email
                                <input name="email" type="email" autoComplete="email" defaultValue={user?.email || ''} required />
                            </label>
                            <label>Street address
                                <input name="street" autoComplete="street-address" required />
                            </label>
                            <div className={styles.formRow}>
                                <label>City
                                    <input name="city" autoComplete="address-level2" required />
                                </label>
                                <label>State / region
                                    <input name="region" autoComplete="address-level1" required />
                                </label>
                            </div>
                            <div className={styles.formRow}>
                                <label>ZIP / postal code
                                    <input
                                        name="postalCode"
                                        autoComplete="postal-code"
                                        defaultValue={delivery.zipCode || ''}
                                        required
                                    />
                                </label>
                                <label>Country
                                    <select name="country" defaultValue={delivery.countryCode || 'US'} required>
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="GB">United Kingdom</option>
                                        <option value="AU">Australia</option>
                                        <option value="ET">Ethiopia</option>
                                        <option value="DE">Germany</option>
                                    </select>
                                </label>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Payment method</legend>
                            <label className={styles.radioOption}>
                                <input type="radio" name="paymentMethod" value="demo-card" defaultChecked />
                                Demo card — no charge will be made
                            </label>
                            <label className={styles.radioOption}>
                                <input type="radio" name="paymentMethod" value="cash-on-delivery" />
                                Cash on delivery (demo)
                            </label>
                        </fieldset>
                        {error && <p role="alert">{error}</p>}
                        <button className={styles.primaryButton} type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Placing order...' : 'Place demo order'}
                        </button>
                        <Link className={styles.backLink} to="/cart">Return to cart</Link>
                    </form>
                    <aside className={styles.summary}>
                        <h2>Order summary</h2>
                        <p>Items ({cart.reduce((count, item) => count + item.quantity, 0)}) <strong>{formatPrice(cartTotal)}</strong></p>
                        <p>Shipping <strong>FREE</strong></p>
                        <p>Estimated tax <strong>{formatPrice(tax)}</strong></p>
                        <p className={styles.orderTotal}>Order total <strong>{formatPrice(total)}</strong></p>
                    </aside>
                </div>
            </main>
        </Layout>
    );
};

export default PaymentPage;
