import Chart from 'react-apexcharts';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import ModalInvestimento from '../../Modais/ModalInvestimento/ModalInvestimento';
import { useParams } from 'react-router';
import { useTheme } from '@mui/material/styles';

const LineChart = ({ orcamento, financeiros, toogleModal, atualizarEntidade }) => {
  const theme = useTheme();
  const { idProjeto } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleBadgeClick = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const openPopover = Boolean(anchorEl);

  const mesesNome = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const totaisPorMes = Array(12).fill(0);


  financeiros?.forEach(financeiro => {
    const data = new Date(financeiro.dtInvestimento);
    const mes = !isNaN(data.getTime()) ? data.getUTCMonth() : null;

    if (mes !== null) {
      totaisPorMes[mes] += financeiro.valor || 0;
    }
  });

  let ultimoMesComDados = -1;
  for (let i = totaisPorMes.length - 1; i >= 0; i--) {
    if (totaisPorMes[i] > 0) {
      ultimoMesComDados = i;
      break;
    }
  }

  const resultadoFinal = [];
  let acumulado = 0;

  for (let i = 0; i <= ultimoMesComDados; i++) {
    acumulado += totaisPorMes[i];
    resultadoFinal.push({
      mes: mesesNome[i],
      valor: acumulado
    });
  }

  const orcamentos = resultadoFinal.map(() => orcamento);

  // ★ Cores do gráfico 100% pelo theme
  const options = {
    chart: {
      id: 'multi-line',
      toolbar: { show: false },
      background: 'transparent',
    },

    colors: [
      theme.palette.primary.main,     // investimento
      theme.palette.error.main        // orçamento
    ],

    dataLabels: { enabled: false },

    stroke: {
      curve: 'smooth',
      width: 3
    },

    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.7,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100]
      }
    },

    grid: { show: false },

    xaxis: {
      categories: resultadoFinal.map(item => item.mes),
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '12px'
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },

    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '12px'
        }
      }
    },

    tooltip: {
      shared: false,
      intersect: false,
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light'
    },

    legend: { show: false }
  };

  const series = [
    {
      name: 'Investimento',
      data: resultadoFinal.map(item => item.valor)
    },
    {
      name: "Orçamento",
      data: orcamentos
    }
  ];

  return (
    <div
      style={{
        padding: '1rem',
        height: '70%',
        background: theme.palette.background.paper,
        width: '100%',
        borderRadius: '20px',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: theme.palette.text.primary }}>Investimentos</h2>

        {idProjeto == null ? null : (
          <MoreVertIcon
            sx={{ cursor: 'pointer', color: theme.palette.text.primary }}
            onClick={handleBadgeClick}
          />
        )}
      </div>

      <Chart options={options} series={series} type="area" height={'85%'} />

      <ModalInvestimento
        investimentos={financeiros || []}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        toogleModal={toogleModal}
        atualizarEntidade={atualizarEntidade}
      />
    </div>
  );
};

export default LineChart;
