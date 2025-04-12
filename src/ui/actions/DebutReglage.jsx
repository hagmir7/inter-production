import React from 'react'
import CModal from '../components/ui/CModal'
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
        

function DebutReglage() {
  return (
    <div>
      <CModal title='Début de reglage' label='Début de reglage'>
        <form className='space-y-4'>
          <div>
            <label
              htmlFor='modal-input'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              N° de Machine
            </label>
            <input
              id='modal-input'
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Machine'
            />
          </div>

          <div>
            <label
              htmlFor='modal-input'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              N° de Badge
            </label>
            <input
              id='modal-input'
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Badge'
            />
          </div>

          <div>
            <label
              htmlFor='modal-input'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              N° d'OF/OOP
            </label>
            <input
              id='modal-input'
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              placeholder='OF/OOP'
            />
          </div>

          <button
            type='button'
            className='px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 w-full'
          >
            Valider
          </button>
        </form>
      </CModal>
    </div>
  )
}

export default DebutReglage
