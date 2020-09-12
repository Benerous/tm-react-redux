import { combineReducers } from 'redux';
import { productListReducer, addProductReducer } from './products.reducer';
import { cartReducer } from './cart.reducer';

const shopReducer = combineReducers({
    productList: productListReducer,
    addProduct: addProductReducer,
    cart: cartReducer
});

export default shopReducer;