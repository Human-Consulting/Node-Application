import { Stack, Typography, Button, Tooltip, Badge } from '@mui/material'
import { DashKpi, ContainerBack, DashContainer, KpiContainer, TextDefaultKpi, TextDefault, ChartLateral, Infos } from './Dashboard.styles'
import LineChart from './LineChart/InvestimentoChart'
import RadialChart from './RadialChart'
import { useEffect, useState } from 'react'
import { getEmpresaAtual } from '../../Utils/cruds/CrudsEmpresa'
import { getDashboard, getBurndown } from '../../Utils/cruds/CrudsProjeto'
import { useNavigate, useParams } from 'react-router'
import { ArrowCircleLeftOutlined, CalendarMonth, ColorLens } from '@mui/icons-material';
import Modal from '../Modal/Modal'
import ModalTarefas from '../Modais/ModalTarefas/ModalTarefas';
import ModalCores from '../Modais/ModalCores/ModalCores';
import FormsInvestimento from '../Modal/Forms/FormsInvestimento'
import Shader from '../Shader/Shader'
import { Load } from '../../Utils/Load'
import GraficoTarefas from './GraficoTarefas/GraficoTarefas'
import GraficoBurndown from './GráficoBurndown/GraficoBurndown'

import { useTheme } from "@mui/material/styles";  // <-- ADICIONADO

const Dashboard = ({ toogleLateralBar, showTitle, color1, color2, color3, setColor1, setColor2, setColor3, animate, setAnimate, telaAtual, usuarios, kpis }) => {

  const theme = useTheme(); // <-- ADICIONADO

  const { idEmpresa, nomeEmpresa, tituloProjeto, idProjeto } = useParams();

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  const [investimento, setInvestimento] = useState(null);

  const navigate = useNavigate();

  const [anchorTarefa, setAnchorTarefa] = useState(null);
  const [anchorCores, setAnchorCores] = useState(null);

  const handleBadgeClickTarefa = (event) => {
    setAnchorTarefa(event.currentTarget);
  };

  const handleBadgeClickCores = (event) => {
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
    atualizarEntidade();
  }, [idProjeto])

  const handleOpenProject = async () => {
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}`)
  }

  const handleOpenRoadmap = async () => {
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}/Roadmap/${tituloProjeto}/${Number(idProjeto)}`)
  }

  const [entidade, setEntidade] = useState({});
  const [burndown, setBurndown] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const atualizarEntidade = async () => {
    let entidadeData;
    let burndownData;
    if (idProjeto) {
      entidadeData = await getDashboard(idProjeto)
      burndownData = await getBurndown(idProjeto);
    } else {
      entidadeData = await getEmpresaAtual(idEmpresa);
    }
    setEntidade(entidadeData);
    setBurndown(burndownData);
    setLoading(false);
  }

  const toogleModal = (investimento) => {
    setShowModal(!showModal);
    investimento != null ? setInvestimento(investimento) : setInvestimento(null);
  };

  if (loading) return <Load animate={animate} color1={color1} color2={color2} color3={color3} index={0} />;

  return (
    <ContainerBack style={{ background: theme.palette.background.default }}>  {/* <-- TEMA APLICADO */}
      {showTitle ?
        <>
          <Shader animate={animate} color1={color1} color2={color2} color3={color3} index={5} />
        </>
        : null}
      <KpiContainer>
        {showTitle ? <Typography variant="h3" sx={{ display: 'flex', alignItems: 'center', fontFamily: "Bebas Neue", zIndex: 2 }}>
          <ArrowCircleLeftOutlined sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1, color: theme.palette.custom.textPrimary }} onClick={handleOpenProject} />{idProjeto ? tituloProjeto : nomeEmpresa} - Dashboard {idProjeto ?
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
                  }} badgeContent={usuarioLogado.qtdTarefas} color={usuarioLogado.comImpedimento ? "error" : "primary"}>
                  <CalendarMonth sx={{ fontSize: 32, cursor: 'pointer' }} />
                </Badge>
              </Tooltip>
              <Tooltip title="Editar cor de fundo.">
                <ColorLens onClick={handleBadgeClickCores}
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

            <DashKpi sx={{ background: theme.palette.custom.sidebar }}>  {/* <-- TEMA */}
              <Stack sx={{ gap: '1rem', width: '50%' }}>
                <Infos sx={{ background: theme.palette.background.paper }}>  {/* <-- TEMA */}
                  <Stack sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <TextDefaultKpi sx={{ fontWeight: '300', fontSize: '20px' }}>Total de {entidade?.idEmpresa ? "Projetos:" : "Sprints:"}</TextDefaultKpi>
                    <TextDefaultKpi sx={{ fontSize: '18px' }}>{entidade.totalItens}</TextDefaultKpi>
                  </Stack>
                </Infos>

                <Infos sx={{ background: theme.palette.background.paper }}>  {/* <-- TEMA */}
                  <Stack sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <TextDefaultKpi sx={{ fontWeight: '300', fontSize: '20px' }}>{idProjeto ? "Responsável:" : "Diretor:"}</TextDefaultKpi>
                    <TextDefaultKpi sx={{ fontSize: '18px' }}>{entidade?.responsavel?.nome || "Sem responsável"}</TextDefaultKpi>
                  </Stack>
                </Infos>
              </Stack>

              <Stack sx={{ 
                background: theme.palette.background.paper,   // <-- AQUI TAMBÉM
                borderRadius: '20px',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center'
              }}>
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

      <Modal showModal={showModal} fechar={toogleModal}
        form={<FormsInvestimento toogleModal={toogleModal} investimento={investimento} atualizarEntidade={atualizarEntidade} />}
      ></Modal>

      <ModalTarefas
        tarefas={usuarioLogado.tarefasVinculadas}
        open={openPopoverTarefas}
        anchorEl={anchorTarefa}
        onClose={handlePopoverCloseTarefa}
      />
      <ModalCores
        color1={color1}
        setColor1={setColor1}
        color2={color2}
        setColor2={setColor2}
        color3={color3}
        setColor3={setColor3}
        animate={animate}
        setAnimate={setAnimate}
        open={openPopoverCores}
        anchorEl={anchorCores}
        onClose={handlePopoverCloseCores}
      />
    </ContainerBack>
  )
}

export default Dashboard
