import React, { useEffect, useState } from 'react';
import { useDispatch, connect} from 'react-redux';
import { removeFromCart, addToCart, deleteCart } from '../../actions/cart.actions';
import { Link } from 'react-router-dom';

import './cart.css';

export function Cart(props) {
  const cartItems = props.cartItems;
  const dispatch = useDispatch();
  const [messageVisibility, setMessageVisibility] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    return () => {
        //
    }
  }, []);

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const changeQtyHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const submitHandler = () => {
    setTotalPrice(cartItems.reduce((sum, i) => sum += i.price * i.quantity, 0));
    setTotalItems(cartItems.reduce((sum, i) => sum += i.quantity, 0));
    setMessageVisibility(true);
    dispatch(deleteCart());
  }

  return (
    <div>
      {
      cartItems.length ? <div className="App-cart">
        {
          cartItems.map((i, index) => (
            <div className="App-cart-item" key={index}>
              <div>{i.name}</div>
              <span>
                <span className="cart-item-price">{i.price}</span>
                <span className="cart-item-quantity">
                  <input min='0' max={i.available} value={i.quantity <= i.available ? i.quantity : i.quantity - 1} readOnly/>
                  <button onClick={() => changeQtyHandler(i.id, i.quantity + 1)} disabled={i.quantity >= i.available}>+</button>
                  <button onClick={() => changeQtyHandler(i.id, i.quantity - 1)} disabled={i.quantity <= 1}>-</button>
                </span>
                <span className="cart-item-price">{i.price * i.quantity}</span>
                <span>
                  <button className="cart-item-delete" onClick={() => removeHandler(i.id)}>Delete</button>
                </span>
              </span>
            </div>
          ))
        }
        </div> : <div className="App-cart" hidden={messageVisibility}>Your cart is empty ;(</div>
      }
      <div hidden={!cartItems.length} className="App-button-next">
        <button onClick={() => submitHandler()}>
          Next
        </button>
      </div>
      <div className="App-message" hidden={!messageVisibility}>
        <div>
          Items in cart: {totalItems}.
        </div>
        <div>
          Total price: {totalPrice}.
        </div>
        Thank you for purchase!
        <div>
        <Link to='/products'>Back to shopping</Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({...state});

export default connect(mapStateToProps)(Cart);
