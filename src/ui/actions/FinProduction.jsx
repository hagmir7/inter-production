import CModal from '../components/ui/CModal'
import React, { useRef, useState } from 'react'
import { Stepper } from 'primereact/stepper'
import { StepperPanel } from 'primereact/stepperpanel'
import { api } from '../utils'

function FinProduction() {
    const stepperRef = useRef(null)


    const [form, setForm] = useState({
      code_machine: "",
      code_personnel: "",
      code_of: "",
      qte_bonne: 0,
      qte_rebut: 0,
      qte_retouche: 0,
      status: false,
    });
  
    const [errorsMessage, setErrorsMessage] = useState([]);
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
  
    const handelSubmit = async (e) => {
      setErrorsMessage([])
      setLoading(true)
      e.preventDefault();
      const response = await api.post('production/fin', form);
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
        <CModal title='Fin de Production' label='Fin de Production'>
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
                N° d'OF/OOP
              </label>
              <input
                onChange={(e) => setForm({ ...form, code_of: e.target.value })}
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                placeholder='OF/OOP'
              />
            </div>


            <div>
              <label
                htmlFor='modal-input'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Quantite bonne
              </label>
              <input
                type='number'
                min={0}
                max={1000}
                onChange={(e) => setForm({ ...form, qte_bonne: e.target.value })}
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                placeholder='Quantite bonne'
              />
            </div>

            <div>
              <label
                htmlFor='modal-input'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
               Quantite rebutee
              </label>
              <input
                type='number'
                min={0}
                max={1000}
                onChange={(e) => setForm({ ...form, qte_rebut: e.target.value })}
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                placeholder='Quantite rebutee'
              />
            </div>

            <div>
              <label
                htmlFor='modal-input'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Quantite retouche
              </label>
              <input
                type='number'
                min={0}
                max={1000}
                onChange={(e) => setForm({ ...form, qte_retouche: e.target.value })}
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                placeholder='Quantite retouche'
              />
            </div>

            
              <div className="flex">
              <div className="flex p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                <div className="flex items-center h-5">
                    <input
                      name="status"
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                      type="radio"
                      value="0"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                  </div>
                <div className="ms-2 text-sm">
                    <label htmlFor="helper-radio-1" className="font-medium text-gray-900 dark:text-gray-300">
                      <div>Individual</div>
                    </label>
                </div>
              </div>


              <div className="flex p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                <div className="flex items-center h-5">
                  <input
                    name="status"
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    type="radio"
                    value="1"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                </div>

                <div className="ms-2 text-sm">
                    <label htmlFor="helper-radio-0" className="font-medium text-gray-900 dark:text-gray-300">
                      <div>Company</div>
                    </label>
                </div>
              </div>
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

export default FinProduction
