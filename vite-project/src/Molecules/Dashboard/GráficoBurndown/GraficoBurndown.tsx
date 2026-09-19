import { Box, Grow, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { TextDefault, ChartLateral } from '../Dashboard.styles'
import { inputStyle } from '../../Modal/Forms/Forms.styles';
import BurndownChart from '../LineChart/BurndownChart';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import dayjs from 'dayjs';
import PizzaChart, { Kpis } from '../PizzaChart';

export interface BurndownDia {
  dia?: string;
  tarefasConcluidas?: number;
  totalTarefas?: number;
  [key: string]: unknown;
}

export interface BurndownSprint {
  idSprint?: number;
  titulo?: string;
  burndown?: BurndownDia[];
  [key: string]: unknown;
}

export interface BurndownData {
  sprints?: BurndownSprint[];
  [key: string]: unknown;
}

interface GraficoBurndownProps {
  dados?: BurndownData | null;
  kpis?: Kpis | null;
}

const GraficoBurndown = ({ dados, kpis }: GraficoBurndownProps) => {
  const { idProjeto } = useParams();
  const sprints = dados?.sprints || [];
  const [idSprint, setIdSprint] = useState<number | string | null>(null);

  useEffect(() => {
    if (sprints.length > 0) {
      const hoje = dayjs();

      const sprintAtual = sprints.find(sprint => {
        const burndown = sprint.burndown || [];
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        hoje.isAfter(dayjs(burndown[0]?.dia)) &&
          hoje.isBefore(dayjs(burndown[burndown.length - 1]?.dia))
      }) || null;

      if (sprintAtual) setIdSprint(sprintAtual.idSprint ?? null)
      else setIdSprint(sprints[sprints.length - 1].idSprint || null);
    }
  }, [sprints]);

  return (
    <ChartLateral>

      {idProjeto ?
        (
          <>
            <Stack direction="row" alignItems="center" justifyContent="start" gap={'1rem'}>
              <TextDefault sx={{ color: 'text.primary' }}>Burndown</TextDefault>
              <Select
                value={idSprint ?? ''}
                onChange={(e: SelectChangeEvent<unknown>) => {
                  setIdSprint(e.target.value as number | string);
                }}
                fullWidth
                displayEmpty
                sx={{
                  ...inputStyle?.sx,
                  background: 'transparent',
                  borderBottom: '2px solid #1976d2',
                  borderRadius: 0,
                  color: 'text.primary',
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
                      bgcolor: 'background.paper',
                      color: 'text.primary',
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
                        bgcolor: 'background.paper',
                        py: 1,
                        "&:hover": { bgcolor: 'background.default' },
                      }}
                    >
                      <Box>
                        <Typography color="textPrimary" fontWeight="bold">
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
              <TextDefault sx={{ color: 'text.primary' }}>Estatísticas dos Projetos</TextDefault>
            </Stack>
            <PizzaChart kpis={kpis} />
          </>
        )
      }
    </ChartLateral>
  );
}

export default GraficoBurndown;
