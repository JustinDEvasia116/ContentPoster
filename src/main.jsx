import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from "react-redux";
import store from './redux/store';
import { setUser } from './features/auth/authSlice';
import jwt_decode from 'jwt-decode';



const authTokens = JSON.parse(localStorage.getItem('authTokens'));
if (authTokens && authTokens.access) {
  const decodedToken = jwt_decode(authTokens.access);
  store.dispatch(setUser(decodedToken.username));
}


ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
    <App />
    </Provider>
  
)
