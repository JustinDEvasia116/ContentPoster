// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import jwt_decode from 'jwt-decode';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});



export default store;
