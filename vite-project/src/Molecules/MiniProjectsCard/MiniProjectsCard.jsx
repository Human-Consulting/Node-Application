import { BodyCard, BoxBody, HeaderCard, Progress, ProgressBar, StatusCircle, Subtitle, Title } from './MiniProjectsCard.styles'
import { Stack } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { useNavigate, useParams } from 'react-router';

function MiniProjectsCard({ entidade }) {

  let statusColor = '#08D13D';
  if (entidade) {
    if (entidade.progresso == 100) {
      statusColor = '#2196f3';
    }
    else if (entidade.comImpedimento == false) {
      statusColor = '#08D13D';
    } else if (entidade.comImpedimento == true && entidade.progresso > 50) {
      statusColor = '#CED108';
    } else {
      statusColor = '#FF0707';
    }
  }

  const renderIconeStatus = () => {
    if (entidade.progresso == 100) return (<CheckIcon sx={{ fontSize: '25px' }} />);
    if (entidade.comImpedimento) return (<PriorityHighIcon sx={{ fontSize: '16px' }} />);

    return (<CheckIcon sx={{ fontSize: '16px' }} />);
  };

  const { nomeEmpresa, idEmpresa } = useParams();

  const navigate = useNavigate()

  const handleOpenProject = () => {
    if (idEmpresa == 1) navigate(`/Home/${entidade.nome}/${Number(entidade.idEmpresa)}`);
    else navigate(`/Home/${nomeEmpresa}/${Number(idEmpresa)}/Roadmap/${Number(entidade.idProjeto || entidade.idEmpresa)}`);
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
            <Subtitle>{entidade.descricao || entidade.nome}</Subtitle>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <ProgressBar>
                <Progress sx={{ width: `${entidade.progresso}%` }} />
              </ProgressBar>
            </Stack>
          </BodyCard>
          <StatusCircle sx={{ border: `3px solid ${statusColor}` }}>
            {renderIconeStatus()}
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
