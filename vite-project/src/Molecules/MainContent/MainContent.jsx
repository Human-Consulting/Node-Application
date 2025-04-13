import { BoxAltertive } from './MainContent.styles';
import LateralBar from '../LateralBar';
import LateralBarRight from '../LateralBarRight/LateralBarRight';
import Task from '../Task/Task';
import PrincipalContainer from '../PrincipalContainer';
import CentralTask from '../CentralTask/CentralTask';
import NextStep from '../NextStep/NextStep';
import { Routes, Route, useParams } from 'react-router-dom';
import { useState } from 'react';

const MainContent = () => {
  const { idEmpresa } = useParams();

  const [showLateralBar, setShowLateralBar] = useState(true);

  const hideShowLateralBar = () => {
    setShowLateralBar(false);
  }

  const ShowLateralBar = () => {
    setShowLateralBar(true);
  }

  return (
    <BoxAltertive>

      <LateralBar idEmpresa={idEmpresa} />

      <Routes>
        <Route path="/task/:idProjeto" element={<Task toogleLateralBar={hideShowLateralBar} idEmpresa={idEmpresa} />} />
        <Route path="/next-step" element={<NextStep />} />
        <Route path="/" element={<PrincipalContainer toogleLateralBar={ShowLateralBar} idEmpresa={idEmpresa} />} />
        <Route path="/central-task/:idSprint" element={<CentralTask toogleLateralBar={hideShowLateralBar} />} />
      </Routes>

      <LateralBarRight showLateralBar={showLateralBar} idEmpresa={idEmpresa} />
    </BoxAltertive>
  );
};

export default MainContent;
