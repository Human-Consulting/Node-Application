import { BoxAltertive } from './MainContent.styles';
import LateralBar from '../LateralBar';
import LateralBarRight from '../LateralBarRight/LateralBarRight';
import Task from '../Task/Task';
import PrincipalContainer from '../PrincipalContainer/PrincipalContainer.jsx';
import CentralTask from '../CentralTask/CentralTask';
import { Routes, Route, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProjetos } from '../../Utils/cruds/CrudsProjeto';
import { getUsuarios } from '../../Utils/cruds/CrudsUsuario';
import Usuarios from '../Usuarios/Usuarios';
import Dashboard from '../Dashboard/Dashboard';
import { getEmpresas } from '../../Utils/cruds/CrudsEmpresa';
import Chat from '../Chat/Chat';
import { Load } from '../../Utils/Load.jsx';
import { getKpis, getMenuRapido } from '../../Utils/cruds/CrudsLateralBars.jsx';

const MainContent = () => {
  const { idEmpresa, nomeEmpresa } = useParams();

  const [showLateralBar, setShowLateralBar] = useState(true);
  const [diminuirLateralBar, setDiminuirLateralBar] = useState(false);
  
  const [projetos, setProjetos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [kpis, setKpis] = useState([]);
  const [menuRapido, setMenuRapido] = useState([]);

  const [loading, setLoading] = useState(true);
  const [telaAtual, setTelaAtual] = useState('Home');

  const [sizeUsuarios, setSizeUsuarios] = useState(5);
  const [totalPagesUsuarios, setTotalPagesUsuarios] = useState(1);

  const [sizeProjetos, setSizeProjetos] = useState(5);
  const [totalPagesProjetos, setTotalPagesProjetos] = useState(1);

  const [sizeEmpresas, setSizeEmpresas] = useState(5);
  const [totalPagesEmpresas, setTotalPagesEmpresas] = useState(1);

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

  const toogleLateralBar = () => {
    setDiminuirLateralBar(!diminuirLateralBar);
  }

  const atualizarProjetos = async (page = 0, nome = null) => {
    const projetosRetornados = await getProjetos(Number(idEmpresa), page, 2, nome);
    setEmpresas([]);
    setProjetos(projetosRetornados?.content || []);
    setSizeProjetos(projetosRetornados?.pageSize || 10);
    setTotalPagesProjetos(projetosRetornados?.totalPages || 1);
    atualizarLaterais({idEmpresa});
  };

  const atualizarEmpresas = async (page = 0, nome = null) => {
    console.log("Atualizando empresssasa")
    const empresasRetornadas = await getEmpresas(page, 10, nome);
    setProjetos([]);
    setEmpresas(empresasRetornadas?.content || []);
    setSizeEmpresas(empresasRetornadas?.pageSize || 10);
    setTotalPagesEmpresas(empresasRetornadas?.totalPages || 1);
    atualizarLaterais({ idEmpresa: null });
  };


  const buscarUsuarios = async (page = 0, size = 4, nome = null) => {
    const usuariosRetornados = await getUsuarios(Number(idEmpresa), page, size, nome);
    setUsuarios(usuariosRetornados?.content || []);
    setSizeUsuarios(usuariosRetornados?.pageSize || 10);
    setTotalPagesUsuarios(usuariosRetornados?.totalPages || 1);
    setLoading(false);
  };

  const atualizarLaterais = async ({ idEmpresa = null, page = 0, nome = null, impedidos = null, concluidos = null,
  }) => {
    const entidade = nomeEmpresa === 'Empresas' ? 'empresas' : 'projetos';
    const kpiRetornadas = await getKpis(entidade, idEmpresa);
    setKpis(kpiRetornadas);
    const menuRapidoRetornados = await getMenuRapido(entidade, idEmpresa, page, 10, nome, impedidos, concluidos);
    setMenuRapido(menuRapidoRetornados);
  };

  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      if (nomeEmpresa == "Empresas") await atualizarEmpresas();
      else await atualizarProjetos();
      atualizarLaterais({ entidade: nomeEmpresa === "Empresas" ? 'empresas' : 'projetos', idEmpresa: idEmpresa });
      await buscarUsuarios();
    };
    carregarDados();
  }, [idEmpresa, nomeEmpresa])

  if (loading) return <Load animate={animate} color1={color1} color2={color2} color3={color3} index={0} />;

  return (
    <BoxAltertive>

      <LateralBar projetos={projetos} empresas={empresas} menuRapido={menuRapido} kpis={kpis} atualizarLaterais={atualizarLaterais} diminuirLateralBar={diminuirLateralBar} toogleLateralBar={toogleLateralBar} telaAtual={telaAtual} />

      <Routes>
        <Route path="/" element={<PrincipalContainer telaAtual={() => setTelaAtual("Home")} toogleLateralBar={ShowLateralBar} atualizarProjetos={atualizarProjetos} atualizarEmpresas={atualizarEmpresas} projetos={projetos} pagesProjetos={totalPagesProjetos} empresas={empresas} pagesEmpresas={totalPagesEmpresas} usuarios={usuarios} color1={color1} setColor1={setColor1} color2={color2} setColor2={setColor2} color3={color3} setColor3={setColor3} animate={animate} setAnimate={setAnimate} />} />

        <Route path="/Roadmap/:tituloProjeto/:idProjeto" element={<Task telaAtual={() => setTelaAtual("Roadmap")} toogleLateralBar={hideLateralBar} atualizarProjetos={atualizarProjetos} usuarios={usuarios} sizeUsuarios={sizeUsuarios} pagesUsuarios={totalPagesUsuarios} atualizarUsuarios={buscarUsuarios} color1={color1} setColor1={setColor1} color2={color2} setColor2={setColor2} color3={color3} setColor3={setColor3} animate={animate} setAnimate={setAnimate} />} />

        <Route path="/Roadmap/:tituloProjeto/:idProjeto/Backlog/:tituloSprint/:idSprint/:index" element={<CentralTask toogleLateralBar={hideLateralBar} atualizarProjetos={atualizarProjetos} usuarios={usuarios} sizeUsuarios={sizeUsuarios} pagesUsuarios={totalPagesUsuarios} atualizarUsuarios={buscarUsuarios} color1={color1} setColor1={setColor1} color2={color2} setColor2={setColor2} color3={color3} setColor3={setColor3} animate={animate} setAnimate={setAnimate} />} />

        <Route path="/Usuarios" element={<Usuarios telaAtual={() => setTelaAtual("Usuarios")} toogleLateralBar={hideLateralBar} usuarios={usuarios} sizeUsuarios={sizeUsuarios} pagesUsuarios={totalPagesUsuarios} atualizarUsuarios={buscarUsuarios} color1={color1} color2={color2} color3={color3} animate={animate} />} />

        <Route path="/Dash" element={<Dashboard telaAtual={() => setTelaAtual("Dash")} toogleLateralBar={hideLateralBar} showTitle={true} color1={color1} setColor1={setColor1} color2={color2} setColor2={setColor2} color3={color3} setColor3={setColor3} animate={animate} setAnimate={setAnimate} usuarios={usuarios} />} />

        <Route path="/Dash/:tituloProjeto/:idProjeto" element={<Dashboard telaAtual={() => setTelaAtual("Dash")} toogleLateralBar={hideLateralBar} showTitle={true} color1={color1} setColor1={setColor1} color2={color2} setColor2={setColor2} color3={color3} setColor3={setColor3} animate={animate} setAnimate={setAnimate} usuarios={usuarios} />} />

        <Route path="/Chat" element={<Chat telaAtual={() => setTelaAtual("Chat")} toogleLateralBar={hideLateralBar} color1={color1} color2={color2} color3={color3} animate={animate} usuarios={usuarios} />} />
      </Routes>

      <LateralBarRight showLateralBar={showLateralBar} kpis={kpis} />
    </BoxAltertive>
  );
};

export default MainContent;