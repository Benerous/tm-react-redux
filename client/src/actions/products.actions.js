import { 
    GET_PRODUCT_LIST_REQUEST,
    GET_PRODUCT_LIST_SUCCESS,
    GET_PRODUCT_LIST_FAIL, 
    ADD_NEW_PRODUCT_REQUEST,
    ADD_NEW_PRODUCT_SUCCESS,
    ADD_NEW_PRODUCT_FAIL
} from '../constants/products.constants';
import axios from 'axios';

const getProductList = () => async (dispatch) => {
    try {
        dispatch({ type: GET_PRODUCT_LIST_REQUEST });
        const { data } = await axios.get(`/api/products`);
        dispatch({ type: GET_PRODUCT_LIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_PRODUCT_LIST_FAIL, payload: error.message })
    }
}

export { getProductList };
// export const getProductList = () => ({type: GET_PRODUCT_LIST});
// export const addNewProduct = payload => ({type: ADD_NEW_PRODUCT, product: payload});