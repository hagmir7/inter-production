import React, { useState } from 'react'
import { Settings, X } from 'lucide-react'

export default function CModal({ children, label, title, icon, btnClass }) {
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  // Handle clicking outside the modal content to close
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <div className='font-sans'>
      <button
        onClick={openModal}
        className={
          btnClass ||
          'font-medium text-center rounded-md border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300 py-2 px-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 active:scale-95 transform cursor-pointer w-full'
        }
      >
        <div className='w-full flex justify-center'>{icon || <Settings />}</div>
        <div>{label}</div>
      </button>

      {modalIsOpen && (
        <div
          className='fixed inset-0 bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-50 p-4'
          onClick={handleOverlayClick}
        >
          <div
            className='bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative border'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold text-gray-800'>{title}</h2>
              <button
                onClick={closeModal}
                className='text-gray-500 hover:text-white focus:outline-none rounded-full p-2 cursor-pointer hover:bg-gray-400'
                aria-label='Close modal'
              >
                <X size={20} />
              </button>
            </div>

            {children}
          </div>
        </div>
      )}
    </div>
  )
}
