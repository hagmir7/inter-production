import React, { useEffect, useState } from 'react';
import Alert from './ui/Alert';
import { api } from '../utils';

function AtelierForm({ id = null }) {
  const [data, setData] = useState({
    CODE_SOCIETE: '',
    CODE_ATELIER: '',
    LIBELLE_ATELIER: '',
    REMARQUE: '',
    CODE_ENREG: '',
    DH_CREATION: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: null,
    label: ""
  });

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const response = await api.get(`atelier/${id}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(data);
    
    setMessage({type: null, label: ""});
    try {
      if (id) {
        // Update existing record
        await api.put(`atelier/update/${id}`, data);
      } else {
        // Create new record
        await api.post(`atelier/store`, data);
      }

      setMessage({label: "Données enregistrées avec succès!", type: "success"});
    } catch (error) {
      console.error('Erreur lors de la soumission :', error);
      setMessage({label: "Erreur lors de la soumission " + error, type: "error"});
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className='p-3 bg-white pb-16'>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-6'>
        <div>
            <label className='block mb-2 font-medium'>Société <span className='text-red-500'>*</span></label>
            <select
              name='CODE_SOCIETE'
              value={data.CODE_SOCIETE}
              onChange={handleChange}
             
              className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
              required
            >
              <option value=''>Choisissez la société</option>
              <option value='101'>Serie Moble</option>
              <option value='100'>Intercocina</option>
            
            </select>
          </div>
          <div>
            <label className='block mb-2 font-medium'>
              Code d'atelier <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='CODE_ATELIER'
              defaultValue={data.CODE_ATELIER}
              onChange={handleChange}
              readOnly={id ? true : false}
              placeholder="Code d'atelier"

              className={`w-full p-3 border border-gray-300 rounded appearance-none focus:outline-none ${id ? 'bg-gray-200' : "focus:ring-2 focus:ring-red-500"}`}
              required
            />
          </div>

          <div>
            <label className='block mb-2 font-medium'>
              Atelier<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='LIBELLE_ATELIER'
              defaultValue={data.LIBELLE_ATELIER}
              onChange={handleChange}
              placeholder='Ex. Bonnie Green'
              className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
              required
            />
          </div>

     

          <div>
            <label className='block mb-2 font-medium'>Date création</label>
            <input
              readOnly={true}
              type='datetime'
              name='DH_CREATION'
              defaultValue={data.DH_CREATION}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded bg-gray-200 focus:outline-none'
            />
          </div>

        
        </div>
        
        <div className='my-3'>
            <label className='block mb-2 font-medium'>Remarque</label>
            <textarea name="REMARQUE" placeholder='Remarque' onChange={handleChange} className='w-full p-3 pl-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500' defaultValue={data.REMARQUE}></textarea>
        </div>

        {message.type && (<Alert type={message.type} message={message.label} />)}

        <div className='mt-3 flex justify-end w-full'>
          <button
            type='submit'
            disabled={loading}
            className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-red-300'
          >
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AtelierForm;
