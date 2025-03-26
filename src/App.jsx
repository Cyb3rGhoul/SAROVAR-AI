import React from 'react'
import AppRoutes from './routes/AppRoutes.jsx'
import './App.css'
import { LanguageProvider } from './contexts/LanguageContext.jsx'

function App() {
  return (
    <LanguageProvider>
      <AppRoutes />
    </LanguageProvider>
  )
}

export default App