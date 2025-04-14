import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Pages/Home/App.jsx'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './Pages/Login/Login.jsx'
import Task from './Molecules/Task/Task.jsx'
import NextStep from './Molecules/NextStep/NextStep.jsx'
import CentralTask from './Molecules/CentralTask/CentralTask.jsx'
import Dashboard from './Molecules/Dashboard/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path: "/home",
    element: <App/>,
    children: [
      {
        path: "task",
        element: <Task />, 
      },
      {
        path: "dash",
        element: <Dashboard />, 
      },

      {
        path: "next-step",
        element: <NextStep />, 
      },
      {
        path: "central-task/:tarefaId", 
        element: <CentralTask />,
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
