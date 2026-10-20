import React from 'react';
import Rating from '@mui/material/Rating';
import style from './product.module.css';
import { Link } from 'react-router-dom';
import { useStore } from '../../StoreContext';

const Product = ({ products = [] }) => {
    const { addToCart, formatPrice } = useStore();

    function truncate(str, n) {
        if (!str) {
            return '';
        }
        return str.length > n ? `${str.substring(0, n - 1)}...` : str;
    }

    return (
        <div className={style.product}>
            {products.map((singleProduct) => (
                <article key={singleProduct.id} className={style.product_container}>
                    <Link className={style.product_image} to={`/product/${singleProduct.id}`}>
                        <img src={singleProduct.image} alt={singleProduct.title} loading="lazy" />
                    </Link>
                    <div className={style.product_details}>
                        <Link to={`/product/${singleProduct.id}`} className={style.product_title}>
                            <h3>{truncate(singleProduct.title, 54)}</h3>
                        </Link>
                        <div className={style.product_rating}>
                            <Rating
                                value={singleProduct.rating?.rate ?? 0}
                                precision={0.5}
                                readOnly
                                size="small"
                                aria-label={`Rated ${singleProduct.rating?.rate ?? 0} out of 5`}
                            />
                            <span>{singleProduct.rating?.count ?? 0}</span>
                        </div>

                        <div className={style.product_price}>
                            <p>{formatPrice(singleProduct.price)}</p>
                        </div>
                    </div>
                    <button type="button" onClick={() => addToCart(singleProduct)}>
                        Add to cart
                    </button>
                </article>
            ))}
        </div>
    );
}

export default Product;