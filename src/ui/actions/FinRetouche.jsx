import CModal from '../components/ui/CModal'
import React, { useRef, useState } from 'react'
import { Stepper } from 'primereact/stepper'
import { StepperPanel } from 'primereact/stepperpanel'
import { api } from '../utils'
import { DnaOff } from 'lucide-react'

function FinRetouche() {
  const stepperRef = useRef(null)


  const [activeStep, setActiveStep] = useState(0)

  const [form, setForm] = useState({
    code_machine: '',
    code_personnel: '',
    code_of: '',
    qte_bonne: 0,
    qte_rebut: 0,
    qte_retouche: 0,
    status: false,
  })

  const [errorsMessage, setErrorsMessage] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handelSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
    setErrorsMessage([])
    setLoading(true)
    const response = await api.post('retouche/fin', form)
    if (response.data.errors) {
      setErrorsMessage(response.data.errors)
      setLoading(false)
      return
    }
    if (response.data.message) {
      setMessage(response.data.message)
    }

    setLoading(false)
  }

  return (
    <div>
      <CModal title='Fin de Retouche' label='Fin de Retouche' icon={<DnaOff />}>
        <form onSubmit={handelSubmit} className=''>
          {Object.values(errorsMessage).map((msg, index) => (
            <div key={index} className='bg-red-100 text-red-900 p-2'>
              {msg}
            </div>
          ))}
          {message && (
            <div className='bg-green-100 text-green-900 p-2'>{message}</div>
          )}

          <Stepper
            ref={stepperRef}
            // model={[
            //   { label: 'Information' },
            //   { label: 'Quantités' },
            //   { label: 'Status' },
            // ]}
            // activeIndex={activeStep}
            // onSelect={(e) => setActiveStep(e.index)}
            // className='mb-6'
            enterKeyHint='Tab'
          />

          {activeStep === 0 && (
            <div className='space-y-4'>
              <div>
                <label
                  htmlFor='code-machine'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  N° de Machine
                </label>
                <input
                  id='code-machine'
                  onChange={(e) =>
                    setForm({ ...form, code_machine: e.target.value })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Machine'
                />
              </div>

              <div>
                <label
                  htmlFor='code-personnel'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  N° Personnel
                </label>
                <input
                  id='code-personnel'
                  onChange={(e) =>
                    setForm({ ...form, code_personnel: e.target.value })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Personnel'
                />
              </div>

              <div>
                <label
                  htmlFor='code-of'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  N° d'OF/OOP
                </label>
                <input
                  id='code-of'
                  onChange={(e) =>
                    setForm({ ...form, code_of: e.target.value })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='OF/OOP'
                />
              </div>

              <div className='flex justify-end mt-4'>
                <button
                  type='button'
                  className='px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
                  onClick={() => setActiveStep(1)}
                >
                  Suivant
                </button>
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div className='space-y-4'>
              <div>
                <label
                  htmlFor='qte-bonne'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Quantite bonne
                </label>
                <input
                  id='qte-bonne'
                  type='number'
                  min={0}
                  max={1000}
                  onChange={(e) =>
                    setForm({ ...form, qte_bonne: e.target.value })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Quantite bonne'
                />
              </div>

              <div>
                <label
                  htmlFor='qte-rebut'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Quantite rebutee
                </label>
                <input
                  id='qte-rebut'
                  type='number'
                  min={0}
                  max={1000}
                  onChange={(e) =>
                    setForm({ ...form, qte_rebut: e.target.value })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Quantite rebutee'
                />
              </div>

              <div>
                <label
                  htmlFor='qte-retouche'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Quantite retouche
                </label>
                <input
                  id='qte-retouche'
                  type='number'
                  min={0}
                  max={1000}
                  onChange={(e) =>
                    setForm({ ...form, qte_retouche: e.target.value })
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Quantite retouche'
                />
              </div>

              <div className='flex justify-between mt-4'>
                <button
                  type='button'
                  className='px-3 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400'
                  onClick={() => setActiveStep(0)}
                >
                  Précédent
                </button>
                <button
                  type='button'
                  className='px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
                  onClick={() => setActiveStep(2)}
                >
                  Suivant
                </button>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className='space-y-4'>
              <div className='p-4 border rounded-md'>
                <p className='font-medium mb-4'>Type de statut</p>
                <div className='flex flex-col space-y-2'>
                  <div className='flex p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600'>
                    <div className='flex items-center h-5'>
                      <input
                        id='status-individual'
                        name='status'
                        onChange={(e) =>
                          setForm({ ...form, status: e.target.value })
                        }
                        type='radio'
                        value='0'
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                      />
                    </div>
                    <div className='ms-2 text-sm'>
                      <label htmlFor='status-individual' className='font-medium text-gray-900 dark:text-gray-300'>
                        <div>Suspendue</div>
                      </label>
                    </div>
                  </div>

                  <div className='flex p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600'>
                    <div className='flex items-center h-5'>
                      <input
                        id='status-company'
                        name='status'
                        onChange={(e) =>
                          setForm({ ...form, status: e.target.value })
                        }
                        type='radio'
                        value='1'
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                      />
                    </div>

                    <div className='ms-2 text-sm'>
                      <label htmlFor='status-company' className='font-medium text-gray-900 dark:text-gray-300'>
                        <div>Terminée</div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex justify-between mt-4'>
                <button
                  type='button'
                  className='px-3 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400'
                  onClick={() => setActiveStep(1)}
                >
                  Précédent
                </button>
                <button
                  type={loading ? 'button' : 'submit'}
                  className='px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400'
                >
                  {loading ? 'Valider...' : 'Valider'}
                </button>
              </div>
            </div>
          )}
        </form>
      </CModal>
    </div>
  )
}

export default FinRetouche;
