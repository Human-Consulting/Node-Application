import { HeaderContent, MidleCarrousel, PrincipalContainerStyled, TituloHeader } from './PrincipalContainer.styles'
import { Avatar, Stack, TextField, Button } from '@mui/material'
import ProjectsCard from '../ProjectsCard/ProjectsCard'
import { ShaderGradient, ShaderGradientCanvas } from 'shadergradient';
import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal'
import FormsProjeto from './../Forms/FormsProjeto.jsx';
import { useParams } from 'react-router';

const PrincipalContainer = ({ toogleLateralBar, atualizarProjetos, projetos, usuarios }) => {
  
  const { nomeEmpresa, idEmpresa } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [projeto, setProjeto] = useState(null);
  const [projetosFiltrados, setProjetosFiltrados] = useState([]);

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  const filtrarProjetos = (texto) => {
    if (texto !== '') {
      const textoLower = texto.toLowerCase();
      const projetosFiltrados = projetos.filter(projeto => {
        const palavras = (projeto.descricao ?? '').toLowerCase().split(' ');
        return palavras.some(palavra => palavra.startsWith(textoLower));
      });
      setProjetosFiltrados(projetosFiltrados);

    } else {
      setProjetosFiltrados(projetos);
    }
  }

  useEffect(() => {
    toogleLateralBar();
    setProjetosFiltrados(projetos);
  }, [projetos]);

  const toogleModal = (projeto) => {
    setProjeto(projeto);
    setShowModal(!showModal);
  };

  return (
    <PrincipalContainerStyled>
      <HeaderContent>
        <ShaderGradientCanvas
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            pointerEvents: 'none'

          }}
        >

          <ShaderGradient
            control='query'
            urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=2.8&cPolarAngle=80&cameraZoom=8.3&color1=%23606080&color2=%238d7dca&color3=%234e5e8c&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=60&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=2.4&positionX=-1.3&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=40&rotationY=170&rotationZ=-60&shader=defaults&type=sphere&uAmplitude=1.7&uDensity=1.2&uFrequency=0&uSpeed=0.1&uStrength=2.1&uTime=8&wireframe=false&zoomOut=true'
          />

        </ShaderGradientCanvas>
        <Stack sx={{ flexDirection: 'row', width: '100%', gap: '1rem', position: 'relative', zIndex: '6', alignItems: 'center' }}>
          <Avatar sx={{ background: 'none', border: '1px solid gray' }}>OP</Avatar>
          <TextField
            onChange={(e) => filtrarProjetos(e.target.value)}
            label={
              <span>
                Pesquise um projeto da <strong style={{ color: '#90caf9' }}>{usuarioLogado.nomeEmpresa}</strong>
              </span>
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
          <Button onClick={() => toogleModal(null)}
            variant="contained">
            CRIAR NOVO PROJETO
          </Button>
        </Stack>
        <TituloHeader>Meus projetos</TituloHeader>
      </HeaderContent>
      <MidleCarrousel>
        {projetosFiltrados.map(projeto => (
          <ProjectsCard idEmpresa={idEmpresa} projeto={projeto} toogleProjetoModal={toogleModal} atualizarProjetos={atualizarProjetos} ></ProjectsCard>
        ))}
        {usuarioLogado.permissao.includes('CONSULTOR') ?
          <ProjectsCard toogleProjetoModal={toogleModal} ></ProjectsCard>
          : null}
      </MidleCarrousel>
      <Modal
        showModal={showModal}
        fechar={toogleModal}
        form={<FormsProjeto projeto={projeto} toogleModal={toogleModal} atualizarProjetos={atualizarProjetos} usuarios={usuarios} fkEmpresa={idEmpresa} />}
      >
      </Modal>
    </PrincipalContainerStyled>

  )
}

export default PrincipalContainer
