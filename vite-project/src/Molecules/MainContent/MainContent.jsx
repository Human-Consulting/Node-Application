import { BoxAltertive } from './MainContent.styles';
import LateralBar from '../LateralBar';
import LateralBarRight from '../LateralBarRight/LateralBarRight';
import Task from '../Task/Task';
import PrincipalContainer from '../PrincipalContainer'; // Importe o componente PrincipalContainer
import CentralTask from '../CentralTask/CentralTask'; // Importe o componente CentralTask
import NextStep from '../NextStep/NextStep'; // Importe o componente NextStep
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';

const MainContent = () => {
  return (
    <BoxAltertive>
      <LateralBar />

      <Routes>
        <Route path="/task" element={<Task />} />
        <Route path="/next-step" element={<NextStep />} />
        <Route path="/" element={<PrincipalContainer />} />
        <Route path="/central-task/:sprintId" element={<CentralTask />} />
        <Route path="/dash" element={<Dashboard />} />

      </Routes>
      {/* <LateralBarRight /> */}
    </BoxAltertive>
  );
};

export default MainContent;
