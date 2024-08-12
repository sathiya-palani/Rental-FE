import axios from 'axios';
import { productsFail, productsRequest, productsSuccess } from '../slices/productsSlice';


export const getProducts = async(dispatch, searchQuery) => {

 try {

    dispatch (productsRequest())
     console.log({searchQuery});
    const {data} = await axios.get( `http://localhost:3001/api/v1/products`)
    
    dispatch(productsSuccess(data)) 
    
} catch (error) {
    // handle error
     dispatch(productsFail(error.response.data.message))
}

}