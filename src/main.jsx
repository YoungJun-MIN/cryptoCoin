import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/global.css';
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
)
