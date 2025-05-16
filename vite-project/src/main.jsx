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
import Dashboard from './Molecules/Dashboard/Dashboard.jsx'
import Chat from './Molecules/Chat/Chat.jsx'

const router = createBrowserRouter([
  {
    path: "/Home",
    element: <Chat/>,
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
    element: <Login/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
