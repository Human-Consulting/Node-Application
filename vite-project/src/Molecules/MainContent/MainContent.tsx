import { BoxAltertive } from './MainContent.styles';
import LateralBar from '../LateralBar';
import LateralBarRight from '../LateralBarRight/LateralBarRight';
import Task from '../Task/Task';
import PrincipalContainer from '../PrincipalContainer/PrincipalContainer';
import CentralTask from '../CentralTask/CentralTask';
import { Routes, Route, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProjetos, Projeto } from '../../Utils/cruds/CrudsProjeto';
import { getUsuarios } from '../../Utils/cruds/CrudsUsuario';
import Usuarios from '../Usuarios/Usuarios';
import Dashboard from '../Dashboard/Dashboard';
import { getEmpresas, Empresa } from '../../Utils/cruds/CrudsEmpresa';
import Chat from '../Chat/Chat';
import { Load } from '../../Utils/Load';
import { getKpis, getMenuRapido } from '../../Utils/cruds/CrudsLateralBars';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { ThemeProvider } from '../../context/ThemeContext';

interface MenuRapidoParams {
  page: number;
  nome: string | null;
  impedidos: boolean | null;
  concluidos: boolean | null;
}

const MainContent = () => {
  const { idEmpresa, nomeEmpresa } = useParams();
  const queryClient = useQueryClient();

  const [showLateralBar, setShowLateralBar] = useState(true);
  const [diminuirLateralBar, setDiminuirLateralBar] = useState(false);

  const [telaAtual, setTelaAtual] = useState('Home');

  const entidadeAtual = nomeEmpresa === 'Empresas' ? 'empresas' : 'projetos';

  // Pagination/filter state that drives each query's key. Reset whenever the
  // route's empresa/entidade changes, mirroring the old carregarDados() reset.
  const [projetosPage, setProjetosPage] = useState(0);
  const [projetosNome, setProjetosNome] = useState<string | null>(null);

  const [empresasPage, setEmpresasPage] = useState(0);
  const [empresasNome, setEmpresasNome] = useState<string | null>(null);

  const [usuariosPage, setUsuariosPage] = useState(0);
  const [usuariosNome, setUsuariosNome] = useState<string | null>(null);

  const [menuRapidoParams, setMenuRapidoParams] = useState<MenuRapidoParams>({ page: 0, nome: null, impedidos: null, concluidos: null });

  useEffect(() => {
    setProjetosPage(0);
    setProjetosNome(null);
    setEmpresasPage(0);
    setEmpresasNome(null);
    setUsuariosPage(0);
    setUsuariosNome(null);
    setMenuRapidoParams({ page: 0, nome: null, impedidos: null, concluidos: null });
  }, [nomeEmpresa]);

  const hideLateralBar = () => {
    setShowLateralBar(false);
  }

  const ShowLateralBar = () => {
    setShowLateralBar(true);
  }

  const toogleLateralBar = () => {
    setDiminuirLateralBar(!diminuirLateralBar);
  }

  const projetosQuery = useQuery({
    queryKey: ['projetos', idEmpresa, projetosPage, projetosNome],
    queryFn: () => getProjetos(Number(idEmpresa), projetosPage, 6, projetosNome),
    enabled: !!idEmpresa && nomeEmpresa !== 'Empresas',
  });

  const empresasQuery = useQuery({
    queryKey: ['empresas', empresasPage, empresasNome],
    queryFn: () => getEmpresas(empresasPage, 6, empresasNome),
    enabled: nomeEmpresa === 'Empresas',
  });

  const usuariosQuery = useQuery({
    queryKey: ['usuarios', idEmpresa, usuariosPage, usuariosNome],
    queryFn: () => getUsuarios(Number(idEmpresa), usuariosPage, 4, usuariosNome, false),
    enabled: !!idEmpresa,
  });

  const menuRapidoQuery = useQuery({
    queryKey: ['menuRapido', entidadeAtual, idEmpresa, menuRapidoParams],
    queryFn: () => getMenuRapido(
      entidadeAtual,
      idEmpresa ?? '',
      menuRapidoParams.page,
      5,
      menuRapidoParams.nome,
      menuRapidoParams.impedidos,
      menuRapidoParams.concluidos
    ),
    enabled: !!idEmpresa,
  });

  const kpisQuery = useQuery({
    queryKey: ['kpis', entidadeAtual, idEmpresa],
    queryFn: () => getKpis(entidadeAtual, idEmpresa ?? ''),
    enabled: !!idEmpresa,
  });

  // projetosQuery/empresasQuery resolve to a paged-response-or-array union
  // (the crud functions fall back to a bare `[]` on error) — `.content` only
  // exists on the paged-response branch, so the extraction is cast rather
  // than narrowed, mirroring what the fallback already collapses to (`[]`).
  const projetos: Projeto[] = (projetosQuery.data as { content?: Projeto[] } | undefined)?.content || [];
  const totalPagesProjetos: number = (projetosQuery.data as { totalPages?: number } | undefined)?.totalPages || 1;

  const empresas: Empresa[] = (empresasQuery.data as { content?: Empresa[] } | undefined)?.content || [];
  const totalPagesEmpresas: number = (empresasQuery.data as { totalPages?: number } | undefined)?.totalPages || 1;

  const usuarios = usuariosQuery.data?.content || [];
  const sizeUsuarios = usuariosQuery.data?.pageSize || 10;
  const totalPagesUsuarios = usuariosQuery.data?.totalPages || 1;

  // menuRapido/kpis are consumed by LateralBar/LateralBarRight/Dashboard as
  // ad-hoc shapes (paged content, impedidos/totalAndamento/finalizadas) that
  // don't line up with the array return types declared in
  // CrudsLateralBars.ts — kept loose rather than forcing a mismatched type.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const menuRapido: any = menuRapidoQuery.data || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const kpis: any = kpisQuery.data || [];

  // Kept as the same-named callbacks the routed children/modals already call
  // today (some with explicit page/nome args, some with none to mean
  // "refresh"), now backed by React Query instead of manual setState.
  const atualizarProjetos = async (page = 0, nome: string | null = null) => {
    setProjetosPage(page);
    setProjetosNome(nome);
    return queryClient.fetchQuery({
      queryKey: ['projetos', idEmpresa, page, nome],
      queryFn: () => getProjetos(Number(idEmpresa), page, 6, nome),
    });
  };

  const atualizarEmpresas = async (page = 0, nome: string | null = null) => {
    setEmpresasPage(page);
    setEmpresasNome(nome);
    return queryClient.fetchQuery({
      queryKey: ['empresas', page, nome],
      queryFn: () => getEmpresas(page, 6, nome),
    });
  };

  const buscarUsuarios = async (page = 0, nome: string | null = null) => {
    setUsuariosPage(page);
    setUsuariosNome(nome);
    return queryClient.fetchQuery({
      queryKey: ['usuarios', idEmpresa, page, nome],
      queryFn: () => getUsuarios(Number(idEmpresa), page, 4, nome, false),
    });
  };

  const atualizarLaterais = async ({ page = 0, nome = null, impedidos = null, concluidos = null }: Partial<MenuRapidoParams> = {}) => {
    const params: MenuRapidoParams = { page, nome, impedidos, concluidos };
    setMenuRapidoParams(params);
    return queryClient.fetchQuery({
      queryKey: ['menuRapido', entidadeAtual, idEmpresa, params],
      queryFn: () => getMenuRapido(entidadeAtual, idEmpresa ?? '', page, 5, nome, impedidos, concluidos),
    });
  };

  const loading =
    (nomeEmpresa === 'Empresas' ? empresasQuery.isPending : projetosQuery.isPending) ||
    usuariosQuery.isPending ||
    menuRapidoQuery.isPending ||
    kpisQuery.isPending;

  return (
    <ThemeProvider>
      {loading ? <Load /> : (
        <BoxAltertive>

          <LateralBar menuRapido={menuRapido} kpis={kpis} atualizarLaterais={atualizarLaterais} diminuirLateralBar={diminuirLateralBar} toogleLateralBar={toogleLateralBar} telaAtual={telaAtual} />

          <Routes>
            <Route path="/" element={<ProtectedRoute><PrincipalContainer telaAtual={() => setTelaAtual("Home")} toogleLateralBar={ShowLateralBar} atualizarProjetos={atualizarProjetos} atualizarEmpresas={atualizarEmpresas} projetos={projetos} pagesProjetos={totalPagesProjetos} empresas={empresas} pagesEmpresas={totalPagesEmpresas} usuarios={usuarios} /></ProtectedRoute>} />

            <Route path="/Roadmap/:tituloProjeto/:idProjeto" element={<ProtectedRoute><Task telaAtual={() => setTelaAtual("Roadmap")} toogleLateralBar={hideLateralBar} atualizarProjetos={atualizarLaterais} usuarios={usuarios} sizeUsuarios={sizeUsuarios} pagesUsuarios={totalPagesUsuarios} atualizarUsuarios={buscarUsuarios} /></ProtectedRoute>} />

            <Route path="/Roadmap/:tituloProjeto/:idProjeto/Backlog/:tituloSprint/:idSprint/:index" element={<ProtectedRoute><CentralTask toogleLateralBar={hideLateralBar} atualizarProjetos={atualizarLaterais} usuarios={usuarios} sizeUsuarios={sizeUsuarios} pagesUsuarios={totalPagesUsuarios} atualizarUsuarios={buscarUsuarios} /></ProtectedRoute>} />

            <Route path="/Usuarios" element={<ProtectedRoute><Usuarios telaAtual={() => setTelaAtual("Usuarios")} toogleLateralBar={hideLateralBar} /></ProtectedRoute>} />

            <Route path="/Dash" element={<ProtectedRoute><Dashboard telaAtual={() => setTelaAtual("Dash")} toogleLateralBar={hideLateralBar} showTitle={true} usuarios={usuarios} kpis={kpis} /></ProtectedRoute>} />

            <Route path="/Dash/:tituloProjeto/:idProjeto" element={<ProtectedRoute><Dashboard telaAtual={() => setTelaAtual("Dash")} toogleLateralBar={hideLateralBar} showTitle={true} usuarios={usuarios} /></ProtectedRoute>} />

            <Route path="/Chat" element={<ProtectedRoute><Chat telaAtual={() => setTelaAtual("Chat")} toogleLateralBar={hideLateralBar} usuarios={usuarios} sizeUsuarios={sizeUsuarios} pagesUsuarios={totalPagesUsuarios} atualizarUsuarios={buscarUsuarios} /></ProtectedRoute>} />
          </Routes>

          <LateralBarRight showLateralBar={showLateralBar} kpis={kpis} />
        </BoxAltertive>
      )}
    </ThemeProvider>
  );
};

export default MainContent;
