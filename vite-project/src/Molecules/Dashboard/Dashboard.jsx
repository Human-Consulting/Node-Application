import { Stack, Typography, Button } from '@mui/material'
import { DashKpi, ContainerBack, DashContainer, KpiContainer, TextDefault, TextDefaultKpi } from './Dashboard.styles'
import LineChart from './LineChart/LineChart'
import MinimalBarChart from './BarChart/BarChart'
import AreaData from '../../Atoms/AreaData/AreaData'
import LensIcon from '@mui/icons-material/Lens';
import RadialChart from './RadialChart'
import { useEffect, useState } from 'react'
import { getEmpresaAtual } from '../../Utils/cruds/CrudsEmpresa'
import { getProjetoAtual } from '../../Utils/cruds/CrudsProjeto'
import { useNavigate, useParams } from 'react-router'
import CircularProgress from '@mui/material/CircularProgress';
import { ArrowCircleLeftOutlined, Check, Block } from '@mui/icons-material';
import Modal from '../Modal/Modal'
import FormsInvestimento from '../Forms/FormsInvestimento'
import Shader from '../Shader/Shader'

const Dashboard = ({ toogleLateralBar, showTitle, color1, color2, color3, animate, telaAtual }) => {

  const { idEmpresa, nomeEmpresa, tituloProjeto, idProjeto } = useParams();

  const [investimento, setInvestimento] = useState(null);

  const navigate = useNavigate();

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
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const atualizarEntidade = async () => {
    const entidadeData = idProjeto ? await getProjetoAtual(idProjeto) : await getEmpresaAtual(idEmpresa);
    setEntidade(entidadeData);

    setLoading(false);
  }

  const toogleModal = (investimento) => {
    setShowModal(!showModal);
    investimento != null ? setInvestimento(investimento) : setInvestimento(null);
  };

  if (loading) return (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <CircularProgress size={50} />
      <TextDefault sx={{ mt: 2 }}>Carregando dados {entidade?.idEmpresa ? "da empresa" : "do projeto"}...</TextDefault>
    </Stack>
  );

  const totalTarefas = entidade.areas?.length > 0 ? entidade.areas.reduce((total, area) => total + area.valor, 0) : 0;

  const renderIcon = () => {

    if (entidade.progresso == 100) {
      return (
        <Check sx={{ border: 'solid green 2px', borderRadius: '50%', fontSize: `${200 * 0.6}px` }} />
      );
    }

    if (!entidade.comImpedimento) {
      return (
        <Check sx={{ border: 'solid #2196f3 2px', borderRadius: '50%', fontSize: `${200 * 0.6}px` }} />
      );
    }
    if (entidade.comImpedimento && entidade.progresso < 50) {
      return (
        <Block sx={{ border: 'solid red 2px', borderRadius: '50%', fontSize: `${200 * 0.6}px` }} />
      );
    }

    return (
      <Block sx={{ border: 'solid orange 2px', borderRadius: '50%', fontSize: `${200 * 0.6}px` }} />
    );
  };

  return (
    <ContainerBack>
      {showTitle ?
        <>
          <Shader animate={animate} color1={color1} color2={color2} color3={color3} index={5} />
        </>
        : null}
      <KpiContainer>
        {showTitle ? <Typography variant="h3" mt={3} mb={2} sx={{ display: 'flex', alignItems: 'center', position: 'relative', fontFamily: "Bebas Neue" }}><ArrowCircleLeftOutlined sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1 }} onClick={handleOpenProject} />{idProjeto ? tituloProjeto : nomeEmpresa} - Dashboard {idProjeto ? <Button variant='contained' sx={{ cursor: 'pointer', position: 'absolute', right: 0 }} onClick={handleOpenRoadmap}>Ir para Roadmap</Button> : null}</Typography> : <Stack sx={{ marginTop: '1.5rem' }} />}

        <DashContainer>
          <Stack sx={{ justifyContent: 'space-between', gap: '3rem', flex: 1 }}>
            <DashKpi>
              <Stack sx={{ bgcolor: '#101010', padding: '0rem 1rem', borderRadius: '20px', width: '100%', height: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                <Stack sx={{ alignItems: 'start' }}>
                  <TextDefaultKpi sx={{ fontWeight: '300', fontSize: '20px' }}>Total de {entidade?.idEmpresa ? "Projetos" : "Sprints"}</TextDefaultKpi>
                  <TextDefaultKpi sx={{ fontSize: '18px' }}>{entidade.totalItens}</TextDefaultKpi>
                </Stack>
                <LensIcon sx={{ fontSize: '2.5rem', color: '#d4d4d4' }}></LensIcon>
              </Stack>

              <Stack sx={{ bgcolor: '#101010', borderRadius: '20px', width: '100%', height: '220%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {/* <div style={{ width: '50%', heigth: '50%', textAlign: 'center' }}> */}
                {/* {renderIcon()} */}
                {/* </div> */}
                <Stack sx={{
                  width: 'calc(200px * 0.6)',
                  height: 'calc(200px * 0.6)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '15px',
                  textAlign: 'center',
                  borderRadius: '50%',
                  borderColor: entidade.progresso == 100 ? '#4caf50' : entidade.comImpedimento ? '#f44336' : '#2196f3',
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}>{entidade.progresso == 100 ? `${idProjeto ? "Projeto Finalizado" : "Projetos Finalizados"}` : entidade.comImpedimento ? "Projeto com Impedimento" : `${idProjeto ? "Projeto" : "Projetos"} em Andamento`}</Stack>
                <RadialChart progresso={entidade.progresso}></RadialChart>
              </Stack>

              <Stack sx={{ bgcolor: '#101010', padding: '0rem 1rem', borderRadius: '20px', width: '100%', height: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                <Stack sx={{ alignItems: 'start' }}>
                  <TextDefaultKpi sx={{ fontWeight: '300', fontSize: '20px' }}>{idProjeto ? "Responsável" : "Diretor"}</TextDefaultKpi>
                  <TextDefaultKpi sx={{ fontSize: '18px' }}>{entidade.nomeResponsavel}</TextDefaultKpi>
                </Stack>
                <LensIcon sx={{ fontSize: '2.5rem', color: '#d4d4d4' }}></LensIcon>
              </Stack>
            </DashKpi>
            <LineChart orcamento={entidade.orcamento} financeiros={entidade.financeiroResponseDtos} toogleModal={toogleModal} atualizarEntidade={atualizarEntidade}></LineChart>
          </Stack>

          <Stack sx={{ bgcolor: '#101010', borderRadius: '20px', width: '40%', height: 'calc(100%)', padding: '1rem', justifyContent: 'space-between', gap: '1rem' }}>

            <Stack sx={{ gap: '2rem', flex: 1 }}>
              <MinimalBarChart areas={entidade.areas} sx={{ flex: 1 }}></MinimalBarChart>
              
              <Stack>
                <TextDefault sx={{ color: '#eeeeee' }}>Áreas com mais tarefa</TextDefault>
                <TextDefault sx={{ fontSize: '12px', fontWeight: '400' }}>Nos ultimos meses</TextDefault>
              </Stack>

              <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                {entidade.areas?.length ? (
                  entidade.areas.slice(0, 3).map((area, index) => (
                    <AreaData key={index} area={area.nome} valor={area.valor} total={totalTarefas} />
                  ))
                ) : (
                  null
                )}
              </Stack>
            </Stack>

          </Stack>
        </DashContainer>
      </KpiContainer>
      <Modal showModal={showModal} fechar={toogleModal}
        form={<FormsInvestimento toogleModal={toogleModal} investimento={investimento} atualizarEntidade={atualizarEntidade} />}
      ></Modal>
    </ContainerBack >
  )
}

export default Dashboard