import { Stack, Typography, Button } from '@mui/material'
import { BoxDetail, ContainerBack, DashContainer, DashKpi, KpiContainer, TextDefault, TextDefaultKpi, Title } from './Dashboard.styles'
import { ShaderGradient, ShaderGradientCanvas } from 'shadergradient'
import LineChart from './LineChart/LineChart'
import MinimalBarChart from './BarChart/BarChart'
import AreaData from '../../Atoms/AreaData/AreaData'
import LensIcon from '@mui/icons-material/Lens';
import RadialChart from './RadialChart'
import { useEffect, useState } from 'react'
import { getEmpresaAtual } from '../../Utils/cruds/CrudsEmpresa'
import { getProjetoAtual } from '../../Utils/cruds/CrudsProjeto'
import { useNavigate, useParams } from 'react-router'
import CheckIcon from '@mui/icons-material/Check';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import Modal from '../Modal/Modal'
import FormsFinanceiro from '../Forms/FormsFinanceiro'

const Dashboard = ({ toogleLateralBar, showTitle }) => {

  const { idEmpresa, nomeEmpresa, descricaoProjeto, idProjeto } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    toogleLateralBar();
    atualizarEntidade();
  }, [idProjeto])

  const handleOpenProject = async () => {
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}`)
  }

  const handleOpenRoadmap = async () => {
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}/Roadmap/${descricaoProjeto}/${Number(idProjeto)}`)
  }

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  const [entidade, setEntidade] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const atualizarEntidade = async () => {
    const entidadeData = idProjeto ? await getProjetoAtual(idProjeto) : await getEmpresaAtual(idEmpresa);
    setEntidade(entidadeData);
    console.log(entidadeData);

    setLoading(false);
  }

  const toogleModal = () => {
    setShowModal(!showModal);
  };

  if (loading) return (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <CircularProgress size={50} />
      <TextDefault sx={{ mt: 2 }}>Carregando dados {entidade?.idEmpresa ? "da empresa" : "do projeto"}...</TextDefault>
    </Stack>
  );

  const totalTarefas = entidade.areas.reduce((total, area) => total + area.valor, 0);

  const renderIcon = () => {

    if (entidade.progresso == 100) {
      return (
        <CheckIcon sx={{ border: 'solid #2196f3 2px', borderRadius: '50%', fontSize: `${200 * 0.6}px` }} />
      );
    }

    if (!entidade.comImpedimento) {
      return (
        <CheckIcon sx={{ border: 'solid green 2px', borderRadius: '50%', fontSize: `${200 * 0.6}px` }} />
      );
    }
    if (entidade.comImpedimento && entidade.progresso < 50) {
      return (
        <PriorityHighIcon sx={{ border: 'solid red 2px', borderRadius: '50%', fontSize: `${200 * 0.6}px` }} />
      );
    }

    return (
      <PriorityHighIcon sx={{ border: 'solid orange 2px', borderRadius: '50%', fontSize: `${200 * 0.6}px` }} />
    );
  };

  return (
    <ContainerBack>
      {showTitle ?
        <>
          <ShaderGradientCanvas
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 5,
              pointerEvents: 'none',

            }}>
            <ShaderGradient
              control='query'
              urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=2.8&cPolarAngle=80&cameraZoom=8.3&color1=%23606080&color2=%238d7dca&color3=%234e5e8c&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=60&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=2.4&positionX=-1.3&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=40&rotationY=170&rotationZ=-60&shader=defaults&type=sphere&uAmplitude=1.7&uDensity=1.2&uFrequency=0&uSpeed=0.1&uStrength=2.1&uTime=8&wireframe=false&zoomOut=true'
            />

          </ShaderGradientCanvas>
        </>
        : null}
      <Stack sx={{ width: '100%', height: '90vh%', overflowY: 'hidden', gap: '2rem', flex: '0 0 auto', position: 'relative', zIndex: '1000' }}>
        <KpiContainer>
          {showTitle ? <Typography variant="h3" mt={3} mb={2} sx={{ display: 'flex', alignItems: 'center', position: 'relative', fontFamily: "Bebas Neue" }}><ArrowCircleLeftOutlinedIcon sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1 }} onClick={handleOpenProject} />{idProjeto ? descricaoProjeto : nomeEmpresa} - Dashboard {idProjeto ? <Button variant='contained' sx={{ cursor: 'pointer', position: 'absolute', right: 0 }} onClick={handleOpenRoadmap}>Ir para Roadmap</Button> : null}</Typography> : <Stack sx={{ marginTop: '1.5rem' }} />}

          <DashContainer>
            <Stack sx={{ gap: 4 }}>
              <DashKpi>
                <Stack sx={{ bgcolor: '#0d0d0d', padding: '0rem 1rem', borderRadius: '20px', width: '100%', height: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                  <Stack sx={{ alignItems: 'start' }}>
                    <TextDefaultKpi sx={{ fontWeight: '300', fontSize: '20px' }}>Total de {entidade?.idEmpresa ? "Projetos" : "Sprints"}</TextDefaultKpi>
                    <TextDefaultKpi sx={{ fontSize: '18px' }}>{entidade.totalItens}</TextDefaultKpi>
                  </Stack>
                  <LensIcon sx={{ fontSize: '2.5rem', color: '#d4d4d4' }}></LensIcon>
                </Stack>

                <Stack sx={{ bgcolor: '#0d0d0d', borderRadius: '20px', width: '100%', height: '220%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ width: '50%', heigth: '50%', textAlign: 'center' }}>
                    {renderIcon()}
                  </div>
                  <RadialChart progresso={entidade.progresso}></RadialChart>
                </Stack>

                <Stack sx={{ bgcolor: '#0d0d0d', padding: '0rem 1rem', borderRadius: '20px', width: '100%', height: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                  <Stack sx={{ alignItems: 'start' }}>
                    <TextDefaultKpi sx={{ fontWeight: '300', fontSize: '20px' }}>Responsável</TextDefaultKpi>
                    <TextDefaultKpi sx={{ fontSize: '18px' }}>{entidade.nomeResponsavel}</TextDefaultKpi>
                  </Stack>
                  <LensIcon sx={{ fontSize: '2.5rem', color: '#d4d4d4' }}></LensIcon>
                </Stack>

              </DashKpi>
              <Stack sx={{ bgcolor: '#0d0d0d', borderRadius: '20px', width: 'calc(100% + 1rem)', height: 'calc(60% + 1rem)', alignItems: 'center', justifyContent: 'center' }}>
                <LineChart orcamento={entidade.orcamento} financeiros={entidade.financeiroResponseDtos}></LineChart>
              </Stack>
            </Stack>

            <Stack sx={{ bgcolor: '#0d0d0d', borderRadius: '20px', width: '70%', height: 'calc(90% + 1rem)', padding: '1rem', justifyContent: 'space-between' }}>
              <MinimalBarChart areas={entidade.areas}></MinimalBarChart>

              <Stack sx={{ gap: '1rem' }}>
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
                    <TextDefault>Carregando áreas...</TextDefault>
                  )}
                </Stack>
              </Stack>

            </Stack>
          </DashContainer>
        </KpiContainer>
      </Stack>
      <Modal showModal={showModal} fechar={toogleModal}
        form={<FormsFinanceiro toogleModal={toogleModal} />}
      ></Modal>
    </ContainerBack >
  )
}

export default Dashboard