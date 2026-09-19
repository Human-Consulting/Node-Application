import { useRef, useState } from 'react'
import { LateralNavBar, Section, Divisor, Title, Slide, SkipButton, KpiFinalizados } from './LateralBarRight.styles'
import MiniProjectsCard, { MiniProjectsCardEntidade } from '../MiniProjectsCard/MiniProjectsCard'
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { TituloHeader } from '../PrincipalContainer/PrincipalContainer.styles';
import { useParams } from 'react-router';

interface LateralBarRightProps {
  showLateralBar?: boolean;
  // kpis is consumed loosely here (impedidos/totalAndamento/finalizadas)
  // which doesn't line up 1:1 with the array-returning crud signature in
  // CrudsLateralBars.ts — kept intentionally loose rather than forcing a
  // mismatched type onto pre-existing runtime data.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  kpis?: any;
}

const LateralBarRight = ({ showLateralBar, kpis }: LateralBarRightProps) => {
  const { nomeEmpresa } = useParams();

  const [idx, setIdx] = useState(0);
  const [idxTwo, setIdxTwo] = useState(0);
  const carrousel = useRef<HTMLDivElement>(null);
  const carrouselTwo = useRef<HTMLDivElement>(null);

  const caosList = kpis?.impedidos || [];
  const noneList = kpis?.totalAndamento || 0;
  const finalizadosList = kpis?.finalizadas || [];

  const handleRightSkip = () => {
    if (idx < caosList.length - 1) {
      const novo = idx + 1;
      setIdx(novo);
      if (carrousel.current) carrousel.current.style.transform = `translateX(${-novo * (100 / caosList.length)}%)`;
    }
  };

  const handleLeftSkip = () => {
    if (idx > 0) {
      const novo = idx - 1;
      setIdx(novo);
      if (carrousel.current) carrousel.current.style.transform = `translateX(${-novo * (100 / caosList.length)}%)`;
    }
  };

  const handleRightSkipTwo = () => {
    if (idxTwo < finalizadosList.length - 1) {
      const novo = idxTwo + 1;
      setIdxTwo(novo);
      if (carrouselTwo.current) carrouselTwo.current.style.transform = `translateX(${-novo * (100 / finalizadosList.length)}%)`;
    }
  };

  const handleLeftSkipTwo = () => {
    if (idxTwo > 0) {
      const novo = idxTwo - 1;
      setIdxTwo(novo);
      if (carrouselTwo.current) carrouselTwo.current.style.transform = `translateX(${-novo * (100 / finalizadosList.length)}%)`;
    }
  };

  if (!showLateralBar) return null;

  return (
    <LateralNavBar>
      <Section>
        {caosList.length > 1 && idx > 0 && (
          <SkipButton lado="esquerda" onClick={handleLeftSkip}>
            <ArrowLeft sx={{ color: '#000' }} />
          </SkipButton>
        )}

        <Divisor>
          <Title>Impedidos</Title>
          {caosList.length > 0
            ?
            <Slide
              ref={carrousel}
              style={{ width: `${caosList.length * 100}%` }}>
              {caosList.map((entidade: MiniProjectsCardEntidade, i: number) => (
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
            <ArrowRight sx={{ color: '#000' }} />
          </SkipButton>
        )}
      </Section>

      <Stack sx={{ display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center', marginBlock: '1rem' }}>
        <Title sx={{ width: '100%', textAlign: 'center' }}>Em Andamento</Title>
        <KpiFinalizados>
          <TituloHeader sx={{ color: '#FF0707', height: '72px' }}>{noneList}</TituloHeader>
        </KpiFinalizados>
      </Stack>

      <Section>
        {finalizadosList.length > 1 && idxTwo > 0 && (
          <SkipButton lado="esquerda" onClick={handleLeftSkipTwo}>
            <ArrowLeft sx={{ color: '#000' }} />
          </SkipButton>
        )}

        <Divisor>
          <Title>Concluídos</Title>
          {finalizadosList.length > 0
            ?
            <Slide
              ref={carrouselTwo}
              style={{ width: `${finalizadosList.length * 100}%` }}>
              {finalizadosList.map((entidade: MiniProjectsCardEntidade, i: number) => (
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
            <ArrowRight sx={{ color: '#000' }} />
          </SkipButton>
        )}
      </Section>
    </LateralNavBar>
  );
};

export default LateralBarRight;
