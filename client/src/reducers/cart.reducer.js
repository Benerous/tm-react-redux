import { 
    ADD_TO_CART,
    REMOVE_FROM_CART,
    DELETE_CART
} from '../constants/cart.constants';

function cartReducer(state = { cartItems: [] }, action) {
    switch (action.type) {
        case DELETE_CART:
            return { cartItems: [] };
        case ADD_TO_CART:
            const item = action.payload;
            const product = state.cartItems.find(x => x.id === item.id);
            if (product) {
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
