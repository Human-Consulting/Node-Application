import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Pages/Home/App.jsx'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './Pages/Login/Login.jsx'

const router = createBrowserRouter([
  {
    path: "/home",
    element: <App/>
  },
  {
    path: "/",
    element: <Login/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
