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
import Chat from '../Chat/Chat';

const MainContent = () => {
  const { idEmpresa } = useParams();

  const [showLateralBar, setShowLateralBar] = useState(true);
  const [projetos, setProjetos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
  const stringFinal = usuarioLogado?.cores || "#606080|#8d7dca|#4e5e8c|true";

  const [cor1, cor2, cor3, animateStr] = stringFinal.split("|");

  const [color1, setColor1] = useState(cor1);
  const [color2, setColor2] = useState(cor2);
  const [color3, setColor3] = useState(cor3);
  const [animate, setAnimate] = useState(animateStr === "true");

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
    setLoading(false);
  };

  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      if (Number(idEmpresa) === 1) await atualizarEmpresas();
      else await atualizarProjetos();
      await buscarUsuarios();
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
        <Route path="/" element={<PrincipalContainer toogleLateralBar={ShowLateralBar} atualizarProjetos={atualizarProjetos} atualizarEmpresas={atualizarEmpresas} projetos={projetos} empresas={empresas} usuarios={usuarios} color1={color1} setColor1={setColor1} color2={color2} setColor2={setColor2} color3={color3} setColor3={setColor3} animate={animate} setAnimate={setAnimate}/>} />

        <Route path="/Roadmap/:tituloProjeto/:idProjeto" element={<Task toogleLateralBar={hideShowLateralBar} atualizarProjetos={atualizarProjetos} usuarios={usuarios} showTitle={true} color1={color1} color2={color2} color3={color3} animate={animate}/>} />

        <Route path="/Roadmap/:tituloProjeto/:idProjeto/Tarefas/:idSprint/:index" element={<CentralTask toogleLateralBar={hideShowLateralBar} atualizarProjetos={atualizarProjetos} usuarios={usuarios} color1={color1} color2={color2} color3={color3} animate={animate}/>} />

        <Route path="/Usuarios" element={<Usuarios toogleLateralBar={hideShowLateralBar} usuarios={usuarios} atualizarUsuarios={buscarUsuarios} color1={color1} color2={color2} color3={color3} animate={animate}/>} />

        <Route path="/Dash" element={<Dashboard toogleLateralBar={hideShowLateralBar} showTitle={true} color1={color1} color2={color2} color3={color3} animate={animate}/>} />

        <Route path="/Dash/:tituloProjeto/:idProjeto" element={<Dashboard toogleLateralBar={hideShowLateralBar} showTitle={true} color1={color1} color2={color2} color3={color3} animate={animate} />} />

        <Route path="/Chat" element={<Chat toogleLateralBar={hideShowLateralBar} showTitle={true} />} />

        <Route path="/next-step/:tituloProjeto/:idProjeto" element={<NextStep toogleLateralBar={hideShowLateralBar} />} />
      </Routes>

      <LateralBarRight showLateralBar={showLateralBar} projetos={projetos} empresas={empresas} />
    </BoxAltertive>
  );
};

export default MainContent;