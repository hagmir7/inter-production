import { ArrowRightCircle } from 'lucide-react'
import React from 'react'

export default function Logout() {
  const handelLogout = async () => {
    localStorage.removeItem('authToken')
    if(window.electron){
      await window.electron.logout();
    }
    
  }

  return (
    <button
      onClick={handelLogout}
      title='Déconnexion'
      className='hover:bg-gray-300 flex items-center justify-center w-12 h-12 transition-transform rounded-full active:scale-95 hover:bg-primary/5 hover:dark:bg-primary-dark/5 outline-link cursor-pointer'
      to='/register'
    >
      <ArrowRightCircle />
    </button>
  )
}
