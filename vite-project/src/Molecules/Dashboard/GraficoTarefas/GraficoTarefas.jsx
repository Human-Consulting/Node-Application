import { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { TextDefault, ChartLateral } from '../Dashboard.styles';
import MinimalBarChart from '../BarChart/BarChart';
import { useTheme } from '@mui/material/styles';

const GraficoTarefas = ({ entidade, usuarios }) => {
  const theme = useTheme();
  const [filtro, setFiltro] = useState('Área');

  const dados =
    filtro === 'Área'
      ? {
          valores: entidade?.areas?.map(a => a?.valor || 0) ?? [],
          categorias: entidade?.areas?.map(a => a?.nome || '') ?? [],
        }
      : {
          valores: usuarios?.map(u => u?.qtdTarefas || 0) ?? [],
          categorias: usuarios?.map(u => u?.nome || 'Sem nome') ?? [],
        };

  const colorActive = theme.palette.text.primary;
  const colorInactive = theme.palette.text.secondary;
  const underlineColor = theme.palette.primary.main;

  return (
    <ChartLateral>
      <Stack direction="row" alignItems="center" justifyContent="start" gap="1rem">
        <TextDefault sx={{ color: colorActive }}>Tarefas por</TextDefault>

        <Stack direction="row" gap={2}>
          {['Área', 'Usuário'].map(item => (
            <Typography
              key={item}
              onClick={() => setFiltro(item)}
              sx={{
                color: filtro === item ? colorActive : colorInactive,
                fontWeight: filtro === item ? 600 : 400,
                borderBottom: filtro === item ? `2px solid ${underlineColor}` : '2px solid transparent',
                cursor: 'pointer',
                transition: '0.2s',
                pb: 0.3,
                '&:hover': { color: colorActive },
                userSelect: 'none'
              }}
            >
              {item}
            </Typography>
          ))}
        </Stack>
      </Stack>

      <MinimalBarChart valores={dados.valores} categorias={dados.categorias} />
    </ChartLateral>
  );
};

export default GraficoTarefas;
