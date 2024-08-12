import axios from 'axios';
import { productFail, productRequest, productSuccess , newProductRequest, newProductSuccess, newProductFail ,
    deleteProductFail,
    deleteProductRequest,
    deleteProductSuccess,
    updateProductFail,
    updateProductSuccess,
    updateProductRequest} from '../slices/productSlice';
import {  adminProductsRequest, adminProductsSuccess, adminProductsFail } from '../slices/productsSlice';


export const getProduct = id => async(dispatch) => {
 try {
    dispatch (productRequest())
  
    const {data} = await axios.get(`http://localhost:3001/api/v1/product/${id}`);
    // console.log(data);
    dispatch(productSuccess(data));
     
} catch (error) {
    // handle error
     dispatch(productFail(error.response.data.message))
}

}

export const getAdminProducts  =  async (dispatch) => {

    try {  
        dispatch(adminProductsRequest()) 
        const { data }  =  await axios.get(`http://localhost:3001/api/v1/admin/products`);
        dispatch(adminProductsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(adminProductsFail(error.response.data.message))
    }
    
}

export const createNewProduct  =  productData => async (dispatch) => {

    try {  
        dispatch(newProductRequest()) 
        console.log(productData);
        const { data }  =  await axios.post(`http://localhost:3001/api/v1/admin/product/new`, productData);
        dispatch(newProductSuccess(data))
    } catch (error) {
        //handle error
        dispatch(newProductFail(error.response.data.message))
    }
    
}

export const deleteProduct  =  id => async (dispatch) => {

    try {  
        dispatch(deleteProductRequest()) 
        await axios.delete(`http://localhost:3001/api/v1/admin/product/${id}`);
        dispatch(deleteProductSuccess())
    } catch (error) {
        //handle error
        dispatch(deleteProductFail(error.response.data.message))
    }
    
}


export const updateProduct  =  (id, productData) => async (dispatch) => {

    try {  
        dispatch(updateProductRequest()) 
        const { data }  =  await axios.put(`http://localhost:3001/api/v1/admin/product/${id}`, productData);
        dispatch(updateProductSuccess(data))
    } catch (error) {
        //handle error
        dispatch(updateProductFail(error.response.data.message))
    }
    
}


