import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Pages/Home/App.jsx'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Task from './Molecules/Task/Task.jsx'
import NextStep from './Molecules/NextStep/NextStep.jsx'
import CentralTask from './Molecules/CentralTask/CentralTask.jsx'
import Usuarios from './Molecules/Usuarios/Usuarios.jsx'
import Dashboard from './Molecules/Dashboard/Dashboard.jsx'
import LoginContainer from './Molecules/LoginContainer/LoginContainer.jsx'

const router = createBrowserRouter([
  {
    path: "/Home/:nomeEmpresa/:idEmpresa",
    element: <App/>,
    children: [
      {
        path: "Roadmap/:descricaoProjeto/:idProjeto",
        element: <Task />,
        children: [
          {
            path: "Tarefas/:idSprint/:index", 
            element: <CentralTask />,
          }
        ]
      },
      {
        path: "Dash",
        element: <Dashboard />, 
      },
      {
        path: "Dash/:descricaoProjeto/:idProjeto",
        element: <Dashboard />, 
      },

      {
        path: "next-step/:descricaoProjeto/:idProjeto",
        element: <NextStep />, 
      },
      {
        path: "Usuarios", 
        element: <Usuarios />,
      },
    ],
  },
  {
    path: "/",
    element: <LoginContainer/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
