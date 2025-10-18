import { Block, AllInclusive, CheckCircle } from '@mui/icons-material';
import { Box, Grow, MenuItem, Select } from '@mui/material';
import { NavTask } from './HeaderFiilter.styles';
import { useState } from 'react';

const HeaderFilter = ({ tarefaData, titulo, setTarefasFiltradas }) => {
  const [selected, setSelected] = useState('TODOS');

  const statusOptions = [
    { value: 'TODOS', icon: <AllInclusive />, label: 'Todos' },
    { value: 'IMPEDIDOS', icon: <Block />, label: 'Impedidos' },
    { value: 'SEM_IMPEDIMENTO', icon: <CheckCircle />, label: 'Sem impedimento' },
  ];

  const filterTarefas = (status) => {
    setSelected(status);

    switch (status) {
      case 'IMPEDIDOS':
        setTarefasFiltradas(tarefaData.filter((tarefa) => tarefa.comImpedimento === true));
        break;
      case 'SEM_IMPEDIMENTO':
        setTarefasFiltradas(tarefaData.filter((tarefa) => tarefa.comImpedimento === false));
        break;
      default:
        setTarefasFiltradas(tarefaData);
        break;
    }
  };

  return (
    <NavTask>
      <Select
        value={selected}
        onChange={(e) => filterTarefas(e.target.value)}
        displayEmpty
        renderValue={(selected) => {
          const option = statusOptions.find(opt => opt.value === selected);
          return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{option?.icon}</Box>;
        }}
        sx={{
          color: '#FFF',
          width: 'fit-content',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
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
            },
          },
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
      {titulo}
    </NavTask>
  );
};

export default HeaderFilter;
