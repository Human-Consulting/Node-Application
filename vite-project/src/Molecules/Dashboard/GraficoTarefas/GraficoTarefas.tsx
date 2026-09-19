import { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { TextDefault, ChartLateral } from '../Dashboard.styles'
import MinimalBarChart from '../BarChart/BarChart';

interface GraficoTarefasArea {
  nome?: string;
  valor?: number;
  [key: string]: unknown;
}

interface GraficoTarefasUsuario {
  nome?: string;
  qtdTarefas?: number;
  [key: string]: unknown;
}

interface GraficoTarefasEntidade {
  areas?: GraficoTarefasArea[];
  [key: string]: unknown;
}

interface GraficoTarefasProps {
  entidade?: GraficoTarefasEntidade | null;
  usuarios?: GraficoTarefasUsuario[] | null;
}

const GraficoTarefas = ({ entidade, usuarios }: GraficoTarefasProps) => {
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

  return (
    <ChartLateral>
      <Stack direction="row" alignItems="center" justifyContent="start" gap={'1rem'}>
        <TextDefault sx={{ color: '#eeeeee' }}>Tarefas por</TextDefault>

        <Stack direction="row" gap={2}>
          {['Área', 'Usuário'].map((item) => (
            <Typography
              key={item}
              onClick={() => setFiltro(item)}
              sx={{
                color: filtro === item ? '#fff' : '#999',
                fontWeight: filtro === item ? 'bold' : 'normal',
                borderBottom: filtro === item ? '2px solid #1976d2' : '2px solid transparent',
                cursor: 'pointer',
                transition: '0.2s',
                pb: 0.3,
                '&:hover': { color: '#fff' },
              }}
            >
              {item}
            </Typography>
          ))}
        </Stack>
      </Stack>

      <MinimalBarChart
        valores={dados.valores}
        categorias={dados.categorias}
      />
    </ChartLateral>
  );
}

export default GraficoTarefas;
