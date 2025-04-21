import { CircleCheckBig, CircleX } from 'lucide-react'
import React from 'react'

function Alert({ message, type }) {
    return (
        <div
            className={`mb-6 p-3 border-l-4 ${type === "success" ? "border-green-500 text-green-700 bg-green-50" : "border-red-500 text-red-700 bg-red-50"} rounded flex items-center`}
            role='alert'
        >
            {type === "success" ? (<CircleCheckBig className='w-5 h-5 mr-2 flex-shrink-0' />) : (<CircleX className='w-5 h-5 mr-2 flex-shrink-0' />)}
            <span>{message}</span>
        </div>
    )
}

export default Alert