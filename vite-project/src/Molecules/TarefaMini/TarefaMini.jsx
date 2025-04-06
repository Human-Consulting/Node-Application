import { BodyCard, BoxBody, Progress, ProgressBar, Subtitle, Title } from './TarefaMini.styles'
import PropTypes from 'prop-types'
import { Button, Stack } from '@mui/material'

function TarefaMini({ indice, title, subtitle, progress, impedimento, finalizado }) {


  return (
    <>

    <BoxBody>
      <BodyCard>
        <Stack sx={{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'start'}}>
      <Title>Tarefa: {indice}</Title>
      <Title>{title}</Title>
        </Stack>
      <Subtitle>Responsavel: {subtitle}</Subtitle>
      <Stack sx={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <ProgressBar>
<Progress sx={{width:  `${progress}%`}} />
        </ProgressBar>
        {progress}%
      </Stack>
      <Stack sx={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
               <Button color='error'  variant={impedimento ? 'contained' : 'outlined'}>impedido</Button>
               <Button  variant={finalizado ? 'contained' : 'outlined'}>finalizado</Button>
       
</Stack>
      
      </BodyCard>
      
        
    </BoxBody>
    </>
  )
}
TarefaMini.propTypes = {
    indice: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired




}
export default TarefaMini
