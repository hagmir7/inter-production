import React from 'react'
import CModal from '../components/ui/CModal'
import DebutReglage from '../actions/DebutReglage'
import FinReglage from '../actions/FinReglage'
import DebutProduction from '../actions/DebutProduction'
import FinProduction from '../actions/FinProduction'
import FinRetouche from '../actions/FinRetouche'
import DebutRetouche from '../actions/DebutRetouche'
import MontageOutillage from '../actions/MontageOutillage'
import DemontageOutillage from '../actions/DemontageOutillage'

function Production() {
    return (
      <div className='w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4'>
          <DebutReglage />
          <FinReglage />
          
          <DebutProduction />
          <FinProduction />

          <DebutRetouche />
          <FinRetouche />

          <MontageOutillage />
          <DemontageOutillage />
        </div>
      </div>
    )
}

export default Production