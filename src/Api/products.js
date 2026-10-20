import { productUrl } from './Request';

const request = async (path, signal) => {
    const response = await fetch(`${productUrl}${path}`, { signal });
    if (!response.ok) {
        throw new Error(`Product service returned ${response.status}.`);
    }
    return response.json();
};

export const getProducts = async (signal) => {
    const products = await request('/products', signal);
    if (!Array.isArray(products) || !products.every((product) => (
        product
        && product.id
        && typeof product.title === 'string'
        && typeof product.image === 'string'
        && typeof product.category === 'string'
        && Number.isFinite(Number(product.price))
    ))) {
        throw new Error('Product service returned an invalid product list.');
    }
    return products;
};

export const getProduct = async (productId, signal) => {
    const product = await request(`/products/${encodeURIComponent(productId)}`, signal);
    if (
        !product
        || typeof product !== 'object'
        || !product.id
        || typeof product.title !== 'string'
        || typeof product.image !== 'string'
        || !Number.isFinite(Number(product.price))
    ) {
        throw new Error('Product service returned an invalid product.');
    }
    return product;
};
