import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './Pages/Home/Main_page';
import CartPage from './Pages/Cart/Cart_page';
import PaymentPage from './Pages/Payment/Payment_page';
import OrderPage from './Pages/Order/Order_page';
import LangCurrencyPage from './Pages/Lang & currency/Lang_Currency_Page';
import NotfoundPage from './Pages/404 Not Found/404_notfound_page';
import ResultPage from './Pages/Results/Result_page';
import ProductDetailPage from './Pages/ProductDetail/ProductDetail_Page';
import AuthPage from './Pages/Auth/Auth_Page';

const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/payments" element={<PaymentPage />} />
                <Route path="/orders" element={<OrderPage />} />
                <Route path="/customer-preferences" element={<LangCurrencyPage />} />
                <Route path="/category/:categoryName" element={<ResultPage />} />
                <Route path="/search" element={<ResultPage />} />
                <Route path="/product/:productId" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="*" element={<NotfoundPage />} />
            </Routes>
        </Router>
    );
}

export default Routing;
