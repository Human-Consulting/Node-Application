import React from 'react'
import { TarefaBody, ProgressBar, Progress } from './TarefasItem.style'
import { Button, Grid2, Stack } from '@mui/material'
import { deleteTask, putImpedimento } from './../../Utils/cruds/CrudsTask.jsx';
import CheckIcon from '@mui/icons-material/Check';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const TarefasItem = ({ tarefa, toogleModal, atualizarProjetos, atualizarSprints }) => {

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  const handleToogleModal = () => {
    const task = {
      idEditor: usuarioLogado.idUsuario,
      idTarefa: tarefa.idTarefa,
      descricao: tarefa.descricao,
      dtInicio: tarefa.dtInicio,
      dtFim: tarefa.dtFim,
      fkResponsavel: tarefa.fkResponsavel,
      progresso: tarefa.progresso,
      comImpedimento: tarefa.comImpedimento,
    }
    toogleModal(task);
  }

  const renderIconeStatusTarefa = () => {

    if (tarefa.progresso == 100) {
      return (
        <CheckIcon sx={{ border: 'solid #2196f3 3px', borderRadius: '50%', fontSize: '25px' }} />
      )
    }

    if (tarefa.comImpedimento && tarefa.progresso < 50) {
      return (
        <PriorityHighIcon sx={{ border: 'solid #F44336 3px', borderRadius: '50%', fontSize: '25px' }} />
      );
    }

    if (tarefa.comImpedimento) {
      return (
        <PriorityHighIcon sx={{ border: 'solid orange 3px', borderRadius: '50%', fontSize: '25px' }} />
      );
    }

    return null;

  };


  return (
    <TarefaBody sx={{ border: `solid ${tarefa.fkResponsavel == usuarioLogado.idUsuario ? '#FFF' : 'transparent'} 3px` }}>
      <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span style={{textOverflow: 'ellipsis',whiteSpace: 'nowrap',overflow: 'hidden' }}>{tarefa.descricao}</span>
        <Stack sx={{ flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
          {renderIconeStatusTarefa()}
          <MoreVertIcon
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
        {tarefa.progresso}%
      </Stack>
    </TarefaBody>
  )
}

export default TarefasItem
