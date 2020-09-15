import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Components
import SideBar from './components/sidebar';
import Cart from './containers/cart';
import ProductList from './containers/product-list';

// CSS
import './App.css';

export default function App(props) {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const cartQuantity = cartItems.reduce((sum, i) => sum += i.quantity, 0);

  const [formVisibility, setFormVisibility] = useState(false);

  useEffect(() => {
    return () => {
        
    }
  }, []);

  return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Link to='/products'>
              <h1 className="App-title">My simple shop</h1>
            </Link>
            <span className="App-functionality">
              <button className="App-new-item" onClick={() => setFormVisibility(true)}><Link to='/products'>New Product</Link></button>
              <Link to='/cart' className="App-cart">Cart {cartQuantity}</Link>
            </span>
          </header>
          <div className="App-wrapper">
            <SideBar />
            <Route path="/" exact><span>Navigate to Product list to start shopping ;)</span></Route>
            <Route path='/products' render={() => <ProductList cartItems={cartItems} formVisibility={formVisibility} setFormVisibility={setFormVisibility}/>} />
            <Route path='/cart' render={() => <Cart cartItems={cartItems} />} />
          </div>
        </div>
      </BrowserRouter>
  );
  
}