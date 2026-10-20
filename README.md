# Amazon Clone

A responsive Amazon-style storefront built with React. Browse a product catalog, search and filter products, manage a shopping cart, and complete a simulated checkout.

## Features

- Responsive storefront with a rotating hero carousel and product categories.
- Product search, category filters, deals listing, and individual product pages.
- Persistent shopping cart with quantity controls, item removal, and subtotal calculation.
- Simulated checkout with address validation, order summary, and order history.
- Local demo account and saved language, currency, and delivery preferences.
- Responsive navigation, accessible dialogs, loading indicators, and error/retry states.

## Getting started

Requirements: Node.js and npm.

```bash
npm install
npm start
```

The development server opens at [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the development server. |
| `npm run build` | Create an optimized production build in `build/`. |
| `npm test -- --watchAll=false` | Run the Create React App test runner once. |

## Storefront routes

| Route | Page |
| --- | --- |
| `/` | Home and product catalog |
| `/search` | Search results, filters, and deals |
| `/category/:categoryName` | Products in a category |
| `/product/:productId` | Product details |
| `/cart` | Shopping cart |
| `/payments` | Simulated checkout |
| `/orders` | Demo order history |
| `/auth` | Local demo account |
| `/customer-preferences` | Language, currency, and delivery preferences |

## Data and demo limitations

- Product catalog data comes from [Fake Store API](https://fakestoreapi.com/) and requires an internet connection.
- Cart contents, demo orders, demo profile, and regional preferences are saved in this browser's local storage.
- Sign-in creates a local demo profile only; there is no real authentication or account service.
- Checkout is simulated. It does not collect payment card details, process payments, or submit orders to a retailer.
- Currency conversion uses sample rates, not live exchange data. Language selection is saved, but storefront copy remains in English.

To clear the demo profile, cart, orders, and preferences, remove the `amazon-demo-store` item from this site's local storage in your browser.
