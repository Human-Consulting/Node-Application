import { AreaDataBox, Number, Progress, ProgressBar, TextDefault } from './AreaData.styles'
import { Stack, Tooltip } from '@mui/material'
import { getNome } from "../../Utils/getInfos"

const AreaData = ({ usuario, area, valor, total }) => {

  return (
    <AreaDataBox>
      <Stack sx={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
        <Tooltip title={usuario} placement="top">
          <Stack sx={{ width: '25px', height: '25px', backgroundColor: 'white', color: 'black', borderRadius: '100%', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>{getNome(usuario)}</Stack>
        </Tooltip>
        <TextDefault>{area}</TextDefault>
      </Stack>

      <Stack sx={{ justifyContent: 'center' }}><Number>{valor} {valor == 1 ? "tarefa" : "tarefas"}</Number></Stack>
      <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
        <ProgressBar>
          <Progress sx={{ width: `${(valor * 100) / total}%` }} />
        </ProgressBar>
        <TextDefault>
          {total > 0 ? Math.floor((valor * 100) / total) : 0}%
        </TextDefault>
      </Stack>
    </AreaDataBox>
  )
}

export default AreaData
