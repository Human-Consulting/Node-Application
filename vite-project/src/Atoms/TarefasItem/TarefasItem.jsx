import { TarefaBody, ProgressBar, Progress } from './TarefasItem.style'
import { Box, Stack, Tooltip } from '@mui/material'
import { Block, Check, CalendarMonth, MoreVert } from '@mui/icons-material';
import { getNome, getTempoRestante } from '../../Utils/getInfos';
import { useWarningValidator } from '../../Utils/useWarning';
import dayjs from 'dayjs';
import { useTheme } from '@mui/material/styles';

const TarefasItem = ({ tarefa, toogleModal }) => {

  const theme = useTheme();
  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  const tempoRestante = getTempoRestante(tarefa.dtFim);

  const handleToogleModal = () => {
    const task = {
      idEditor: usuarioLogado.idUsuario,
      idTarefa: tarefa.idTarefa,
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      dtInicio: tarefa.dtInicio,
      dtFim: tarefa.dtFim,
      responsavel: tarefa.responsavel,
      comentario: tarefa.comentario,
      comImpedimento: tarefa.comImpedimento,
      checkpoints: tarefa.checkpoints,
      progresso: tarefa.progresso
    }
    toogleModal(task);
  }

  return (
    <TarefaBody 
      inclui={tarefa?.responsavel?.idUsuario == usuarioLogado.idUsuario} 
      finalizado={tarefa.progresso == 100}
      sx={{
        color: theme.palette.text.primary
      }}
    >
      <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Stack sx={{ flexDirection: 'row', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <Tooltip title={tarefa?.responsavel?.nome} placement="top">
            <Stack 
              sx={{ 
                width: '25px', 
                height: '25px', 
                backgroundColor: theme.palette.background.paper, 
                color: theme.palette.text.primary, 
                borderRadius: '100%', 
                justifyContent: 'center', 
                alignItems: 'center', 
                fontWeight: 'bold' 
              }}
            >
              {getNome(tarefa?.responsavel?.nome)}
            </Stack>
          </Tooltip>
          <span 
            style={{ 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap', 
              overflow: 'hidden',
              margin: 0, 
              maxWidth: '200px',
              color: theme.palette.text.primary
            }}
          >
            {tarefa.titulo}
          </span>
        </Stack>

        <Stack sx={{ flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
          {useWarningValidator(tarefa)}
          <MoreVert
            onClick={(e) => {
              e.stopPropagation();
              handleToogleModal();
            }}
            sx={{
              transition: '0.3s',
              border: '1px solid transparent',
              borderRadius: '4px',
              cursor: 'pointer',
              color: theme.palette.text.secondary,
              '&:hover': {
                border: `1px solid ${theme.palette.divider}`
              }
            }}
          />
        </Stack>
      </Stack>

      <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 0.5 }}>
        <Stack sx={{ flexDirection: 'row', width: '100%', alignItems: 'center', gap: 0.5 }}>
          <ProgressBar>
            <Progress 
              sx={{ 
                width: `${tarefa.progresso}%`,
                backgroundColor: theme.palette.primary.main
              }} 
            />
          </ProgressBar>
          <span style={{ color: theme.palette.text.secondary }}>
            {Math.floor(tarefa.progresso)}%
          </span>
        </Stack>

        {tarefa.progresso < 100 && (
          <Tooltip 
            title={`Prazo: ${dayjs(tarefa.dtFim).format("DD/MM/YYYY")}`} 
            placement="bottom"
          >
            <Stack 
              sx={{ 
                flexDirection: 'row', 
                justifyContent: 'end', 
                alignItems: 'center', 
                gap: 0.25, 
                width: '30%', 
                color: theme.palette.text.secondary
              }}
            >
              <CalendarMonth sx={{ fontSize: 16 }} />
              {tempoRestante}
            </Stack>
          </Tooltip>
        )}
      </Stack>
    </TarefaBody>
  )
}

export default TarefasItem
