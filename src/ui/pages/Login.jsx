import React, { useState } from 'react'

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: 'admin',
    password: 'password',
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
      
      // Assuming the response contains a JWT token
      const { token } = user

      // Save the token
      localStorage.setItem('authToken', token)

    } catch (error) {
      console.error(
        'Login failed:',
        error.response ? error.response.data : error.message
      )
      setErrorMessage("Nom d'utilisateur/e-mail ou mot de passe invalide.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md">
        {/* Card with subtle shadow and rounded corners */}
        <div className="bg-white overflow-hidden border border-gray-100">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
            <h2 className="text-3xl font-bold text-center">Connexion</h2>
            <p className="text-center mt-1 text-red-100 text-sm">Veuillez vous connecter pour continuer</p>
          </div>
          
          <div className="p-6">
            {/* Error message with icon */}
            {errorMessage && (
              <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded flex items-center" role="alert">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z" clipRule="evenodd" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom d'utilisateur ou e-mail
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="identifier"
                      name="identifier"
                      value={formData.identifier}
                      onChange={handleChange}
                      required
                      className="pl-10 block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 text-gray-900 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="pl-10 block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 text-gray-900 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-gray-700">
                    Rester connecté
                  </label>
                </div>
                <div>
                  <a href="#" className="font-medium text-red-600 hover:text-red-500">
                    Mot de passe oublié?
                  </a>
                </div>
              </div> */}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3 px-4 bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
      </div>
    </div>
  )
}

export default Login