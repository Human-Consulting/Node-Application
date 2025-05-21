import { BodyTarefa, NavTask, TaskCardBody } from './TaskCard.styles'
import { Button, Select, Stack, MenuItem, Grow, Box } from '@mui/material'
import TarefasItem from '../TarefasItem/TarefasItem'
import { useNavigate, useParams } from 'react-router'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { useState } from 'react';
import { inputStyle } from "../../Molecules/Forms/Forms.styles";
import { CheckCircle, HourglassEmpty, Block, AllInclusive, Check, MoreVert } from '@mui/icons-material';


const TaskCard = ({ toogleTaskModal, sprint, index, atualizarProjetos, atualizarSprints }) => {

  const { nomeEmpresa, idEmpresa, descricaoProjeto, idProjeto } = useParams();

  const navigate = useNavigate();

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  const [tarefasFiltradas, setTarefasFiltradas] = useState(sprint?.tarefas);

  const handleOpenProject = () => {
    navigate(`/Home/${nomeEmpresa}/${Number(idEmpresa)}/Roadmap/${descricaoProjeto}/${idProjeto}/Tarefas/${sprint.idSprint}/${index}`);
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

  const renderIconeStatusSprint = () => {

    if (sprint.progresso == 100) {
      return (
        <Check sx={{ border: 'solid #2196f3 3px', borderRadius: '50%', fontSize: '30px', position: 'absolute', left: 10 }} />
      );
    }

    if (sprint.comImpedimento && sprint.progresso < 50) {
      return (
        <PriorityHigh sx={{ border: 'solid #F44336 3px', borderRadius: '50%', fontSize: '30px', position: 'absolute', left: 10 }} />
      );
    }

    if (sprint.comImpedimento) {
      return (
        <PriorityHigh sx={{ border: 'solid orange 3px', borderRadius: '50%', fontSize: '30px', position: 'absolute', left: 10 }} />
      );
    }
  };

  const filterTarefas = (status) => {
    switch (status) {
      case 'PENDENTES':
        setTarefasFiltradas(sprint.tarefas.filter((tarefa) => tarefa.progresso < 100));
        break;
      case 'IMPEDIDOS':
        setTarefasFiltradas(sprint.tarefas.filter((tarefa) => tarefa.comImpedimento == true));
        break;

      case 'FINALIZADOS':
        setTarefasFiltradas(sprint.tarefas.filter((tarefa) => tarefa.progresso == 100));
        break;

      default:
        setTarefasFiltradas(sprint.tarefas);
        break;
    }
  }

  const statusOptions = [
    { value: 'TODOS', icon: <AllInclusive />, label: 'Todos' },
    { value: 'IMPEDIDOS', icon: <Block />, label: 'Impedidos' },
    { value: 'FINALIZADOS', icon: <CheckCircle />, label: 'Finalizados' },
    { value: 'PENDENTES', icon: <HourglassEmpty />, label: 'Pendentes' },
  ];

  return (
    <TaskCardBody sx={{ position: 'relative' }}>
      {sprint ?
        <>
          <NavTask>
            <Select
              defaultValue="TODOS"
              onChange={(e) => filterTarefas(e.target.value)}
              fullWidth
              displayEmpty
              renderValue={(selected) => {
                const option = statusOptions.find(opt => opt.value === selected);
                return <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>{option?.icon}</Box>;
              }}
              sx={{
                color: '#FFF',
                position: 'absolute',
                left: '10px',
                width: "fit-content"
              }}
              MenuProps={{
                TransitionComponent: Grow,
                PaperProps: {
                  sx: {
                    backgroundColor: '#22272B',
                    color: '#fff',
                    borderRadius: 2,
                    mt: 1,
                    maxHeight: 200,
                  }
                }
              }}
            >
              {statusOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {opt.icon}
                    {opt.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
            {sprint.titulo}

            <MoreVert
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModalPutSprint();
              }}
              sx={{
                color: '#FFF',
                position: 'absolute',
                right: '10px',
                cursor: 'pointer',
                transition: '0.3s',
                border: '1px solid transparent',
                borderRadius: '4px',
                '&:hover': {
                  border: '1px solid #f0f0f0'
                }
              }}
            />
          </NavTask>
          <BodyTarefa>
            {tarefasFiltradas.map((tarefa) => (
              <TarefasItem tarefa={tarefa} toogleModal={handleOpenModalPutTask} atualizarProjetos={atualizarProjetos} atualizarSprints={atualizarSprints} ></TarefasItem>
            ))}
          </BodyTarefa>
          <Stack sx={{ flexDirection: 'row', width: '100%', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
            {usuarioLogado.permissao != 'FUNC' ?
              <Button size='medium' onClick={handleOpenModalPostTask} variant='contained'>CRIAR NOVA TAREFA</Button>
              : null}
            <Button size='medium' onClick={handleOpenProject} variant='contained'>VER TAREFAS</Button>
          </Stack>
        </>
        :
        <Stack sx={{ height: '200px', width: '200px', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
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
