
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoute from './utils/privateRoute'



import './App.css'
import Home from './pages/HomePage'
import Login from './pages/LoginPage'
import Signup from './pages/SignupPage'

import AdminPage from './pages/AdminPage'
import Dashboard from './pages/Dashboard'

function App() {
  
  return (
    <div className='App'>
      
      <Router>        
        <Routes>
        <Route path="/" element={<Home />} />
  
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPage/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </Router>
    </div>

  )
}

export default App
