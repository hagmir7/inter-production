import React from 'react'
import { Link } from 'react-router'

function SideLink({ label, to, icon, badge, active = false }) {
  return (
    <li className='my-1'>
      <Link
        to={to}
        className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
          active
            ? 'bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300'
            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/70'
        }`}
      >
        {icon && (
          <div
            className={`${
              active
                ? 'text-gray-700 dark:text-gray-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {icon}
          </div>
        )}

        <span
          className={`flex-1 ml-3 text-sm lg:text-md font-medium ${active ? 'font-semibold' : ''}`}
        >
          {label}
        </span>

        {badge && (
          <span
            className={`flex items-center justify-center h-6 min-w-6 px-1.5 ml-2 text-xs font-bold rounded-full ${
              active
                ? 'bg-gray-700 text-white dark:bg-gray-500'
                : 'bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {badge}
          </span>
        )}
      </Link>
    </li>
  )
}

export default SideLink
