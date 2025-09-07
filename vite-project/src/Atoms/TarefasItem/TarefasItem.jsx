import { TarefaBody, ProgressBar, Progress } from './TarefasItem.style'
import { Stack, Tooltip } from '@mui/material'
import { Block, Check, CalendarMonth, MoreVert } from '@mui/icons-material';
import { getNome, getTempoRestante } from '../../Utils/getInfos';

const TarefasItem = ({ tarefa, toogleModal }) => {

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  const handleToogleModal = () => {
    const task = {
      idEditor: usuarioLogado.idUsuario,
      idTarefa: tarefa.idTarefa,
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      dtInicio: tarefa.dtInicio,
      dtFim: tarefa.dtFim,
      fkResponsavel: tarefa.responsavel.idUsuario,
      comentario: tarefa.comentario,
      comImpedimento: tarefa.comImpedimento,
      checkpoints: tarefa.checkpoints,
      progresso: tarefa.progresso
    }
    toogleModal(task);
  }

  const renderIconeStatusTarefa = () => {

    if (tarefa.progresso == 100) {
      return (
        <Check sx={{ border: 'solid #2196f3 3px', borderRadius: '50%', fontSize: '25px' }} />
      )
    }

    if (tarefa.comImpedimento && tarefa.progresso < 50) {
      return (
        <Block sx={{ border: 'solid #F44336 2px', borderRadius: '50%', fontSize: '25px' }} />
      );
    }

    if (tarefa.comImpedimento) {
      return (
        <Block sx={{ border: 'solid orange 2px', borderRadius: '50%', fontSize: '25px' }} />
      );
    }
    return null;
  };

  return (
    <TarefaBody sx={{ border: `solid ${tarefa.responsavel.idUsuario == usuarioLogado.idUsuario ? '#FFF' : 'transparent'} 3px` }}>
      <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Stack sx={{ flexDirection: 'row', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <Tooltip title={tarefa.responsavel.nome} placement="top">
            <Stack sx={{ width: '25px', height: '25px', backgroundColor: 'white', color: 'black', borderRadius: '100%', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>{getNome(tarefa.responsavel.nome)}</Stack>
          </Tooltip>
          <span style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{tarefa.titulo}</span>
        </Stack>
        <Stack sx={{ flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
          {renderIconeStatusTarefa()}
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
      <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <ProgressBar>
          <Progress sx={{ width: `${tarefa.progresso}%` }} />
        </ProgressBar>
        <span>{tarefa.progresso}%</span>
        {tarefa.progresso < 100 &&
          <Tooltip title={"Prazo: " + tarefa.dtFim} placement="top">
            <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 0.25 }}>
              <CalendarMonth sx={{ fontSize: '16px' }} /> {getTempoRestante(tarefa.dtFim)}
            </Stack>
          </Tooltip>}
      </Stack>
    </TarefaBody>
  )
}

export default TarefasItem
