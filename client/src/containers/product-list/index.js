import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { getProductList } from '../../actions/products.actions';
import { addToCart } from '../../actions/cart.actions';

import './product-list.css';

export function ProductList(props) {
  const cartItems = props.cartItems;
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductList());
    return () => {
        //
    }
  }, []);

  const addToCartHandler = (id, qty) => {
    const itemInCart = cartItems.find(i => i.id === id);
    qty = itemInCart ? itemInCart.quantity += 1 : qty;
    dispatch(addToCart(id, qty));
  }

  const checkNotAvailability = (product, itemsInCart) => {
    const productInCart = itemsInCart.find(i => i.id === product.id);
    if (productInCart) {
      return productInCart.quantity >= product.available;
    } else {
      return !product.available;
    }
  }

  const renderProducts = () => {
    return loading ? <div>Loading...</div> : error ? <div>{error.message}</div> : products.map((i, index) => (
      <div className="product_list_item" key={index}>
        <p>{i.name}</p>
        <p>Price: {i.price}</p>
        <p>{checkNotAvailability(i, cartItems) > 0 ? 'Sold out' : 'In stock'}</p>
        <button className="add-to-cart-btn" onClick={() => addToCartHandler(i.id, 1)} disabled={checkNotAvailability(i, cartItems)}>{checkNotAvailability(i, cartItems) ? 'Sold out' : 'Add to cart'}</button>
      </div>
    ));
  };

  return (
    <div>
      <select className="App-product-sort" defaultValue="sortBy">
          <option value="sortBy" disabled>Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="availability">Availability</option>
      </select>
      <div className="App-product_list">
        { renderProducts() }
      </div>
    </div>
  );
}

const mapStateToProps = state => ({...state});

export default connect(mapStateToProps)(ProductList);