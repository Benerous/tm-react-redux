import { 
    GET_CART_ITEMS,
    ADD_TO_CART,
    REMOVE_FROM_CART,
} from '../constants/cart.constants';

function cartReducer(state = { cartItems: [] }, action) {
    switch (action.type) {
        case GET_CART_ITEMS:
            return { cartItems: action.payload };
        case ADD_TO_CART:
            const item = action.payload;
            const product = state.cartItems.find(x => x.product === item.product);
            if (product) {
                return {
                    cartItems: 
                    state.cartItems.map(x => x.product === product.product ? item : x)}
            }
            else {
                return {cartItems: [...state.cartItems, item]}
            }
        case REMOVE_FROM_CART:
            return { cartItems: state.cartItems.filter(item => item.product !== action.payload)};
        default:
            return state;
    }
}

export { cartReducer };
