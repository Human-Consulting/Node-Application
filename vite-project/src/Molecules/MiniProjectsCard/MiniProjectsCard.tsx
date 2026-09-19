import { BodyCard, BoxBody, HeaderCard, Progress, ProgressBar, StatusCircle, Subtitle, Title } from './MiniProjectsCard.styles'
import { Box, Stack } from '@mui/material'
import { useNavigate, useParams } from 'react-router';
import { useWarningValidator, WarningItem } from '../../Utils/useWarning';

export interface MiniProjectsCardEntidade extends WarningItem {
  idProjeto?: number | string;
  idEmpresa?: number | string;
  titulo?: string;
  nome?: string;
  progresso?: number;
  urlImagem?: string;
  responsavel?: { nome?: string; [key: string]: unknown } | null;
  [key: string]: unknown;
}

interface MiniProjectsCardProps {
  entidade?: MiniProjectsCardEntidade | null;
  tipo?: 'impedimento' | 'finalizado' | string;
}

function MiniProjectsCard({ entidade, tipo }: MiniProjectsCardProps) {

  const { nomeEmpresa, idEmpresa } = useParams();

  const navigate = useNavigate()

  const handleOpenProject = () => {
    if (!entidade) return;
    if (nomeEmpresa == 'Empresas') navigate(`/Home/${entidade.nome}/${Number(entidade.idEmpresa)}`);
    else navigate(`/Home/${nomeEmpresa}/${Number(idEmpresa)}/Roadmap/${entidade.nome || entidade.titulo}/${Number(entidade.idProjeto)}`);
  }
  const nomeResponsavel = entidade?.responsavel?.nome || "Sem responsável";
  const warningIcon = useWarningValidator(entidade);
  console.log(entidade);
  return (
    <>
      {entidade ?
        <BoxBody onClick={handleOpenProject} finalizado={entidade.progresso == 100}>
          <HeaderCard
            sx={{
              backgroundImage: `url("data:image/png;base64,${entidade.urlImagem}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }} />
          <BodyCard>
            <Title>{entidade.titulo || entidade.nome}</Title>
            <Subtitle>{nomeResponsavel || "Sem responsável"}</Subtitle>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <ProgressBar>
                <Progress sx={{ width: `${entidade.progresso}%` }} />
              </ProgressBar>
              <Subtitle>{entidade.progresso}%</Subtitle>
            </Stack>
          </BodyCard>
          <StatusCircle>
            {warningIcon}
          </StatusCircle>

        </BoxBody>
        : tipo === "impedimento" ?
          <Box sx={{ border: 'solid blue 1px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Title>{nomeEmpresa == 'Empresas' ? "Empresas" : "Projetos"} voando 🚀</Title>
          </Box>
          :
          <Box sx={{ border: 'solid blue 1px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Title>{nomeEmpresa == 'Empresas' ? "Empresas" : "Projeto"} em andamento.</Title>
          </Box>
      }
    </>
  )
}

export default MiniProjectsCard
