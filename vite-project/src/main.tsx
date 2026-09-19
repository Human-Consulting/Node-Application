import { StrictMode, ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Pages/Home/App'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material'
import LoginContainer from './Molecules/LoginContainer/LoginContainer'
import { AuthProvider } from './context/AuthContext'
import { ColorModeProvider, useColorMode } from './context/ColorModeContext'
import { getAppTheme } from './theme/theme'
// import { WebSocketProvider } from './Utils/SocketIO/WebSocketProvider.jsx'

// Reads the color-mode preference and feeds it into MUI's ThemeProvider - needs
// to sit inside ColorModeProvider to call useColorMode(), so it can't just be
// inlined in the render tree below.
const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const { mode } = useColorMode();
  return (
    <MuiThemeProvider theme={getAppTheme(mode)}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/Home/:nomeEmpresa/:idEmpresa",
    element: <App/>,
  },
  {
    path: "/",
    element: <LoginContainer/>
  }
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Elemento com id 'root' não encontrado no documento.");
}

createRoot(rootElement).render(
  <StrictMode>
    <ColorModeProvider>
      <AppThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      </AppThemeProvider>
    </ColorModeProvider>
  </StrictMode>,
)
