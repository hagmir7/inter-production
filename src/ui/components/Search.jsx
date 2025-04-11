import React from 'react';

export default function Search() {
  return (
    <div className='items-center bg-gray-200 text-gray-500 justify-center flex-1 hidden w-full md:flex 3xl:w-auto 3xl:shrink-0 3xl:justify-center rounded-4xl'>
      <div className='flex 3xl:w-[56rem] 3xl:mx-0 relative ps-4 pe-1 py-1 h-10 bg-gray-30/20 dark:bg-gray-40/20 outline-none focus:outline-link betterhover:hover:bg-opacity-80 pointer items-center text-start w-full text-gray-30 rounded-full align-middle text-base'>
        <svg
          width='1em'
          height='1em'
          viewBox='0 0 20 20'
          className='align-middle me-3 text-gray-30 shrink-0 group-betterhover:hover:text-gray-70'
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
        <input
          type='search'
          placeholder='Recherche rapide'
          className='w-full bg-transparent outline-none text-gray-30 placeholder-gray-500 focus:ring-0'
        />
        <span className='hidden ms-auto sm:flex item-center me-1'>
          <kbd
            className='w-10 h-5 bg-white border border-transparent me-1 bg-wash dark:bg-wash-dark text-gray-30 align-middle p-0 inline-flex justify-center items-center text-xs text-center rounded-md'
            data-platform='win'
          >
            Ctrl
          </kbd>
          <kbd className='w-5 h-5 bg-white border border-transparent me-1 bg-wash dark:bg-wash-dark text-gray-30 align-middle p-0 inline-flex justify-center items-center text-xs text-center rounded-md'>
            K
          </kbd>
        </span>
      </div>
    </div>
  );
}
