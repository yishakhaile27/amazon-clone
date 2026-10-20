import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Layout from '../../components/LayOut/Layout';
import { getProduct } from '../../Api/products';
import { useStore } from '../../StoreContext';
import styles from '../pages.module.css';

const ProductDetailPage = () => {
    const { productId } = useParams();
    const { addToCart, formatPrice } = useStore();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [added, setAdded] = useState(false);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        setIsLoading(true);
        setError('');
        setProduct(null);
        setAdded(false);
        getProduct(productId, controller.signal)
            .then(setProduct)
            .catch((requestError) => {
                if (requestError.name !== 'AbortError') {
                    console.error('Error loading product:', requestError);
                    setError('This product could not be loaded. Please try again.');
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) setIsLoading(false);
            });
        return () => controller.abort();
    }, [productId, attempt]);

    return (
        <Layout>
            <main className="page-shell">
                {isLoading && <p role="status">Loading product...</p>}
                {error && (
                    <div role="alert">
                        <p>{error}</p>
                        <button type="button" onClick={() => setAttempt((current) => current + 1)}>
                            Try again
                        </button>
                        {' '}
                        <Link to="/">Return to the home page</Link>
                    </div>
                )}
                {product && (
                    <article className={styles.detail}>
                        <img src={product.image} alt={product.title} />
                        <div>
                            <p className={styles.eyebrow}>{product.category}</p>
                            <h1>{product.title}</h1>
                            <div className={styles.rating}>
                                <Rating value={product.rating?.rate || 0} precision={0.5} readOnly />
                                <span>{product.rating?.count || 0} ratings</span>
                            </div>
                            <p className={styles.detailPrice}>{formatPrice(product.price)}</p>
                            <p>{product.description}</p>
                            <p className={styles.stock}>In stock</p>
                            <button
                                className={styles.primaryButton}
                                type="button"
                                onClick={() => {
                                    addToCart(product);
                                    setAdded(true);
                                }}
                            >
                                Add to cart
                            </button>
                            {added && <p role="status">Added to cart. <Link to="/cart">View cart</Link></p>}
                        </div>
                    </article>
                )}
            </main>
        </Layout>
    );
};

export default ProductDetailPage;
