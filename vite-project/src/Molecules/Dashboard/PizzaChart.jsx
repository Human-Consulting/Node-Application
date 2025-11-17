import Chart from 'react-apexcharts';

const PizzaChart = ({ kpis }) => {
  const caosTotal = kpis?.impedidos?.length || 0;
  const noneTotal = kpis?.totalAndamento || 0;
  const finalizadosTotal = kpis?.finalizadas?.length || 0;
  const qtdTotal = caosTotal + noneTotal + finalizadosTotal;

  const series = [finalizadosTotal, noneTotal, caosTotal];
  const labels = ['Finalizados', 'Em andamento', 'Impedidos'];

  const options = {
    chart: {
      type: 'donut',
      background: 'transparent',
      toolbar: { show: false },
    },
    labels,
    colors: ['#008FFB', '#ffb300', '#f44336'],

    legend: {
      position: 'right',
      floating: false,
      fontSize: '14px',
      fontFamily: 'Helvetica, Arial, sans-serif',
      labels: {
        colors: '#fff',
        useSeriesColors: false,
      },
      formatter: function (seriesName, opts) {
        const value = series[opts.seriesIndex];
        return `${seriesName}: ${value}`;
      },
    },

    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              show: true,
              color: '#eee',
              fontSize: '14px',
            },
            value: {
              show: true,
              color: '#fff',
              fontSize: '16px',
              formatter: (val) =>
                Math.round((val / qtdTotal) * 100) + '%',
            },
            total: {
              show: true,
              label: 'Total',
              color: '#aaa',
              fontSize: '16px',
              formatter: () => qtdTotal,
            },
          },
        },
      },
    },

    dataLabels: {
      enabled: false,
    },

    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val) => `${val} ${val > 1 ? "projetos" : "projeto"}`,
      },
    },

    stroke: {
      show: false,
    },

    responsive: [
      {
        breakpoint: 1000,
        options: {
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <Chart
      options={options}
      series={series}
      type="donut"
      width="100%"
      height="85%"
    />
  );
};

export default PizzaChart;
