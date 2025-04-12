import React from 'react'
import Search from './Search'
import NavLink from './ui/NavLink'
import { ArrowRightCircle, CircleUser, LogOut, LogOutIcon, LucideLogOut } from 'lucide-react'
import { Link } from 'react-router'
import Logout from './Logout'
import ThemeToggler from './ui/ThemeToggler'

const Navbar = () => {
  return (
    <nav className='duration-300 backdrop-filter backdrop-blur-lg backdrop-saturate-200 transition-shadow bg-opacity-90 items-center w-full flex justify-between bg-wash dark:bg-wash-dark dark:bg-opacity-95 px-1.5 lg:pe-5 lg:ps-4 z-40 border-b border-b-gray-200'>
      <div className='flex items-center justify-between w-full h-16 gap-0 sm:gap-3'>
        <div className='flex flex-row 3xl:flex-1 items-centers'>
          {/* <button
            type='button'
            aria-label='Menu'
            className='active:scale-95 transition-transform flex lg:hidden w-12 h-12 rounded-full items-center justify-center hover:bg-primary/5 hover:dark:bg-primary-dark/5 outline-link'
          >
            <svg
              width='1.33em'
              height='1.33em'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='3' y1='12' x2='21' y2='12'></line>
              <line x1='3' y1='6' x2='21' y2='6'></line>
              <line x1='3' y1='18' x2='21' y2='18'></line>
            </svg>
          </button> */}

          <span
            data-state='closed'
            className='flex items-center'
            style={{ WebkitTouchCallout: 'none' }}
          >
            <div className='flex items-center'>
              <div className='uwu-hidden'>
                <Link
                  className='active:scale-95 transition-transform relative items-center text-primary dark:text-primary-dark p-1 whitespace-nowrap outline-link rounded-full 3xl:rounded-xl inline-flex text-lg font-normal gap-2'
                  to='/'
                >
                  <img
                    width='70px'
                    height='70px'
                    src='https://intercocina.com/assets/imgs/intercocina-logo.png'
                    // alt='INTERPRODUCTION'
                  />
                  <span className='sr-only 3xl:not-sr-only'>React</span>
                </Link>
              </div>
            </div>
          </span>
        </div>

        {/* <Search /> */}

        <div className='text-base justify-center items-center gap-1.5 flex 3xl:flex-1 flex-row 3xl:justify-end'>
          <div className='mx-2.5 gap-1.5 hidden lg:flex'>
            {/* <NavLink lable='Login' to='/login' /> */}
            <NavLink lable='Learn' to='/users' />
            <NavLink lable='Profile' to='/users' />
            <NavLink lable='About' to='/users' />
          </div>

          <div className='flex w-full md:hidden'></div>

          <div className='flex items-center -space-x-2.5 xs:space-x-0'>
            <div className='flex md:hidden'>
              <button
                aria-label='Search'
                type='button'
                className='flex items-center justify-center w-12 h-12 transition-transform rounded-full active:scale-95 md:hidden hover:bg-secondary-button hover:dark:bg-secondary-button-dark outline-link'
              >
                <svg
                  width='1em'
                  height='1em'
                  viewBox='0 0 20 20'
                  className='w-5 h-5 align-middle'
                >
                  <path
                    d='M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z'
                    stroke='currentColor'
                    fill='none'
                    strokeWidth='2'
                    fillRule='evenodd'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
              </button>
            </div>

            <div className='flex'>
              <ThemeToggler />

              <Link
                title='Profile'
                className='hover:bg-gray-300 flex items-center justify-center w-12 h-12 transition-transform rounded-full active:scale-95 hover:bg-primary/5 hover:dark:bg-primary-dark/5 outline-link cursor-pointer'
                to='/profile'
              >
                <CircleUser />
              </Link>

              <Logout />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
