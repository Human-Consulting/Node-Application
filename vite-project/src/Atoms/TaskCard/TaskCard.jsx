import { BodyTarefa, NavTask, TaskCardBody, TItleTarefa } from './TaskCard.styles'
import { Button, Grid2, Stack } from '@mui/material'
import TarefasItem from '../TarefasItem/TarefasItem'
import { useNavigate } from 'react-router'

const TaskCard = ({numeroSprint, descricaoSprint, dataInicio, dataFim, tarefas, totalEntregas, progresso, titulo, index, maximo }) => {
const navigate = useNavigate()



const handleOpenProject = () => {
  navigate(`/home/central-task/${index}`);
  console.log('estou')
}
const handleOpenModal = () => {
  navigate(`/home/central-task/${index}`);
  console.log('estou')
}
  return (
    <TaskCardBody>
        <NavTask>Sprint {numeroSprint}</NavTask>
        <Stack sx={{height: '20%', width: '70%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
              <TItleTarefa>{titulo}</TItleTarefa>
          
          {descricaoSprint}
        </Stack>
        <Grid2 sx={{alignItems: 'center', justifyContent: 'center', alignContent: 'center'}} container spacing={2}>
        <Grid2 sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '5px', padding: '8px'}} size={5}>
        inicio: {dataInicio}
        </Grid2>
        <Grid2 sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '5px', padding: '8px'}} size={5}>
        Fim: {dataFim}
        </Grid2>
        <Grid2 sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '5px', padding: '8px'}} size={5}>
        Total entregas: {totalEntregas}
        </Grid2>
        <Grid2 sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '5px', padding: '8px'}} size={5}>
        Progresso: {progresso}%
        </Grid2>
        </Grid2>

        <BodyTarefa>
        {tarefas.map((item, index) => (
          <TarefasItem maximo={maximo} indice={index + 1} progresso={item.progresso} impedido={item.impedido} finalizado={item.finalizado} dataInicio={item.data_inicio} dataFim={item.data_fim} responsavel={item.responsavel} descricao={item.descricao} key={item.index}>{item.descricao}</TarefasItem>
        ))}
        </BodyTarefa>
        <Stack sx={{flexDirection: 'row', width: '100%', gap: '1rem', justifyContent: 'center', alignItems: 'center'}}>
        <Button size ='medium' onClick={handleOpenProject} variant='outlined'>Ver todas tarefas</Button>
        <Button size ='medium' onClick={handleOpenModal} variant='contained'>Criar nova tarefa</Button>
        </Stack>
  


      
      
    </TaskCardBody>
  )
}

export default TaskCard
