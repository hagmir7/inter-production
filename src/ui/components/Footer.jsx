import React, { useState, useEffect, useRef } from 'react'
import pkg from '../../../package.json'
import {
  Github,
  Heart,
  ExternalLink,
  MessageSquare,
  Settings,
} from 'lucide-react'

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const openLink = async (url) => {
    console.log('window.electron:', window.electron) // Debugging 
    console.log(window.electron.open(url));
  }

  return (
    <footer className='fixed bottom-0 left-0 right-0 w-full bg-gray-100 text-gray-600 py-3 px-6 shadow-lg border-t border-gray-300 z-50'>
      <div className='max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2 text-sm'>
        <div className='flex items-center space-x-2'>
          <span>© {currentTime.getFullYear()} INTERCOCINA</span>
          <span className='hidden md:inline'>•</span>
          <span className='hidden md:flex items-center'>
            Made with <Heart size={14} className='mx-1 text-red-400' /> by
            Intercocina Team
          </span>
        </div>

        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-3'>
            <button
              onClick={() => openLink('https://github.com/intercocina')}
              className='hover:text-white transition-colors'
              aria-label='GitHub'
              title='Visit GitHub'
            >
              <Github size={16} />
            </button>
            <button
              onClick={() => openLink('https://intercocina.com/support')}
              className='hover:text-white transition-colors'
              aria-label='Support'
              title='Get Support'
            >
              <MessageSquare size={16} />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className='hover:text-white transition-colors'
              aria-label='Settings'
              title='Open Settings'
            >
              <Settings size={16} />
            </button>
          </div>

          <div className='flex items-center space-x-1'>
            <span className='text-gray-400'>v{pkg.version}</span>
            <span className='hidden md:inline text-gray-500'>|</span>
            <span className='hidden md:inline text-gray-400'>
              {formatTime(currentTime)}
            </span>
          </div>
        </div>
      </div>

      {showSettings && (
        <div className='mt-3 pt-3 border-t border-gray-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs'>
          <div>
            <h4 className='font-black text-gray-600 mb-1'>Informations système</h4>
            <p>Node: {window.electron.versions?.node || 'N/A'}</p>
            <p>Chrome: {window.electron.versions?.chrome || 'N/A'}</p>
            <p>Electron: {window.electron.versions?.electron || 'N/A'}</p>
          </div>
          <div>
            <h4 className='font-black text-gray-600 mb-1'>Quick Links</h4>
            <button
              onClick={() => openLink('https://intercocina.com/docs')}
              className='block hover:text-white transition-colors mb-1 flex items-center'
            >
              Documentation <ExternalLink size={12} className='ml-1' />
            </button>
            <button
              onClick={() => openLink('https://intercocina.com/releases')}
              className='block hover:text-white transition-colors mb-1 flex items-center'
            >
              Release Notes <ExternalLink size={12} className='ml-1' />
            </button>
          </div>
          <div>
            <h4 className='font-black text-gray-600 mb-1'>Statut de l'application</h4>
            <div className='flex items-center'>
              <div className='w-2 h-2 rounded-full bg-green-400 mr-2'></div>
              <span>Connecté</span>
            </div>
            <p>
              Memory:{' '}
              {Math.round(performance.memory?.usedJSHeapSize / 1048576) ||
                'N/A'}{' '}
              MB
            </p>
          </div>
        </div>
      )}
    </footer>
  )
}

// This ensures the main content doesn't get hidden behind the footer
const WithFooterSpacing = ({ children }) => {
  const [footerHeight, setFooterHeight] = useState(0)
  const footerRef = useRef(null)

  useEffect(() => {
    if (footerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setFooterHeight(entry.contentRect.height)
        }
      })

      resizeObserver.observe(footerRef.current)
      return () => resizeObserver.disconnect()
    }
  }, [])

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex-grow' style={{ paddingBottom: `${footerHeight}px` }}>
        {children}
      </div>
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  )
}

export { Footer, WithFooterSpacing }
export default Footer
