import { Box, Grow, MenuItem, Select, Stack, Typography } from '@mui/material';
import { TextDefault, ChartLateral } from '../Dashboard.styles'
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
  const caosTotal = kpis?.impedidos?.length || 0;
  const noneTotal = kpis?.totalAndamento || 0;
  const finalizadosTotal = kpis?.finalizadas?.length || 0;
  const qtdTotal = caosTotal + noneTotal + finalizadosTotal;

  useEffect(() => {
    if (sprints.length > 0) {
      const hoje = dayjs();

      const sprintAtual = sprints.find(sprint => {
        hoje.isAfter(dayjs(sprint.burndown[0].dia)) &&
          hoje.isBefore(dayjs(sprint?.burndown[sprint?.burndown.length - 1].dia))
      }) || null;

      if (sprintAtual) setIdSprint(sprintAtual.idSprint)
      else setIdSprint(sprints[sprints.length - 1].idSprint || null);
    }
  }, [sprints]);

  return (
    <ChartLateral>

      {idProjeto ?
        (
          <>
            <Stack direction="row" alignItems="center" justifyContent="start" gap={'1rem'}>
              <TextDefault sx={{ color: '#eeeeee' }}>Burndown</TextDefault>
              <Select
                value={idSprint}
                onChange={(e) => {
                  setIdSprint(e.target.value);
                }}
                fullWidth
                displayEmpty
                sx={{
                  ...inputStyle?.sx,
                  background: 'transparent',
                  borderBottom: '2px solid #1976d2',
                  borderRadius: 0,
                  color: "#FFF",
                  margin: 0,
                  '& .MuiSelect-select': {
                    py: 0.5,
                    px: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
                MenuProps={{
                  TransitionComponent: Grow,
                  PaperProps: {
                    sx: {
                      border: 'solid #888 2px',
                      backgroundColor: "#000",
                      background: "#22272B",
                      color: "#fff",
                      borderRadius: 2,
                      maxHeight: 450,
                    },
                  },
                }}
              >
                {sprints.length > 0 ? (
                  sprints.map((sprint) => (
                    <MenuItem
                      key={sprint.idSprint}
                      value={sprint.idSprint}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        background: "#22272B",
                        py: 1,
                        "&:hover": { background: "#101010" },
                      }}
                    >
                      <Box>
                        <Typography color="#fff" fontWeight="bold">
                          {sprint.titulo}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>
                    <Typography color="#90caf9" sx={{ textAlign: "center", width: "100%" }}>
                      Nenhuma sprint encontrada!
                    </Typography>
                  </MenuItem>
                )}
              </Select>
            </Stack>

            <BurndownChart
              dados={dados} idSprint={idSprint}
            />
          </>
        )
        :
        (
          <>
            <Stack direction="row" alignItems="center" justifyContent="start" gap={'1rem'}>
              <TextDefault sx={{ color: '#eeeeee' }}>Estatísticas dos Projetos</TextDefault>
            </Stack>
            <PizzaChart kpis={kpis} />
          </>
        )
      }
    </ChartLateral>
  );
}

export default GraficoBurndown;