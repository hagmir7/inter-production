import React, { useState } from 'react'
import Tab1Content from './Tab1Content'
import Tab2Content from './Tab2Content'
import Tab3Content from './Tab3Content'

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('tab1')

  const tabs = [
    { id: 'tab1', label: 'Tab 1', content: <Tab1Content /> },
    { id: 'tab2', label: 'Tab 2', content: <Tab2Content /> },
    { id: 'tab3', label: 'Tab 3', content: <Tab3Content /> },
  ]

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
  }

  return (
    <div className='flex flex-col h-screen bg-gray-100'>
      {/* Tab bar */}
      <div className='flex bg-white border-b border-gray-200'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}

        {/* Add new tab button */}
        <button
          className='px-4 py-3 text-gray-500 hover:text-gray-700'
          onClick={() => {
            // Logic to add a new tab
            // This is just a placeholder - you would implement proper tab addition logic
            alert('Add new tab functionality would go here')
          }}
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 4v16m8-8H4'
            ></path>
          </svg>
        </button>
      </div>

      {/* Tab content */}
      <div className='flex-1 p-6 overflow-auto'>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}

export default Tabs
