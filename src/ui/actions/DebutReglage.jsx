// pages/DebutReglage.jsx
import React, { useState } from 'react'
import CModal from '../components/ui/CModal'
import { api } from '../utils'
import InputField from '../components/ui/InputField'
import { Route } from 'lucide-react'

function DebutReglage() {
  const [form, setForm] = useState({
    code_machine: '',
    code_personnel: '',
    code_of: '',
  })

  const [errorsMessage, setErrorsMessage] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    setErrorsMessage([])
    setLoading(true)
    e.preventDefault()
    const response = await api.post('reglage/debut', form)
    if (response.data.errors) {
      setErrorsMessage(response.data.errors)
      setLoading(false)
      return
    }
    setLoading(false)
  }

  return (
    <div>
      <CModal title='Début de reglage' label='Début de reglage' icon={<Route />}>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {errorsMessage.length > 0 && (
            <div className='bg-red-100 text-red-900 p-3 rounded-md'>
              {errorsMessage.map((msg, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='30'
                    height='30'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <circle cx='12' cy='12' r='10'></circle>
                    <line x1='12' y1='8' x2='12' y2='12'></line>
                    <line x1='12' y1='16' x2='12.01' y2='16'></line>
                  </svg>
                  {msg}
                </div>
              ))}
            </div>
          )}

          <InputField
            value={form.code_machine}
            onChange={(e) => setForm({ ...form, code_machine: e.target.value })}
            onScan={(value) => setForm({ ...form, code_machine: value })}
            label='N° de Machine'
            placeholder='N° de Machine'
          />

          <InputField
            value={form.code_personnel}
            onChange={(e) => setForm({ ...form, code_personnel: e.target.value })}
            onScan={(value) => setForm({ ...form, code_personnel: value })}
            label='N° de Badge'
            placeholder='N° de Badge'
          />

          <InputField
            value={form.code_of}
            onChange={(e) => setForm({ ...form, code_of: e.target.value })}
            onScan={(value) => setForm({ ...form, code_of: value })}
            label='Code de fabrication'
            placeholder='Code OF'
          />

          <button
            type='submit'
            disabled={loading}
            className={`px-4 py-3 rounded-md w-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
            }`}
          >
            {loading ? (
              <span className='flex items-center justify-center gap-2'>
                <svg
                  className='animate-spin h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Traitement...
              </span>
            ) : (
              'Valider'
            )}
          </button>
        </form>
      </CModal>
    </div>
  )
}

export default DebutReglage
