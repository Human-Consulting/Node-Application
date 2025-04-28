import { Stack } from '@mui/material'
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
import { getEmpresas } from '../../Utils/cruds/CrudsEmpresa';
import CircularProgress from '@mui/material/CircularProgress';

const MainContent = () => {
  const { nomeEmpresa, idEmpresa } = useParams();

  const [showLateralBar, setShowLateralBar] = useState(true);
  const [projetos, setProjetos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);

  const hideShowLateralBar = () => {
    setShowLateralBar(false);
  }

  const ShowLateralBar = () => {
    setShowLateralBar(true);
  }

  const atualizarProjetos = async () => {
    const projetos = await getProjetos(Number(idEmpresa));
    setEmpresas([]);
    setProjetos(projetos);
  };

  const atualizarEmpresas = async () => {
    const empresas = await getEmpresas();
    setEmpresas(empresas);
    setProjetos([]);
  };

  const buscarUsuarios = async () => {
    const usuarios = await getUsuarios(Number(idEmpresa));
    setUsuarios(usuarios);
  };

  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      if (Number(idEmpresa) === 1) await atualizarEmpresas();
      else await atualizarProjetos();
      await buscarUsuarios();
      setLoading(false);
    };
    carregarDados();
  }, [idEmpresa])

  if (loading) return (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <CircularProgress size={50} />
      <h1 sx={{ mt: 2 }}>Carregando dados da empresa...</h1>
    </Stack>
  );

  return (
    <BoxAltertive>

      <LateralBar projetos={projetos} empresas={empresas} />

      <Routes>
        <Route path="/" element={<PrincipalContainer toogleLateralBar={ShowLateralBar} atualizarProjetos={atualizarProjetos} atualizarEmpresas={atualizarEmpresas} projetos={projetos} empresas={empresas} usuarios={usuarios} />} />

        <Route path="/Roadmap/:descricaoProjeto/:idProjeto" element={<Task toogleLateralBar={hideShowLateralBar} atualizarProjetos={atualizarProjetos} usuarios={usuarios} showTitle={true} />} />

        <Route path="/Roadmap/:descricaoProjeto/:idProjeto/Tarefas/:idSprint/:index" element={<CentralTask toogleLateralBar={hideShowLateralBar} atualizarProjetos={atualizarProjetos} usuarios={usuarios} />} />

        <Route path="/Usuarios" element={<Usuarios toogleLateralBar={hideShowLateralBar} usuarios={usuarios} atualizarUsuarios={buscarUsuarios} />} />

        <Route path="/Dash" element={<Dashboard toogleLateralBar={hideShowLateralBar} showTitle={true} />} />

        <Route path="/Dash/:descricaoProjeto/:idProjeto" element={<Dashboard toogleLateralBar={hideShowLateralBar} showTitle={true} />} />

        <Route path="/next-step/:descricaoProjeto/:idProjeto" element={<NextStep toogleLateralBar={hideShowLateralBar} />} />
      </Routes>

      <LateralBarRight showLateralBar={showLateralBar} projetos={projetos} empresas={empresas} />
    </BoxAltertive>
  );
};

export default MainContent;