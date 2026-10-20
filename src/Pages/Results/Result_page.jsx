import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Layout from '../../components/LayOut/Layout';
import Product from '../../components/Product/product';
import { getProducts } from '../../Api/products';

const ResultPage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [attempt, setAttempt] = useState(0);
    const { categoryName } = useParams();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q')?.trim().toLowerCase() || '';
    const selectedCategory = (categoryName || searchParams.get('category') || '').toLowerCase();
    const dealMode = searchParams.get('deal') === 'true';

    useEffect(() => {
        const controller = new AbortController();
        const loadProducts = async () => {
            setIsLoading(true);
            setError('');
            try {
                setProducts(await getProducts(controller.signal));
            } catch (requestError) {
                if (requestError.name !== 'AbortError') {
                    console.error('Error loading search results:', requestError);
                    setError('Results could not be loaded. Check your connection and try again.');
                }
            } finally {
                if (!controller.signal.aborted) setIsLoading(false);
            }
        };
        loadProducts();
        return () => controller.abort();
    }, [attempt]);

    const results = useMemo(() => products.filter((product) => (
        (!selectedCategory || (product.category || '').toLowerCase() === selectedCategory)
        && (!query || `${product.title} ${product.description} ${product.category}`.toLowerCase().includes(query))
        && (!dealMode || Number(product.price) < 50)
    )), [products, selectedCategory, query, dealMode]);

    return (
        <Layout>
            <main className="page-shell">
                <h1>{dealMode ? "Today's deals" : selectedCategory || 'Search results'}</h1>
                {(query || selectedCategory || dealMode) && (
                    <p>
                        {query && <>Matching “{searchParams.get('q')}”</>}
                        {query && selectedCategory && ' · '}
                        {selectedCategory && `Category: ${selectedCategory}`}
                    </p>
                )}
                <hr />
                {isLoading && <p role="status">Loading results...</p>}
                {error && (
                    <div role="alert">
                        <p>{error}</p>
                        <button type="button" onClick={() => setAttempt((current) => current + 1)}>
                            Try again
                        </button>
                    </div>
                )}
                {!isLoading && !error && results.length === 0 && (
                    <p>No products match your search. Try another term or category.</p>
                )}
                {!isLoading && !error && <Product products={results} />}
            </main>
        </Layout>
    );
};

export default ResultPage;
