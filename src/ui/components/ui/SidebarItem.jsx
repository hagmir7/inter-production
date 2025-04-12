import React from 'react'
import { Link } from 'react-router-dom'

const SidebarItem = ({ label, icon, href, active }) => {
  return (
    <li className='flex flex-col gap-y-1'>
      <Link
        to={href}
        className={`${
          active ? 'bg-gray-200 flex' : ''
        } text-gray-500 relative flex items-center justify-center gap-x-3 rounded-lg px-2 py-2 outline-none transition duration-75 hover:bg-gray-200 focus-visible:bg-gray-100 dark:hover:bg-white/5 dark:focus-visible:bg-white/5 dark:bg-white/5`}
      >
        {icon}

        <span className='flex-1 truncate text-sm font-medium text-gray-600 dark:text-gray-400'>
          {label}
        </span>
      </Link>
    </li>
  )
}

export default SidebarItem
