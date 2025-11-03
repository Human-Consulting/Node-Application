import { BodyCard, BoxBody, HeaderCard, Progress, ProgressBar, StatusCircle, Subtitle, Title } from './MiniProjectsCard.styles'
import { Stack } from '@mui/material'
import { Check, Block } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router';
import { useWarningValidator } from '../../Utils/useWarning';

function MiniProjectsCard({ entidade }) {

    const {componente} = useWarningValidator(entidade?.comImpedimento, entidade?.dtFim)

  const { nomeEmpresa, idEmpresa } = useParams();

  const navigate = useNavigate()

  const handleOpenProject = () => {
    if (idEmpresa == 1) navigate(`/Home/${entidade.nome}/${Number(entidade.idEmpresa)}`);
    else navigate(`/Home/${nomeEmpresa}/${Number(idEmpresa)}/Roadmap/${entidade.titulo}/${Number(entidade.idProjeto)}`);
  }

  return (
    <>
      {entidade != null ?
        <BoxBody onClick={handleOpenProject}>
          <HeaderCard
            sx={{
              backgroundImage: `url("data:image/png;base64,${entidade.urlImagem}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <BodyCard>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Title>{entidade.nomeResponsavel || entidade.nomeDiretor}</Title>
            </Stack>
            <Subtitle>{entidade.titulo || entidade.nome}</Subtitle>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <ProgressBar>
                <Progress sx={{ width: `${entidade.progresso}%` }} />
              </ProgressBar>
            </Stack>
          </BodyCard>
          <StatusCircle >
            {componente}
          </StatusCircle>

        </BoxBody>
        :
        <BoxBody>
          <BodyCard sx={{ top: '25%', justifyContent: 'center', alignItems: 'center' }}>
            <Title>Sem dados.</Title>
          </BodyCard>

        </BoxBody>
      }
    </>
  )
}

export default MiniProjectsCard
