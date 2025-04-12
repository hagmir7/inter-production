import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className='sm:ml-64'>
        <div className='border border-gray-200 rounded-lg mt-6 mx-3'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
