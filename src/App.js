import React from 'react';
import "./App.css"
import Routing from './Router';
import { StoreProvider } from './StoreContext';



const App = () => {
  return (
    <StoreProvider>
      <Routing />
    </StoreProvider>
  );
}

export default App;
