import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { getProductList, addNewProduct } from '../../actions/products.actions';
import { addToCart } from '../../actions/cart.actions';

import './product-list.css';

export function ProductList(props) {
  const cartItems = props.cartItems;
  const formVisibility = props.formVisibility;
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const [sortBy, setSortBy] = useState('default');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductList(sortBy));
    return () => {
        //
    }
  }, [dispatch, sortBy]);

  const addToCartHandler = (id, qty) => {
    const itemInCart = cartItems.find(i => i.id === id);
    qty = itemInCart ? itemInCart.quantity += 1 : qty;
    dispatch(addToCart(id, qty));
  };

  const checkNotAvailability = (product, itemsInCart) => {
    const productInCart = itemsInCart.find(i => i.id === product.id);
    if (productInCart) {
      return productInCart.quantity >= product.available;
    } else {
      return !product.available;
    };
  };

  const addNewProductHandler = async (e) => {
    const name = e.target.name.value;
    const price = e.target.price.value;
    const availableCount = e.target.availableCount.value;
    await dispatch(addNewProduct(name, price, availableCount));
    await dispatch(getProductList(sortBy));
  };

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
      <dialog open={formVisibility}>
        <form action='/api/products/' method="POST" onSubmit={(e) => {e.preventDefault(); addNewProductHandler(e)}}>
          <input type="name" name="name" placeholder="Name" maxLength="35" required/>
          <input type="number" name="price" min="1" placeholder="Price" required/>
          <input type="number" name="availableCount" placeholder="Available count" min="0" required/>
          <input type="submit" value="Create New" />
          <input type="button" onClick={() => props.setFormVisibility(false)} value="Close" />
        </form>
      </dialog>
      <select className="App-product-sort" defaultValue="default" onChange={(e) => setSortBy(e.target.value)}>
          <option value="default" disabled>Sort By</option>
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