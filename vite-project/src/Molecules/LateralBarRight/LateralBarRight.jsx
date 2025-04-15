import { useRef } from 'react'
import { KpiFinalizados, LateralNavBar, MiniCarrousel, SkipLeft, SkipRigth, Slide } from './LateralBarRight.styles'
import MiniProjectsCard from '../MiniProjectsCard/MiniProjectsCard'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Title } from '../ProjectsCard/ProjectsCard.styles';
import { Stack } from '@mui/material';
import { TituloHeader } from '../PrincipalContainer/PrincipalContainer.styles';

const LateralBarRight = ({ showLateralBar, projetos }) => {
  if (!showLateralBar) return null;

  let idx = 0
  let idxTwo = 0
  const carrousel = useRef(null)
  const carrouselTwo = useRef(null)
  const caosList = projetos.filter(item => item.comImpedimento == true);
  const noneList = projetos.filter(item => item.progresso != 100);
  const finalizadosList = projetos.filter(item => item.progresso == 100);

  const handleRightSkip = () => {
    if (idx < caosList.length - 1) {
      idx++;
      carrousel.current.style.transform = `translateX(${-idx * 248}px)`;
    }
  };

  const handleLeftSkip = () => {
    if (idx > 0) {
      idx--;
      carrousel.current.style.transform = `translateX(${-idx * 248}px)`;
    }
  };

  const handleRightSkipTwo = () => {
    if (idxTwo < finalizadosList.length - 1) {
      idxTwo++;
      carrouselTwo.current.style.transform = `translateX(${-idxTwo * 248}px)`;
    }
  };

  const handleLeftSkipTwo = () => {
    if (idxTwo > 0) {
      idxTwo--;
      carrouselTwo.current.style.transform = `translateX(${-idxTwo * 248}px)`;
    }
  };

  return (
    <LateralNavBar>
      <Stack>
        <MiniCarrousel>
          <Title sx={{ position: 'absolute', top: '28px', left: '50%', transform: 'translate(-50%)', textAlign: 'center', width: '100%' }}>Com Impedimentos</Title>
          {caosList.length > 0 ? <SkipLeft onClick={handleLeftSkip} ><ArrowLeftIcon sx={{ color: '#000' }} /></SkipLeft> : null}
          <Slide ref={carrousel}>
            {caosList.length > 0 ? caosList.map(projeto => (
              <MiniProjectsCard projeto={projeto} />
            )) : <MiniProjectsCard projeto={null} />}
          </Slide>
          {caosList.length > 0 ? <SkipRigth onClick={handleRightSkip}><ArrowRightIcon sx={{ color: '#000' }} /></SkipRigth> : null}
        </MiniCarrousel>
      </Stack>

      <Stack sx={{ gap: '8px' }}>
        <Title sx={{ width: '100%', textAlign: 'center' }}>Não Finalizados</Title>
        <KpiFinalizados><TituloHeader sx={{ color: '#FF0707', height: '72px' }}>{noneList.length}</TituloHeader></KpiFinalizados>
      </Stack>

      <Stack>
        <MiniCarrousel>
          <Title sx={{ position: 'absolute', top: '28px', left: '50%', transform: 'translate(-50%)' }}>Finalizados</Title>
          {finalizadosList.length > 0 ? <SkipLeft onClick={handleLeftSkipTwo}><ArrowLeftIcon sx={{ color: '#000' }} /></SkipLeft> : null}
          <Slide ref={carrouselTwo}>
            {finalizadosList.length > 0 ? finalizadosList.map(projeto => (
              <MiniProjectsCard projeto={projeto} />
            )) : <MiniProjectsCard projeto={null} />}
          </Slide>
          {finalizadosList.length > 0 ? <SkipRigth onClick={handleRightSkipTwo}><ArrowRightIcon sx={{ color: '#000' }} /></SkipRigth> : null}
        </MiniCarrousel>
      </Stack>

    </LateralNavBar>
  )
}

export default LateralBarRight
