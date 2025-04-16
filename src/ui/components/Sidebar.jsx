import React from 'react'
import SideLink from './ui/SideLink'
import { AlertCircle, BookDashed, Home, LayoutGrid, MarsIcon, Pickaxe, User, Wrench } from 'lucide-react'
import SidebarItem from './ui/SidebarItem'

const Sidebar = () => {
  return (
    <aside
      className=' bg-gray-100 dark:bg-gray-800 fixed top-1 left-0 z-30 w-64 h-screen mt-15 transition-transform -translate-x-full bg-whit sm:translate-x-0 dark:border-gray-700'
      aria-label='Sidebar'
    >
      <div className='h-full px-4 pb-4 overflow-y-auto'>
        <ul className='space-y-2 font-medium pt-3'>
          <SidebarItem
            label='Dashboard'
            href='/users'
            icon={<LayoutGrid className='w-4 lg:w-7' />}
            active={true}
          />
          <SidebarItem
            label='Production'
            href='/production'
            icon={<Pickaxe className='w-4 lg:w-7' />}
          />
          <SidebarItem
            label='Utilisateurs'
            href='/users'
            icon={<User className='w-4 lg:w-7' />}
          />
          <SidebarItem
            label='Maintenance'
            href='/maintenance'
            icon={<Wrench className='w-4 lg:w-7' />}
          />
          <SidebarItem
            label='Machines'
            href='/machines'
            icon={<MarsIcon className='w-4 lg:w-7' />}
          />
          {/* <SidebarItem /> */}
          {/* <SideLink label='Dashboard' to='/users' icon={<BookDashed />} />
          <SideLink label='Dashboard' to='/users' icon={<BookDashed />} /> */}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
