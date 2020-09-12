import { 
    GET_CART_ITEMS,
    ADD_TO_CART,
    REMOVE_FROM_CART,
} from '../constants/cart.constants';
import axios from 'axios';

export const getCartItems = () => ({type: GET_CART_ITEMS});
export const removeFromCart = id => ({type: REMOVE_FROM_CART, productId: id});