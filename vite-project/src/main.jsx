import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Pages/Home/App.jsx'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './Pages/Login/Login.jsx'
import Task from './Molecules/Task/Task.jsx'
import NextStep from './Molecules/NextStep/NextStep.jsx'
import CentralTask from './Molecules/CentralTask/CentralTask.jsx'
import Usuarios from './Molecules/Usuarios/Usuarios.jsx'
import { Dashboard } from '@mui/icons-material'

const router = createBrowserRouter([
  {
    path: "/home/:idEmpresa",
    element: <App/>,
    children: [
      {
        path: "task/:idProjeto",
        element: <Task />, 
      },
      {
        path: "Dash",
        element: <Dashboard />, 
      },

      {
        path: "next-step",
        element: <NextStep />, 
      },
      {
        path: "central-task/:idSprint", 
        element: <CentralTask />,
      },
      {
        path: "Usuarios", 
        element: <Usuarios />,
      },
    ],
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
