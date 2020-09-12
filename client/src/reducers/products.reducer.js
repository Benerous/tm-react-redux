import { 
    GET_PRODUCT_LIST_REQUEST,
    GET_PRODUCT_LIST_SUCCESS,
    GET_PRODUCT_LIST_FAIL, 
    ADD_NEW_PRODUCT_REQUEST,
    ADD_NEW_PRODUCT_SUCCESS,
    ADD_NEW_PRODUCT_FAIL
} from '../constants/products.constants';

function productListReducer(state = { products: [] }, action) {
    switch (action.type) {
        case GET_PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };
        case GET_PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload };
        case GET_PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

function addProductReducer(state = { product: {} }, action) {
    switch (action.type) {
        case ADD_NEW_PRODUCT_REQUEST:
            return { loading: true };
        case ADD_NEW_PRODUCT_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case ADD_NEW_PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export { productListReducer, addProductReducer };