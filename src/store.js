
import {  combineReducers, configureStore } from "@reduxjs/toolkit";
import {  applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import productsReducer  from "./slices/productsSlice";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import bookingReducer from "./slices/bookingSlice"


const reducer = combineReducers({
    productsState: productsReducer , 
    productState: productReducer ,
    authState:authReducer,
    cartState:cartReducer,
    bookingState:bookingReducer,
})


 const store = configureStore({
    reducer ,
    //  applyMiddleware(thunk)
 }
)

export default store;


