import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Pages/Home/App.jsx'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Task from './Molecules/Task/Task.jsx'
import CentralTask from './Molecules/CentralTask/CentralTask.jsx'
import Usuarios from './Molecules/Usuarios/Usuarios.jsx'
import Dashboard from './Molecules/Dashboard/Dashboard.jsx'
import LoginContainer from './Molecules/LoginContainer/LoginContainer.jsx'
// import Chat from './Molecules/Chat/Chat.jsx'
// import { WebSocketProvider } from './Utils/SocketIO/WebSocketProvider.jsx'

const router = createBrowserRouter([
  {
    path: "/Home/:nomeEmpresa/:idEmpresa",
    element: <App/>,
    children: [
      {
        path: "Chat", 
        // element: <Chat />,
      },
      {
        path: "Roadmap/:descricaoProjeto/:idProjeto",
        element: <Task />,
        children: [
          {
            path: "Backlog/:tituloSprint/:idSprint/:index", 
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
        path: "Usuarios", 
        element: <Usuarios />,
      },
     
    ],
  },
  {
    path: "/",
    element: <App/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
