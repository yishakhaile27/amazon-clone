import React from 'react';
import Header from '../Header/Header';
import LowerHeader from '../Header/Lower_Header';

const Layout = ({children}) => {
    return (
        <div>
            <Header />
            <LowerHeader />
            {children}
        </div>
    );
}

export default Layout;
