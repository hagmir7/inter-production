import { useState, useEffect } from 'react'
import { ChevronDown, Mail, Phone } from 'lucide-react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Profile() {
  const [userData, setUserData] = useState({
    name: '',
    full_name: '',
    email: '',
    phone: '',
    role: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('authToken')
        const url = `http://localhost:8000/api/user/${id || ''}`
        const response = await axios.get(url, {
          headers: {
            ContentType: 'application/json',
            Authorization: 'Bearer ' + token,
          },
        })
        

        // if (!response.ok) {
        //   throw new Error('Erreur lors de la récupération des données')
        // }

        setUserData({
          name: response.data.name || '',
          full_name: response.data.full_name || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
          //   role: response.data.role || '',
        })
      } catch (err) {
        setError('Impossible de charger les données du profil')
        console.error('Erreur de chargement:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [id])

  // Gestion des changements de champs
  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  // Gestion de l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      // Remplacer l'URL par votre endpoint API réel
      const token = localStorage.getItem('authToken')
      const response = await axios.get('http://localhost:8000/user', {
        headers: {
          ContentType: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du profil')
      }

      alert('Profil mis à jour avec succès!')
    } catch (err) {
      setError('Échec de la mise à jour du profil')
      console.error('Erreur de mise à jour:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading && !userData.name) {
    return <div className='p-6 text-center'>Chargement...</div>
  }

  if (error && !userData.name) {
    return <div className='p-6 text-center text-red-500'>{error}</div>
  }

  return (
    <div className='p-6 mx-auto bg-white overflow-hidden shadow-sm'>
      <h1 className='text-xl font-bold mb-6'>Votre compte {id}</h1>

      {error && (
        <div className='mb-4 p-3 bg-red-100 text-red-700 rounded'>{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className='block mb-2 font-medium'>
              Nom d'utilisateur<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='name'
              value={userData.name}
              onChange={handleChange}
              placeholder='Ex. BonnieG'
              className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label className='block mb-2 font-medium'>
              Nom complet<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='full_name'
              value={userData.full_name}
              onChange={handleChange}
              placeholder='Ex. Bonnie Green'
              className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label className='block mb-2 font-medium'>
              Votre email<span className='text-red-500'>*</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500'>
                <Mail size={18} />
              </div>
              <input
                type='email'
                name='email'
                value={userData.email}
                onChange={handleChange}
                placeholder='nom@exemple.com'
                className='w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
            </div>
          </div>

          <div>
            <label className='block mb-2 font-medium'>
              Numéro de téléphone
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500'>
                <Phone size={18} />
              </div>
              <input
                type='tel'
                name='phone'
                value={userData.phone}
                onChange={handleChange}
                placeholder='01-23-45-67-89'
                className='w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>

          <div>
            <div className='flex items-center mb-2'>
              <label className='font-medium'>Rôle</label>
              <div className='ml-1 text-gray-500 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center text-xs'>
                ?
              </div>
            </div>
            <div className='relative'>
              <select
                name='role'
                value={userData.role}
                onChange={handleChange}
                className='w-full p-3 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value=''>Choisissez le rôle</option>
                <option value='admin'>Administrateur</option>
                <option value='operator'>Opérateur</option>
                <option value='developer'>Développeur</option>
              </select>
              <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500'>
                <ChevronDown size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 flex justify-end'>
          <button
            type='submit'
            disabled={loading}
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300'
          >
            {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </div>
      </form>
    </div>
  )
}
