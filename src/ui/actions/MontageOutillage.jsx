import CModal from '../components/ui/CModal'
import React, { useRef, useState } from 'react'
import { Stepper } from 'primereact/stepper'
import { StepperPanel } from 'primereact/stepperpanel'
import { Webhook, AlertCircle, ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { api } from '../utils'
import InputField from '../components/ui/InputField'

function MontageOutillage() {
  const stepperRef = useRef(null)

  const [form, setForm] = useState({
    code_machine: '',
    code_personnel: '',
    code_outillage: ''
  })

  const [errorsMessage, setErrorsMessage] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorsMessage([])
    setLoading(true)

    try {
      const response = await api.post('outillage/debut', form)


      if (response.data.errors) {
        console.log(response.data.errors);

        setErrorsMessage(response.data.errors)
        setTimeout(()=>{
          setErrorsMessage([])
        }, 5000)
      } else {
        // Handle success case
      }
    } catch (error) {
      setErrorsMessage(['Une erreur est survenue lors de la communication avec le serveur.'])
      setTimeout(()=>{
        setErrorsMessage([])
      }, 5000)
    } finally {
      setLoading(false)
    }
  }

  const inputLabels = {
    code_machine: 'N° de Machine',
    code_personnel: 'N° de Personnel',
    code_outillage: 'N° d\'Outillage'
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <div>
      <CModal title="Montage Outillage" label="Montage Outillage" icon={<Webhook />}>
        <form onSubmit={handleSubmit} className="card max-w-4xl mx-auto" onKeyDown={handleKeyDown}>
          {Object.values(errorsMessage).map((msg, index) => (
            <div key={index} className='bg-red-100 text-red-900 p-2'>
              {msg}
            </div>
          ))}
          <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }} className="mb-6">
            <StepperPanel header="Machine">
              <div className="flex flex-col h-64">
                <div className="w-full max-w-md">
                  <InputField
                    value={form.code_machine}
                    onChange={(e) => setForm({ ...form, code_machine: e.target.value })}
                    onScan={(value) => {
                      setForm({ ...form, code_machine: value })
                      setTimeout(() => stepperRef.current?.nextCallback(), 500)
                    }}
                    label={inputLabels.code_machine}
                    placeholder="Code de machine"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex pt-4 justify-between w-full">
                <div></div>
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    stepperRef.current?.nextCallback()
                  }}
                >
                  Suivant <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </StepperPanel>

            <StepperPanel header="Personnel">
              <div className="flex flex-col h-64">
                <div className="w-full max-w-md">
                  <InputField
                    value={form.code_personnel}
                    onChange={(e) => setForm({ ...form, code_personnel: e.target.value })}
                    onScan={(value) => {
                      setForm({ ...form, code_personnel: value })
                      setTimeout(() => stepperRef.current?.nextCallback(), 500)
                    }}
                    label={inputLabels.code_personnel}
                    placeholder="Code personnel"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex pt-4 justify-end w-full">

                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    stepperRef.current?.nextCallback()
                  }}
                >
                  Suivant <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </StepperPanel>

            <StepperPanel header="Outillage">
              <div className="flex flex-col h-64">
                <div className="w-full max-w-md">
                  <InputField
                    value={form.code_outillage}
                    onChange={(e) => setForm({ ...form, code_outillage: e.target.value })}
                    onScan={(value) => setForm({ ...form, code_outillage: value })}
                    label={inputLabels.code_outillage}
                    placeholder="Code d'outillage"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex pt-4 justify-end w-full">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 rounded-md flex items-center gap-2 transition-colors ${loading
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Traitement...
                    </>
                  ) : (
                    <>
                      <Check className="h-5 w-5" /> Valider
                    </>
                  )}
                </button>
              </div>
            </StepperPanel>
          </Stepper>
        </form>
      </CModal>
    </div>
  )
}

export default MontageOutillage;