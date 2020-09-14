import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';

export const SideBar = (props) => {
  return (<div className="App-sidebar">
    <nav className="App-sidebar-nav">
      <Link to="/products" className={useLocation().pathname === '/products' ? 'App-link-active' : ''}>Product list</Link>
      <Link to="/cart" className={useLocation().pathname === '/cart' ? 'App-link-active' : ''}>Cart</Link>
    </nav>
  </div>);
};

export default SideBar;