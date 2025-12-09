import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./Pages/Home/App.jsx";
import RouteError from "./Pages/Home/RouteError.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Task from "./Molecules/Task/Task.jsx";
import CentralTask from "./Molecules/CentralTask/CentralTask.jsx";
import Usuarios from "./Molecules/Usuarios/Usuarios.jsx";
import Dashboard from "./Molecules/Dashboard/Dashboard.jsx";
import LoginContainer from "./Molecules/LoginContainer/LoginContainer.jsx";
import Chat from "./Molecules/Chat/Chat.jsx";
// import { WebSocketProvider } from './Utils/SocketIO/WebSocketProvider.jsx'

const router = createBrowserRouter([
  {
    path: "/Home/:nomeEmpresa/:idEmpresa",
    element: <App />,
    errorElement: <RouteError />,
    children: [
      {
        path: "Chat",
        element: <Chat />,
        errorElement: <RouteError />,
      },
      {
        path: "Roadmap/:descricaoProjeto/:idProjeto",
        element: <Task />,
        errorElement: <RouteError />,
        children: [
          {
            path: "Backlog/:tituloSprint/:idSprint/:index",
            element: <CentralTask />,
            errorElement: <RouteError />,
          },
        ],
      },
      {
        path: "Dash",
        element: <Dashboard />,
        errorElement: <RouteError />,
      },
      {
        path: "Dash/:descricaoProjeto/:idProjeto",
        element: <Dashboard />,
        errorElement: <RouteError />,
      },
      {
        path: "Usuarios",
        element: <Usuarios />,
        errorElement: <RouteError />,
      },
    ],
  },
  {
    path: "/",
    element: <LoginContainer />,
    errorElement: <RouteError />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
