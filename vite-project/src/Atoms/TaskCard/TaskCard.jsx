import { BodyTarefa, NavTask, TaskCardBody, TItleTarefa } from './TaskCard.styles'
import { Button, Grid2, Stack } from '@mui/material'
import TarefasItem from '../TarefasItem/TarefasItem'
import { useNavigate } from 'react-router'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

const TaskCard = ({ toogleTaskModal, sprint, tarefas, usuarios }) => {

  const navigate = useNavigate()

  const handleOpenProject = () => {
    navigate(`/Home/central-task/${sprint.idSprint}`);
    console.log('estou')
  }

  const handleOpenModalPutTask = (task) => {
    toogleTaskModal(task, 'task');
  }

  const handleOpenModalPutSprint = () => {
    toogleTaskModal(sprint, 'sprint');
  }

  const handleOpenModalPostTask = () => {
    toogleTaskModal(null, 'task');
  }

  const handleOpenModalPostSprint = () => {
    toogleTaskModal(null, 'sprint');
  }

  return (
    <TaskCardBody sx={{ position: 'relative' }}>
      {sprint ?
        <>
          <NavTask>Sprint {sprint.idSprint}
            <MoreVertIcon sx={{ color: '#fff', position: 'absolute', right: '8px', cursor: 'pointer' }} onClick={handleOpenModalPutSprint} />
          </NavTask>
          <Stack sx={{ height: '20%', width: '70%', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            {/* <TItleTarefa>{descricaoSprint}</TItleTarefa> */}

            {sprint.descricao}
          </Stack>
          <Grid2 sx={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center' }} container spacing={2}>
            <Grid2 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '5px', padding: '8px' }} size={5}>
              inicio: {sprint.dtInicio}
            </Grid2>
            <Grid2 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '5px', padding: '8px' }} size={5}>
              Fim: {sprint.dtFim}
            </Grid2>
            <Grid2 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '5px', padding: '8px' }} size={5}>
              Total entregas: {tarefas.filter(tarefa => tarefa.fkSprint == sprint.idSprint).length}
            </Grid2>
            <Grid2 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '5px', padding: '8px' }} size={5}>
              Progresso: {sprint.progresso}%
            </Grid2>
          </Grid2>

          <BodyTarefa>
            {tarefas.filter(tarefa => tarefa.fkSprint == sprint.idSprint).map((item) => (
              <TarefasItem idTask={item.idSprint} progresso={item.progresso} impedido={item.impedido} finalizado={item.finalizado} dataInicio={item.dtInicio} dataFim={item.dtFim} responsavel={usuarios.filter(usuario => usuario.idUsuario = item.fkResponsavel)[0]} descricao={item.descricao} key={item.index} toogleModal={handleOpenModalPutTask}>{item.descricao}</TarefasItem>
            ))}
          </BodyTarefa>
          <Stack sx={{ flexDirection: 'row', width: '100%', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
            <Button size='medium' onClick={handleOpenModalPostTask} variant='outlined'>Criar nova tarefa</Button>
            <Button size='medium' onClick={handleOpenProject} variant='outlined'>Ver todas tarefas</Button>
          </Stack>
        </>
        :
        <Stack sx={{ height: '100%', width: '70%', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={handleOpenModalPostSprint}
          >
            CRIAR NOVA SPRINT
          </Button>
        </Stack>
      }
    </TaskCardBody>
  )
}

export default TaskCard
