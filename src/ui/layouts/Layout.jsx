import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import Side from '../components/Side'

const Layout = () => {
  return (
    <>
      {/* <Navbar /> */}
      {/* <Sidebar /> */}
      <Side />
      <div className='sm:ml-64'>
        <div className='border border-gray-200 rounded-lg mt-6 mx-3 overflow-hidden shadow-sm'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
