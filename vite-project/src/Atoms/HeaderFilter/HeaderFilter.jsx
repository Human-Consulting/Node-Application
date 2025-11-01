import { Block, AllInclusive, CheckCircle, HourglassEmpty, EmojiPeople, Search } from '@mui/icons-material';
import { Box, Grow, MenuItem, Select, Stack, Popover, TextField, Tooltip } from '@mui/material';
import { NavTask } from './HeaderFilter.styles';
import { useState } from 'react';
import { getNome } from '../../Utils/getInfos';

const HeaderFilter = ({ todasTarefas, tarefaData, titulo, setTarefasFiltradas, usuarios }) => {
  const [usuarioFiltrado, setUsuarioFiltrado] = useState(null);
  const [buscaTitulo, setBuscaTitulo] = useState("");

  const [anchorUser, setAnchorUser] = useState(null);
  const [anchorSearch, setAnchorSearch] = useState(null);

  const statusOptions = [
    { value: 'TODOS', icon: <AllInclusive />, label: 'Todos' },
    { value: 'IMPEDIDOS', icon: <Block />, label: 'Impedidos' }
  ];

  const filterTarefas = (status) => {
    setUsuarioFiltrado(null);

    switch (status) {
      case 'IMPEDIDOS':
        setTarefasFiltradas(tarefaData.filter((tarefa) => tarefa.comImpedimento === true));
        break;

      case 'TODOS':
        setTarefasFiltradas(todasTarefas);
        break;
    }
  };

  const handleOpenUserFilter = (event) => {
    setAnchorUser(event.currentTarget);
  };

  const handleCloseUserFilter = () => {
    setAnchorUser(null);
  };

  const handleOpenSearch = (event) => {
    setAnchorSearch(event.currentTarget);
  };

  const handleCloseSearch = () => {
    setAnchorSearch(null);
    setBuscaTitulo("");
  };

  const filterByUsuario = (usuario) => {
    setUsuarioFiltrado(usuario.nome);
    setTarefasFiltradas(tarefaData.filter(t => t.responsavel.idUsuario === usuario.idUsuario));
    handleCloseUserFilter();
  };

  return (
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
      {titulo}
      <Search
        onClick={handleOpenSearch}
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
    </NavTask>
  );
};

export default HeaderFilter;