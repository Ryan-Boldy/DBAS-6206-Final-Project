import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import './css/YMDBrand.css'
import { AuthPage } from './components/AuthPage.tsx'
import { Hud } from './components/Hud.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Hud />
  </React.StrictMode>,
)
