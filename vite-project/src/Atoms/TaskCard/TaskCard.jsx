import { BodyTarefa, NavTask, TaskCardBody } from './TaskCard.styles'
import { Button, Grid2, Stack } from '@mui/material'
import TarefasItem from '../TarefasItem/TarefasItem'
import { useNavigate } from 'react-router'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteSprint } from './../../Utils/cruds/CrudsSprint.jsx';

const TaskCard = ({ toogleTaskModal, sprint, index, atualizarProjetos, atualizarSprints, idEmpresa }) => {

  const navigate = useNavigate();

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  const handleOpenProject = () => {
    navigate(`/Home/${idEmpresa}/central-task/${sprint.idSprint}`);
  }

  const handleOpenModalPutTask = (task) => {
    toogleTaskModal(task, 'task', null);
  }

  const handleOpenModalPutSprint = () => {
    toogleTaskModal(sprint, 'sprint', null);
  }

  const handleOpenModalPostTask = () => {
    toogleTaskModal(null, 'task', sprint.idSprint);
  }

  const handleOpenModalPostSprint = () => {
    toogleTaskModal(null, 'sprint', null);
  }

  const handleDeleteSprint = async () => {
    await deleteSprint(sprint.idSprint);
    await atualizarSprints();
    await atualizarProjetos();
  }

  const validarPermissaoPut = () => {
    if (usuarioLogado.permissao === 'DIRETOR' ||
      usuarioLogado.permissao.includes('CONSULTOR') ||
      usuarioLogado.permissao === 'GESTOR') return true;
    return false;
  };

  const validarPermissaoDelete = () => {
    if (usuarioLogado.permissao.includes('CONSULTOR')) return true;
    return false;
  };

  const temPermissaoPut = validarPermissaoPut();
  const temPermissaoDelete = validarPermissaoDelete();

  return (
    <TaskCardBody sx={{ position: 'relative' }}>
      {sprint ?
        <>
          <NavTask>Sprint {index}
            <DeleteIcon
              onClick={(e) => {
                e.stopPropagation();
                if (temPermissaoDelete) handleDeleteSprint();
              }}
              title={temPermissaoDelete ? "Excluir sprint" : "Você não tem permissão"}
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
                if (temPermissaoPut) handleOpenModalPutSprint();
              }}
              title={temPermissaoPut ? "Excluir sprint" : "Você não tem permissão"}
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
              <TarefasItem entrega={entrega} toogleModal={handleOpenModalPutTask} atualizarProjetos={atualizarProjetos} atualizarSprints={atualizarSprints} ></TarefasItem>
            ))}
          </BodyTarefa>
          <Stack sx={{ flexDirection: 'row', width: '100%', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
            {usuarioLogado.permissao != 'FUNC' ?
              <Button size='medium' onClick={handleOpenModalPostTask} variant='contained'>Criar nova tarefa</Button>
              : null}
            <Button size='medium' onClick={handleOpenProject} variant='contained'>Ver todas tarefas</Button>
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

return (
    <TaskCardBody>
  {sprint ?
        <>
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
