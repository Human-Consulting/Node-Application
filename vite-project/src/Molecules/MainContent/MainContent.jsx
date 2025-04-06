import { BoxAltertive } from './MainContent.styles';
import LateralBar from '../LateralBar';
import LateralBarRight from '../LateralBarRight/LateralBarRight';
import Task from '../Task/Task';
import PrincipalContainer from '../PrincipalContainer';
import CentralTask from '../CentralTask/CentralTask';
import NextStep from '../NextStep/NextStep';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

const MainContent = () => {
  const [showLateralBar, setShowLateralBar] = useState(true);

  const hideShowLateralBar = () => {
    setShowLateralBar(false);
  }

  const ShowLateralBar = () => {
    setShowLateralBar(true);
  }

  return (
    <BoxAltertive>

      <LateralBar />

      <Routes>
        <Route path="/task/:idProjeto" element={<Task toogleLateralBar={hideShowLateralBar} />} />
        <Route path="/next-step" element={<NextStep />} />
        <Route path="/" element={<PrincipalContainer toogleLateralBar={ShowLateralBar} />} />
        <Route path="/central-task/:sprintId" element={<CentralTask toogleLateralBar={hideShowLateralBar} />} />
      </Routes>

      <LateralBarRight showLateralBar={showLateralBar} />
    </BoxAltertive>
  );
};

export default MainContent;
