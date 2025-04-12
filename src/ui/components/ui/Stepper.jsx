import React, { useState } from 'react'

// Step component to wrap content for each step
export const Step = ({ children }) => {
  return <div className='step-content'>{children}</div>
}

// Stepper component that can be customized and reused
export function MultiStepForm({
  steps,
  initialData = {},
  onSubmit,
  submitButtonText = 'Submit',
  nextButtonText = 'Next',
  prevButtonText = 'Previous',
  showProgressBar = true,
}) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(initialData)

  // Total number of steps
  const totalSteps = steps.length

  // Update form data
  const updateFormData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }))
  }

  // Navigate to next step
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    }
  }

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white rounded shadow'>
      {/* Progress bar */}
      {showProgressBar && (
        <div className='mb-8'>
          <div className='flex justify-between mb-2'>
            {steps.map((step, index) => (
              <div key={index} className='text-sm font-medium'>
                <span
                  className={`${
                    currentStep > index + 1 || currentStep === index + 1
                      ? 'text-blue-600'
                      : 'text-gray-400'
                  }`}
                >
                  {step.title || `Step ${index + 1}`}
                </span>
              </div>
            ))}
          </div>
          <div className='relative mt-2'>
            <div className='absolute top-0 h-1 w-full bg-gray-200 rounded-full'></div>
            <div
              className='absolute top-0 h-1 bg-blue-500 rounded-full transition-all'
              style={{
                width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Form Steps */}
      <form onSubmit={handleSubmit}>
        {/* Display current step content */}
        {steps.map(
          (step, index) =>
            currentStep === index + 1 && (
              <div key={index} className='space-y-4'>
                {step.title && (
                  <h2 className='text-xl font-semibold mb-4'>{step.title}</h2>
                )}
                {step.content({ formData, updateFormData })}
              </div>
            )
        )}

        {/* Navigation Buttons */}
        <div className='flex justify-between mt-8'>
          <button
            type='button'
            onClick={prevStep}
            className={`px-6 py-2 rounded font-medium ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            disabled={currentStep === 1}
          >
            {prevButtonText}
          </button>

          {currentStep < totalSteps ? (
            <button
              type='button'
              onClick={nextStep}
              className='px-6 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600'
            >
              {nextButtonText}
            </button>
          ) : (
            <button
              type='submit'
              className='px-6 py-2 bg-green-500 text-white rounded font-medium hover:bg-green-600'
            >
              {submitButtonText}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}


export function RegistrationForm() {
  const initialFormData = {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
    },
    addressInfo: {
      street: '',
      city: '',
      zipCode: '',
    },
    accountInfo: {
      username: '',
      password: '',
    },
  }

  const handleSubmit = (formData) => {
    alert('Form submitted successfully!\n' + JSON.stringify(formData, null, 2))
  }

  const steps = [
    {
      title: 'Personal Information',
      content: ({ formData, updateFormData }) => (
        <div className='space-y-4'>
          <div>
            <label className='block text-gray-700 mb-1'>First Name</label>
            <input
              type='text'
              value={formData.personalInfo?.firstName || ''}
              onChange={(e) =>
                updateFormData({
                  personalInfo: {
                    ...formData.personalInfo,
                    firstName: e.target.value,
                  },
                })
              }
              className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label className='block text-gray-700 mb-1'>Last Name</label>
            <input
              type='text'
              value={formData.personalInfo?.lastName || ''}
              onChange={(e) =>
                updateFormData({
                  personalInfo: {
                    ...formData.personalInfo,
                    lastName: e.target.value,
                  },
                })
              }
              className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label className='block text-gray-700 mb-1'>Email</label>
            <input
              type='email'
              value={formData.personalInfo?.email || ''}
              onChange={(e) =>
                updateFormData({
                  personalInfo: {
                    ...formData.personalInfo,
                    email: e.target.value,
                  },
                })
              }
              className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Address Information',
      content: ({ formData, updateFormData }) => (
        <div className='space-y-4'>
          <div>
            <label className='block text-gray-700 mb-1'>Street Address</label>
            <input
              type='text'
              value={formData.addressInfo?.street || ''}
              onChange={(e) =>
                updateFormData({
                  addressInfo: {
                    ...formData.addressInfo,
                    street: e.target.value,
                  },
                })
              }
              className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label className='block text-gray-700 mb-1'>City</label>
            <input
              type='text'
              value={formData.addressInfo?.city || ''}
              onChange={(e) =>
                updateFormData({
                  addressInfo: {
                    ...formData.addressInfo,
                    city: e.target.value,
                  },
                })
              }
              className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label className='block text-gray-700 mb-1'>Zip Code</label>
            <input
              type='text'
              value={formData.addressInfo?.zipCode || ''}
              onChange={(e) =>
                updateFormData({
                  addressInfo: {
                    ...formData.addressInfo,
                    zipCode: e.target.value,
                  },
                })
              }
              className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Account Information',
      content: ({ formData, updateFormData }) => (
        <div className='space-y-4'>
          <div>
            <label className='block text-gray-700 mb-1'>Username</label>
            <input
              type='text'
              value={formData.accountInfo?.username || ''}
              onChange={(e) =>
                updateFormData({
                  accountInfo: {
                    ...formData.accountInfo,
                    username: e.target.value,
                  },
                })
              }
              className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label className='block text-gray-700 mb-1'>Password</label>
            <input
              type='password'
              value={formData.accountInfo?.password || ''}
              onChange={(e) =>
                updateFormData({
                  accountInfo: {
                    ...formData.accountInfo,
                    password: e.target.value,
                  },
                })
              }
              className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
        </div>
      ),
    },
  ]

  return (
    <MultiStepForm
      steps={steps}
      initialData={initialFormData}
      onSubmit={handleSubmit}
      submitButtonText='Complete Registration'
    />
  )
}

export function CheckoutForm() {
  const initialFormData = {
    shippingInfo: {
      name: '',
      address: '',
      phone: '',
    },
    paymentInfo: {
      cardNumber: '',
      expiry: '',
      cvv: '',
    },
  }

  const handleSubmit = (formData) => {
    alert('Order placed successfully!\n' + JSON.stringify(formData, null, 2))
  }

  const steps = [
    {
      title: 'Shipping Information',
      content: ({ formData, updateFormData }) => (
        <div className='space-y-4'>
          <div>
            <label className='block text-gray-700 mb-1'>Full Name</label>
            <input
              type='text'
              value={formData.shippingInfo?.name || ''}
              onChange={(e) =>
                updateFormData({
                  shippingInfo: {
                    ...formData.shippingInfo,
                    name: e.target.value,
                  },
                })
              }
              className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label className='block text-gray-700 mb-1'>Shipping Address</label>
            <textarea
              value={formData.shippingInfo?.address || ''}
              onChange={(e) =>
                updateFormData({
                  shippingInfo: {
                    ...formData.shippingInfo,
                    address: e.target.value,
                  },
                })
              }
              className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
              rows={3}
            />
          </div>
          <div>
            <label className='block text-gray-700 mb-1'>Phone Number</label>
            <input
              type='tel'
              value={formData.shippingInfo?.phone || ''}
              onChange={(e) =>
                updateFormData({
                  shippingInfo: {
                    ...formData.shippingInfo,
                    phone: e.target.value,
                  },
                })
              }
              className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Payment Information',
      content: ({ formData, updateFormData }) => (
        <div className='space-y-4'>
          <div>
            <label className='block text-gray-700 mb-1'>Card Number</label>
            <input
              type='text'
              value={formData.paymentInfo?.cardNumber || ''}
              onChange={(e) =>
                updateFormData({
                  paymentInfo: {
                    ...formData.paymentInfo,
                    cardNumber: e.target.value,
                  },
                })
              }
              className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
              placeholder='1234 5678 9012 3456'
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-700 mb-1'>Expiry Date</label>
              <input
                type='text'
                value={formData.paymentInfo?.expiry || ''}
                onChange={(e) =>
                  updateFormData({
                    paymentInfo: {
                      ...formData.paymentInfo,
                      expiry: e.target.value,
                    },
                  })
                }
                className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
                placeholder='MM/YY'
              />
            </div>
            <div>
              <label className='block text-gray-700 mb-1'>CVV</label>
              <input
                type='text'
                value={formData.paymentInfo?.cvv || ''}
                onChange={(e) =>
                  updateFormData({
                    paymentInfo: {
                      ...formData.paymentInfo,
                      cvv: e.target.value,
                    },
                  })
                }
                className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
                placeholder='123'
              />
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <MultiStepForm
      steps={steps}
      initialData={initialFormData}
      onSubmit={handleSubmit}
      submitButtonText='Place Order'
      nextButtonText='Continue'
    />
  )
}