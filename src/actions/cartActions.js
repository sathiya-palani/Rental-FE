

import {addCartItemRequest, addCartItemSuccess} from '../slices/cartSlice';
import axios from 'axios'

export const addCartItem = (id, quantity) => async(dispatch) => {
    try {
        dispatch(addCartItemRequest())

        const {data } = await axios.get(`http://localhost:3001/api/v1/product/${id}`)
        dispatch(addCartItemSuccess({
            product: data.product._id,
            name: data.product.name,
            rentalRatePerMonth: data.product.rentalRatePerMonth,
            image: data.product.images[0].image,
         
            quantity
        }))
    } catch (error) {
        
    }
}