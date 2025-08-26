import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set the page title from environment variable
const appTitle = import.meta.env.VITE_APP_TITLE || 'Ranked Choice';
document.title = appTitle;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
