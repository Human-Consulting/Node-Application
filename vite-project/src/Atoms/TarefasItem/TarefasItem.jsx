import React from 'react'
import { TarefaBody } from './TarefasItem.style'
import { Button, Grid2, Stack } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTask } from './../../Utils/cruds/CrudsTask.jsx';
const TarefasItem = ({ idTask, descricao, dataInicio, dataFim, responsavel, impedido, finalizado, progresso, indice, maximo, toogleModal }) => {

  const handleToogleModal = () => {
    const task = {
      idSprint: idTask,
      descricao,
      dtInicio: dataInicio,
      dtFim: dataFim,
      fkResponsavel: responsavel.idUsuario,
      progresso
    }
    toogleModal(task);
  }

  const handleDeleteTask = () => {
    deleteTask(idTask, toogleModal);
  }

  return (
    <TarefaBody>
      <Stack sx={{ height: '20%', width: '100%', position: 'relative', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        {descricao}
        <DeleteIcon sx={{ color: '#fff', position: 'absolute', right: '40px', cursor: 'pointer' }} onClick={handleDeleteTask} />
        <EditIcon sx={{ color: '#fff', position: 'absolute', right: '8px', cursor: 'pointer' }} onClick={handleToogleModal} />
      </Stack>
      <Grid2 sx={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center' }} container spacing={2}>
        <Grid2 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0.5px solid #fff', gap: '4px', background: '#000', borderRadius: '5px', padding: '8px' }} size={5}>
          <b>inicio: </b> {dataInicio}
        </Grid2>
        <Grid2 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0.5px solid #fff', gap: '4px', background: '#000', borderRadius: '5px', padding: '8px' }} size={5}>
          <b>Fim: </b>  {dataFim}
        </Grid2>
        <Grid2 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0.5px solid #fff', gap: '4px', background: '#000', borderRadius: '5px', padding: '8px' }} size={5}>
          <b>responsavel: </b> {responsavel.nome}
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
            borderImage: `linear-gradient(to right, #6f63f3, #000000 ${progresso + 20}%) 1`,
          }}
          size={5}
        >
          <b>Progresso: </b> {progresso}%
        </Grid2>
        <Grid2 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '5px' }} size={5}>
          <Button fullWidth variant={impedido ? 'contained' : 'outlined'} color='error'>Impedimento</Button>
        </Grid2>
        <Grid2 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '5px' }} size={5}>
          <Button fullWidth variant={finalizado ? 'contained' : 'outlined'}>finalizado</Button>

        </Grid2>
      </Grid2>
    </TarefaBody>
  )
}

export default TarefasItem
