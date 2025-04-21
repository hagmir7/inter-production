import React, { useEffect, useState } from 'react';
import FastSpinner from './ui/FastSpinner';
import { api } from '../utils';

const AtelierMachines = ({id=null}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sample data - replace with your actual data source


  const [data, setData] = useState({
    machines: []
  });

  useEffect(()=>{
    getData();
   
    
  }, [id]);


  const getData = async ()=>{
    const respones = await api.get(`atelier/${id}`)
    setData(respones.data)
    if(respones.status === 200){
        setLoading(false)
    }
  }

  const toggleRowSelection = (codeAtelier) => {
    setSelectedRows(prev => 
      prev.includes(codeAtelier)
        ? prev.filter(id => id !== codeAtelier)
        : [...prev, codeAtelier]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.machines.map(machine => machine.CODE_MACHINE));
    }
    setSelectAll(!selectAll);
  };

  return (
    <div className="overflow-hidden rounded-lg dark:border-neutral-700 pb-10">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
          <thead className="dark:bg-neutral-800">
            <tr>
              <th scope="col" className="w-10 px-6 py-3 text-left">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-800 dark:ring-offset-neutral-800"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-neutral-400">
                  Code
                </span>
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-neutral-400">
                  Machine
                </span>
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-neutral-400">
                  Zone
                </span>
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-neutral-400">
                  ATELER
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900">
            {data.machines.map((machine) => (
              <tr 
                key={machine.CODE_MACHINE} 
                className={`hover:bg-gray-50 dark:hover:bg-neutral-800 ${
                  selectedRows.includes(machine.CODE_MACHINE) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-800 dark:ring-offset-neutral-800"
                    checked={selectedRows.includes(machine.CODE_MACHINE)}
                    onChange={() => toggleRowSelection(machine.CODE_MACHINE)}
                  />
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="text-sm font-medium text-gray-900 dark:text-neutral-100">
                    {machine.CODE_MACHINE}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="text-sm text-gray-500 dark:text-neutral-400">
                    {machine.LIBELLE_MACHINE}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="text-sm text-gray-500 dark:text-neutral-400">
                    {machine.CODE_ZONE}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="text-sm text-gray-500 dark:text-neutral-400">
                    {machine.CODE_ATELIER}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mt-10'>
        {
            loading && (<FastSpinner />)
        }
        </div>
       
      </div>
    </div>
  );
};

export default AtelierMachines;