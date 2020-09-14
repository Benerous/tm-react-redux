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
            const product = state.cartItems.find(x => x.id === item.id);
            if (product) {
                if (product.quantity < product.available) {
                    // item.quantity = product.quantity + 1
                    item.quantity = item.quantity;
                }
                else {
                    item.quantity = item.quantity;
                }
                return {
                    cartItems: 
                    state.cartItems.map(x => x.id === product.id ? item : x)}
            }
            else {
                return {cartItems: [...state.cartItems, item]}
            }
        case REMOVE_FROM_CART:
            return { cartItems: state.cartItems.filter(item => item.id !== action.payload)};
        default:
            return state;
    }
}

export { cartReducer };
