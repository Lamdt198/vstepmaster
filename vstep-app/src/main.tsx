import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider as OidcAuthProvider } from 'react-oidc-context'
import { oidcConfig } from './auth'
import { ThemeProvider } from './context/ThemeContext'
import { BookmarkProvider } from './context/BookmarkContext'
import { AuthProvider } from './context/AuthContext'
import { FeatureFlagProvider } from './context/FeatureFlagContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OidcAuthProvider {...oidcConfig}>
      <ThemeProvider>
        <AuthProvider>
          <FeatureFlagProvider>
            <BookmarkProvider>
              <App />
            </BookmarkProvider>
          </FeatureFlagProvider>
        </AuthProvider>
      </ThemeProvider>
    </OidcAuthProvider>
  </StrictMode>,
)

