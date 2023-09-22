import React from 'react'
import AdminDashboard from '../components/Admin/AdminDashboard'
import AdminHeader from '../components/Header/AdminHeader'
import Header from '../components/Header/Header'

function Dashboard() {
  return (
    <div>
        <AdminHeader/>
        <br/>
        <br/>
        <AdminDashboard/>
    </div>
  )
}

export default Dashboard