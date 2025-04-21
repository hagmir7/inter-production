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
        <div className='px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
