import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const StoreContext = createContext(null);
const STORAGE_KEY = 'amazon-demo-store';
const exchangeRates = { USD: 1, EUR: 0.92, GBP: 0.79, CAD: 1.36 };
const currencies = Object.keys(exchangeRates);
const languages = ['EN', 'ES', 'AR', 'DE', 'HE', 'KO', 'PT', 'ZH'];

const readSavedStore = () => {
    try {
        const savedStore = window.localStorage.getItem(STORAGE_KEY);
        const parsedStore = savedStore ? JSON.parse(savedStore) : {};
        return parsedStore && typeof parsedStore === 'object' && !Array.isArray(parsedStore)
            ? parsedStore
            : {};
    } catch (error) {
        console.warn('Saved store data could not be read:', error);
        return {};
    }
};

export const StoreProvider = ({ children }) => {
    const [savedStore] = useState(readSavedStore);
    const [cart, setCart] = useState(
        Array.isArray(savedStore.cart)
            ? savedStore.cart.filter((item) => (
                item?.product?.id
                && Number.isFinite(Number(item.product.price))
                && Number.isInteger(item.quantity)
                && item.quantity > 0
            ))
            : []
    );
    const [orders, setOrders] = useState(
        Array.isArray(savedStore.orders)
            ? savedStore.orders.filter((order) => (
                order?.id
                && Array.isArray(order.items)
                && order.items.length > 0
                && Number.isFinite(Number(order.total))
                && currencies.includes(order.currency)
            ))
            : []
    );
    const [user, setUser] = useState(
        typeof savedStore.user?.name === 'string' && typeof savedStore.user?.email === 'string'
            ? savedStore.user
            : null
    );
    const savedPreferences = savedStore.preferences || {};
    const [preferences, setPreferences] = useState({
        language: languages.includes(savedPreferences.language) ? savedPreferences.language : 'EN',
        currency: currencies.includes(savedPreferences.currency) ? savedPreferences.currency : 'USD',
    });
    const savedDelivery = savedStore.delivery || {};
    const [delivery, setDelivery] = useState({
        countryCode: typeof savedDelivery.countryCode === 'string' && savedDelivery.countryCode
            ? savedDelivery.countryCode
            : 'US',
        zipCode: typeof savedDelivery.zipCode === 'string' ? savedDelivery.zipCode : '',
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({ cart, orders, user, preferences, delivery })
            );
        } catch (error) {
            console.warn('Store data could not be saved in this browser:', error);
        }
    }, [cart, orders, user, preferences, delivery]);

    const addToCart = (product, quantity = 1) => {
        setCart((items) => {
            const existingItem = items.find((item) => item.product.id === product.id);
            if (existingItem) {
                return items.map((item) => (
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                ));
            }
            return [...items, { product, quantity }];
        });
    };

    const updateCartQuantity = (productId, quantity) => {
        if (quantity < 1) {
            setCart((items) => items.filter((item) => item.product.id !== productId));
            return;
        }
        setCart((items) => items.map((item) => (
            item.product.id === productId ? { ...item, quantity } : item
        )));
    };

    const removeFromCart = (productId) => {
        setCart((items) => items.filter((item) => item.product.id !== productId));
    };

    const placeOrder = (details) => {
        if (cart.length === 0) {
            throw new Error('Your cart is empty.');
        }
        const order = {
            id: `DEMO-${Date.now().toString(36).toUpperCase()}`,
            createdAt: new Date().toISOString(),
            items: cart,
            total: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
            currency: preferences.currency,
            ...details,
        };
        setOrders((previousOrders) => [order, ...previousOrders]);
        setCart([]);
        return order;
    };

    const formatPrice = (price, currency = preferences.currency) => {
        const convertedPrice = Number(price) * (exchangeRates[currency] || 1);
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency,
        }).format(convertedPrice);
    };

    const value = useMemo(() => ({
        cart,
        cartCount: cart.reduce((count, item) => count + item.quantity, 0),
        cartTotal: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        orders,
        user,
        preferences,
        delivery,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        placeOrder,
        setUser,
        setPreferences,
        setDelivery,
        formatPrice,
    }), [cart, orders, user, preferences, delivery]);

    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
    const store = useContext(StoreContext);
    if (!store) {
        throw new Error('useStore must be used inside StoreProvider.');
    }
    return store;
};