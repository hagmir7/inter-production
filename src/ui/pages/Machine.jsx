import { useEffect, useState } from 'react';
import { Search, Clock, Plus } from 'lucide-react';
import { api } from '../utils';

export default function Machine() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [timeFilter, setTimeFilter] = useState('Last 30 days');

  const [data, setData] = useState([]);


  useEffect(() => {
    getData();
  }, []);



  const getData = async () => {
    const response = await api.get('/machines');
    setData(response.data);
  }


  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleFilterChange = (filter) => {
    setTimeFilter(filter);
    setShowDropdown(false);
  };

  return (
    <div className='relative overflow-x-auto shadow-sm sm:rounded-lg'>
      <div className='flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between p-4 bg-gray-200'>
        <div className='relative'>
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

          <button
            className='ms-3 inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
            type='button'
          >
            <Plus className='w-3 h-3 text-gray-500 dark:text-gray-400 mr-3' />
            Ajouter
          </button>

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
            <th scope='col' className='px-6 py-3'>
              Code
            </th>
            <th scope='col' className='px-6 py-3'>
              Machine
            </th>
            <th scope='col' className='px-6 py-3'>
              Coluer
            </th>
            <th scope='col' className='px-6 py-3'>
              Etat
            </th>
            <th scope='col' className='px-6 py-3'>
              Zone
            </th>
            <th scope='col' className='px-6 py-3'>
              Atelier
            </th>
            <th scope='col' className='px-6 py-3'>
              SECTION
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <tr
              key={index}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            >
              <td className='w-4 p-4'>
                <div className='flex items-center'>
                  <input
                    id={`checkbox-table-search-${data.CODE_MACHINE}`}
                    type='checkbox'
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor={`checkbox-table-search-${data.CODE_MACHINE}`}
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
                {data.CODE_MACHINE}
              </th>
              <td className='px-6 py-4'>{data.LIBELLE_MACHINE}</td>
              <td className='px-6 py-4'><span className='px-4 py-2' style={{backgroundColor: data.CODE_COULEUR}}></span></td>
              <td className='px-6 py-4'>{data.CODE_ETAT || "__"}</td>
              <td className='px-6 py-4'>{data.CODE_ZONE || "__"}</td>
              <td className='px-6 py-4'>{data.CODE_ATELIER || "__"}</td>
              <td className='px-6 py-4'>{data.CODE_SECTION || "__"} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}