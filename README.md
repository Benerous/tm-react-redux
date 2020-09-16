# API Application
> Application for shopping: product list, cart with added items from list, message with total items count and total price in cart

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup & Running](#setup-and-running)
* [Features](#features)
* [Contact](#contact)

## General info
Application based on client and server parts, server represents as REST API to get product list and create a new product in list. Data is saved in data.json file.

## Technologies
* React.js
* Redux (as state manager)
* npm
* axios (to make requests to server)
* Node.js, Express.js (for server part of application)
* uniqid (creating uniqe ID's for products)
* js-cookie (to save info about cart even after refreshing page)

## Setup and running
```
git clone https://github.com/Benerous/tm-react-redux.git
cd tm-react-redux
npm install
```
* to start server
```
cd server
npm start
```
* to start client part (in another terminal)
```
cd client
npm start
```

## Features
List of features:
* adding product into cart
* adding a new product to product list
* sorting product list by name(alphabetically), price(rising), availability(available firstly)
* cart page
* editing cart page (delete product from cart, change q-ty)
* submiting cart (message with total price)

To-do list of improvements:
* UI improvements
* connecting to real DB (MyQSL, MongoDB, etc.)
* API calls testing
* images for products
* sorting by name
* currency, currency converting for different regions
* authentication (via JWT tokens)
* wishlist (liked products) page
* shipping info page and payment redirecting (paypal or similar)

## Contact
Created by [@benerous](https://github.com/Benerous) - feel free to contact me!