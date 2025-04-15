import PropTypes from 'prop-types'
import { AreaDataBox, Number, Progress, ProgressBar, TextDefault } from './AreaData.styles'
import { Stack } from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const AreaData = () => {
  return (
    <AreaDataBox>
    <Stack sx={{flexDirection: 'row', gap: '4px'}}><AccountBoxIcon/><TextDefault>Area</TextDefault></Stack>

    <Stack sx={{justifyContent: 'center'}}><Number>28 K</Number></Stack>
          <ProgressBar>
    <Progress sx={{width:  `${50}%`}} />
            </ProgressBar>
       
    </AreaDataBox>
  )
}
AreaData.propTypes = {
    urlImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    progresso: PropTypes.number.isRequired,

}
export default AreaData