import {Fragment, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {clearAuthError, login} from '../../actions/userActions';
import { toast } from 'react-toastify';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

   const {loading , error ,isAuthenticated}  = useSelector(state => state.authState)
   const redirect = location.search?'/'+location.search.split('=')[1]:'/';

    const  submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    useEffect (() => {
        if(isAuthenticated) {
           navigate(redirect)
        }

       if(error) {
        toast(error , {
            type:"error",
            onOpen: ()=> { dispatch(clearAuthError) } 
            // position: toast.POSITION.BOTTOM_CENTER
        })
        return
       }
    } , [error , isAuthenticated , dispatch , navigate] )
  return (
    <Fragment>
           
            <div className="row wrapper"> 
                <div className="col-10 col-lg-5">
                    <form onClick={submitHandler} className="shadow-lg">
                        <h1 className="mb-3">Login</h1>
                        <div className="form-group">
                        <label htmlFor="email_field">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                            onChange={e =>setEmail(e.target.value)}
                        />
                        </div>
            
                        <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"                            
                            value={password}
                            autocomplete="current-password"
                            onChange={e =>setPassword(e.target.value)}
                        />
                        </div>

                        <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
            
                        <button
                        id="login_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={loading}
                        onClick={submitHandler}
                        >
                        LOGIN
                        </button>

                        <Link to="/register" className="float-right mt-3">New User? Please Register</Link>
                    </form>
                </div>
            </div>
        </Fragment>
  )
}

export default Login

