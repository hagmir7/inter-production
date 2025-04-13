import { useEffect, useState } from 'react'
import { Search, Clock, Plus } from 'lucide-react'
import CModal from '../components/ui/CModal'
import RegisterForm from './Register'
import axios from 'axios'
import Spinner from '../components/ui/Spinner'
import { Link } from 'react-router-dom'

export default function User() {
  const [showDropdown, setShowDropdown] = useState(false)
  const [timeFilter, setTimeFilter] = useState('Last 30 days')
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get('http://localhost:8000/api/users')
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const handleFilterChange = (filter) => {
    setTimeFilter(filter)
    setShowDropdown(false)
  }

  return (
    <div className='relative overflow-x-auto shadow-sm sm:rounded-lg'>
      <div className='flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between p-4 bg-gray-200'>
        <div className='relative'>
          <div className='flex'>
            <button
              onClick={toggleDropdown}
              className='inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
              type='button'
            >
              <Clock className='w-3 h-3 text-gray-500 dark:text-gray-400 mr-3' />
              {timeFilter}
              <svg
                className='w-2.5 h-2.5 ml-2.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 10 6'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 1 4 4 4-4'
                />
              </svg>
            </button>

            <CModal
              label='Ajouter'
              title='Ajouter un utilisatuer'
              icon={
                <Plus className='w-3 h-3 text-gray-500 dark:text-gray-400 mr-3' />
              }
              btnClass='ms-3 inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
            >
              <RegisterForm />
            </CModal>
          </div>

          {showDropdown && (
            <div className='absolute z-10 mt-1 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600'>
              <ul className='p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200'>
                {[
                  'Last day',
                  'Last 7 days',
                  'Last 30 days',
                  'Last month',
                  'Last year',
                ].map((filter) => (
                  <li key={filter}>
                    <div className='flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600'>
                      <input
                        id={`filter-radio-${filter}`}
                        type='radio'
                        checked={timeFilter === filter}
                        onChange={() => handleFilterChange(filter)}
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      />
                      <label
                        htmlFor={`filter-radio-${filter}`}
                        className='w-full ml-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300'
                      >
                        {filter}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className='relative'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <Search className='w-5 h-5 text-gray-500 dark:text-gray-400' />
          </div>
          <input
            type='text'
            className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Search for items'
          />
        </div>
      </div>

      {/* ✅ Loading spinner or message */}
      {isLoading ? (
        <div className='text-center p-4 text-gray-600 dark:text-gray-300'>
         <Spinner />
        </div>
      ) : (
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='p-4'>
                <div className='flex items-center'>
                  <input
                    id='checkbox-all-search'
                    type='checkbox'
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label htmlFor='checkbox-all-search' className='sr-only'>
                    checkbox
                  </label>
                </div>
              </th>
              <th scope='col' className='px-6 py-3 font-bold'>
                Nom et prénom
              </th>
              <th scope='col' className='px-6 py-3 font-bold'>
                Code (Username)
              </th>
              <th scope='col' className='px-6 py-3 font-bold'>
                Email
              </th>
              <th scope='col' className='px-6 py-3 font-bold'>
                Phone
              </th>
              <th scope='col' className='px-6 py-3 font-bold'>
                Créé le
              </th>
              <th scope='col' className='px-6 py-3 font-bold'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
              >
                <td className='w-4 p-4'>
                  <div className='flex items-center'>
                    <input
                      id={`checkbox-table-search-${user.id}`}
                      type='checkbox'
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label
                      htmlFor={`checkbox-table-search-${user.id}`}
                      className='sr-only'
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {user.full_name}
                </th>
                <td className='px-6 py-4'>{user.name}</td>
                <td className='px-6 py-4'>{user.email}</td>
                <td className='px-6 py-4'>{user.phone || '__'}</td>
                <td className='px-6 py-4'>
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className='px-6 py-4'>
                  <Link
                    to={`/profile/${user.id}`}
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
