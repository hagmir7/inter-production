import React from 'react'

const Spinner = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]'></div>
    </div>
  )
}

export default Spinner
