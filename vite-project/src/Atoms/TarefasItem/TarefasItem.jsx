import { TarefaBody, ProgressBar, Progress } from './TarefasItem.style'
import { Box, Stack, Tooltip } from '@mui/material'
import { Block, Check, CalendarMonth, MoreVert } from '@mui/icons-material';
import { getNome, getTempoRestante } from '../../Utils/getInfos';
import { useWarningValidator } from '../../Utils/useWarning';

const TarefasItem = ({ tarefa, toogleModal }) => {

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

  const dtFim = new Date(tarefa.dtFim);

  return (
    <TarefaBody inclui={tarefa.responsavel.idUsuario == usuarioLogado.idUsuario} finalizado={tarefa.progresso == 100}>
      <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Stack sx={{ flexDirection: 'row', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <Tooltip title={tarefa.responsavel.nome} placement="top">
            <Stack sx={{ width: '25px', height: '25px', backgroundColor: 'white', color: 'black', borderRadius: '100%', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>{getNome(tarefa.responsavel.nome)}</Stack>
          </Tooltip>
          <span style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', 'margin': 0, maxWidth: '200px' }}>{tarefa.titulo}</span>
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
              '&:hover': {
                border: '1px solid #f0f0f0'
              }
            }}
          />
        </Stack>
      </Stack>
      <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 0.5 }}>
        <Stack sx={{ flexDirection: 'row', width: '100%', alignItems: 'center', gap: 0.5 }}>
          <ProgressBar>
            <Progress sx={{ width: `${tarefa.progresso}%` }} />
          </ProgressBar>
          <span>{Math.floor(tarefa.progresso)}%</span>
        </Stack>
        {tarefa.progresso < 100 &&
          <Tooltip title={"Prazo: " + new Date(dtFim.getTime() - 3 * 60 * 60 * 1000).toLocaleDateString("pt-BR")} placement="bottom">
            <Stack sx={{ flexDirection: 'row', justifyContent: 'end', alignItems: 'center', gap: 0.25, width: '30%' }}>
              <CalendarMonth sx={{ fontSize: 16 }} />{tempoRestante}
            </Stack>
          </Tooltip>}
      </Stack>
    </TarefaBody>
  )
}

export default TarefasItem
