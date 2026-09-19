import { AreaDataBox, Number, TextDefault } from './AreaData.styles'
import { Stack, Tooltip } from '@mui/material'
import { getNome } from "../../Utils/getInfos"
import { Usuario } from '../../Utils/cruds/CrudsUsuario'

export interface AreaDataUsuario extends Usuario {
  qtdTarefas?: number;
}

interface AreaDataProps {
  usuario: AreaDataUsuario;
  total: number;
}

const AreaData = ({ usuario }: AreaDataProps) => {

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
