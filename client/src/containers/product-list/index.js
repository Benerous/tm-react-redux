import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { getProductList } from '../../actions/products.actions';

import './product-list.css';

export function ProductList(props) {
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductList());
    return () => {
        //
    }
  }, []);

  const renderProducts = () => {
    return loading ? <div>Loading...</div> : error ? <div>{error.message}</div> : products.map((i, index) => (
      <div className="product_list_item" key={index}>
        <p>{i.name}</p>
        <p>Price: {i.price}</p>
        <p>{i.available > 0 ? 'In stock' : 'Sold out'}</p>
    <button className="add-to-cart-btn" onClick={() => this.addToCart()} disabled={!i.available}>{i.available ? 'Add to cart' : 'Sold out'}</button>
      </div>
    ));
  };

  return (
    <div className="App-product_list">
        {renderProducts()}
    </div>
  );
}

const mapStateToProps = state => ({...state});

export default connect(mapStateToProps)(ProductList);