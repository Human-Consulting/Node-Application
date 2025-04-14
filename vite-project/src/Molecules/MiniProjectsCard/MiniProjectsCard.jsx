import { BodyCard, BoxBody, HeaderCard, Progress, ProgressBar, StatusCircle, Subtitle, Title } from './MiniProjectsCard.styles'
import { Stack } from '@mui/material'

function MiniProjectsCard({ projeto }) {

  let statusColor = '#08D13D';
  if (projeto?.comImpedimento == false) {
    statusColor = '#08D13D';
  } else if (projeto?.comImpedimento == true && projeto?.progresso > 50) {
    statusColor = '#CED108';
  } else {
    statusColor = '#FF0707';
  }

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
          <StatusCircle sx={{ border: `5px solid ${statusColor}` }}>
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
