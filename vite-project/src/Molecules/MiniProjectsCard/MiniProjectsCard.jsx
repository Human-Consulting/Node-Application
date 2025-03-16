import { BodyCard, BoxBody, HeaderCard, Progress, ProgressBar, StatusCircle, Subtitle, Title } from './MiniProjectsCard.styles'
import PropTypes from 'prop-types'
import { Stack } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';

function MiniProjectsCard({status, title, subtitle, image, progress}) {
let statusColor = '#08D13D'
if(status == 'ok') {
 statusColor = '#08D13D'

} else if(status == 'attention'){
 statusColor = '#CED108'
} else {
 statusColor = '#FF0707'
}

  return (
    <>

    <BoxBody>
      <HeaderCard sx={{backgroundImage: `URL(${image})`}}/>
      <BodyCard>
        <Stack sx={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <Title>{title}</Title>
<MoreVertIcon sx={{ color:'#fff' }}/>
        </Stack>
      <Subtitle>{subtitle}</Subtitle>
      <Stack sx={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <ProgressBar>
<Progress sx={{width:  `${progress}%`}} />
        </ProgressBar>
      </Stack>
      </BodyCard>
    <StatusCircle sx={{border: `5px solid ${statusColor}`}}>
    </StatusCircle>
        
    </BoxBody>
    </>
  )
}
MiniProjectsCard.propTypes = {
    status: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired




}
export default MiniProjectsCard
