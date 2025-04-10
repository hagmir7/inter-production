import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setErrorMessage('') // Reset error message

    try {
        const user = await window.electron.loginUser(formData)
        console.log(user)
      
      // Assuming the response contains a JWT token
      const { token } = user

      // Save the token (can also store in sessionStorage or cookies based on preference)
      localStorage.setItem('authToken', token)

      // Redirect or update UI after successful login
    //   window.location.href = '/dashboard' // Example: redirect to dashboard
    } catch (error) {
      console.error(
        'Login failed:',
        error.response ? error.response.data : error.message
      )
      setErrorMessage('❌ Invalid username/email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center bg-gray-100 px-4'>
      <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md my-3'>
        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-bold text-gray-900'>Login</h2>
        </div>

        {errorMessage && (
          <div
            className='p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg'
            role='alert'
          >
            {errorMessage}
          </div>
        )}

        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='identifier'
                className='block text-sm font-medium text-gray-700'
              >
                Username or Email
              </label>
              <input
                type='text'
                id='identifier'
                name='identifier'
                value={formData.identifier}
                onChange={handleChange}
                required
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              disabled={loading}
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
