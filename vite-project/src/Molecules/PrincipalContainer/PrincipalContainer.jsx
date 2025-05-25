import { HeaderContent, MidleCarrousel, PrincipalContainerStyled, TituloHeader } from './PrincipalContainer.styles'
import { Stack, TextField, Button, Badge, Avatar } from '@mui/material'
import ProjectsCard from '../ProjectsCard/ProjectsCard'
import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal'
import ModalTarefas from '../ModalTarefas/ModalTarefas'
import FormsProjeto from './../Forms/FormsProjeto.jsx';
import FormsEmpresa from './../Forms/FormsEmpresa.jsx';
import { useNavigate, useParams } from 'react-router';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ConstructionIcon from '@mui/icons-material/Construction';
import ModalCores from '../ModalCores/ModalCores.jsx';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import Shader from '../Shader/Shader.jsx';

const PrincipalContainer = ({ color1, setColor1, color2, setColor2, color3, setColor3, animate, setAnimate, toogleLateralBar, atualizarProjetos, atualizarEmpresas, projetos, empresas, usuarios }) => {

  const navigate = useNavigate();

  const { nomeEmpresa, idEmpresa } = useParams();


  const [showModal, setShowModal] = useState(false);
  const [projeto, setProjeto] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [acao, setAcao] = useState('');
  const [listaFiltrada, setListaFiltrada] = useState([]);


  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
  if (!usuarioLogado.permissao.includes("CONSULTOR") && idEmpresa == 1) navigate(-1);

  const filtrar = (texto) => {
    if (texto !== '') {
      const textoLower = texto.toLowerCase();
      let lista = [];

      if (idEmpresa != 1) {
        lista = projetos.filter(projeto => {
          const palavras = (projeto.descricao ?? '').toLowerCase().split(' ');
          return palavras.some(palavra => palavra.startsWith(textoLower));
        });

      } else {
        lista = empresas.filter(empresa => {
          const palavras = (empresa.nome ?? '').toLowerCase().split(' ');
          return palavras.some(palavra => palavra.startsWith(textoLower));
        });
      }
      setListaFiltrada(lista);

    } else {
      setListaFiltrada(idEmpresa == 1 ? empresas : projetos);
    }
  }

  useEffect(() => {
    toogleLateralBar();
    setListaFiltrada(idEmpresa == 1 && empresas.length > 1 ? empresas.slice(1) : projetos);

  }, [projetos, empresas, idEmpresa]);

  const toogleModal = (entidade, acao) => {
    setAcao(acao);
    setEmpresa(entidade);
    setProjeto(entidade);
    setShowModal(!showModal);
  };

  const handleOpenEmpresas = () => {
    navigate(`/Home/Empresas/${Number(1)}`);
  }

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
  const shaderUrl = 'https://www.shadergradient.co/customize?animate=off&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=2.8&cPolarAngle=80&cameraZoom=8.3&color1=%23606080&color2=%238d7dca&color3=%234e5e8c&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=60&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=2.4&positionX=-1.3&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=40&rotationY=170&rotationZ=-60&shader=defaults&type=sphere&uAmplitude=1.7&uDensity=1.2&uFrequency=0&uSpeed=0.1&uStrength=2.1&uTime=8&wireframe=false&zoomOut=true';

  return (
    <PrincipalContainerStyled>
      <HeaderContent>
        <Shader animate={animate} color1={color1} color2={color2} color3={color3} index={5} />
        <Stack sx={{ flexDirection: 'row', width: '100%', gap: '1rem', position: 'relative', zIndex: '6', alignItems: 'center' }}>
          <Avatar sx={{
            width: 56, height: 56, bgcolor: 'transparent',
            '& img': {
              objectFit: 'cover',
              objectPosition: 'center',
              width: '100%',
              height: '100%',
            }
          }} src={`data:image/png;base64,${empresas[0]?.urlImagem || projetos[0]?.urlImagemEmpresa}`}></Avatar>
          <TextField
            onChange={(e) => filtrar(e.target.value)}
            label=
            {idEmpresa == 1 ?
              <span>Pesquisar por uma empresa...</span>
              :
              <span>Pesquisar um projeto da <strong style={{ color: '#90caf9' }}>{nomeEmpresa}</strong></span>
            }

            size="small"
            sx={{ flex: 1 }}
            autoComplete="off"
            InputLabelProps={{
              sx: {
                color: "white",
                '&.Mui-focused': {
                  color: 'white',
                }
              }
            }}
            InputProps={{
              sx: {
                color: "white",
                '& .MuiOutlinedInput-notchedOutline': {
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#fff'
                }
              }
            }} />
          {
            !usuarioLogado.permissao.includes('CONSULTOR') ?
              <Badge onClick={handleBadgeClickTarefa}
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '1.25rem',
                    height: '26px',
                    width: '26px',
                    cursor: 'pointer'
                  }
                }} badgeContent={usuarioLogado.qtdTarefas} color={usuarioLogado.comImpedimento ? "error" : "primary"}>
                <AssignmentIcon sx={{ fontSize: 32, cursor: 'pointer' }} />
              </Badge>
              : idEmpresa == 1 ?
                <Button onClick={() => toogleModal(null, 'empresa')}
                  variant="contained">
                  CRIAR EMPRESA
                </Button>
                :
                <Button onClick={() => toogleModal(null, 'projeto')}
                  variant="contained">
                  CRIAR PROJETO
                </Button>
          }
          <ColorLensIcon onClick={handleBadgeClickCores}
            sx={{
              height: '40px',
              width: '40px',
              cursor: 'pointer'
            }} />

        </Stack>
        <TituloHeader>{idEmpresa != 1 && usuarioLogado.permissao.includes('CONSULTOR') ? <ArrowCircleLeftOutlinedIcon sx={{ cursor: 'pointer', fontSize: '45px' }} onClick={handleOpenEmpresas} /> : null} {idEmpresa == 1 ? "MINHAS EMPRESAS" : "MEUS PROJETOS"}</TituloHeader>
      </HeaderContent>
      <MidleCarrousel>
        {listaFiltrada?.length > 0 ? (
          listaFiltrada.map(item => (
            <ProjectsCard
              key={item.id}
              item={item}
              toogleModal={toogleModal}
              atualizarProjetos={atualizarProjetos}
              atualizarEmpresas={atualizarEmpresas}
            />
          ))
        ) : (
          <Stack sx={{ justifyContent: 'center', alignItems: 'center', marginTop: '2rem', width: '350%' }}>
            <ConstructionIcon sx={{ fontSize: '5rem' }} />
            Nenhum projeto encontrado!
            {usuarioLogado.permissao?.includes("CONSULTOR") && (
              idEmpresa === 1 ? (
                <Button onClick={() => toogleModal(null, 'empresa')} variant="contained">
                  CRIAR EMPRESA
                </Button>
              ) : (
                <Button onClick={() => toogleModal(null, 'projeto')} variant="contained">
                  CRIAR PROJETO
                </Button>
              )
            )}
          </Stack>
        )}
        {usuarioLogado.permissao.includes('CONSULTOR') ?
          <ProjectsCard toogleModal={toogleModal} ></ProjectsCard>
          : null}
      </MidleCarrousel>
      <Modal
        showModal={showModal}
        fechar={toogleModal}
        form={acao == 'projeto' ? <FormsProjeto projeto={projeto} toogleModal={toogleModal} atualizarProjetos={atualizarProjetos} usuarios={usuarios} fkEmpresa={idEmpresa} />
          :
          <FormsEmpresa empresa={empresa} toogleModal={toogleModal} atualizarEmpresas={atualizarEmpresas} />}
      >
      </Modal>
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
    </PrincipalContainerStyled>

  )
}

export default PrincipalContainer
