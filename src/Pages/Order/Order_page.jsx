import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../../components/LayOut/Layout';
import { useStore } from '../../StoreContext';
import styles from '../pages.module.css';

const OrderPage = () => {
    const { orders, formatPrice } = useStore();
    const location = useLocation();
    const placedOrderId = location.state?.placedOrderId;

    return (
        <Layout>
            <main className="page-shell">
                <h1>Your orders</h1>
                {placedOrderId && (
                    <p className={styles.demoNotice} role="status">
                        Demo order {placedOrderId} was placed successfully.
                    </p>
                )}
                {orders.length === 0 ? (
                    <section className={styles.emptyState}>
                        <h2>You have no orders yet</h2>
                        <p>Completed demo checkouts will appear here.</p>
                        <Link className={styles.primaryButton} to="/">Start shopping</Link>
                    </section>
                ) : (
                    <section className={styles.orders}>
                        {orders.map((order) => (
                            <article className={styles.orderCard} key={order.id}>
                                <header className={styles.orderHeader}>
                                    <span><strong>Order placed</strong><br />{new Date(order.createdAt).toLocaleString()}</span>
                                    <span><strong>Total</strong><br />{formatPrice(order.total, order.currency)}</span>
                                    <span><strong>Order #</strong><br />{order.id}</span>
                                </header>
                                <div className={styles.orderContent}>
                                    {order.items.map(({ product, quantity }) => (
                                        <div className={styles.orderProduct} key={product.id}>
                                            <img src={product.image} alt={product.title} />
                                            <div>
                                                <Link to={`/product/${product.id}`}>{product.title}</Link>
                                                <p>Quantity: {quantity}</p>
                                                <p>{formatPrice(product.price * quantity, order.currency)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className={styles.orderHeader}>
                                    Demo order · {order.paymentMethod === 'cash-on-delivery' ? 'Cash on delivery' : 'No-charge demo payment'}
                                </p>
                            </article>
                        ))}
                    </section>
                )}
            </main>
        </Layout>
    );
};

export default OrderPage;
