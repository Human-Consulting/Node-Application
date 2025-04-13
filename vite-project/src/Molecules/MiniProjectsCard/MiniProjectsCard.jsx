import { BodyCard, BoxBody, HeaderCard, Progress, ProgressBar, StatusCircle, Subtitle, Title } from './MiniProjectsCard.styles'
import { Stack } from '@mui/material'

function MiniProjectsCard({ projeto }) {
  console.log("ouuuuu");
  let statusColor = '#08D13D';
  if (projeto.comImpedimento == false) {
    statusColor = '#08D13D';
  } else if (projeto.comImpedimento == true && projeto.progresso > 50) {
    statusColor = '#CED108';
  } else {
    statusColor = '#FF0707';
  }

  return (
    <>
      <BoxBody>
        <HeaderCard sx={{ backgroundImage: `URL(${projeto.urlImagem})` }} />
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
    </>
  )
}

export default MiniProjectsCard
