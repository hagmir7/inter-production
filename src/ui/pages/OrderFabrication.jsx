import { useEffect, useState } from 'react';
import { Search, Clock, Plus } from 'lucide-react';
import { api } from '../utils';
import { useNavigate } from 'react-router';

export default function OrderFabrication() {

  
  const [showDropdown, setShowDropdown] = useState(false);
  const [statusFilter, setStatusFilter] = useState('Filtre');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);


  const navigate = useNavigate();

  const getData = async (pageNumber = 1) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await api.get(`/orders-fabrication?page=${pageNumber}`);
      const newData = response.data.data;
      
      if (pageNumber === 1) {
        setData(newData);
      } else {
        setData(prevData => [...prevData, ...newData]);
      }
      
      setHasMore(newData.length > 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    getData(nextPage);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleFilterChange = async (filter, lable) => {

    setStatusFilter(lable);
    setShowDropdown(false);
    if(filter === "TOUTE"){
      getData();
      return;
    }
    const response = await api.get(`/orders-fabrication/filter?status=${filter}`);
    setData(response.data);
   
  };

  const filters = [
    { "TOUTE": "Toute" },
    { "ATTENTE": "Attente" },
    { "PREP": "Préparation" },
    { "LANC": "Lancé" },
    { "BLOC": "Bloqué" },
    { "SUSP": "Suspendu" },
    { "FINI": "Clôturé" },
    { "ARCHIVE": "Archivé" },
  ]

  const handelShow = async (id) => {
    navigate(`/of/${id}`);
  }

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
            {statusFilter}
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
              {filters.map((filterObj, index) => {
                const [key, value] = Object.entries(filterObj)[0];

                // if(statusFilter === value){
                //   console.log(statusFilter,value);
                // }
                
                
                return (
                  <li key={key}>
                    <div className='flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600'>
                      <input
                        id={`filter-radio-${key}`}
                        type='radio'
                        checked={statusFilter === value}
                        onChange={() => handleFilterChange(key, value)}
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      />
                      <label
                        htmlFor={`filter-radio-${key}`}
                        className='w-full ml-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300'
                      >
                        {value}
                      </label>
                    </div>
                  </li>
                );
              })}
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
            <th scope='col' className='px-6 py-3 whitespace-pre'>
              Code OF
            </th>
            {/* <th scope='col' className='px-6 py-3 whitespace-pre'>
              Coluer
            </th> */}
            <th scope='col' className='px-6 py-3 whitespace-pre'>
              REF ARTICLE
            </th>
            <th scope='col' className='px-6 py-3 whitespace-pre'>
              Article
            </th>
            <th scope='col' className='px-6 py-3 whitespace-pre'>
              Etat
            </th>
            <th scope='col' className='px-6 py-3 whitespace-pre'>
              Quantite lancee
            </th>
            <th scope='col' className='px-6 py-3 whitespace-pre'>
              Quantite bonne
            </th>
            <th scope='col' className='px-6 py-3 whitespace-pre'>
              Quantite rebutee
            </th>

            <th scope='col' className='px-6 py-3 whitespace-pre'>
              Quantite autre
            </th>
            <th scope='col' className='px-6 py-3 whitespace-pre'>
              Atelier
            </th>
            <th scope='col' className='px-6 py-3 whitespace-pre'>
              Date de creation
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            
            <tr
              key={index}
              onClick={()=> handelShow(data.CODE_OF)}
              className='bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            >
             
              <th
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
              >
                {data.CODE_OF}
              </th>
              {/* <td className='px-6 py-4'><span className='px-4 py-2' style={{backgroundColor: data.CODE_COULEUR}}></span></td> */}
              <td className='px-6 py-4 whitespace-nowrap'>{data.REF_ARTICLE || "__"}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{data.LIBELLE_OF}</td>
              <td className='px-6 py-4'>
                <div className='bg-red-100 border border-red-300 p-1 text-red-600 w-22 text-center'>
                  {
                    filters.find(obj => Object.keys(obj)[0] === data.ETAT_OF)?.[data.ETAT_OF] || "__"
                  }
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>{Math.floor(data.QTE_LANCEE)}</td>   
              <td className='px-6 py-4 whitespace-nowrap'>{Math.floor(data.QTE_BONNE)}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{Math.floor(data.QTE_REBUT)}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{Math.floor(data.QTE_AUTRE)}</td> 
              <td className='px-6 py-4'>{data.CODE_ATELIER || "__"}</td>
              <td className='px-6 py-4'>
                {data.DH_CREATION ? new Date(data.DH_CREATION).toLocaleDateString() : "__"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {hasMore && (
        <div className="flex justify-center p-4">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  )
}