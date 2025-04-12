import React, { useState } from 'react'
import axios from 'axios'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/register',
        formData
      )
      setMessage('✅ Utilisateur enregistré avec succès !')
    } catch (err) {
      setMessage("❌ Échec de l'enregistrement")
    }
  }

  return (
    <div className='bg-white p-8 rounded-2xl overflow-hidden w-full max-w-md mt-3'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          name='full_name'
          placeholder='Nom complet'
          value={formData.full_name}
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-indigo-300'
          required
        />
        <input
          type='text'
          name='name'
          placeholder='Nom d’utilisateur'
          value={formData.name}
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-indigo-300'
          required
        />
        <input
          type='email'
          name='email'
          placeholder='Adresse e-mail'
          value={formData.email}
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-indigo-300'
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Mot de passe'
          value={formData.password}
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-indigo-300'
          required
        />
        <input
          type='password'
          name='password_confirmation'
          placeholder='Confirmer le mot de passe'
          value={formData.password_confirmation}
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-indigo-300'
          required
        />
        <button
          type='submit'
          className='w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition'
        >
          S'inscrire
        </button>
      </form>
      {message && (
        <p className='mt-4 text-center text-sm text-red-500'>{message}</p>
      )}
    </div>
  )
}

export default RegisterForm
