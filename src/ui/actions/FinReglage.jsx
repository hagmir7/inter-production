import CModal from '../components/ui/CModal'
import React, { useState } from 'react';
import { api } from "../utils";
import { RouteOff } from 'lucide-react';


function FinReglage() {

  const [form, setForm] = useState({
    code_machine: "",
    code_of: ""
  });

  const [errorsMessage, setErrorsMessage] = useState([]);
  const [loading, setLoading] = useState(false)

  const handelSubmit = async (e) => {
    setErrorsMessage([])
    setLoading(true)
    e.preventDefault();
    
    const response = await api.post('reglage/fin', form);

    if(response.statusText !== 'ok') {setLoading(false)}
    
    if (response.data.errors) {
      setErrorsMessage(response.data.errors)
      setLoading(false);
      return;
    }

    setLoading(false)
  }

  return (
    <div>
      <CModal title='Fin de reglage' label='Fin de reglage' icon={<RouteOff />}>
      <form onSubmit={handelSubmit} className='space-y-4'>
          {Object.values(errorsMessage).map((msg, index) => (
            <div key={index} className='bg-red-100 text-red-900 p-2'>
              {msg}
            </div>
          ))}
          <div>
            <label
              htmlFor='modal-input'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              N° de Machine
            </label>
            <input
              onChange={(e)=> setForm({...form, code_machine: e.target.value})}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Machine'
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
              onChange={(e)=> setForm({...form, code_of: e.target.value})}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              placeholder='OF/OOP'
            />
          </div>

          <button
            type={loading ? "button" : "submit"}
            className='px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 w-full'
          >
            { loading ? "Valider..." : "Valider"}
          </button>
        </form>
      </CModal>
    </div>
  )
}

export default FinReglage
