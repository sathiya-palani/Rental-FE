
import {useDispatch, useSelector} from 'react-redux';
import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  removeItemFromCart } from '../../slices/cartSlice';
const cart = () => {
    
    const {items } = useSelector(state => state.cartState)
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
     
   
    const checkoutHandler = () =>{
        navigate('/login?redirect=shipping')
    }


  return (
      <Fragment>
          {items.length==0 ? 
            <h2 className="mt-5">Your Cart is Empty</h2> :
            <Fragment>
                 
        <h2 className="mt-5">Your Bookings <b>{items.length}</b></h2>
        
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
                {items.map(item => ( 
               <Fragment key={item.product}>
                    <hr />
                <div className="cart-item">
                    <div className="row">
                        <div className="col-4 col-lg-3">
                            <img src={item.image} alt={item.name} height="90" width="115" />
                        </div>
    
                        <div className="col-5 col-lg-3">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>
    
    
                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">{item.rentalRatePerMonth}/month</p>
                        </div>
    
                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <div className="stockCounter d-inline">
                               
                            </div>
                        </div>
    
                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                
                 <button type="button" id="cart_btn"
                         onClick={() =>dispatch(removeItemFromCart(item.product))}
                          className="btn btn-primary d-inline ml-4">Remove from Booking</button>
                          </div>
    
                    </div>
                </div>
                </Fragment>
                ))}
        
               
            </div>
    
            <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Booking Summary</h4>
                    <hr />
                    <p>Subtotal:  <span className="order-summary-values">{items.reduce((acc, item)=>(acc + item), 0)} (Units)</span></p>
                    <p>Est. total: <span className="order-summary-values">{items.reduce((acc, item)=>(acc + item* item.price), 0)}</span></p>
                
    
                    <hr />
                    <button id="checkout_btn" onClick={checkoutHandler} className="btn btn-primary btn-block">Check out</button>
                </div>
            </div>
        </div>
                 </Fragment>
        }
    </Fragment>
  )
}

export default cart;

