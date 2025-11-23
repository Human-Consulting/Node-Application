import { Block, AllInclusive, CheckCircle, HourglassEmpty, EmojiPeople, Search, Close } from '@mui/icons-material';
import { Box, Grow, MenuItem, Select, Stack, Popover, TextField, Tooltip } from '@mui/material';
import { NavTask } from './HeaderFilter.styles';
import { useEffect, useState } from 'react';
import { getNome } from '../../Utils/getInfos';

const HeaderFilter = ({ todasTarefas, tarefaData, titulo, setTarefasFiltradas, usuarios, idProjeto }) => {
  const [usuarioFiltrado, setUsuarioFiltrado] = useState(null);
  const [buscaTitulo, setBuscaTitulo] = useState("");

  const [anchorUser, setAnchorUser] = useState(null);
  const [anchorSearch, setAnchorSearch] = useState(null);
  const [onSearch, setOnSearch] = useState(false);

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
    setOnSearch(true);
  };

  const handleCloseSearch = () => {
    setAnchorSearch(null);
  };

  const filterByUsuario = (usuario) => {
    if (usuario == "#") {
      setUsuarioFiltrado("?");
      setTarefasFiltradas(todasTarefas.filter(t => t?.responsavel === null));
    } else {
      setUsuarioFiltrado(usuario.nome);
      setTarefasFiltradas(todasTarefas.filter(t => t?.responsavel?.idUsuario === usuario.idUsuario));
    }
    handleCloseUserFilter();
  };

  useEffect(() => {
    setTarefasFiltradas(
      tarefaData.filter(t =>
        t.titulo.toLowerCase().includes(buscaTitulo.toLowerCase())
      )
    );
  }, [buscaTitulo]);

  const clearSearch = () => {
    setTarefasFiltradas(todasTarefas);
    setOnSearch(false);
  }

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

          usuarioFiltrado == null
            ? retorno = (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {option?.icon}
              </Box>
            )
            : retorno = (
              <Tooltip title={usuarioFiltrado} placement="top">
                <Stack
                  sx={{
                    width: '25px',
                    height: '25px',
                    backgroundColor: '#FFF',
                    color: 'black',
                    borderRadius: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 'bold'
                  }}
                >
                  {getNome(usuarioFiltrado)}
                </Stack>
              </Tooltip>
            );
          return retorno;
        }}
        sx={{
          position: 'absolute',
          left: '10px',
          width: 'fit-content',
          border: 'none',
          color: '#FFF'
        }}
        MenuProps={{
          TransitionComponent: Grow,
          PaperProps: {
            sx: {
              backgroundColor: '#1A1A1A',
              color: '#fff',
              borderRadius: 2,
              border: '1px solid #2A2A2A',
              mt: 1,
              maxHeight: 200,
            }
          }
        }}
      >
        {statusOptions.map((opt) => (
          <MenuItem key={opt.value} value={opt.value} sx={{ color: '#FFF' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {opt.icon}
              {opt.label}
            </Box>
          </MenuItem>
        ))}
        <MenuItem
          value="USUARIO"
          onClick={handleOpenUserFilter}
          sx={{ color: '#FFF' }}
        >
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
          right: `${onSearch ? '40px' : '10px'}`,
          cursor: 'pointer',
          transition: '0.3s',
          border: '1px solid transparent',
          borderRadius: '4px',
          '&:hover': {
            border: '1px solid #3A3A3A'
          }
        }}
      />

      <Close
        onClick={clearSearch}
        sx={{
          color: '#FFF',
          position: 'absolute',
          right: '10px',
          cursor: 'pointer',
          transition: '0.3s',
          border: '1px solid transparent',
          borderRadius: '4px',
          display: `${onSearch ? 'unset' : 'none'}`,
          '&:hover': {
            border: '1px solid #3A3A3A'
          }
        }}
      />

      {/* POPOVER USUÁRIOS */}
      <Popover
        open={Boolean(anchorUser)}
        anchorEl={anchorUser}
        onClose={handleCloseUserFilter}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Box sx={{
          bgcolor: '#1A1A1A',
          color: 'white',
          p: 1,
          borderRadius: 2,
          border: '1px solid #2A2A2A'
        }}>
          <MenuItem
            key={"#"}
            onClick={() => filterByUsuario("#")}
            sx={{ color: '#fff' }}
          >
            {"Não atribuídas"}
          </MenuItem>

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

      {/* POPUP BUSCA */}
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
        <Box sx={{
          bgcolor: '#1A1A1A',
          color: 'white',
          p: 1,
          borderRadius: 2,
          border: '1px solid #2A2A2A'
        }}>
          <TextField
            autoFocus
            placeholder="Buscar tarefa..."
            variant="outlined"
            size="small"
            value={buscaTitulo}
            onChange={(e) => setBuscaTitulo(e.target.value)}
            sx={{
              input: { color: '#FFF' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#3A3A3A' },
                '&:hover fieldset': { borderColor: '#B3B3B3' },
                '&.Mui-focused fieldset': { borderColor: '#36518C' }
              }
            }}
          />
        </Box>
      </Popover>

    </NavTask>
  );
};

export default HeaderFilter;
