import Chart from 'react-apexcharts';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import ModalInvestimento from '../../ModalInvestimento/ModalInvestimento';
import { useParams } from 'react-router';

const LineChart = ({ orcamento, financeiros, toogleModal, atualizarEntidade }) => {

  const { idProjeto } = useParams();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleBadgeClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  const mesesNome = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const totaisPorMes = Array(12).fill(0);


  financeiros.forEach(financeiro => {
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

  const options = {
    chart: {
      id: 'multi-line',
      toolbar: { show: false }
    },
    colors: ['#4dabf5', '#ff1744'],
    colors: ['#008FFB', '#ff1744'],
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      curve: 'straight',
      width: [2, 1],
      dashArray: [0, 0]
    },
    fill: {
      type: ['gradient', 'solid'],
      opacity: [0, 0],
      gradient: {
        shade: 'light',
        shade: 'dark',
        type: 'vertical',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: undefined,
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.4,
        stops: [0, 90, 100]
      }
    },
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        style: {
          colors: '#FFF',
          fontSize: '12px'
        }
      },
      categories: resultadoFinal.map(item => item.mes),
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#FFF',
          fontSize: '12px'
        }
      }
    },
    tooltip: {
      shared: false,
      intersect: false,
      theme: 'dark',
    },
    legend: {
      fontSize: '16px',
      labels: {
        colors: '#FFF',
      }
    },
    legend: {
      show: false
    },
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
    <div className="App" style={{ paddingInline: '1rem', flex: 1, background: '#0d0d0d', width: 'calc(100% + 1rem)', borderRadius: '20px', justifyContent: 'space-evenly', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Gráfico Financeiro</h2>
        {idProjeto == null ? null : <MoreVertIcon sx={{ cursor: 'pointer' }} onClick={handleBadgeClick} />}
      </div>
      <Chart options={options} series={series} type="area" height={250} />
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
