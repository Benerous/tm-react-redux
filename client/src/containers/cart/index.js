import React, { useEffect } from 'react';
import { useDispatch, connect} from 'react-redux';
import { removeFromCart, addToCart } from '../../actions/cart.actions';

import './cart.css';

export function Cart(props) {
  const cartItems = props.cartItems;
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce((sum, i) => sum += i.price * i.quantity, 0);
  const totalItems = cartItems.reduce((sum, i) => sum += i.quantity, 0);

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
  }

  return (
    <div>
      {
      cartItems.length ? <div className="App-cart">
        {
          cartItems.map((i, index) => (
            <div className="App-cart-item" key={index}>
              <span>{i.name}</span>
              <span>
                <span className="cart-item-price">{i.price}</span>
                <span className="cart-item-quantity">
                  <input min='0' max={i.available} value={i.quantity <= i.available ? i.quantity : i.quantity - 1} readOnly/>
                  <button onClick={() => changeQtyHandler(i.id, i.quantity + 1)} disabled={i.quantity >= i.available}>+</button>
                  <button onClick={() => changeQtyHandler(i.id, i.quantity - 1)} disabled={i.quantity <= 1}>-</button>
                </span>
                <button className="cart-item-delete" onClick={() => removeHandler(i.id)}>Delete</button>
              </span>
            </div>
          ))
        }
        </div>: <div className="App-cart">Your cart is empty </div>
      }
      <div>
        <button onClick={() => submitHandler()}>
          Next
        </button>
      </div>
      <div className="App-message">
        <span>
          Items in cart: {totalItems}.
        </span>
        <span>
          Total price: {totalPrice}.
        </span>
        Thank you for purchase!
      </div>
    </div>
  );
}

const mapStateToProps = state => ({...state});

export default connect(mapStateToProps)(Cart);
