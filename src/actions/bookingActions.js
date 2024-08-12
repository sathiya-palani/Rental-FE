import { createBookingRequest ,createBookingSuccess, createBookingFail ,
         userBookingsFail , userBookingsRequest, userBookingsSuccess, bookingDetailFail,bookingDetailRequest,
          bookingDetailSuccess
         } from '../slices/bookingSlice';

import axios from 'axios';

export const createBooking = booking => async(dispatch) => {
    try {
       dispatch(createBookingRequest())
       const {data} = await axios.post(` http://localhost:3001/api/v1/booking/new`, booking)
       dispatch(createBookingSuccess(data))
    } catch (error) {
        dispatch(createBookingFail(error.response.data.message))
    }
}

export const userBookings = async(dispatch) => {
    try {
       dispatch(userBookingsRequest())
       const {data} = await axios.get(` http://localhost:3001/api/v1/mybookings`)
       dispatch(userBookingsSuccess(data))
    } catch (error) {
        dispatch(userBookingsFail(error.response.data.message))
    }
}


export const bookingDetail = id => async(dispatch) => {
    try {
       dispatch(bookingDetailRequest())
       const {data} = await axios.get(` http://localhost:3001/api/v1/booking/${id}`)
       dispatch(bookingDetailSuccess(data))
    } catch (error) {
        dispatch(bookingDetailFail(error.response.data.message))
    }
}


