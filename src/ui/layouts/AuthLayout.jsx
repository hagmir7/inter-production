import React from 'react'
import { Outlet } from 'react-router'

const AuthLayout = () => {
    return (

        <div className='sm:ml-64'>
            <div className='border border-gray-200'>
                <Outlet />
            </div>
        </div>

    )
}

export default AuthLayout