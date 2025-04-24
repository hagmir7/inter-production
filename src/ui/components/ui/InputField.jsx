import React from 'react'
import QScanner from '../QScanner'


const InputField = ({ value, onChange, onScan, label, placeholder }) => {
  return (
    <div className='bg-white p-4 rounded-md shadow-sm border border-gray-200'>
      <label className='block text-sm font-medium text-gray-700 mb-1'>
        {label}
      </label>
      <div className='relative w-full'>
        <input
          value={value}
          onChange={onChange}
          className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          placeholder={placeholder}
        />
        <div className='absolute inset-y-0 right-0 flex items-center pr-3 z-50'>
          <QScanner onScan={onScan} />
        </div>
      </div>
    </div>
  )
}

export default InputField
