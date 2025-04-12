import CModal from '../components/ui/CModal'
import React, { useRef } from 'react'
import { Stepper } from 'primereact/stepper'
import { StepperPanel } from 'primereact/stepperpanel'
import { Button } from 'primereact/button'

function FinReglage() {
  const stepperRef = useRef(null)

  return (
    <div>
      <CModal title='Fin de reglage' label='Fin de reglage'>
        <div className='card flex justify-content-center'>
          <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
            <StepperPanel>
              <div className='flex flex-column h-12rem'>
                <div className='border-2 border-dashed surface-border p-6 border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium'>
                  Content I
                </div>
              </div>
              <div className='flex pt-4 justify-between w-full'>
                <div></div>

                <button
                  className='p-3 border'
                  onClick={() => stepperRef.current.nextCallback()}
                >
                  Next
                </button>
              </div>
            </StepperPanel>

            <StepperPanel>
              <div>
                <div className='flex flex-column h-12rem'>
                  <div className='border-2 border-dashed surface-border p-6 border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium'>
                    Content II
                  </div>
                </div>

                <div className='flex pt-4 justify-between w-full'>
                  <button
                    className='p-3 border'
                    onClick={() => stepperRef.current.prevCallback()}
                  >
                    Back
                  </button>

                  <button
                    className='p-3 border'
                    onClick={() => stepperRef.current.nextCallback()}
                  >
                    Next
                  </button>
                </div>
              </div>
            </StepperPanel>

            <StepperPanel>
              <div className='flex flex-column h-12rem'>
                <div className='border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium p-6'>
                  Content III
                </div>
              </div>
              <div className='flex pt-4 justify-start'>
                <button
                  className='p-3 border'
                  onClick={() => stepperRef.current.prevCallback()}
                >
                  Back
                </button>
              </div>
            </StepperPanel>
          </Stepper>
        </div>
      </CModal>
    </div>
  )
}

export default FinReglage
