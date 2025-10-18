import { AllInclusive, Block, CheckCircle, Height, HourglassEmpty, MoreVert } from '@mui/icons-material';
import { Box, Grow, MenuItem, Select } from '@mui/material';
import { useState } from 'react'
import { NavTask } from './HeaderFiilter.styles';

const HeaderFilter = ({tarefaData, titulo, setTarefasFiltradas}) => {

    
  



      const statusOptions = [
        { value: 'TODOS', icon: <AllInclusive size='12px'/>, label: 'Todos' },
        { value: 'IMPEDIDOS', icon: <Block  size='12px'/>, label: 'Impedidos' },
        { value: 'FINALIZADOS', icon: <CheckCircle  size='12px'/>, label: 'Finalizados' },
        { value: 'PENDENTES', icon: <HourglassEmpty  size='12px'/>, label: 'Pendentes' },
      ];

    const filterTarefas = (status) => {
        switch (status) {
          case 'PENDENTES':
            setTarefasFiltradas(tarefaData.filter((tarefa) => tarefa.progresso < 100));
            break;
          case 'IMPEDIDOS':
            setTarefasFiltradas(tarefaData.filter((tarefa) => tarefa.comImpedimento == true));
            break;
    
          case 'FINALIZADOS':
            setTarefasFiltradas(tarefaData.filter((tarefa) => tarefa.progresso == 100));
            break;
    
          default:
            setTarefasFiltradas(tarefaData);
            break;
        }
      }
  return (
    <NavTask >
       <Select
              defaultValue="TODOS"
              onChange={(e) => filterTarefas(e.target.value)}
              displayEmpty
              renderValue={(selected) => {
                const option = statusOptions.find(opt => opt.value === selected);
                return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{option?.icon}</Box>;
              }}
              sx={{
                color: '#FFF',
                width: "fit-content",
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex'
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
            {titulo}

            <MoreVert
              onClick={(e) => {
                e.stopPropagation();
              }}
              sx={{
                color: '#FFF',
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

          

  )
}

export default HeaderFilter
