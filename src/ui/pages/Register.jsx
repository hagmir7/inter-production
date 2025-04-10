import React, { useState } from 'react'
import axios from 'axios'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
  })

  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
    //   const response = await axios.post(
    //     'http://localhost:3000/api/users/register',
    //     formData
    //   )

      await window.electron.registerUser(formData);
    //   setMessage('✅ User registered successfully!')
    //   console.log('Registered user:', response.data)
    } catch (err) {
      setMessage(
        '❌ Registration failed: '
      )
    }
  }

  return (
    <div className='flex justify-center items-center bg-gray-100 px-4'>
      <div className='bg-white p-8 rounded-2xl overflow-hidden shadow-md w-full max-w-md mt-3'>
        <h2 className='text-2xl font-bold mb-6 text-center'>
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='text'
            name='full_name'
            placeholder='Full Name'
            value={formData.full_name}
            onChange={handleChange}
            className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-indigo-300'
            required
          />
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
            className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-indigo-300'
            required
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-indigo-300'
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-indigo-300'
            required
          />
          <button
            type='submit'
            className='w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition'
          >
            Register
          </button>
        </form>
        {message && (
          <p className='mt-4 text-center text-sm text-red-500'>{message}</p>
        )}
      </div>
    </div>
  )
}

export default RegisterForm
