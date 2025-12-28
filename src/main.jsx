import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary'
import { ThemeProvider } from './context/ThemeContext'
import { UserProvider } from './context/UserContext'
import { TypingProvider } from './context/TypingContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>
        <UserProvider>
          <TypingProvider>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </TypingProvider>
        </UserProvider>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>,
)
