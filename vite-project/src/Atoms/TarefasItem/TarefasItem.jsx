import React from 'react'
import { TarefaBody } from './TarefasItem.style'
import { Button, Grid2, Stack } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTask, putImpedimento } from './../../Utils/cruds/CrudsTask.jsx';
const TarefasItem = ({ entrega, toogleModal, atualizarTasks }) => {

  const handleToogleModal = () => {
    const task = {
      idEntrega: entrega.idEntrega,
      descricao: entrega.descricao,
      dtInicio: entrega.dtInicio,
      dtFim: entrega.dtFim,
      fkResponsavel: entrega.fkResponsavel,
      progresso: entrega.progresso
    }
    toogleModal(task);
  }

  const handleDeleteTask = () => {
    deleteTask(entrega.idEntrega);
    atualizarTasks();
  }

  const handleImpedimentoTask = () => {
    putImpedimento(entrega.idEntrega);
    atualizarTasks();
  }

  const handleFinalizadoTask = () => {
    putFinalizado(entrega.idEntrega);
    atualizarTasks();
  }

  return (
    <TarefaBody>
      <Stack sx={{ height: '20%', width: '100%', position: 'relative', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        {entrega.descricao}
        <DeleteIcon sx={{ color: '#fff', position: 'absolute', right: '40px', cursor: 'pointer' }} onClick={handleDeleteTask} />
        <EditIcon sx={{ color: '#fff', position: 'absolute', right: '8px', cursor: 'pointer' }} onClick={handleToogleModal} />
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
            borderImage: `linear-gradient(to right, #6f63f3, #000000 ${entrega.progresso + 20}%) 1`,
          }}
          size={5}
        >
          <b>Progresso: </b> {entrega.progresso}%
        </Grid2>
        <Grid2 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '5px' }} size={5}>
          <Button fullWidth variant={entrega.comImpedimento ? 'contained' : 'outlined'} color='error' onClick={handleImpedimentoTask}>Impedimento</Button>
        </Grid2>
        <Grid2 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '5px' }} size={5}>
          <Button fullWidth variant={entrega.progresso == 100 ? 'contained' : 'outlined'} onClick={handleFinalizadoTask}>finalizado</Button>

        </Grid2>
      </Grid2>
    </TarefaBody>
  )
}

export default TarefasItem
