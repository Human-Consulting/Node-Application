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

const MainContent = () => {
  const { idEmpresa } = useParams();

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
    console.log("oi: " + idEmpresa);
    
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

      <LateralBar projetos={projetos} idEmpresa={idEmpresa} />

      <Routes>
        <Route path="/task/:idProjeto" element={<Task toogleLateralBar={hideShowLateralBar} idEmpresa={idEmpresa} atualizarProjetos={atualizarProjetos} usuarios={usuarios} />} />
        <Route path="/next-step" element={<NextStep />} />
        <Route path="/" element={<PrincipalContainer toogleLateralBar={ShowLateralBar} idEmpresa={idEmpresa} atualizarProjetos={atualizarProjetos} projetos={projetos} usuarios={usuarios} />} />
        <Route path="/central-task/:idSprint" element={<CentralTask toogleLateralBar={hideShowLateralBar} idEmpresa={idEmpresa} atualizarProjetos={atualizarProjetos} usuarios={usuarios} />} />
        <Route path="/Usuarios" element={<Usuarios toogleLateralBar={hideShowLateralBar} usuarios={usuarios} atualizarUsuarios={buscarUsuarios} idEmpresa={idEmpresa} />} />
        <Route path="/Dash" element={<Dashboard toogleLateralBar={hideShowLateralBar} />} />
      </Routes>

      <LateralBarRight showLateralBar={showLateralBar} projetos={projetos} />
    </BoxAltertive>
  );
};

export default MainContent;