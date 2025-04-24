import React, { useState, useEffect, useRef } from 'react'
import { Settings, X } from 'lucide-react'

export default function CModal({ children, label, title, icon, btnClass }) {
  const [modalIsOpen, setIsOpen] = useState(false)
  const closeButtonRef = useRef(null)

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal()
    }

    if (modalIsOpen) {
      document.body.classList.add('overflow-hidden')
      document.addEventListener('keydown', handleKeyDown)
      closeButtonRef.current?.focus()
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [modalIsOpen])

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) closeModal()
  }

  return (
    <div className='font-sans relative'>
      <button
        onClick={openModal}
        type='button'
        className={
          btnClass ||
          `p-3  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 text-nowrap dark:border-gray-700 w-full cursor-pointer hover:bg-red-100 hover:text-red-700 hover:border-red-500`
        }
      >
        {icon && (
          <div className='shrink-0 flex justify-center mb-1'>
            {typeof icon === 'function' ? icon() : icon}
          </div>
        )}
        <div>{label}</div>
      </button>

      {modalIsOpen && (
        <div
          className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 md:p-4 p-0'
          onClick={handleOverlayClick}
        >
          <div
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-title'
            className='bg-white md:rounded-lg shadow-xl md:w-full md:h-auto md:max-w-lg p-6 relative border
            max-w-none rounded-none h-screen sm:m-0 w-full overflow-y-auto'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between items-center mb-3'>
              <h2 id='modal-title' className='text-xl font-bold text-gray-900'>
                {title}
              </h2>
              <button
                ref={closeButtonRef}
                onClick={closeModal}
                className='text-gray-500 hover:text-gray-700 focus:outline-none
                focus:ring-2 focus:ring-gray-300 rounded-full p-2 hover:bg-gray-100
                transition-colors duration-200 sm:p-3'
                aria-label='Close modal'
              >
                <X size={24} className='sm:w-6 sm:h-6' />
              </button>
            </div>

            <div className='space-y-4'>{children}</div>
          </div>
        </div>
      )}
    </div>
  )
}
