import { useRef } from 'react'
import { KpiFinalizados, LateralNavBar, MiniCarrousel, SkipLeft, SkipRigth, Slide } from './LateralBarRight.styles'
import MiniProjectsCard from '../MiniProjectsCard/MiniProjectsCard'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MockList from '../../Mock/MockList/MockList';
import { Title } from '../ProjectsCard/ProjectsCard.styles';
import { Stack } from '@mui/material';
import { TituloHeader } from '../PrincipalContainer/PrincipalContainer.styles';

const LateralBarRight = () => {
  let idx = 0
  let idxTwo = 0
  const carrousel = useRef(null)
  const carrouselTwo = useRef(null)
  const caosList = MockList.filter(item => item.status.toLowerCase().includes('caos'))
  const finalizadosList = MockList.filter(item => item.status.toLowerCase().includes('ok'))

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
          <Title sx={{ position: 'absolute', top: '28px', left: '50%', transform: 'translate(-50%)' }}>impedimentos</Title>
          <SkipLeft onClick={handleLeftSkip}><ArrowLeftIcon sx={{ color: '#1d1d1d' }} /></SkipLeft>
          <Slide ref={carrousel}>
            {caosList.map(Card => (
              <MiniProjectsCard image={Card.image} subtitle={Card.subtitle} title={Card.title} key={Card.id} numberId={Card.id}  progress={Card.progresso} status={Card.status} />
            ))}
          </Slide>
          <SkipRigth onClick={handleRightSkip}><ArrowRightIcon sx={{ color: '#1d1d1d' }} /></SkipRigth>
        </MiniCarrousel>
      </Stack>

      <Stack sx={{gap: '8px'}}>
      <Title sx={{width: '100%', textAlign: 'center'}}>Não finalizados</Title>
        <KpiFinalizados><TituloHeader sx={{color: '#FF0707', height: '72px'}}>{caosList.length}</TituloHeader></KpiFinalizados>
      </Stack>

      <Stack>
        <MiniCarrousel>
          <Title sx={{ position: 'absolute', top: '28px', left: '50%', transform: 'translate(-50%)' }}>finalizados</Title>
          <SkipLeft onClick={handleLeftSkipTwo}><ArrowLeftIcon sx={{ color: '#1d1d1d' }} /></SkipLeft>
          <Slide ref={carrouselTwo}>
            {finalizadosList.map(Card => (
              <MiniProjectsCard image={Card.image} subtitle={Card.subtitle} title={Card.title} key={Card.id} numberId={Card.id} progress={Card.progresso} status={Card.status} />
            ))}
          </Slide>
          <SkipRigth onClick={handleRightSkipTwo}><ArrowRightIcon sx={{ color: '#1d1d1d' }} /></SkipRigth>
        </MiniCarrousel>
      </Stack>

    </LateralNavBar>
  )
}

export default LateralBarRight
