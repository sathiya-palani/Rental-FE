

import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        bookingDetail: {},
        userBookings : [],
        // adminBookings: [],
        loading: false,
        // isBookingDeleted: false,
        // isBookingUpdated: false
    },
    reducers: {
        createBookingRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        createBookingSuccess(state, action) {
            return {
                ...state,
                loading: false,
                bookingDetail: action.payload.booking
            }
        },
        createBookingFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        userBookingsRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        userBookingsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                userBookings: action.payload.Bookings
            }
        },
        userBookingsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        bookingDetailRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        bookingDetailSuccess(state, action) {
            return {
                ...state,
                loading: false,
                bookingDetail: action.payload.booking
            }
        },
        bookingDetailFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },

    }
    } )

    const { actions, reducer } = bookingSlice;

export const { 
    createBookingFail,
    createBookingSuccess,
     createBookingRequest,
     clearError,
     userBookingsFail,
     userBookingsRequest,
     userBookingsSuccess,
     bookingDetailFail,
     bookingDetailRequest,
     bookingDetailSuccess
}   = actions;

export default reducer;