import React from 'react'
import { TarefaBody } from './TarefasItem.style'
import { Button, Grid2, Stack } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTask, putImpedimento } from './../../Utils/cruds/CrudsTask.jsx';
import CheckIcon from '@mui/icons-material/Check';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

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
      progresso: tarefa.progresso
    }
    toogleModal(task);
  }

  const handleDeleteTask = async () => {
    await deleteTask(tarefa.idTarefa);
    atualizarProjetos();
    atualizarSprints();
  }

  const handleImpedimentoTask = async () => {
    const body = {
      idEditor: usuarioLogado.idUsuario
    }
    await putImpedimento(tarefa.idTarefa, body);
    atualizarProjetos();
    atualizarSprints();
  }

  const validarPermissaoPut = () => {
    if (usuarioLogado.permissao === 'DIRETOR' ||
      usuarioLogado.permissao.includes('CONSULTOR') ||
      usuarioLogado.permissao === 'GESTOR') return true;
    if (usuarioLogado.idUsuario == tarefa.fkResponsavel) return true;
    return false;
  };

  const validarPermissaoDelete = () => {
    if (usuarioLogado.permissao.includes('CONSULTOR')) return true;
    if (usuarioLogado.permissao == 'DIRETOR' || usuarioLogado.permissao == 'GESTOR') return true;
    return false;
  };

  const temPermissaoPut = validarPermissaoPut();
  const temPermissaoDelete = validarPermissaoDelete();

  const renderIconeStatusTarefa = () => {

    if (tarefa.progresso == 100) {
      return (
        <CheckIcon sx={{ border: 'solid #2196f3 3px', borderRadius: '50%', fontSize: '30px', position: 'absolute', left: 10 }} />
      )
    }

    if (tarefa.comImpedimento && tarefa.progresso < 50) {
      return (
        <PriorityHighIcon sx={{ border: 'solid red 3px', borderRadius: '50%', fontSize: '30px', position: 'absolute', left: 10 }} />
      );
    }

    if (tarefa.comImpedimento) {
      return (
        <PriorityHighIcon sx={{ border: 'solid orange 3px', borderRadius: '50%', fontSize: '30px', position: 'absolute', left: 10 }} />
      );
    }

    return (
      <CheckIcon sx={{ border: 'solid green 3px', borderRadius: '50%', fontSize: '30px', position: 'absolute', left: 10 }} />
    );

  };


  return (
    <TarefaBody sx={{ border: `solid ${tarefa.fkResponsavel == usuarioLogado.idUsuario ? '#FFF' : 'transparent'} 1px` }}>
      <Stack sx={{ height: '20%', width: '100%', position: 'relative', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        {renderIconeStatusTarefa()}
        {tarefa.descricao}
        <DeleteIcon
          onClick={(e) => {
            e.stopPropagation();
            if (temPermissaoDelete) handleDeleteTask();
          }}
          title={temPermissaoDelete ? "Excluir tarefa" : "Você não tem permissão"}
          sx={{
            color: temPermissaoDelete ? '#fff' : '#aaa',
            position: 'absolute',
            right: '40px',
            cursor: temPermissaoDelete ? 'pointer' : 'not-allowed',
            transition: '0.3s',
            opacity: temPermissaoDelete ? 1 : 0.5,
            border: '1px solid transparent',
            borderRadius: '4px',

            '&:hover': {
              border: temPermissaoDelete ? '1px solid #f0f0f0' : '1px solid transparent'
            }
          }}
        />
        <EditIcon
          onClick={(e) => {
            e.stopPropagation();
            if (temPermissaoPut) handleToogleModal();
          }}
          title={temPermissaoPut ? "Excluir tarefa" : "Você não tem permissão"}
          sx={{
            color: temPermissaoPut ? '#fff' : '#aaa',
            position: 'absolute',
            right: '10px',
            cursor: temPermissaoPut ? 'pointer' : 'not-allowed',
            transition: '0.3s',
            opacity: temPermissaoPut ? 1 : 0.5,
            border: '1px solid transparent',
            borderRadius: '4px',

            '&:hover': {
              border: temPermissaoPut ? '1px solid #f0f0f0' : '1px solid transparent'
            }
          }}
        />
      </Stack>
      <Grid2 sx={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center' }} container spacing={2}>
        <Grid2 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0.5px solid #fff', gap: '4px', background: '#000', borderRadius: '5px', padding: '8px' }} size={5}>
          <b>Início: </b> {new Date(tarefa.dtInicio).toLocaleDateString('pt-BR')}
        </Grid2>
        <Grid2 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0.5px solid #fff', gap: '4px', background: '#000', borderRadius: '5px', padding: '8px' }} size={5}>
          <b>Fim: </b>  {new Date(tarefa.dtFim).toLocaleDateString('pt-BR')}
        </Grid2>
        <Grid2 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0.5px solid #fff', gap: '4px', background: '#000', borderRadius: '5px', padding: '8px', textAlign: 'center' }} size={5}>
          {tarefa.nomeResponsavel}
        </Grid2>
        <Grid2 sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          borderRadius: '7px',
          padding: '8px',
          border: 'none',
          background: `linear-gradient(to right, #1769aa ${tarefa.progresso}%, #000000 ${tarefa.progresso + 0.1}%, #000000)`
        }}
          size={5}>
          <b>Progresso: </b> {tarefa.progresso}%

        </Grid2>
        <Grid2 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '5px' }} size={10}>
          {tarefa.progresso == 100 ?
            <Button fullWidth variant='outlined' color='info'>TAREFA FINALIZADA</Button>
            :
            <Button fullWidth variant='outlined' color={tarefa.comImpedimento ? 'error' : 'success'} onClick={(e) => {
              e.stopPropagation();
              if (usuarioLogado.idUsuario === tarefa.fkResponsavel) handleImpedimentoTask()
            }}>{tarefa.fkResponsavel == usuarioLogado.idUsuario && tarefa.comImpedimento ? 'Remover Impedimento' : tarefa.fkResponsavel == usuarioLogado.idUsuario && !tarefa.comImpedimento ? 'Acionar Impedimento' : tarefa.comImpedimento ? 'Com Impedimento' : "Sem Impedimento"}</Button>
          }
        </Grid2>
      </Grid2>
    </TarefaBody>
  )
}

export default TarefasItem
