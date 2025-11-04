import { BodyCard, BoxBody, HeaderCard, Progress, ProgressBar, StatusCircle, Subtitle, Title } from './MiniProjectsCard.styles'
import { Stack } from '@mui/material'
import { useNavigate, useParams } from 'react-router';
import { useWarningValidator } from '../../Utils/useWarning';

function MiniProjectsCard({ entidade, tipo }) {

  const { nomeEmpresa, idEmpresa } = useParams();

  const navigate = useNavigate()

  const handleOpenProject = () => {
    if (nomeEmpresa == 'Empresas') navigate(`/Home/${entidade.nome}/${Number(entidade.idEmpresa)}`);
    else navigate(`/Home/${nomeEmpresa}/${Number(idEmpresa)}/Roadmap/${entidade.nome || entidade.titulo}/${Number(entidade.idProjeto)}`);
  }

  return (
    <>
      {entidade != null ?
        <BoxBody onClick={handleOpenProject} finalizado={entidade.progresso == 100}>
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
              <Title>{entidade.titulo || entidade.nome}</Title>
            </Stack>
            <Subtitle>{entidade.nomeResponsavel || entidade.nomeDiretor || "Sem responsável"}</Subtitle>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <ProgressBar>
                <Progress sx={{ width: `${entidade.progresso}%` }} />
              </ProgressBar>
              <Subtitle>{entidade.progresso}%</Subtitle>
            </Stack>
          </BodyCard>
          <StatusCircle //sx={{ border: `3px solid ${statusColor}` }}
          >
            {useWarningValidator(entidade)}
          </StatusCircle>

        </BoxBody>
        : tipo == "impedimento" ?
          <BoxBody>
            <BodyCard sx={{ top: '25%', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <Title>{nomeEmpresa == 'Empresas' ? "Empresas" : "Projetos"} voando 🚀</Title>
            </BodyCard>

          </BoxBody>
          :
          <BoxBody>
            <BodyCard sx={{ top: '25%', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <Title>{nomeEmpresa == 'Empresas' ? "Empresas" : "Projeto"} em andamento.</Title>
            </BodyCard>

          </BoxBody>
      }
    </>
  )
}

export default MiniProjectsCard
