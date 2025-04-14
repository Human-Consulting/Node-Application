import React from 'react'
import { TarefaBody } from './TarefasItem.style'
import { Button, Grid2, Stack } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTask, putImpedimento } from './../../Utils/cruds/CrudsTask.jsx';
const TarefasItem = ({ entrega, toogleModal, atualizarProjeto }) => {

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  const handleToogleModal = () => {
    const task = {
      idEditor: usuarioLogado.idUsuario,
      idEntrega: entrega.idEntrega,
      descricao: entrega.descricao,
      dtInicio: entrega.dtInicio,
      dtFim: entrega.dtFim,
      fkResponsavel: entrega.fkResponsavel,
      progresso: entrega.progresso
    }
    toogleModal(task);
  }

  const handleDeleteTask = async () => {
    await deleteTask(entrega.idEntrega);
    await atualizarProjeto();
  }

  const handleImpedimentoTask = async () => {
    const body = {
      idEditor: usuarioLogado.idUsuario
    }
    console.log("Chamando putImpedimento com:", entrega.idEntrega, body);
    await putImpedimento(entrega.idEntrega, body);
    await atualizarProjeto();
  }

  const validarPermissaoPut = () => {
    if (usuarioLogado.permissao === 'DIRETOR' ||
      usuarioLogado.permissao.includes('CONSULTOR') ||
      usuarioLogado.permissao === 'GESTOR') return true;
    if (usuarioLogado.idUsuario == entrega.fkResponsavel) return true;
    return false;
  };

  const validarPermissaoDelete = () => {
    if (usuarioLogado.permissao.includes('CONSULTOR')) return true;
    return false;
  };

  const temPermissaoPut = validarPermissaoPut();
  const temPermissaoDelete = validarPermissaoDelete();

  return (
    <TarefaBody>
      <Stack sx={{ height: '20%', width: '100%', position: 'relative', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        {entrega.descricao}
        <DeleteIcon
          onClick={(e) => {
            e.stopPropagation();
            if (temPermissaoDelete) handleDeleteTask();
          }}
          title={temPermissaoDelete ? "Excluir entrega" : "Você não tem permissão"}
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
          title={temPermissaoPut ? "Excluir entrega" : "Você não tem permissão"}
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
          <b>Início: </b> {entrega.dtInicio}
        </Grid2>
        <Grid2 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0.5px solid #fff', gap: '4px', background: '#000', borderRadius: '5px', padding: '8px' }} size={5}>
          <b>Fim: </b>  {entrega.dtFim}
        </Grid2>
        <Grid2 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0.5px solid #fff', gap: '4px', background: '#000', borderRadius: '5px', padding: '8px' }} size={5}>
          <b>Responsavel: </b> {entrega.nomeResponsavel}
        </Grid2>
        <Grid2
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            borderRadius: '7px',
            padding: '8px',
            border: '2px solid transparent',
            borderImage: `linear-gradient(to right, #6f63f3, #000000 ${entrega.progresso + 20}%) 1`
          }}
          size={5}
        >
          <b>Progresso: </b> {entrega.progresso}%
        </Grid2>
        <Grid2 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '5px' }} size={10}>
          <Button fullWidth variant='outlined' color={entrega.comImpedimento ? 'error' : 'success'} onClick={(e) => {e.stopPropagation();
                  if (usuarioLogado.idUsuario === entrega.fkResponsavel) handleImpedimentoTask()}}>{entrega.comImpedimento ? 'Com Impedimento' : 'Sem Impedimento'}</Button>
        </Grid2>
      </Grid2>
    </TarefaBody>
  )
}

export default TarefasItem
