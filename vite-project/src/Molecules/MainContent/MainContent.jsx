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
import Chat from '../Chat/Chat';
import { Load } from '../../Utils/Load.jsx';

const MainContent = () => {
  const { idEmpresa, nomeEmpresa } = useParams();

  const [showLateralBar, setShowLateralBar] = useState(true);
  const [diminuirLateralBar, setDiminuirLateralBar] = useState(false);
  const [projetos, setProjetos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [telaAtual, setTelaAtual] = useState('Home');

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
  const stringFinal = usuarioLogado?.cores || "#606080|#8d7dca|#4e5e8c|true";

  const [cor1, cor2, cor3, animateStr] = stringFinal.split("|");

  const [color1, setColor1] = useState(cor1);
  const [color2, setColor2] = useState(cor2);
  const [color3, setColor3] = useState(cor3);
  const [animate, setAnimate] = useState(animateStr === "true");

  const hideLateralBar = () => {
    setShowLateralBar(false);
  }

  const ShowLateralBar = () => {
    setShowLateralBar(true);
  }

  const DiminuirLateralBar = () => {
    setDiminuirLateralBar(true);
  }

  const toogleLateralBar = () => {
    setDiminuirLateralBar(!diminuirLateralBar);
  }

  const atualizarProjetos = async () => {
    const projetos = await getProjetos(Number(idEmpresa));
    setEmpresas([]);
    setProjetos(projetos.content || []);
  };

  const atualizarEmpresas = async () => {
    const empresas = await getEmpresas();
    setEmpresas(empresas.content || []);
    setProjetos([]);
  };

  const buscarUsuarios = async () => {
    const usuarios = await getUsuarios(Number(idEmpresa));
    setUsuarios(usuarios.content || []);
    setLoading(false);
  };

  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      if (nomeEmpresa == "Empresas") await atualizarEmpresas();
      else await atualizarProjetos();
      await buscarUsuarios();
    };
    carregarDados();
  }, [idEmpresa, nomeEmpresa])

  if (loading) return <Load animate={animate} color1={color1} color2={color2} color3={color3} index={0} />;

  return (
    <BoxAltertive>

      <LateralBar projetos={projetos} empresas={empresas} diminuirLateralBar={diminuirLateralBar} toogleLateralBar={toogleLateralBar} telaAtual={telaAtual} />

      <Routes>
        <Route path="/" element={<PrincipalContainer telaAtual={() => setTelaAtual("Home")} toogleLateralBar={ShowLateralBar} atualizarProjetos={atualizarProjetos} atualizarEmpresas={atualizarEmpresas} projetos={projetos} empresas={empresas} usuarios={usuarios} color1={color1} setColor1={setColor1} color2={color2} setColor2={setColor2} color3={color3} setColor3={setColor3} animate={animate} setAnimate={setAnimate} />} />

        <Route path="/Roadmap/:tituloProjeto/:idProjeto" element={<Task telaAtual={() => setTelaAtual("Roadmap")} toogleLateralBar={hideLateralBar} atualizarProjetos={atualizarProjetos} usuarios={usuarios} showTitle={true} color1={color1} color2={color2} color3={color3} animate={animate} />} />

        <Route path="/Roadmap/:tituloProjeto/:idProjeto/Backlog/:tituloSprint/:idSprint/:index" element={<CentralTask toogleLateralBar={hideLateralBar} atualizarProjetos={atualizarProjetos} usuarios={usuarios} color1={color1} color2={color2} color3={color3} animate={animate} />} />

        <Route path="/Usuarios" element={<Usuarios telaAtual={() => setTelaAtual("Usuarios")} toogleLateralBar={hideLateralBar} usuarios={usuarios} atualizarUsuarios={buscarUsuarios} color1={color1} color2={color2} color3={color3} animate={animate} />} />

        <Route path="/Dash" element={<Dashboard telaAtual={() => setTelaAtual("Dash")} toogleLateralBar={hideLateralBar} showTitle={true} color1={color1} color2={color2} color3={color3} animate={animate} usuarios={usuarios} />} />

        <Route path="/Dash/:tituloProjeto/:idProjeto" element={<Dashboard telaAtual={() => setTelaAtual("Dash")} toogleLateralBar={hideLateralBar} showTitle={true} color1={color1} color2={color2} color3={color3} animate={animate} usuarios={usuarios} />} />

        <Route path="/Chat" element={<Chat telaAtual={() => setTelaAtual("Chat")} toogleLateralBar={hideLateralBar} color1={color1} color2={color2} color3={color3} animate={animate} usuarios={usuarios} />} />

        <Route path="/next-step/:tituloProjeto/:idProjeto" element={<NextStep toogleLateralBar={hideLateralBar} />} />
      </Routes>

      <LateralBarRight showLateralBar={showLateralBar} projetos={projetos} empresas={empresas} />
    </BoxAltertive>
  );
};

export default MainContent;