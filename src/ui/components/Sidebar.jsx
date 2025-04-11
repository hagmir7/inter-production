import React from 'react'
import SideLink from './ui/SideLink'
import { AlertCircle, BookDashed, Home, LayoutGrid, MarsIcon, Pickaxe, Wrench } from 'lucide-react'

const Sidebar = () => {
  return (
    <aside
      className='fixed top-4 left-0 z-40 w-64 h-screen mt-24 transition-transform -translate-x-full bg-whit sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700'
      aria-label='Sidebar'
    >
      <div className='h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800'>
        <ul className='space-y-2 font-medium'>
          <SideLink label='Dashboard' to='/users' icon={<LayoutGrid className='w-4 lg:w-10' />} active={true} />
          <SideLink label='Production' to='/production' icon={<Pickaxe className='w-4 lg:w-10' />} />
          <SideLink label='About' to='/users' icon={<AlertCircle className='w-4 lg:w-10' />} />
          <SideLink label='Maintenance' to='/maintenance' icon={<Wrench className='w-4 lg:w-10' />} />
          <SideLink label='Machines' to='/machines' icon={<MarsIcon className='w-4 lg:w-10' />} />
          {/* <SideLink label='Dashboard' to='/users' icon={<BookDashed />} />
          <SideLink label='Dashboard' to='/users' icon={<BookDashed />} /> */}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
