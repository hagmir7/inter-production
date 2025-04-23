import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import Side from '../components/Side'

const Layout = () => {
  return (
    <>
      <Navbar />
      {/* <Sidebar /> */}
      <Side />
      <div className='lg:ml-72 pb-14'>
        <div className='lg:px-8 mx-auto px-4 py-5 sm:px-6'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
