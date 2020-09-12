import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import shopReducer from './reducers/index';

const initialState = { cart: {  } };
const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function setupStore() {
  return createStore(shopReducer, initialState, composeEnchancer(applyMiddleware(thunk)))
};