import React from "react";
import "./App.css";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from "./components/product/ProductDetail";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import ProductSearch from "./components/product/ProductSearch";
import { loadUser } from './actions/userActions';
import { useEffect} from 'react';
import store from './store';
import Profile from "./components/user/Profile";
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmBooking from "./components/cart/ConfirmBooking";
import Payment from "./components/cart/Payment";
import  axios  from "axios";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from "react";
import BookingSuccess from "./components/cart/BookingSuccess";
import UserBookings from "./components/booking/UserBookings";
import BookingDetail from "./components/booking/BookingDetail";
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";


const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("")
  useEffect(() => {
    store.dispatch(loadUser)
    async function getStripeApiKey(){
      const {data} = await axios.get(`http://localhost:3001/api/v1/stripeapi`)
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  },[])


  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search/:keyword'element={<ProductSearch />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/myprofile' element={<ProtectedRoute><Profile/></ProtectedRoute> } />
          <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute> } />
          <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute> } />
          
          <Route path='/cart' element={<Cart/> } />
          <Route path='/shipping' element={<ProtectedRoute><Shipping /></ProtectedRoute> } />
          <Route path='/booking/confirm' element={<ProtectedRoute><ConfirmBooking /></ProtectedRoute> } />
          <Route path='/booking/success' element={<ProtectedRoute>< BookingSuccess /></ProtectedRoute> } />
          <Route path='/bookings' element={<ProtectedRoute>< UserBookings /></ProtectedRoute> } />
          <Route path='/booking/:id' element={<ProtectedRoute>< BookingDetail /></ProtectedRoute> } />
          {stripeApiKey && <Route path='/payment' element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements></ProtectedRoute> } /> }
        </Routes>
        </div>

           {/* Admin Routes */}
           <Routes>
           <Route path='/admin/dashboard' element={ <ProtectedRoute isAdmin={true}> <Dashboard /></ProtectedRoute>} />
           <Route path='/admin/products' element={ <ProtectedRoute isAdmin={true}> <ProductList/></ProtectedRoute>} />
           <Route path='/admin/products/create' element={ <ProtectedRoute isAdmin={true}> <NewProduct/></ProtectedRoute>} />
           <Route path='/admin/product/:id' element={ <ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute> } />

           </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
