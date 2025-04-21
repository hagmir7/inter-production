import {api} from '../utils';
import React, { useEffect, useState } from 'react';

const TableRow = ({ data }) => (
  <tr>
    <td className="size-px whitespace-nowrap">
      <div className="ps-6 py-2">
        <label className="flex">
          <input
            type="checkbox"
            className="shrink-0 border-gray-300 rounded-sm text-blue-600 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
            checked={data.checked}
          />
          <span className="sr-only">Checkbox</span>
        </label>
      </div>
    </td>
    <td className="size-px whitespace-nowrap">
      <div className="px-6 py-2 flex items-center gap-x-2">
        <span className="text-sm text-gray-600 dark:text-neutral-400">{data.CODE_PERS || "__"}</span>
      </div>
    </td>
    <td className="size-px whitespace-nowrap">
      <div className="px-6 py-2">
        <span className="text-sm text-gray-600 dark:text-neutral-400">{data.NOM_PRENOM || "__"}</span>
      </div>
    </td>
    <td className="size-px whitespace-nowrap">
      <div className="px-6 py-2">
        <span className="text-sm text-gray-600 dark:text-neutral-400">{data.CODE_CATEGORIE || "__"}</span>
      </div>
    </td>
    <td className="size-px whitespace-nowrap">
      <div className="px-6 py-2">
        <span className="text-sm text-gray-600 dark:text-neutral-400">{data.ADRESSE || "__"}</span>
      </div>
    </td>

    <td className="size-px whitespace-nowrap">
      <div className="px-6 py-2">
        <span className="text-sm text-gray-600 dark:text-neutral-400">{data.ATELIER || "__"}</span>
      </div>
    </td>
  </tr>
);

const SalesTable = () => {

    const labels = ["Code", "Personnel", "Categorie", "Address", "Atelier"]
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const respones = await api.get('/personnel')
        if (respones.status !== 200) {
            console.log(respones);
        }
        setData(respones.data)
    }

  return (
    <div className="flex flex-col">
    <div className="-m-1.5 overflow-x-auto">
      <div className="p-1.5 min-w-full inline-block align-middle">
        <div className="bg-white border border-gray-200 rounded-xl shadow-2xs overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
          {/* Header */}
          <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Personnel</h2>
            <div className="inline-flex gap-x-2">
              <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-red-500 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                Delete (2)
              </a>
              <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#">
                View all
              </a>
              <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" href="#">
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                Create
              </a>
            </div>
          </div>
          {/* Table */}
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead className="bg-gray-50 dark:bg-neutral-900">
              <tr>
                <th scope="col" className="ps-6 py-3 text-start">
                  <label htmlFor="hs-at-with-checkboxes-main" className="flex">
                    <input type="checkbox" className="shrink-0 border-gray-300 rounded-sm text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-main"/>
                    <span className="sr-only">Checkbox</span>
                  </label>
                </th>
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

export default SalesTable;
