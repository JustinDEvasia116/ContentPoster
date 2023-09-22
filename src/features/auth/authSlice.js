import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from "jwt-decode";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    error: null,
    isLoading: false,
    isAdmin: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    adminLogoutSuccess(state) {
      state.isAdmin = false;
      // handle other state changes on successful logout
    },
  },
});

export const { setToken, setUser, setError, setLoading, setIsAdmin } = authSlice.actions;

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.post('http://127.0.0.1:8000/api/token/', {
      username: username,
      password: password,
    });

    dispatch(setToken(response.data.access));
    localStorage.setItem('authTokens', JSON.stringify(response.data));
    
    const decodedToken = jwt_decode(response.data.access);

    dispatch(setUser(decodedToken.username));

    dispatch(setLoading(false));

    return response;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    throw error;
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('authTokens');
    localStorage.removeItem('user');
    dispatch(setToken(null));
    dispatch(setUser(null));
    return true;
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  }
};

export const adminLogin = (username, password) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    console.log('username: ',username )
    console.log('password: ',password )

    const response = await axios.post('http://127.0.0.1:8000/admins/admin-token/', {
      username: username,
      password: password,
    }).catch((error)=>{
        console.log('error',error.message)
    });

    const decodedToken = jwt_decode(response.data.access);

    if (decodedToken.is_admin) {
      dispatch(setToken(response.data.access));
      localStorage.setItem('authTokens', JSON.stringify(response.data));
      localStorage.setItem('user', JSON.stringify(decodedToken));
      dispatch(setUser(decodedToken.username));
      dispatch(setIsAdmin(true));
      alert("Welcome Admin")
    } else {
      alert("UnAuthorized")
    }

    dispatch(setLoading(false));

    return response;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    throw error;
  }
};
export const {
 
  adminLogoutSuccess,
  // other exported actions
} = authSlice.actions;

export default authSlice.reducer;
