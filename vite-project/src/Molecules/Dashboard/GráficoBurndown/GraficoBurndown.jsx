import { Box, Grow, MenuItem, Select, Stack, Typography, useTheme } from '@mui/material';
import { TextDefault, ChartLateral } from '../Dashboard.styles';
import { inputStyle } from '../../Modal/Forms/Forms.styles';
import BurndownChart from '../LineChart/BurndownChart';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import dayjs from 'dayjs';
import PizzaChart from '../PizzaChart';

const GraficoBurndown = ({ dados, kpis }) => {
  const { idProjeto } = useParams();
  const sprints = dados?.sprints || [];
  const [idSprint, setIdSprint] = useState(null);
    const theme = useTheme(); // <-- ADICIONADO
  

  const caosTotal = kpis?.impedidos?.length || 0;
  const noneTotal = kpis?.totalAndamento || 0;
  const finalizadosTotal = kpis?.finalizadas?.length || 0;

  useEffect(() => {
    if (sprints.length > 0) {
      const hoje = dayjs();

      const sprintAtual = sprints.find(sprint => {
        hoje.isAfter(dayjs(sprint.burndown[0].dia)) &&
        hoje.isBefore(dayjs(sprint.burndown[sprint.burndown.length - 1].dia))
      }) || null;

      if (sprintAtual) setIdSprint(sprintAtual.idSprint);
      else setIdSprint(sprints[sprints.length - 1].idSprint || null);
    }
  }, [sprints]);

  return (
    <ChartLateral>
      {idProjeto ? (
        <>
          <Stack 
            direction="row" 
            alignItems="center" 
            justifyContent="start" 
            gap={'1rem'}
          >
            <TextDefault 
              sx={(theme) => ({ color: theme.palette.iconPrimary })}
            >
              Burndown
            </TextDefault>

            <Select
              value={idSprint}
              onChange={(e) => setIdSprint(e.target.value)}
              fullWidth
              displayEmpty
              sx={(theme) => ({
                ...inputStyle?.sx,
                background: 'transparent',
                borderBottom: `2px solid ${theme.palette.custom.primary}`,
                borderRadius: 0,
                color: theme.palette.iconPrimary,
                '& .MuiSelect-select': {
                  py: 0.5,
                  px: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              })}
              MenuProps={{
                TransitionComponent: Grow,
                PaperProps: {
                  sx: (theme) => ({
                    border: `solid ${theme.palette.custom.border} 2px`,
                    backgroundColor: S,
                    color: theme.palette.iconPrimary,
                    borderRadius: 2,
                    maxHeight: 450,
                  }),
                },
              }}
            >
              {sprints.length > 0 ? (
                sprints.map((sprint) => (
                  <MenuItem
                    key={sprint.idSprint}
                    value={sprint.idSprint}
                    sx={(theme) => ({
                      display: "flex",
                      alignItems: "center",
                      background: theme.palette.background.paper,
                      py: 1,
                      "&:hover": { background: theme.palette.custom.hover },
                    })}
                  >
                    <Box>
                      <Typography 
                        sx={(theme) => ({
                          color: theme.palette.iconPrimary,
                          fontWeight: "bold"
                        })}
                      >
                        {sprint.titulo}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>
                  <Typography 
                    sx={(theme) => ({
                      color: theme.palette.custom.primary,
                      textAlign: "center",
                      width: "100%"
                    })}
                  >
                    Nenhuma sprint encontrada!
                  </Typography>
                </MenuItem>
              )}
            </Select>
          </Stack>

          <BurndownChart dados={dados} idSprint={idSprint} />
        </>
      ) : (
        <>
          <Stack direction="row" alignItems="center" justifyContent="start" gap={'1rem'}>
            <TextDefault 
              sx={(theme) => ({ color: theme.palette.iconPrimary })}
            >
              Estatísticas dos Projetos
            </TextDefault>
          </Stack>

          <PizzaChart kpis={kpis} />
        </>
      )}
    </ChartLateral>
  );
};

export default GraficoBurndown;
