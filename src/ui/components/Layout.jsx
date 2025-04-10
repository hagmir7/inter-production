import React from 'react'

const Layout = ({children}) => {
  return (
    <div className='sm:ml-64'>
      <div className='border border-gray-200 rounded-lg mt-6'>{children}</div>
    </div>
  )
}

export default Layout
