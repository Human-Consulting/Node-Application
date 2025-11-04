import { BodyTarefa, NavTask, TaskCardBody } from './TaskCard.styles'
import { Button, Select, Stack, MenuItem, Grow, Box, Tooltip, Popover, TextField } from '@mui/material'
import TarefasItem from '../TarefasItem/TarefasItem'
import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react';
import { CalendarMonth, CheckCircle, HourglassEmpty, Block, AllInclusive, MoreVert, EmojiPeople, Search, NorthEast, Close } from '@mui/icons-material';
import { getNome, getTempoRestante } from '../../Utils/getInfos';

const TaskCard = ({ toogleTaskModal, sprint, index, atualizarProjetos, atualizarSprints }) => {

  const { nomeEmpresa, idEmpresa, descricaoProjeto, idProjeto } = useParams();

  const navigate = useNavigate();

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  const [tarefasFiltradas, setTarefasFiltradas] = useState([]);
  const [usuarioFiltrado, setUsuarioFiltrado] = useState(null);
  const [buscaTitulo, setBuscaTitulo] = useState("");
  const [onSearch, setOnSearch] = useState(false);

  const [anchorUser, setAnchorUser] = useState(null);
  const [anchorSearch, setAnchorSearch] = useState(null);

  const usuarios = [
    ...new Map(
      sprint?.tarefas.map(t => [
        t.responsavel.idUsuario,
        { idUsuario: t.responsavel.idUsuario, nome: t.responsavel.nome }
      ])
    ).values()
  ];

  const handleOpenSearch = (event) => {
    setAnchorSearch(event.currentTarget);
    setOnSearch(true);
  };

  const handleCloseSearch = () => {
    setAnchorSearch(null);
    // setBuscaTitulo("");
  };

  const clearSearch = () => {
    setTarefasFiltradas(sprint?.tarefas);
    setOnSearch(false);
  }

  useEffect(() => {
    if (buscaTitulo.trim() === "") {
      setTarefasFiltradas(tarefasFiltradas);
    } else {
      setTarefasFiltradas(
        sprint?.tarefas.filter(t =>
          t.titulo.toLowerCase().includes(buscaTitulo.toLowerCase())
        )
      );
    }
  }, [buscaTitulo, sprint]);

  useEffect(() => {
    setTarefasFiltradas(sprint?.tarefas);
  }, [sprint])

  const handleOpenProject = () => {
    navigate(`/Home/${nomeEmpresa}/${Number(idEmpresa)}/Roadmap/${descricaoProjeto}/${idProjeto}/Backlog/${sprint.titulo}/${sprint.idSprint}/${index}`);
  }

  const handleOpenModalPutTask = (task) => {
    toogleTaskModal(task, 'task', null, sprint.dtInicio, sprint.dtFim);
  }

  const handleOpenModalPutSprint = () => {
    toogleTaskModal(sprint, 'sprint', null);
  }

  const handleOpenModalPostTask = () => {
    toogleTaskModal(null, 'task', sprint.idSprint, sprint.dtInicio, sprint.dtFim);
  }

  const handleOpenModalPostSprint = () => {
    toogleTaskModal(null, 'sprint', null);
  }

  const filterTarefas = (status) => {
    setUsuarioFiltrado(null);
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

  const handleOpenUserFilter = (event) => {
    setAnchorUser(event.currentTarget);
  };

  const handleCloseUserFilter = () => {
    setAnchorUser(null);
  };

  const filterByUsuario = (usuario) => {
    setUsuarioFiltrado(usuario.nome);
    setTarefasFiltradas(sprint.tarefas.filter(t => t.responsavel.idUsuario === usuario.idUsuario));
    handleCloseUserFilter();
  };

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
                let retorno = null;
                const option = statusOptions.find(opt => opt.value === selected);
                usuarioFiltrado == null ? retorno = <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>{option?.icon}</Box>
                  : retorno =
                  <Tooltip title={usuarioFiltrado} placement="top">
                    <Stack sx={{ width: '25px', height: '25px', backgroundColor: 'white', color: 'black', borderRadius: '100%', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>{getNome(usuarioFiltrado)}</Stack>
                  </Tooltip>;
                return retorno;
              }}
              sx={{
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
              <MenuItem value="USUARIO" onClick={handleOpenUserFilter}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmojiPeople />
                  Usuário
                </Box>
              </MenuItem>
            </Select>
            <Stack sx={{
              flexDirection: 'row', border: '1px solid transparent',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: '0.2s',
              padding: '0.5rem',
              gap: 1,
              '&:hover': {
                border: '1px solid #f0f0f0'
              }
            }}
            onClick={handleOpenProject}>
              {sprint.titulo}
              <NorthEast
                
                sx={{
                  color: '#FFF',

                }}
              />
            </Stack>
            {/* <Search
              onClick={handleOpenSearch}
              sx={{
                color: '#FFF',
                position: 'absolute',
                right: '40px',
                cursor: 'pointer',
                transition: '0.3s',
                border: '1px solid transparent',
                borderRadius: '4px',
                '&:hover': {
                  border: '1px solid #f0f0f0'
                }
              }}
            /> */}
            <Search
                    onClick={handleOpenSearch}
                    sx={{
                      color: '#FFF',
                      position: 'absolute',
                      right: `${onSearch ? '70px' : '40px'}`,
                      cursor: 'pointer',
                      transition: '0.3s',
                      border: '1px solid transparent',
                      borderRadius: '4px',
                      '&:hover': {
                        border: '1px solid #f0f0f0'
                      }
                    }}
                  />
                  <Close
                    onClick={clearSearch}
                    sx={{
                      color: '#FFF',
                      position: 'absolute',
                      right: '40px',
                      cursor: 'pointer',
                      transition: '0.3s',
                      border: '1px solid transparent',
                      borderRadius: '4px',
                      display: `${onSearch ? 'unset' : 'none'}`,
                      '&:hover': {
                        border: '1px solid #f0f0f0'
                      }
                    }}
                  />
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
          <Stack sx={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center', borderTop: 'solid white 1px', paddingTop: '15px' }}>
            {usuarioLogado.permissao != 'FUNC' ?
              <Button size='medium' onClick={handleOpenModalPostTask} variant='contained'>CRIAR TAREFA</Button>
              : null}
            <Stack sx={{ flexDirection: 'row', gap: '15px', }}>
              {Math.floor(sprint.progresso)}% de {sprint.tarefas.length}
              {sprint.progresso < 100 &&
                <Tooltip title={"Prazo: " + sprint.dtFim} placement="top">
                  <Stack sx={{ gap: '2px', alignItems: 'center', flexDirection: 'row' }}> <CalendarMonth sx={{ fontSize: '16px' }} />{getTempoRestante(sprint.dtFim)}</Stack>
                </Tooltip>}
            </Stack>
          </Stack>
        </>
        :
        <Stack sx={{ height: '200px', width: '200px', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={handleOpenModalPostSprint}
          >
            CRIAR SPRINT
          </Button>
        </Stack>
      }
      <Popover
        open={Boolean(anchorUser)}
        anchorEl={anchorUser}
        onClose={handleCloseUserFilter}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Box sx={{ bgcolor: '#22272B', color: 'white', p: 1, borderRadius: 2 }}>
          {usuarios.map(user => (
            <MenuItem
              key={user.idUsuario}
              onClick={() => filterByUsuario(user)}
              sx={{ color: '#fff' }}
            >
              {user.nome}
            </MenuItem>
          ))}
        </Box>
      </Popover>
      <Popover
        open={Boolean(anchorSearch)}
        anchorEl={anchorSearch}
        onClose={handleCloseSearch}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <Box sx={{ bgcolor: '#22272B', color: 'white', p: 1, borderRadius: 2 }}>
          <TextField
            autoFocus
            placeholder="Buscar tarefa..."
            variant="outlined"
            size="small"
            value={buscaTitulo}
            onChange={(e) => setBuscaTitulo(e.target.value)}
            sx={{
              input: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: '#ccc' },
                '&.Mui-focused fieldset': { borderColor: '#1976d2' }
              }
            }}
          />
        </Box>
      </Popover>
    </TaskCardBody>
  )
}

export default TaskCard
