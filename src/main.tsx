import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import { AuthPage } from './components/AuthPage.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthPage />
  </React.StrictMode>,
)
