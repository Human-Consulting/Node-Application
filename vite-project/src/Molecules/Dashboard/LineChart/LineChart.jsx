import Chart from 'react-apexcharts';

const LineChart = ({ orcamento, financeiros }) => {
  // const totaisPorMes = {};
  const totaisPorMes = Array(financeiros.length).fill(0);
  financeiros.forEach(financeiro => {
    const mes = new Date(financeiro.dtInvestimento).getUTCMonth();
    if (!totaisPorMes[mes]) {
      totaisPorMes[mes] = 0;
    }
    totaisPorMes[mes] += financeiro.valor;
  });

  const totaisAcumulados = [];
  let acumulado = 0;

  for (let i = 0; i < totaisPorMes.length; i++) {
      acumulado += totaisPorMes[i];
      totaisAcumulados.push(acumulado);
  }

  const mesesNome = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const resultadoFinal = totaisAcumulados.map((valor, i) => ({
    mes: mesesNome[i],
    valor
  }));

  const orcamentos = [];
  for (let i = 0; i < resultadoFinal.length; i++) {
    orcamentos.push(orcamento);
  }


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
    <div className="App" style={{ width: '100%', padding: '1rem' }}>
      <h2>Gráfico Financeiro</h2>
      <Chart options={options} series={series} type="area" height={320} width="100%" />
    </div>
  );
};

export default LineChart;
