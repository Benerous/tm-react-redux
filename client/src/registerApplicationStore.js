import { createStore, applyMiddleware, compose } from 'redux';
import Cookie from 'js-cookie';
import thunk from 'redux-thunk';
import shopReducer from './reducers/index';

const cartItems = Cookie.getJSON("cartItems") || [];
const initialState = { cart: { cartItems } };
const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function setupStore() {
  return createStore(shopReducer, initialState, composeEnchancer(applyMiddleware(thunk)))
};