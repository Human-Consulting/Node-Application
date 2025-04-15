import { BodyCard, BoxBody, HeaderCard, Progress, ProgressBar, StatusCircle, Subtitle, Title } from './MiniProjectsCard.styles'
import { Stack } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

function MiniProjectsCard({ projeto }) {

  let statusColor = '#08D13D';
  if (projeto) {
    if (projeto.progresso == 100) {
      statusColor = '#2196f3';
    }
    else if (projeto.comImpedimento == false) {
      statusColor = '#08D13D';
    } else if (projeto.comImpedimento == true && projeto.progresso > 50) {
      statusColor = '#CED108';
    } else {
      statusColor = '#FF0707';
    }
  }

  const renderIconeStatusProjeto = () => {
    if (projeto.progresso == 100) return (<CheckIcon sx={{ fontSize: '25px' }} />);
    if (projeto.comImpedimento) return (<PriorityHighIcon sx={{ fontSize: '16px' }} />);

    return (<CheckIcon sx={{ fontSize: '16px' }} />);
  };

  return (
    <>
      {projeto != null ?
        <BoxBody>
          <HeaderCard
            sx={{
              backgroundImage: `url("data:image/png;base64,${projeto.urlImagem}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <BodyCard>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Title>{projeto.nomeResponsavel}</Title>
            </Stack>
            <Subtitle>{projeto.descricao}</Subtitle>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <ProgressBar>
                <Progress sx={{ width: `${projeto.progresso}%` }} />
              </ProgressBar>
            </Stack>
          </BodyCard>
          <StatusCircle sx={{ border: `3px solid ${statusColor}` }}>
            {renderIconeStatusProjeto()}
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
