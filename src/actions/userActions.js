import { loginFail,
     loginRequest,
      loginSuccess,
      clearError ,
      registerRequest ,
       registerSuccess ,
       registerFail ,
       loadUserRequest,
      loadUserSuccess,
       loadUserFail ,
      logoutSuccess,
       logoutFail ,
      updateProfileFail,
      updateProfileSuccess,
     updateProfileRequest ,
     updatePasswordRequest,
     updatePasswordSuccess,
     updatePasswordFail    } from "../slices/authSlice"
import axios from 'axios';


//  for login

export const login = ( email , password)=> async (dispatch) =>{

try {
  dispatch(loginRequest())
  const {data} =   await axios.post(` http://localhost:3001/api/v1/login`,{email,password});
 
  dispatch(loginSuccess(data))
} catch (error) {
  dispatch(loginFail(error.response.data.message))
}

} 

export const clearAuthError = dispatch => {
  dispatch(clearError())
}


//  for register

export const register = (userData) => async (dispatch) => {
  console.log(userData);
  try {
      dispatch(registerRequest())
      const config = {
          // headers: {
          //     'Content-type': 'multipart/form-data'
          // }
      }

      const { data }  = await axios.post(`http://localhost:3001/api/v1/register`,userData,config);
     
      dispatch(registerSuccess(data))
  } catch (error) {
      dispatch(registerFail(error.response.data.message))
  }

}

// load user

export const loadUser =  async (dispatch) => {

  try {
      dispatch(loadUserRequest())
     

      const { data }  = await axios.get(` http://localhost:3001/api/v1/myprofile`);
      dispatch(loadUserSuccess(data))
  } catch (error) {
      dispatch(loadUserFail(error.response.data.message))
  }

}

// logout user

export const logout =  async (dispatch) => {

  try {
      await axios.get(` http://localhost:3001/api/v1/logout`);
      dispatch(logoutSuccess())
  } catch (error) {
      dispatch(logoutFail)
  }

}

// update profile

export const updateProfile = (userData) => async (dispatch) => {

  try {
      dispatch(updateProfileRequest())
      const config = {
          headers: {
              'Content-type': 'multipart/form-data'
          }
      }

      const { data }  = await axios.put(` http://localhost:3001/api/v1/update`,userData, config);
      dispatch(updateProfileSuccess(data))
  } catch (error) {
      dispatch(updateProfileFail(error.response.data.message))
  }

}

// update Password

export const updatePassword = (formData) => async (dispatch) => {

  try {
      dispatch(updatePasswordRequest())
      const config = {
          headers: {
              'Content-type': 'application/json'
          }
      }
      await axios.put(` http://localhost:3001/api/v1/password/change`, formData, config);
      dispatch(updatePasswordSuccess())
  } catch (error) {
      dispatch(updatePasswordFail(error.response.data.message))
  }

}

