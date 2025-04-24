import CModal from '../components/ui/CModal'
import React, { useRef, useState } from 'react'
import { Stepper } from 'primereact/stepper'
import { StepperPanel } from 'primereact/stepperpanel'
import { api } from "../utils";
import { RefreshCcw } from 'lucide-react';

function DebutProduction() {
  const stepperRef = useRef(null)
  const [form, setForm] = useState({
    code_machine: "",
    code_personnel: "",
    code_of: ""
  });

  const [errorsMessage, setErrorsMessage] = useState([]);
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handelSubmit = async (e) => {
    setErrorsMessage([])
    setMessage(null)
    setLoading(true)
    e.preventDefault();
    const response = await api.post('production/debut', form);
    if (response.data.errors) {
      setErrorsMessage(response.data.errors)
      setLoading(false);
      return;
    }
    if(response.data.message){
      setMessage(response.data.message)
    }

    setLoading(false)
  }

  return (
    <div>
      <CModal title='Début de Production' label='Début de Production' icon={<RefreshCcw />}>
        <form onSubmit={handelSubmit} className='space-y-4'>
          {Object.values(errorsMessage).map((msg, index) => (
            <div key={index} className='bg-red-100 text-red-900 p-2'>
              {msg}
            </div>
          ))}
          { message &&
            <div className='bg-green-100 text-green-900 p-2'>
              {message}
            </div>
          }
          <div>
            <label
              htmlFor='modal-input'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              N° de Machine
            </label>
            <input
              onChange={(e) => setForm({ ...form, code_machine: e.target.value })}
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
              onChange={(e) => setForm({ ...form, code_personnel: e.target.value })}
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
              onChange={(e) => setForm({ ...form, code_of: e.target.value })}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              placeholder='OF/OOP'
            />
          </div>

          <button
            type={loading ? "button" : "submit"}
            className='px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 w-full'
          >
            {loading ? "Valider..." : "Valider"}
          </button>
        </form>
      </CModal>
    </div>
  )
}

export default DebutProduction
