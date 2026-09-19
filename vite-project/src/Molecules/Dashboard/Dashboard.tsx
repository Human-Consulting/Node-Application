import { Stack, Typography, Button, Tooltip, Badge } from '@mui/material'
import { DashKpi, ContainerBack, DashContainer, KpiContainer, TextDefaultKpi, TextDefault, Infos } from './Dashboard.styles'
import LineChart from './LineChart/InvestimentoChart'
import RadialChart from './RadialChart'
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getEmpresaAtual } from '../../Utils/cruds/CrudsEmpresa'
import { getDashboard, getBurndown } from '../../Utils/cruds/CrudsProjeto'
import { Empresa } from '../../Utils/cruds/CrudsEmpresa'
import { Investimento } from '../../Utils/cruds/CrudsInvestimento'
import { useNavigate, useParams } from 'react-router'
import { ArrowCircleLeftOutlined, CalendarMonth, ColorLens } from '@mui/icons-material';
import Modal from '../Modal/Modal'
import ModalTarefas from '../Modais/ModalTarefas/ModalTarefas';
import ModalCores from '../Modais/ModalCores/ModalCores';
import Shader from '../Shader/Shader'
import { Load } from '../../Utils/Load'
import GraficoTarefas from './GraficoTarefas/GraficoTarefas'
import GraficoBurndown, { BurndownData } from './GráficoBurndown/GraficoBurndown'
import { Kpis } from './PizzaChart'
import ModalInvestimento from '../Mudal2/ModalInvestimento'
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Usuario } from '../../Utils/cruds/CrudsUsuario'

interface UsuarioLogadoExtras {
  qtdTarefas?: number;
  comImpedimento?: boolean;
  permissao?: string;
  tarefasVinculadas?: unknown[];
}

interface DashboardResponsavel {
  nome?: string;
  [key: string]: unknown;
}

interface DashboardArea {
  nome?: string;
  valor?: number;
  [key: string]: unknown;
}

interface DashboardUsuarioStat extends Usuario {
  qtdTarefas?: number;
}

interface DashboardEntidade {
  idEmpresa?: number;
  totalItens?: number;
  responsavel?: DashboardResponsavel | null;
  comImpedimento?: boolean;
  progresso?: number;
  orcamento?: number;
  financeiroResponseDtos?: Investimento[];
  usuarios?: DashboardUsuarioStat[];
  areas?: DashboardArea[];
  [key: string]: unknown;
}

interface DashboardProps {
  toogleLateralBar: () => void;
  showTitle?: boolean;
  telaAtual: () => void;
  usuarios?: Usuario[];
  kpis?: Kpis | null;
}

const Dashboard = ({ toogleLateralBar, showTitle, telaAtual, usuarios, kpis }: DashboardProps) => {

  const { idEmpresa, nomeEmpresa, tituloProjeto, idProjeto } = useParams();
  const queryClient = useQueryClient();

  const { usuario } = useAuth();
  const usuarioLogado = usuario as (typeof usuario & UsuarioLogadoExtras);
  const { color1, color2, color3, animate } = useTheme();

  const [investimento, setInvestimento] = useState<Investimento | null>(null);

  const navigate = useNavigate();

  const [popoverInvestimentoAnchor, setPopoverInvestimentoAnchor] = useState<boolean | null>(false);

  const [anchorTarefa, setAnchorTarefa] = useState<HTMLElement | null>(null);
  const [anchorCores, setAnchorCores] = useState<HTMLElement | null>(null);

  const handleBadgeClickTarefa = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorTarefa(event.currentTarget);
  };

  const handleBadgeClickCores = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorCores(event.currentTarget);
  };

  const handlePopoverCloseTarefa = () => {
    setAnchorTarefa(null);
  };

  const handlePopoverCloseCores = () => {
    setAnchorCores(null);
  };

  const openPopoverTarefas = Boolean(anchorTarefa);
  const openPopoverCores = Boolean(anchorCores);

  useEffect(() => {
    toogleLateralBar();
    telaAtual();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idProjeto])

  const handleOpenProject = async () => {
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}`)
  }

  const handleOpenRoadmap = async () => {
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}/Roadmap/${tituloProjeto}/${Number(idProjeto)}`)
  }

  const [showModal, setShowModal] = useState(false);

  const dashboardQuery = useQuery<DashboardEntidade>({
    queryKey: ['dashboard', idProjeto],
    queryFn: () => getDashboard(idProjeto as string) as Promise<DashboardEntidade>,
    enabled: !!idProjeto,
  });

  const burndownQuery = useQuery<BurndownData>({
    queryKey: ['burndown', idProjeto],
    queryFn: () => getBurndown(idProjeto as string) as Promise<BurndownData>,
    enabled: !!idProjeto,
  });

  const empresaAtualQuery = useQuery<Empresa | null>({
    queryKey: ['empresaAtual', idEmpresa],
    queryFn: () => getEmpresaAtual(idEmpresa as string) as Promise<Empresa | null>,
    enabled: !idProjeto && !!idEmpresa,
  });

  const entidade = ((idProjeto ? dashboardQuery.data : empresaAtualQuery.data) || {}) as DashboardEntidade;
  const burndown = (burndownQuery.data || {}) as BurndownData;
  const loading = idProjeto
    ? (dashboardQuery.isPending || burndownQuery.isPending)
    : empresaAtualQuery.isPending;

  const atualizarEntidade = async () => {
    if (idProjeto) {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['dashboard', idProjeto] }),
        queryClient.invalidateQueries({ queryKey: ['burndown', idProjeto] }),
      ]);
    } else {
      await queryClient.invalidateQueries({ queryKey: ['empresaAtual', idEmpresa] });
    }
  }

  const toogleModal = (investimento: Investimento | null) => {
    // setShowModal(!showModal);
    setPopoverInvestimentoAnchor(!popoverInvestimentoAnchor);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    investimento != null ? setInvestimento(investimento) : setInvestimento(null);
  };

  if (loading) return <Load />;

  return (
    <ContainerBack>
      {showTitle ?
        <>
          <Shader animate={animate} color1={color1} color2={color2} color3={color3} index={5} />
        </>
        : null}
      <KpiContainer>
        {showTitle ? <Typography variant="h3" sx={{ display: 'flex', alignItems: 'center', fontFamily: "Bebas Neue", zIndex: 2 }}>
          <ArrowCircleLeftOutlined sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1 }} onClick={handleOpenProject} />{idProjeto ? tituloProjeto : nomeEmpresa} - Dashboard {idProjeto ?
            <Stack sx={{ position: 'fixed', right: '2%', display: 'flex', flexDirection: 'row', gap: 1.5, alignItems: 'center' }}>
              <Button variant='contained' sx={{ cursor: 'pointer' }} onClick={handleOpenRoadmap}>Ir para Roadmap</Button>
              <Tooltip title="Tarefas abertas em seu nome.">
                <Badge onClick={handleBadgeClickTarefa}
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '1.25rem',
                      height: '26px',
                      width: '26px',
                      cursor: 'pointer'
                    }
                  }} badgeContent={usuarioLogado?.qtdTarefas} color={usuarioLogado?.comImpedimento ? "error" : "primary"}>
                  <CalendarMonth sx={{ fontSize: 32, cursor: 'pointer' }} />
                </Badge>
              </Tooltip>
              <Tooltip title="Editar cor de fundo.">
                <ColorLens onClick={handleBadgeClickCores as unknown as React.MouseEventHandler<SVGSVGElement>}
                  sx={{
                    height: '40px',
                    width: '40px',
                    cursor: 'pointer'
                  }} />
              </Tooltip>
            </Stack>
            : null}</Typography> : <Stack sx={{ marginTop: '1.5rem' }} />}

        <DashContainer>
          <Stack sx={{ justifyContent: 'space-between', gap: '1rem', flex: 1 }}>
            <DashKpi>
              <Stack sx={{ gap: '1rem', width: '50%' }}>
                <Infos>
                  <Stack sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <TextDefaultKpi sx={{ fontWeight: '300', fontSize: '20px' }}>Total de {entidade?.idEmpresa ? "Projetos:" : "Sprints:"}</TextDefaultKpi>
                    <TextDefaultKpi sx={{ fontSize: '18px' }}>{entidade.totalItens}</TextDefaultKpi>
                  </Stack>
                </Infos>

                <Infos>
                  <Stack sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <TextDefaultKpi sx={{ fontWeight: '300', fontSize: '20px' }}>{idProjeto ? "Responsável:" : "Diretor:"}</TextDefaultKpi>
                    <TextDefaultKpi sx={{ fontSize: '18px' }}>{entidade?.responsavel?.nome || "Sem responsável"}</TextDefaultKpi>
                  </Stack>
                </Infos>
              </Stack>

              <Stack sx={{ bgcolor: '#101010', borderRadius: '20px', flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                {entidade.comImpedimento && <RadialChart comImpedimento={entidade.comImpedimento} progresso={100}></RadialChart>}
                <RadialChart comImpedimento={null} progresso={entidade.progresso}></RadialChart>
              </Stack>

            </DashKpi>

            <LineChart orcamento={entidade.orcamento} financeiros={entidade.financeiroResponseDtos} toogleModal={toogleModal} atualizarEntidade={atualizarEntidade}></LineChart>
          </Stack>

          <Stack sx={{ width: '40%', gap: '1rem', justifyContent: 'space-between' }}>

            <GraficoTarefas entidade={entidade} usuarios={entidade.usuarios} />

            <GraficoBurndown dados={burndown} kpis={kpis} />

          </Stack>
        </DashContainer>
      </KpiContainer>

      <ModalInvestimento
        open={Boolean(popoverInvestimentoAnchor)}
        onClose={() => setPopoverInvestimentoAnchor(null)}
        toogleModal={toogleModal}
        investimento={investimento}
        atualizarEntidade={atualizarEntidade}
      >
      </ModalInvestimento>

      <ModalTarefas
        tarefas={usuarioLogado?.tarefasVinculadas as never[] | undefined}
        open={openPopoverTarefas}
        anchorEl={anchorTarefa}
        onClose={handlePopoverCloseTarefa}
      />
      <ModalCores
        open={openPopoverCores}
        anchorEl={anchorCores}
        onClose={handlePopoverCloseCores}
      />
    </ContainerBack >
  )
}

export default Dashboard
