
import {useEffect, useState} from 'react';
import {useDispatch, useSelector } from 'react-redux'
import { register, clearAuthError } from '../../actions/userActions'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
   });

   const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(state => state.authState)
    
   const onChange = (e) => {
    setUserData({...userData ,[e.target.name]:e.target.value })
   }

   const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
        formData.append('name', userData.name)
        formData.append('email', userData.email)
        formData.append('password', userData.password)
        console.log(formData);
        dispatch(register(userData))
   }

   useEffect(()=>{
    if(isAuthenticated) {
        navigate('/');
        return
    }
    if(error)  {
        toast(error, {
            // position: toast.POSITION.BOTTOM_CENTER,
            type: 'error',
            onOpen: ()=> { dispatch(clearAuthError) }
        })
        return
    }
},[error, isAuthenticated, dispatch, navigate])


  return (
    <div className="row wrapper">
    <div className="col-10 col-lg-5">
    <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
        <h1 className="mb-3">Register</h1>

    <div className="form-group">
        <label htmlFor="email_field">Name</label>
        <input name='name' onChange={onChange} type="name" id="name_field" className="form-control" />
    </div>

        <div className="form-group">
        <label htmlFor="email_field">Email</label>
        <input
            type="email"
            id="email_field"
            name='email' 
            onChange={onChange}
            className="form-control"
          
        />
        </div>

        <div className="form-group">
        <label htmlFor="password_field">Password</label>
        <input
            name='password' 
            onChange={onChange}
            type="password"
            id="password_field"
            className="form-control"
          
        />
        </div>

       

        <button
        id="register_button"
        type="submit"
        className="btn btn-block py-3"
        disabled={loading}
        onSubmit={submitHandler}
        >
        REGISTER
        </button>
    </form>
    </div>
</div>

  )
}

export default Register