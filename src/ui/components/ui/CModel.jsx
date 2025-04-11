import React, {useState} from 'react';
import { X } from 'lucide-react';

export default function CModal({children, label, title}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // Handle clicking outside the modal content to close
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  return (
    <div className="font-sans">
      <button 
        onClick={openModal}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        { label }
      </button>
      
      {modalIsOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-50 p-4" onClick={handleOverlayClick}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative border" onClick={e => e.stopPropagation()} >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-white focus:outline-none rounded-full p-2 cursor-pointer hover:bg-gray-400"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            { children }
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}