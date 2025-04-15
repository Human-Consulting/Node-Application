import React from 'react'
import { TarefaBody } from './TarefasItem.style'
import { Button, Grid2, Stack } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTask, putImpedimento } from './../../Utils/cruds/CrudsTask.jsx';
import CheckIcon from '@mui/icons-material/Check';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const TarefasItem = ({ entrega, toogleModal, atualizarProjetos, atualizarSprints }) => {

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
    atualizarProjetos();
    atualizarSprints();
  }

  const handleImpedimentoTask = async () => {
    const body = {
      idEditor: usuarioLogado.idUsuario
    }
    await putImpedimento(entrega.idEntrega, body);
    atualizarProjetos();
    atualizarSprints();
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
    if (usuarioLogado.permissao == 'DIRETOR' || usuarioLogado.permissao == 'GESTOR') return true;
    return false;
  };

  const temPermissaoPut = validarPermissaoPut();
  const temPermissaoDelete = validarPermissaoDelete();

  const calcularDiasAte = () => {
    const hoje = new Date();
    const [ano, mes, dia] = entrega.dtFim.split('-');
    const fim = new Date(ano, mes - 1, dia);
    const diff = (fim - hoje) / (1000 * 60 * 60 * 24);
    return Math.floor(diff);
  };
  
  const renderIconeStatusEntrega = () => {

    if (entrega.progresso == 100) {
      return (
        <CheckIcon sx={{ border: 'solid #2196f3 3px', borderRadius: '50%', fontSize: '30px', position: 'absolute', left: 10 }} />
      )
    }

    const diasRestantes = calcularDiasAte();

    // ⚠️ Caso esteja atrasada, sem impedimento, mas não finalizada
    if (diasRestantes < 0 && entrega.progresso < 100) {
      return (
        <PriorityHighIcon sx={{ border: 'solid orange 3px', borderRadius: '50%', fontSize: '30px', position: 'absolute', left: 10 }} />
      );
    }
  
    // ⏰ Faltando menos de uma semana, sem impedimento
    if (diasRestantes < 7 && !entrega.comImpedimento) {
      return (
        <WatchLaterIcon sx={{ border: 'solid transparent 3px', borderRadius: '50%', fontSize: '34px', position: 'absolute', left: 10 }} />
      );
    }
  
    // 🔥 Faltando menos de uma semana, com impedimento
    if (diasRestantes < 7 && entrega.comImpedimento) {
      return (
        <PriorityHighIcon sx={{ border: 'solid red 3px', borderRadius: '50%', fontSize: '30px', position: 'absolute', left: 10 }} />
      );
    }
  
    // ⚠️ Com mais de uma semana, mas tem impedimento
    if (diasRestantes >= 7 && entrega.comImpedimento) {
      return (
        <PriorityHighIcon sx={{ border: 'solid orange 3px', borderRadius: '50%', fontSize: '30px', position: 'absolute', left: 10 }} />
      );
    }
  
    // ✅ Caso padrão: tudo certo
    return (
      <CheckIcon sx={{ border: 'solid green 3px', borderRadius: '50%', fontSize: '30px', position: 'absolute', left: 10 }} />
    );
  };
  

  return (
    <TarefaBody sx={{border: `solid ${entrega.fkResponsavel == usuarioLogado.idUsuario ? '#FFF' : 'transparent'} 1px`}}>
      <Stack sx={{ height: '20%', width: '100%', position: 'relative', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        {renderIconeStatusEntrega()}
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
        <Grid2 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0.5px solid #fff', gap: '4px', background: '#000', borderRadius: '5px', padding: '8px', textAlign: 'center' }} size={5}>
          {entrega.nomeResponsavel}
        </Grid2>
        <Grid2 sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            borderRadius: '7px',
            padding: '8px',
            border: '2px solid transparent',
            borderImage: `linear-gradient(to right, #6f63f3, #000000 ${entrega.progresso + 20}%) 1`
          }}
          size={5}>
          <b>Progresso: </b> {entrega.progresso}%
        
        </Grid2>
        <Grid2 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '5px' }} size={10}>
          {entrega.progresso == 100 ?
            <Button fullWidth variant='outlined' color='info'>Tarefa Finalizada</Button>
            :
            <Button fullWidth variant='outlined' color={entrega.comImpedimento ? 'PriorityHigh' : 'success'} onClick={(e) => {
              e.stopPropagation();
              if (usuarioLogado.idUsuario === entrega.fkResponsavel) handleImpedimentoTask()
            }}>{entrega.fkResponsavel == usuarioLogado.idUsuario && entrega.comImpedimento ? 'Remover Impedimento' : entrega.fkResponsavel == usuarioLogado.idUsuario && !entrega.comImpedimento ? 'Acionar Impedimento' : entrega.comImpedimento ? 'Com Impedimento' : "Sem Impedimento"}</Button>
          }
        </Grid2>
      </Grid2>
    </TarefaBody>
  )
}

export default TarefasItem
