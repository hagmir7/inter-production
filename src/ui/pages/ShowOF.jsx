import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { api } from '../utils';
import { RefreshCcw } from 'lucide-react';

const TableRow = ({ data, click }) => (

    <tr onClick={() => click(data.CODE_OP)} className=''>
        <td className="size-px whitespace-nowrap">
            <div className="px-6 py-2 flex items-center gap-x-2">
                <span className="text-sm text-gray-600 dark:text-neutral-400">{data.CODE_OP || "__"}</span>
            </div>
        </td>
        <td className="size-px whitespace-nowrap">
            <div className="px-6 py-2">
                <span className="text-sm text-gray-600 dark:text-neutral-400">{data.LIBELLE_OP || "__"}</span>
            </div>
        </td>
        <td className="size-px whitespace-nowrap">
            <div className="px-6 py-2">
                <span className="text-sm text-gray-600 dark:text-neutral-400">{data.CODE_MACHINE}</span>
            </div>
        </td>
        <td className="size-px whitespace-nowrap">
            <div className="px-6 py-2">
                <span className="text-sm text-blue-600 bg-blue-100 border border-blue-600 w-full inline-block  text-center py-1 dark:text-neutral-400">{Math.floor(data.QTE_LANCEE)}</span>
            </div>
        </td>

        <td className="size-px whitespace-nowrap">
            <div className="px-6 py-2">
                <span className="text-sm text-green-600 bg-green-100 border border-green-600 w-full inline-block  text-center py-1 dark:text-neutral-400">{Math.floor(data.QTE_BONNE)}</span>
            </div>
        </td>

        <td className="size-px whitespace-nowrap">
            <div className="px-6 py-2">
                <span className="text-sm text-red-600 bg-red-100 border border-red-600 w-full inline-block  text-center py-1 dark:text-neutral-400">
                    {Math.floor(data.QTE_AUTRE)}
                </span>
            </div>
        </td>
    </tr>
);



function ShowOF() {
    const [data, setData] = useState({})
    const labels = ["Code", "Operation", "Machine", "QTE lancee", "QTE Bonne", "QTE Autre"];
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        setLoading(true);
        const respones = await api.get('orders-fabrication/589')
        if (respones.status !== 200) {
            console.log(respones);
        }
        setData(respones.data)
        setLoading(false);

    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
        );
    }


    return (
        <div className="md:flex">
            <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                <li>
                    <Link
                        to="#"
                        className="inline-flex items-center gap-2 px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600"
                        aria-current="page"
                    >
                        <RefreshCcw />
                        <span>Operations</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href="#"
                        className="inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                         <RefreshCcw />
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        to="#"
                        className="inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <RefreshCcw />
                        Settings
                    </Link>
                </li>
                <li>
                    <Link
                        to="#"
                        className="inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <RefreshCcw />
                        Contact
                    </Link>
                </li>
                <li>
                    <Link to={``} className="inline-flex items-center px-4 py-3 text-gray-400 rounded-lg cursor-not-allowed bg-gray-50 w-full dark:bg-gray-800 dark:text-gray-500">
                        <RefreshCcw />
                        Disabled
                    </Link>
                </li>
            </ul>
            <div className="bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 p-3">Operations</h3>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                    <thead className="bg-gray-100 dark:bg-neutral-900 border-t border-gray-00">
                        <tr>
                            {
                                labels.map((label) => {
                                    return (<th scope="col" key={label} className="px-6 py-3 text-start">
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
                        {data?.operations?.map((item, index) => (
                            <TableRow key={index} data={item} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ShowOF