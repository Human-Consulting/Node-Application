import { BoxAltertive } from './MainContent.styles';
import LateralBar from '../LateralBar';
import LateralBarRight from '../LateralBarRight/LateralBarRight';
import Task from '../Task/Task';
import PrincipalContainer from '../PrincipalContainer';
import CentralTask from '../CentralTask/CentralTask';
import NextStep from '../NextStep/NextStep';
import { Routes, Route, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProjetos } from '../../Utils/cruds/CrudsProjeto';
import { getUsuarios } from '../../Utils/cruds/CrudsUsuario';
import Usuarios from '../Usuarios/Usuarios';
import Dashboard from '../Dashboard/Dashboard';

const MainContent = () => {
  const { nomeEmpresa, idEmpresa } = useParams();

  const [showLateralBar, setShowLateralBar] = useState(true);
  const [projetos, setProjetos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const hideShowLateralBar = () => {
    setShowLateralBar(false);
  }

  const ShowLateralBar = () => {
    setShowLateralBar(true);
  }

  const atualizarProjetos = async () => {
    const projetos = await getProjetos(idEmpresa);
    setProjetos(projetos);
  };

  const buscarUsuarios = async () => {
    const usuarios = await getUsuarios(idEmpresa);
    setUsuarios(usuarios);
  };

  useEffect(() => {
    atualizarProjetos();
    buscarUsuarios();
  }, [])

  return (
    <BoxAltertive>

      <LateralBar projetos={projetos} />

      <Routes>
        <Route path="/Roadmap/:idProjeto" element={<Task toogleLateralBar={hideShowLateralBar} atualizarProjetos={atualizarProjetos} usuarios={usuarios} />} />
        <Route path="/next-step" element={<NextStep />} />
        {/* //TODO <Route path="/Empresas" element={<Empresas />} /> */}
        <Route path="/" element={<PrincipalContainer toogleLateralBar={ShowLateralBar}  atualizarProjetos={atualizarProjetos} projetos={projetos} usuarios={usuarios} />} />
        <Route path="/Roadmap/:idProjeto/Entregas/:idSprint/:index" element={<CentralTask toogleLateralBar={hideShowLateralBar} atualizarProjetos={atualizarProjetos} usuarios={usuarios} />} />
        <Route path="/Usuarios" element={<Usuarios toogleLateralBar={hideShowLateralBar} usuarios={usuarios} atualizarUsuarios={buscarUsuarios} />} />
        <Route path="/Dash" element={<Dashboard toogleLateralBar={hideShowLateralBar} />} />
        {/* //TODO <Route path="/Dash/:idProjeto" element={<DashboardProjeto toogleLateralBar={hideShowLateralBar} />} /> */}
      </Routes>

      <LateralBarRight showLateralBar={showLateralBar} projetos={projetos} />
    </BoxAltertive>
  );
};

export default MainContent;