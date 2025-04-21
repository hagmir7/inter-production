import axios from 'axios'
import React, {useEffect, useState } from 'react'
import Alert from '../components/ui/Alert'
import {useAuth} from '../contexts/AuthContext'
import { useNavigate } from 'react-router'

const Login = () => {


  const [formData, setFormData] = useState({
    login: 'admin',
    password: 'password',
  })


  const navigate = useNavigate()

  const {login, loading, message} = useAuth()

  useEffect(() => {
    checkAuth()
  }, [])



  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }


  const handleSubmite = (e) => {
    e.preventDefault();
    const user = { login: formData.login, password: formData.password };
    login(user);
    console.log("Login successfully");
  }

 

  const checkAuth = async () => {
    const access_token = localStorage.getItem('authToken') || false

    if (access_token) {
      const response = await axios.get('http://127.0.0.1:8000/api/user', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })

      if (!response?.data?.access_token) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }

      if (window.electron) {
        await window.electron.loginUser({ user: response.data, access_token })
      } else {
        return navigate('/')
      }
    }
  }

  return (
<div className="bg-gradient-to-br md:h-screen md:w-full from-gray-100 via-red-50 to-red-200 flex justify-center items-center p-6">
  <div className="w-full max-w-md p-8 transform transition-all">
    <div className="text-center mb-8">
        <img
          className="h-20 mx-auto mb-4"
          src="https://intercocina.com/assets/imgs/intercocina-logo.png"
          alt="Wikybook"
          loading="lazy"
        />
      <h2 className="text-2xl font-bold text-gray-800">
        Connectez-vous
      </h2>
    </div>

    {message && (
      <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{message}</p>
          </div>
        </div>
      </div>
    )}

    <form onSubmit={handleSubmite} className="space-y-6">
      <div className="space-y-5">
        <div>
          <label
            htmlFor="login"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nom d'utilisateur ou e-mail
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="login"
              name="login"
              value={formData.login}
              onChange={handleChange}
              required
              className="pl-12 block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 text-gray-900 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all duration-200"
              placeholder="Entrez votre identifiant"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Mot de passe
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="pl-12 block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 text-gray-900 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all duration-200"
              placeholder="Entrez votre mot de passe"
            />
          </div>
        </div>
      </div>
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center py-3 px-4 bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              Connexion...
            </>
          ) : (
            'Se connecter'
          )}
        </button>
      </div>
    </form>
  </div>
</div>
  )
}

export default Login
