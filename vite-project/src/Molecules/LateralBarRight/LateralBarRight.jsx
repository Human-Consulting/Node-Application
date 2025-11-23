import { useRef, useState } from 'react'
import { LateralNavBar, Section, Divisor, Title, Slide, SkipButton, KpiFinalizados } from './LateralBarRight.styles'
import MiniProjectsCard from '../MiniProjectsCard/MiniProjectsCard'
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { Stack, useTheme } from '@mui/material';
import { TituloHeader } from '../PrincipalContainer/PrincipalContainer.styles';
import { useParams } from 'react-router';

const LateralBarRight = ({ showLateralBar, kpis }) => {
  const theme = useTheme(); // 👈 AQUI PEGAMOS O TEMA

  if (!showLateralBar) return null;

  const { nomeEmpresa } = useParams();

  const [idx, setIdx] = useState(0);
  const [idxTwo, setIdxTwo] = useState(0);
  const carrousel = useRef(null);
  const carrouselTwo = useRef(null);

  const caosList = kpis?.impedidos || [];
  const noneList = kpis?.totalAndamento || 0;
  const finalizadosList = kpis?.finalizadas || [];

  const handleRightSkip = () => {
    if (idx < caosList.length - 1) {
      const novo = idx + 1;
      setIdx(novo);
      carrousel.current.style.transform = `translateX(${-novo * (100 / caosList.length)}%)`;
    }
  };

  const handleLeftSkip = () => {
    if (idx > 0) {
      const novo = idx - 1;
      setIdx(novo);
      carrousel.current.style.transform = `translateX(${-novo * (100 / caosList.length)}%)`;
    }
  };

  const handleRightSkipTwo = () => {
    if (idxTwo < finalizadosList.length - 1) {
      const novo = idxTwo + 1;
      setIdxTwo(novo);
      carrouselTwo.current.style.transform = `translateX(${-novo * (100 / finalizadosList.length)}%)`;
    }
  };

  const handleLeftSkipTwo = () => {
    if (idxTwo > 0) {
      const novo = idxTwo - 1;
      setIdxTwo(novo);
      carrouselTwo.current.style.transform = `translateX(${-novo * (100 / finalizadosList.length)}%)`;
    }
  };

  return (
    <LateralNavBar>
      <Section>
        {caosList.length > 1 && idx > 0 && (
          <SkipButton lado="esquerda" onClick={handleLeftSkip}>
            <ArrowLeft sx={{ color: theme.palette.text.primary }} />
          </SkipButton>
        )}

        <Divisor>
          <Title>Impedidos</Title>
          {caosList.length > 0
            ?
            <Slide
              ref={carrousel}
              style={{ width: `${caosList.length * 100}%` }}>
              {caosList.map((entidade, i) => (
                <MiniProjectsCard key={i} entidade={entidade} tipo="impedimento" />
              ))}
            </Slide>
            :
            <Stack sx={{ height: '80%', justifyContent: 'center', alignItems: 'center', border: 'solid 4px #1A1E22', borderRadius: '10px' }}>
              <Title>{nomeEmpresa == 'Empresas' ? "Empresas" : "Projetos"} voando 🚀</Title>
            </Stack>
          }
        </Divisor>

        {caosList.length > 1 && idx < caosList.length - 1 && (
          <SkipButton lado="direita" onClick={handleRightSkip}>
            <ArrowRight sx={{ color: theme.palette.text.primary }} />
          </SkipButton>
        )}
      </Section>

      <Stack
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          alignItems: 'center',
          marginBlock: '1rem',
          backgroundColor: theme.palette.background.paper, // 👈 TEMA
        }}
      >
        <Title sx={{ width: '100%', textAlign: 'center' }}>Em Andamento</Title>
        <KpiFinalizados>
          <TituloHeader
            sx={{
              color: theme.palette.error.main, // 👈 TEMA
              height: '72px',
            }}
          >
            {noneList}
          </TituloHeader>
        </KpiFinalizados>
      </Stack>

      <Section>
        {finalizadosList.length > 1 && idxTwo > 0 && (
          <SkipButton lado="esquerda" onClick={handleLeftSkipTwo}>
            <ArrowLeft sx={{ color: theme.palette.text.primary }} />
          </SkipButton>
        )}

        <Divisor>
          <Title>Concluídos</Title>
          {finalizadosList.length > 0
            ?
            <Slide
              ref={carrouselTwo}
              style={{ width: `${finalizadosList.length * 100}%` }}>
              {finalizadosList.map((entidade, i) => (
                <MiniProjectsCard key={i} entidade={entidade} tipo="finalizado" />
              ))}
            </Slide>
            :
            <Stack sx={{ height: '80%', justifyContent: 'center', alignItems: 'center', border: 'solid 4px #1A1E22', borderRadius: '10px' }}>
              <Title>{nomeEmpresa == 'Empresas' ? "Empresas" : "Projeto"} em andamento.</Title>
            </Stack>
          }
        </Divisor>

        {finalizadosList.length > 1 && idxTwo < finalizadosList.length - 1 && (
          <SkipButton lado="direita" onClick={handleRightSkipTwo}>
            <ArrowRight sx={{ color: theme.palette.text.primary }} />
          </SkipButton>
        )}
      </Section>
    </LateralNavBar>
  );
};

export default LateralBarRight;
