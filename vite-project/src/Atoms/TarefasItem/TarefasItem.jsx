import React from 'react'
import { TarefaBody} from './TarefasItem.style'
import { Button, Grid2, Stack } from '@mui/material'

const TarefasItem = ({descricao, dataInicio, dataFim, responsavel, impedido, finalizado, progresso}) => {
  return (
 <TarefaBody>
   <Stack sx={{height: '20%', width: '70%', alignItems: 'center', justifyContent: 'center',  textAlign: 'center'}}>
          {descricao}
        </Stack>
        <Grid2 sx={{alignItems: 'center', justifyContent: 'center',  alignContent: 'center'}} container spacing={2}>
        <Grid2 sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0.5px solid #fff', gap: '4px', background: '#000', borderRadius: '5px', padding: '8px'}} size={5}>
        <b>inicio: </b> {dataInicio}
        </Grid2>
        <Grid2 sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0.5px solid #fff', gap: '4px', background: '#000', borderRadius: '5px', padding: '8px'}} size={5}>
        <b>Fim: </b>  {dataFim}
        </Grid2>
        <Grid2 sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0.5px solid #fff', gap: '4px', background: '#000', borderRadius: '5px', padding: '8px'}} size={5}>
        <b>responsavel: </b> {responsavel}
        </Grid2>
        <Grid2 sx={{display: 'flex', alignItems: 'center', background: `linear-gradient(to right, #4639de,  #000000 ${progresso + 20}% )`, justifyContent: 'center', gap: '4px', borderRadius: '5px', padding: '8px'}} size={5}>
        <b>Progresso: </b> {progresso}%
        </Grid2>
        <Grid2 sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '5px', padding: '8px'}} size={5}>
    <Button variant={impedido ? 'contained' : 'outlined'} color='error'>Impedimento</Button>
        </Grid2>
        <Grid2 sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '5px', padding: '8px'}} size={5}>
        <Button  variant={finalizado ? 'contained' : 'outlined'}>finalizado</Button>
    
        </Grid2>
        </Grid2>
 </TarefaBody>
  )
}

export default TarefasItem
