import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App.jsx'
import '@assets/styles/global.css';
import { ThemeProvider } from '@context/ThemeContext';
import { Provider } from 'react-redux';
import store from "@redux/store"
import { ErrorProvider } from '@context/ErrorContext';
createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <ErrorProvider>
    <Provider store={store}>
      {/* <StrictMode>         </StrictMode>    */}
        <App />

    </Provider>
    </ErrorProvider>
  </ThemeProvider>
)
