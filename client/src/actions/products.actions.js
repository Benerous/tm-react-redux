import { 
    GET_PRODUCT_LIST_REQUEST,
    GET_PRODUCT_LIST_SUCCESS,
    GET_PRODUCT_LIST_FAIL, 
    ADD_NEW_PRODUCT_REQUEST,
    ADD_NEW_PRODUCT_SUCCESS,
    ADD_NEW_PRODUCT_FAIL
} from '../constants/products.constants';
import axios from 'axios';

const getProductList = (sortBy) => async (dispatch) => {
    try {
        dispatch({ type: GET_PRODUCT_LIST_REQUEST });
        const { data } = await axios.get(`/api/products?sortBy=${sortBy}`);
        dispatch({ type: GET_PRODUCT_LIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_PRODUCT_LIST_FAIL, payload: error.message })
    }
}

const addNewProduct = (name, price, availableCount) => async (dispatch) => {
    try {
        dispatch({ type: ADD_NEW_PRODUCT_REQUEST });
        const { data } = await axios.post(`/api/products`,
            {
                'name': name,
                'price': price,
                'available': availableCount
            }
        );
        dispatch({ type: ADD_NEW_PRODUCT_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: ADD_NEW_PRODUCT_FAIL, payload: error.message })
    }
}

export { getProductList, addNewProduct };