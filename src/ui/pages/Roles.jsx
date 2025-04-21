
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {api}  from '../utils'
import CModal from '../components/ui/CModal';
import { PlusCircle } from 'lucide-react';
import RoleForm from '../components/RoleForm';

const TableRow = ({ data, click }) => (
  
    <tr className='hover:bg-gray-100'>

      <td className="size-px whitespace-nowrap">
      <Link to={`/roles/${data.name}`}>
        <div className="px-6 py-2 flex items-center gap-x-2">
          <span className="text-sm text-gray-600 dark:text-neutral-400">{data.id || "__"}</span>
        </div>
        </Link>
      </td>
      <td className="size-px whitespace-nowrap">
      <Link to={`/roles/${data.name}`}>
        <div className="px-6 py-2">
          <span className="text-sm text-gray-600 dark:text-neutral-400">{data.name || "__"}</span>
        </div>
        </Link>
      </td>
      <td className="size-px whitespace-nowrap">
        <div className="px-6 py-2">
          <span className="text-sm text-gray-600 dark:text-neutral-400">{data.guard_name}</span>
        </div>
      </td>
    </tr>
  
);

const Roles = () => {

    const labels = ["Code", "Role", "Gaurdn"]
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        setLoading(true)
        const respones = await api.get('roles')
        if (respones.status !== 200) {
            console.log(respones);
            setLoading(false)
        }
        setData(respones.data)
        setLoading(false)
    }

  
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      );
    }

  return (
    <div className="flex flex-col">
    <div className="-m-1.5 overflow-x-auto">
      <div className="p-1.5 min-w-full inline-block align-middle">
        <div className="bg-white border border-gray-200 rounded-xl shadow-2xs overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
            {/* Header */}
            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Roles</h2>
                <div className="inline-flex gap-x-2">
                    <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-red-500 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                        Delete (2)
                    </a>
                    <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#">
                        View all
                    </a>
                    <CModal
                        label="Créer"
                        title="Créer un nouveau rôle"
                        icon={()=> (<PlusCircle />)}
                        btnClass="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >

                      <RoleForm />
                    </CModal>
                </div>
            </div>
          {/* Table */}
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead className="bg-gray-50 dark:bg-neutral-900">
              <tr>
                {
                    labels.map((label) => {
                        return(<th scope="col" key={label} className="px-6 py-3 text-start">
                            <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                                    {label}
                                </span>
                            </div>
                        </th>)
                    })
                }
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
              {data.map((item, index) => (
                <TableRow key={index} data={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Roles;