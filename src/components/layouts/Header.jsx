import React from 'react'
import Search from './Search'
import { Link , useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {DropdownButton, Dropdown} from 'react-bootstrap';
import { logout } from '../../actions/userActions';

const Header = () => {

  const { isAuthenticated, user } = useSelector(state => state.authState);
  const { items:cartItems } = useSelector(state => state.cartState)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout);
  }  
 


  return (
   
    <nav className="navbar row">
    <div className="col-12 col-md-3">
      <div className="navbar-brand">
        <img width="100px"  src="./images/logo 1.png" />
      </div>
    </div>

    <div className="col-12 col-md-6 mt-2 mt-md-0">
      <Search />
    </div>

    <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
    { isAuthenticated ? 
    (
      <Dropdown className='d-inline' >
          <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
            
            <span>{user.name}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
              { user.role === 'admin' && <Dropdown.Item onClick={() => {navigate('/admin/dashboard')}} className='text-dark'>Dashboard</Dropdown.Item> }
              <Dropdown.Item onClick={() => {navigate('/bookings')}} className='text-dark'>Bookings</Dropdown.Item>
               <Dropdown.Item onClick={() => {navigate('/myprofile')}} className='text-dark'>Profile</Dropdown.Item>
               <Dropdown.Item  onClick={logoutHandler} className='text-danger'>Logout</Dropdown.Item>
          </Dropdown.Menu>
      </Dropdown>
    ) 
    :

      <Link to='/login' className="btn" id="login_btn">Login</Link>
  }
    <Link to="/cart"><span id="cart" className="ml-3">Cart</span> </Link>
      <span className="ml-1" id="cart_count">{cartItems.length}</span>
    </div>
  </nav>

  )
}

export default Header;