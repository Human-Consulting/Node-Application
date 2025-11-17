import { AreaDataBox, Number, Progress, ProgressBar, TextDefault } from './AreaData.styles'
import { Stack, Tooltip } from '@mui/material'
import { getNome } from "../../Utils/getInfos"

const AreaData = ({ usuario, total }) => {

  const percentual = total > 0 ? Math.floor((usuario.qtdTarefas / total) * 100) : 0;

  return (
    <AreaDataBox>
      <Stack sx={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
        <Tooltip title={usuario.nome} placement="top">
          <Stack sx={{
            width: 25,
            height: 25,
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            fontSize: '0.75rem',
            flexShrink: 0, // evita deformar se o container apertar
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>{getNome(usuario.nome)}</Stack>
        </Tooltip>
        <TextDefault>{usuario.area}</TextDefault>
      </Stack>

      <Stack sx={{ justifyContent: 'center' }}>
        <TextDefault>{usuario.cargo}</TextDefault>
        <Number>{usuario.qtdTarefas} {usuario.qtdTarefas == 1 ? "tarefa" : "tarefas"}</Number>
        </Stack>
    </AreaDataBox>
  )
}

export default AreaData
