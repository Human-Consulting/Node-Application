import { BodyTarefa, NavTask, TaskCardBody } from './TaskCard.styles'
import { Button, Grid2, Stack } from '@mui/material'
import TarefasItem from '../TarefasItem/TarefasItem'
import { useNavigate } from 'react-router'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteSprint } from './../../Utils/cruds/CrudsSprint.jsx';

const TaskCard = ({ toogleTaskModal, sprint, index }) => {

  const navigate = useNavigate()

  const handleOpenProject = () => {
    navigate(`/Home/central-task/${sprint.idSprint}`);
    console.log('estou')
  }

  const handleOpenModalPutTask = (task) => {
    toogleTaskModal(task, 'task', null);
  }

  const handleOpenModalPutSprint = () => {
    toogleTaskModal(sprint, 'sprint', null);
  }

  const handleOpenModalPostTask = () => {
    console.log(sprint);
    toogleTaskModal(null, 'task', sprint.idSprint);
    
  }

  const handleOpenModalPostSprint = () => {
    toogleTaskModal(null, 'sprint', null);
  }

  const handleDeleteSprint = () => {
    deleteSprint(sprint.idSprint);
  }

  return (
    <TaskCardBody sx={{ position: 'relative' }}>
      {sprint ?
        <>
          <NavTask>Sprint {index}
            <DeleteIcon sx={{ color: '#fff', position: 'absolute', right: '40px', cursor: 'pointer' }} onClick={handleDeleteSprint} />
            <EditIcon sx={{ color: '#fff', position: 'absolute', right: '8px', cursor: 'pointer' }} onClick={handleOpenModalPutSprint} />
          </NavTask>
          <Stack sx={{ height: '20%', width: '70%', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
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
              Total entregas: {sprint.entregas.length}
            </Grid2>
            <Grid2 sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '5px', padding: '8px' }} size={5}>
              Progresso: {sprint.progresso}%
            </Grid2>
          </Grid2>

          <BodyTarefa>
            {sprint.entregas.map((entrega) => (
              <TarefasItem entrega={entrega} toogleModal={handleOpenModalPutTask} ></TarefasItem>
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
