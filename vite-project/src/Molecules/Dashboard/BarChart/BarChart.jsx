import Chart from 'react-apexcharts';

const MinimalBarChart = ({ areas }) => {
  const options = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      },
      background: 'transparent'
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: '20%',
        borderRadius: 4,
        distributed: true
      }
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      theme: 'dark'
    },
    grid: {
      borderColor: '#333',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    xaxis: {
      categories: areas.map(area => area.nome),
      labels: {
        style: {
          colors: '#fff'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#fff'
        }
      }
    },
    colors: ['#4dabf5', '#00E396', '#ffca28', '#ef5350'],
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
  };

  const series = [
    {
      name: 'Entregas',
      data: areas.map(area => area.valor)
    }
  ];

  return (
    <div
      style={{
        background: 'linear-gradient(to right, #1F1F1F, #0f1125)',
        padding: '1rem',
        borderRadius: '1rem',

      }}
    >
      <Chart options={options} series={series} type="bar" height={300} width="100%" />
    </div>
  );
};

export default MinimalBarChart;
