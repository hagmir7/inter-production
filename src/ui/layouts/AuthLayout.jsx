import React from 'react'
import { Outlet } from 'react-router'
import Frame from '../components/Frame'

const AuthLayout = () => {
    return (

        <>
            <Frame />
            <div className='border border-gray-200'>
                <Outlet />
            </div>
        </>

    )
}

export default AuthLayout