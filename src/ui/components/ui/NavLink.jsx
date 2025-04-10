import React from 'react'
import { Link } from 'react-router'

function NavLink({lable, to}) {
  return (
    <div className='flex flex-auto sm:flex-1'>
      <Link
        className='active:scale-95 hover:bg-gray-100 transition-transform w-full text-center outline-link py-1.5 px-1.5 xs:px-3 sm:px-4 rounded-full capitalize whitespace-nowrap hover:bg-primary/5 hover:dark:bg-primary-dark/5'
        to={to}
      >
        {lable}
      </Link>
    </div>
  )
}

export default NavLink;