import { useState, createContext, useContext} from 'react';

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [errorMessage, setErrorMessage] = useState(null);

  const updateError = (message) => setErrorMessage(message);
  const clearError = () => setErrorMessage(null);

  return (
    <ErrorContext.Provider value={{errorMessage, updateError, clearError }}>
      {children}
    </ErrorContext.Provider>
  )
}

export const useError = () => useContext(ErrorContext);