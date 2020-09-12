import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

export const SideBar = (props) => {
  return (<div className="App-sidebar">
    <nav className="App-sidebar-nav">
      <Link to="/products" onClick={() => props.changeNavigation('product-list')}>Product list</Link>
      <Link to="/cart" onClick={() => props.changeNavigation('cart')}>Cart</Link>
    </nav>
  </div>);
};

export default SideBar;