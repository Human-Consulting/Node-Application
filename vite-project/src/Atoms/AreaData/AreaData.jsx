import PropTypes from 'prop-types'
import { AreaDataBox, Number, Progress, ProgressBar, TextDefault } from './AreaData.styles'
import { Stack } from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const AreaData = ({ area, valor, total }) => {
  
  return (
    <AreaDataBox>
      <Stack sx={{ flexDirection: 'row', gap: '4px', alignItems: 'center' }}><AccountBoxIcon /><TextDefault>{area}</TextDefault></Stack>

      <Stack sx={{ justifyContent: 'center' }}><Number>{valor} entregas</Number></Stack>
      <ProgressBar>
      <Progress sx={{ width: `${(valor * 100) / total}%` }} />

      </ProgressBar>

    </AreaDataBox>
  )
}

export default AreaData
