import './App.css'
import MainContent from '../../Molecules/MainContent/MainContent'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { ThemeProviderCustom, ThemeContext } from '../../Utils/ThemeContext'
import { useContext } from 'react'

function AppContent() {
  const { theme } = useContext(ThemeContext)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainContent />
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <ThemeProviderCustom>
      <AppContent />
    </ThemeProviderCustom>
  )
}
