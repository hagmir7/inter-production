import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import '@fontsource/roboto' // Defaults to weight 400
import '@fontsource/roboto/400.css' // Specify weight
import '@fontsource/roboto/400-italic.css' // Specify weight and style

import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </StrictMode>
)
