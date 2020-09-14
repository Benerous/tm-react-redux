import { 
    GET_CART_ITEMS,
    ADD_TO_CART,
    REMOVE_FROM_CART,
} from '../constants/cart.constants';
import Cookie from 'js-cookie';
import axios from 'axios';

// const getCartItems = () => async (dispatch, getState) => {
//     try {
//         const cart = useSelector(state => state.cart);
//         const { cartItems } = cart;
//         console.log(cartItems);
//         dispatch({ type: GET_CART_ITEMS, payload: { cartItems }});
//     }
//     catch (error) {
//         alert(error);
//     }
// };

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
    dispatch({type: REMOVE_FROM_CART, payload: productId});
    const { cart: {cartItems} } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

export { addToCart, removeFromCart };