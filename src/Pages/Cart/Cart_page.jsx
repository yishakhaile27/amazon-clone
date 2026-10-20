import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/LayOut/Layout';
import { useStore } from '../../StoreContext';
import styles from '../pages.module.css';

const CartPage = () => {
    const { cart, cartTotal, formatPrice, updateCartQuantity, removeFromCart } = useStore();

    return (
        <Layout>
            <main className="page-shell">
                <h1>Your shopping cart</h1>
                {cart.length === 0 ? (
                    <section className={styles.emptyState}>
                        <h2>Your cart is empty</h2>
                        <p>Explore products and add something you like.</p>
                        <Link className={styles.primaryButton} to="/">Continue shopping</Link>
                    </section>
                ) : (
                    <div className={styles.cartLayout}>
                        <section className={styles.cartItems} aria-label="Cart items">
                            {cart.map(({ product, quantity }) => (
                                <article key={product.id} className={styles.cartItem}>
                                    <Link to={`/product/${product.id}`} className={styles.cartImage}>
                                        <img src={product.image} alt={product.title} />
                                    </Link>
                                    <div className={styles.cartItemDetails}>
                                        <Link to={`/product/${product.id}`}><h2>{product.title}</h2></Link>
                                        <p className={styles.stock}>In stock</p>
                                        <label>
                                            Quantity
                                            <select
                                                aria-label={`Quantity for ${product.title}`}
                                                value={quantity}
                                                onChange={(event) => updateCartQuantity(product.id, Number(event.target.value))}
                                            >
                                                {Array.from({ length: Math.max(10, quantity) }, (_, index) => index + 1).map((count) => (
                                                    <option key={count} value={count}>{count}</option>
                                                ))}
                                            </select>
                                        </label>
                                        <button
                                            className={styles.textButton}
                                            type="button"
                                            onClick={() => removeFromCart(product.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <strong>{formatPrice(product.price * quantity)}</strong>
                                </article>
                            ))}
                            <div className={styles.subtotal}>
                                Subtotal ({cart.reduce((count, item) => count + item.quantity, 0)} items):
                                <strong>{formatPrice(cartTotal)}</strong>
                            </div>
                        </section>
                        <aside className={styles.summary}>
                            <p className={styles.stock}>Your order qualifies for FREE delivery.</p>
                            <p>Subtotal <strong>{formatPrice(cartTotal)}</strong></p>
                            <p>Shipping <strong>FREE</strong></p>
                            <Link className={styles.primaryButton} to="/payments">Proceed to checkout</Link>
                        </aside>
                    </div>
                )}
            </main>
        </Layout>
    );
};

export default CartPage;
