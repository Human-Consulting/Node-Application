import { BodyTarefa, NavTask, TaskCardBody } from './TaskCard.styles'
import { Button, Grid2, Stack } from '@mui/material'
import TarefasItem from '../TarefasItem/TarefasItem'
import { useNavigate } from 'react-router'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteSprint } from './../../Utils/cruds/CrudsSprint.jsx';
import CheckIcon from '@mui/icons-material/Check';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';


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
    console.log(sprint);
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

  const validarPermissao = () => {
    if (usuarioLogado.permissao === 'DIRETOR' ||
      usuarioLogado.permissao.includes('CONSULTOR') ||
      usuarioLogado.permissao === 'GESTOR') return true;
    return false;
  };

  const temPermissao = validarPermissao();

  const calcularDiasAte = () => {
    const hoje = new Date();
    const [ano, mes, dia] = sprint.dtFim.split('-');
    const fim = new Date(ano, mes - 1, dia);
    const diff = (fim - hoje) / (1000 * 60 * 60 * 24);
    return Math.floor(diff);
  };
  
  const renderIconeStatusSprint = () => {

    if (sprint.progresso == 100) {
      return (
        <CheckIcon sx={{ border: 'solid #2196f3 3px', borderRadius: '50%', fontSize: '40px', position: 'absolute', left: 10 }} />
      );
    }

    const diasRestantes = calcularDiasAte();
  
    if (diasRestantes < 30 && !sprint.comImpedimento) {
      return (
        <WatchLaterIcon sx={{ border: 'solid transparent 3px', borderRadius: '50%', fontSize: '46px', position: 'absolute', left: 10 }} />
      );
    }
  
    if (diasRestantes < 30 && sprint.comImpedimento) {
      return (
        <PriorityHighIcon sx={{ border: 'solid red 3px', borderRadius: '50%', fontSize: '40px', position: 'absolute', left: 10 }} />
      );
    }
  
    if (diasRestantes >= 30 && sprint.comImpedimento) {
      return (
        <PriorityHighIcon sx={{ border: 'solid orange 3px', borderRadius: '50%', fontSize: '40px', position: 'absolute', left: 10 }} />
      );
    }
  
    return (
      <CheckIcon sx={{ border: 'solid green 3px', borderRadius: '50%', fontSize: '40px', position: 'absolute', left: 10 }} />
    );
  };

  return (
    <TaskCardBody sx={{ position: 'relative' }}>
      {sprint ?
        <>
          <NavTask>
          {renderIconeStatusSprint(sprint)}
            Sprint {index}
            <DeleteIcon
              onClick={(e) => {
                e.stopPropagation();
                if (temPermissao) handleDeleteSprint();
              }}
              title={temPermissao ? "Excluir sprint" : "Você não tem permissão"}
              sx={{
                color: temPermissao ? '#fff' : '#aaa',
                position: 'absolute',
                right: '40px',
                cursor: temPermissao ? 'pointer' : 'not-allowed',
                transition: '0.3s',
                opacity: temPermissao ? 1 : 0.5,
                border: '1px solid transparent',
                borderRadius: '4px',

                '&:hover': {
                  border: temPermissao ? '1px solid #f0f0f0' : '1px solid transparent'
                }
              }}
            />
            <EditIcon
              onClick={(e) => {
                e.stopPropagation();
                if (temPermissao) handleOpenModalPutSprint();
              }}
              title={temPermissao ? "Excluir sprint" : "Você não tem permissão"}
              sx={{
                color: temPermissao ? '#fff' : '#aaa',
                position: 'absolute',
                right: '10px',
                cursor: temPermissao ? 'pointer' : 'not-allowed',
                transition: '0.3s',
                opacity: temPermissao ? 1 : 0.5,
                border: '1px solid transparent',
                borderRadius: '4px',

                '&:hover': {
                  border: temPermissao ? '1px solid #f0f0f0' : '1px solid transparent'
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
  )
}

export default TaskCard
