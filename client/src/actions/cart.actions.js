import { 
    ADD_TO_CART,
    REMOVE_FROM_CART,
    DELETE_CART
} from '../constants/cart.constants';
import Cookie from 'js-cookie';
import axios from 'axios';

const addToCart = (productId, quantity) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/products?productId=${productId}`);
        dispatch({ type: ADD_TO_CART, payload: {
            id: data.id,
            name: data.name,
            price: data.price,
            available: data.available,
            quantity
        }});
        const { cart: { cartItems } } = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    }
    catch (error) {
        alert(error);
    }
}

const removeFromCart = (productId) => async (dispatch, getState) => {
    dispatch({ type: REMOVE_FROM_CART, payload: productId });
    const { cart: {cartItems} } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

const deleteCart = () => async (dispatch) => {
    dispatch({ type: DELETE_CART });
    Cookie.remove("cartItems");
}

export { addToCart, removeFromCart, deleteCart };