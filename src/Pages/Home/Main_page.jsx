import React, { useEffect, useState } from 'react';
import Layout from '../../components/LayOut/Layout';
import Category from '../../components/Category/Category';
import CarouselEffects from '../../components/Carousel/CarouselEffects';
import Product from '../../components/Product/product';
import { getProducts } from '../../Api/products';


const MainPage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        const loadProducts = async () => {
            setIsLoading(true);
            setError('');
            try {
                const data = await getProducts(controller.signal);
                setProducts(data);
            } catch (requestError) {
                if (requestError.name !== 'AbortError') {
                    console.error('Error fetching products:', requestError);
                    setError('Products could not be loaded. Please try again later.');
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        loadProducts();
        return () => controller.abort();
    }, [attempt]);

    return (
        <Layout>
            <main id="main-content">
                <CarouselEffects />
                <Category />
                {isLoading && <p className="page-shell" role="status">Loading products...</p>}
                {error && (
                    <div role="alert" className="page-shell">
                        <p>{error}</p>
                        <button type="button" onClick={() => setAttempt((current) => current + 1)}>
                            Try again
                        </button>
                    </div>
                )}
                {!isLoading && !error && <Product products={products} />}
            </main>
        </Layout>
    );
}

export default MainPage;
