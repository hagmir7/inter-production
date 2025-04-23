import { useState, useEffect } from 'react'
import { ChevronDown, Mail, Phone } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { api } from '../utils'

export default function Profile() {
  const [userData, setUserData] = useState({
    name: '',
    full_name: '',
    email: '',
    phone: '',
    roles: [],
  })
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('authToken')
        const url = `user/${id || ''}`
        const response = await api.get(url, {
          headers: {
            ContentType: 'application/json',
            Authorization: 'Bearer ' + token,
          },
        })

        const data = response.data;
        setRoles(data.roles);

        // Extract just the role IDs from the user's roles array
        // This assumes data.user.roles is an array of objects with an id property
        const userRoleIds = Array.isArray(data.user.roles) 
          ? data.user.roles.map(role => role.name.toString())  // Convert IDs to strings to match option values
          : [];

        setUserData({
          name: data.user.name || '',
          full_name: data.user.full_name || '',
          email: data.user.email || '',
          phone: data.user.phone || '',
          roles: userRoleIds,  // Store just the IDs
        })
      } catch (err) {
        setMessage(() => (<div className='mb-4 p-3 bg-red-100 text-red-700 rounded'>Impossible de charger les données du profil</div>));
        console.error('Erreur de chargement:', err);
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [id])

  // Gestion des changements de champs standard
  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  // Gestion spécifique pour les sélections multiples de rôles
  const handleRoleChange = (e) => {
    // Convert the HTMLCollection to an array of selected values
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    
    setUserData({
      ...userData,
      roles: selectedOptions
    });
  }

  // Gestion de l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      
      // Create a payload with role IDs in the format expected by the API
      const payload = {
        ...userData,
        // Convert role IDs back to the format expected by the API if needed
        // (modify this according to what your API expects)
      };
      
      const token = localStorage.getItem('authToken')
      const url = `user/update/${id || ''}`
      const response = await api.post(url, payload, {
        headers: {
          ContentType: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })

      setMessage(() => (<div className='mb-4 p-3 bg-green-100 text-green-700 rounded'>Profil mis à jour avec succès!</div>))
    } catch (err) {
      setMessage(() => (<div className='mb-4 p-3 bg-red-100 text-red-700 rounded'>Échec de la mise à jour du profil</div>))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-6 mx-auto bg-white overflow-hidden shadow-sm'>
      <h1 className='text-xl font-bold mb-6'>Votre compte {userData.full_name}</h1>
      {message}

      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
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
                name='roles'
                multiple
                value={userData.roles || []}
                onChange={handleRoleChange}
                className='w-full p-3 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.name.toString()}>{role.name}</option>
                ))}
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
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  )
}